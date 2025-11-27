import { useEffect, useMemo, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabaseClient";
import PostCard from "./components/PostCard";
import NewPostForm from "./components/NewPostForm";

type Comment = {
  id: number;
  post_id: number;
  text: string;
  username: string;
  created_at: string;
};

type Post = {
  id: number;
  content: string;
  image_url?: string | null;
  username: string;
  likes: number;
  created_at: string;
  comments?: Comment[];
};

export default function CommunityPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [uploading, setUploading] = useState(false);
  const [usingFallback, setUsingFallback] = useState(false);

  const fallbackPosts: Post[] = [
    {
      id: 9991,
      content: "Bem-vinda(o)! Este é um post de demonstração enquanto conectamos ao Supabase.",
      image_url: null,
      username: "Equipe HarmoniCare",
      likes: 12,
      created_at: new Date().toISOString(),
      comments: [
        {
          id: 99911,
          post_id: 9991,
          text: "Comente aqui e compartilhe sua experiência.",
          username: "Moderação",
          created_at: new Date().toISOString(),
        },
      ],
    },
  ];

  const fetchPosts = async () => {
    try {
      const { data: postsData, error: postsError } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (postsError) {
        throw postsError;
      }

      const postIds = (postsData || []).map(post => post.id);
      let commentsByPost: Record<number, Comment[]> = {};

      if (postIds.length) {
        const { data: commentsData, error: commentsError } = await supabase
          .from("comments")
          .select("*")
          .in("post_id", postIds);

        if (commentsError) {
          throw commentsError;
        }

        commentsByPost = (commentsData || []).reduce<Record<number, Comment[]>>((acc, comment) => {
          acc[comment.post_id] = [...(acc[comment.post_id] || []), comment];
          return acc;
        }, {});
      }

      const hydratedPosts = (postsData as Post[]).map(post => ({
        ...post,
        comments: commentsByPost[post.id] || [],
      }));

      setPosts(hydratedPosts);
      setUsingFallback(false);
    } catch (err) {
      console.error("Erro ao carregar posts; usando conteúdo local.", err);
      setPosts(fallbackPosts);
      setUsingFallback(true);
    }
  };

  useEffect(() => {
    fetchPosts();

    if (!usingFallback) {
      const channel = supabase
        .channel("community-feed")
        .on(
          "postgres_changes",
          { event: "INSERT", schema: "public", table: "posts" },
          payload => {
            const newPost = payload.new as Post;
            setPosts(prev => [newPost, ...prev]);
          },
        )
        .on(
          "postgres_changes",
          { event: "UPDATE", schema: "public", table: "posts" },
          payload => {
            const updated = payload.new as Post;
            setPosts(prev =>
              prev.map(post => (post.id === updated.id ? { ...post, ...updated } : post)),
            );
          },
        )
        .on(
          "postgres_changes",
          { event: "INSERT", schema: "public", table: "comments" },
          payload => {
            const newComment = payload.new as Comment;
            setPosts(prev =>
              prev.map(post =>
                post.id === newComment.post_id
                  ? { ...post, comments: [...(post.comments || []), newComment] }
                  : post,
              ),
            );
          },
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [usingFallback]);

  const handlePost = async (content: string, image: File | null) => {
    if (!content.trim() && !image) return;

    setUploading(true);
    let imageUrl: string | null = null;

    if (image) {
      const fileName = `${Date.now()}_${image.name}`;
      const { error } = await supabase.storage.from("community-images").upload(fileName, image);
      if (!error) {
        const { data: urlData } = supabase.storage.from("community-images").getPublicUrl(fileName);
        imageUrl = urlData.publicUrl;
      }
    }

    await supabase.from("posts").insert([{ username: "Você", content, image_url: imageUrl }]);
    setUploading(false);
  };

  const handleLike = async (post: Post) => {
    await supabase.from("posts").update({ likes: post.likes + 1 }).eq("id", post.id);
  };

  const handleAddComment = async (postId: number, text: string) => {
    if (!text.trim()) return;
    await supabase.from("comments").insert([{ post_id: postId, username: "Você", text }]);
  };

  const sortedPosts = useMemo(
    () =>
      [...posts].sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      ),
    [posts],
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 pt-24 px-4">
        <div className="container mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold mb-6">Comunidade</h1>

          <NewPostForm handlePost={handlePost} uploading={uploading} />

          <div className="space-y-6">
            {sortedPosts.map(post => (
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
