import React, { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabaseClient";
import PostCard from "./components/PostCard";
import NewPostForm from "./components/NewPostForm";

export default function CommunityPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);

  // Carregar posts iniciais
  const fetchPosts = async () => {
    const { data } = await supabase
      .from("posts")
      .select("*, comments(*)")
      .order("created_at", { ascending: false });
    if (data) setPosts(data);
  };

  useEffect(() => {
    fetchPosts();

    const postSub = supabase
      .from("posts")
      .on("INSERT", payload => setPosts(prev => [payload.new, ...prev]))
      .on("UPDATE", payload => setPosts(prev => prev.map(p => p.id === payload.new.id ? payload.new : p)))
      .subscribe();

    const commentSub = supabase
      .from("comments")
      .on("INSERT", payload =>
        setPosts(prev =>
          prev.map(p =>
            p.id === payload.new.post_id
              ? { ...p, comments: [...(p.comments || []), payload.new] }
              : p
          )
        )
      )
      .subscribe();

    return () => {
      supabase.removeSubscription(postSub);
      supabase.removeSubscription(commentSub);
    };
  }, []);

  const handlePost = async (content: string, image: File | null) => {
    if (!content.trim() && !image) return;

    setUploading(true);
    let imageUrl;
    if (image) {
      const fileName = `${Date.now()}_${image.name}`;
      const { error } = await supabase.storage.from("community-images").upload(fileName, image);
      if (!error) imageUrl = supabase.storage.from("community-images").getPublicUrl(fileName).data.publicUrl;
    }

    await supabase.from("posts").insert([{ username: "Você", content, image_url: imageUrl }]);
    setUploading(false);
  };

  const handleLike = async (post: any) => {
    await supabase.from("posts").update({ likes: post.likes + 1 }).eq("id", post.id);
  };

  const handleAddComment = async (postId: number, text: string) => {
    if (!text.trim()) return;
    await supabase.from("comments").insert([{ post_id: postId, username: "Você", text }]);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 pt-24 px-4">
        <div className="container mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold mb-6">Comunidade 💛</h1>

          <NewPostForm handlePost={handlePost} uploading={uploading} />

          <div className="space-y-6">
            {posts.map(post => (
              <PostCard
                key={post.id}
                post={post}
                handleLike={handleLike}
                handleAddComment={handleAddComment}
              />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
