import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface UploadProgress {
  fileName: string;
  progress: number;
  status: 'uploading' | 'complete' | 'error';
}

export const useFileUpload = () => {
  const [uploadProgress, setUploadProgress] = useState<UploadProgress[]>([]);
  const { toast } = useToast();

  const getBucketName = (fileType: string): string => {
    if (fileType.startsWith('image/')) return 'chat-images';
    if (fileType.startsWith('video/')) return 'chat-videos';
    if (fileType === 'application/pdf') return 'chat-documents';
    return 'chat-documents';
  };

  const getMessageType = (fileType: string): 'image' | 'video' | 'pdf' | 'file' => {
    if (fileType.startsWith('image/')) return 'image';
    if (fileType.startsWith('video/')) return 'video';
    if (fileType === 'application/pdf') return 'pdf';
    return 'file';
  };

  const uploadFile = async (file: File): Promise<{
    url: string;
    messageType: 'image' | 'video' | 'pdf' | 'file';
  } | null> => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Usuário não autenticado');

      const bucket = getBucketName(file.type);
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;

      // Add to progress tracking
      setUploadProgress(prev => [
        ...prev,
        { fileName: file.name, progress: 0, status: 'uploading' }
      ]);

      // Upload file
      const { error: uploadError, data } = await supabase.storage
        .from(bucket)
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(fileName);

      // Update progress to complete
      setUploadProgress(prev =>
        prev.map(p =>
          p.fileName === file.name
            ? { ...p, progress: 100, status: 'complete' as const }
            : p
        )
      );

      // Remove from progress after 2 seconds
      setTimeout(() => {
        setUploadProgress(prev =>
          prev.filter(p => p.fileName !== file.name)
        );
      }, 2000);

      return {
        url: publicUrl,
        messageType: getMessageType(file.type),
      };
    } catch (error: any) {
      setUploadProgress(prev =>
        prev.map(p =>
          p.fileName === file.name
            ? { ...p, status: 'error' as const }
            : p
        )
      );

      toast({
        title: 'Erro ao fazer upload',
        description: error.message,
        variant: 'destructive',
      });

      return null;
    }
  };

  return {
    uploadFile,
    uploadProgress,
  };
};
