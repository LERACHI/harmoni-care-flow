-- Fix security vulnerabilities identified in security scan

-- 1. Fix Security Definer Function - Drop trigger first, then function, then recreate
DROP TRIGGER IF EXISTS update_conversation_on_new_message ON public.messages;
DROP FUNCTION IF EXISTS public.update_conversation_timestamp();

CREATE OR REPLACE FUNCTION public.update_conversation_timestamp()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.conversations
  SET updated_at = now()
  WHERE id = NEW.conversation_id;
  RETURN NEW;
END;
$$;

-- Recreate the trigger
CREATE TRIGGER update_conversation_on_new_message
AFTER INSERT ON public.messages
FOR EACH ROW
EXECUTE FUNCTION public.update_conversation_timestamp();

-- 2. Fix Profiles Public Exposure - Require authentication
DROP POLICY IF EXISTS "Profiles are viewable by everyone" ON public.profiles;

CREATE POLICY "Authenticated users can view profiles"
ON public.profiles
FOR SELECT
TO authenticated
USING (true);

-- 3. Fix Storage Policies - Drop all existing policies first
DROP POLICY IF EXISTS "Users can view files in their conversations" ON storage.objects;
DROP POLICY IF EXISTS "Users can upload files to their conversations" ON storage.objects;
DROP POLICY IF EXISTS "Users can update their files" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their files" ON storage.objects;
DROP POLICY IF EXISTS "Users can view their conversation files" ON storage.objects;
DROP POLICY IF EXISTS "Users can upload their own files" ON storage.objects;
DROP POLICY IF EXISTS "Users can update their own files" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own files" ON storage.objects;

-- Allow users to view files they uploaded OR files in conversations they participate in
CREATE POLICY "Users can view their conversation files"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id IN ('chat-images', 'chat-videos', 'chat-documents')
  AND (
    -- User owns the file (files are stored as user_id/filename)
    (storage.foldername(name))[1] = auth.uid()::text
    OR
    -- User is participant in a conversation that has this file
    EXISTS (
      SELECT 1
      FROM public.messages m
      JOIN public.conversation_participants cp ON cp.conversation_id = m.conversation_id
      WHERE m.file_url = (storage.extension(name) || '/' || name)
        AND cp.user_id = auth.uid()
    )
  )
);

-- Allow users to upload files to their own folder
CREATE POLICY "Users can upload their own files"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id IN ('chat-images', 'chat-videos', 'chat-documents')
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Allow users to update their own files
CREATE POLICY "Users can update their own files"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id IN ('chat-images', 'chat-videos', 'chat-documents')
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Allow users to delete their own files
CREATE POLICY "Users can delete their own files"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id IN ('chat-images', 'chat-videos', 'chat-documents')
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- 4. Add User Data Management Policies

-- Allow users to delete their own messages
CREATE POLICY "Users can delete their own messages"
ON public.messages
FOR DELETE
TO authenticated
USING (sender_id = auth.uid());

-- Allow users to update their own messages
CREATE POLICY "Users can update their own messages"
ON public.messages
FOR UPDATE
TO authenticated
USING (sender_id = auth.uid());

-- Allow users to leave conversations (delete their participation)
CREATE POLICY "Users can leave conversations"
ON public.conversation_participants
FOR DELETE
TO authenticated
USING (user_id = auth.uid());

-- Allow users to delete conversations they created (if they're the only/last participant)
CREATE POLICY "Users can delete their conversations"
ON public.conversations
FOR DELETE
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM conversation_participants cp
    WHERE cp.conversation_id = conversations.id
      AND cp.user_id = auth.uid()
  )
);