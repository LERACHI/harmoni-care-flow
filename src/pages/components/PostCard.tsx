import React from "react";
import { Heart, MessageSquare, Send } from "lucide-react";
import CommentInput from "./CommentInput";

interface Comment {
  id: number;
  post_id: number;
  username: string;
  text: string;
}

interface Post {
  id: number;
  username: string;
  content: string;
  image_url?: string;
  likes: number;
  comments?: Comment[];
}

interface Props {
  post: Post;
  handleLike: (post: Post) => void;
  handleAddComment: (postId: number, text: string) => void;
}

export default function PostCard({ post, handleLike, handleAddComment }: Props) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-white to-primary/10 p-1 shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/25 transition-all duration-300 hover:-translate-y-1">
      <div className="h-full w-full rounded-3xl bg-white border border-primary/15 p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="font-semibold text-foreground">{post.username}</span>
          <span className="text-sm text-muted-foreground">{post.likes} likes</span>
        </div>
        <p className="mb-3 whitespace-pre-wrap text-foreground leading-relaxed">{post.content}</p>
        {post.image_url && (
          <div className="overflow-hidden rounded-2xl mb-4 border border-muted/30 shadow-lg shadow-primary/20">
            <img
              src={post.image_url}
              alt="post"
              className="w-full max-h-80 object-cover transition-transform duration-300 hover:scale-[1.03]"
            />
          </div>
        )}
        <div className="flex items-center gap-5 mb-4 text-muted-foreground">
          <button
            onClick={() => handleLike(post)}
            className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
          >
            <Heart className="w-5 h-5" />
            Curtir
          </button>
          <button
            className="flex items-center gap-2 hover:text-foreground transition-colors"
            title="Comentar"
            type="button"
          >
            <MessageSquare className="w-5 h-5" />
            Mensagem
          </button>
          <button
            className="flex items-center gap-2 hover:text-foreground transition-colors"
            title="Enviar"
            type="button"
          >
            <Send className="w-5 h-5" />
            Enviar
          </button>
        </div>

        {/* Comentários */}
        <div className="mt-2 space-y-2">
          {post.comments?.map(c => (
            <div key={c.id} className="text-sm text-foreground">
              <span className="font-semibold">{c.username}: </span>{c.text}
            </div>
          ))}
          <CommentInput postId={post.id} addComment={handleAddComment} />
        </div>
      </div>
    </div>
  );
}
