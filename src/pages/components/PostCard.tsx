import React from "react";
import { Bookmark, Heart, MessageCircle, Send } from "lucide-react";
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
  const commentCount = post.comments?.length ?? 0;

  return (
    <div className="relative overflow-hidden rounded-3xl border border-muted/30 bg-white shadow-xl shadow-primary/15">
      <div className="flex items-center justify-between px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-primary/90 via-primary to-primary/70 text-white font-semibold uppercase">
            {post.username.charAt(0)}
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-semibold text-foreground">{post.username}</span>
            <span className="text-xs text-muted-foreground">Comunidade HarmoniCare</span>
          </div>
        </div>
        <div className="text-xs rounded-full bg-primary/10 px-3 py-1 text-primary font-semibold uppercase tracking-wide">
          Novo
        </div>
      </div>

      {post.content && (
        <p className="px-5 pb-3 whitespace-pre-wrap text-foreground leading-relaxed">{post.content}</p>
      )}

      {post.image_url && (
        <div className="overflow-hidden border-y border-muted/20 bg-black/5">
          <img
            src={post.image_url}
            alt="post"
            className="w-full max-h-[520px] object-cover transition-transform duration-300 hover:scale-[1.02]"
          />
        </div>
      )}

      <div className="flex items-center justify-between px-5 py-3 border-b border-muted/20 bg-gradient-to-r from-white via-white to-primary/5">
        <div className="flex items-center gap-5 text-foreground">
          <button
            onClick={() => handleLike(post)}
            className="group flex items-center gap-2 font-semibold hover:text-primary transition-colors"
          >
            <Heart className="w-6 h-6 transition-transform group-hover:scale-110" />
            <span className="text-sm">{post.likes}</span>
          </button>
          <button
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            title="Mensagens"
            type="button"
          >
            <MessageCircle className="w-6 h-6" />
            <span className="text-sm font-semibold text-foreground">{commentCount}</span>
          </button>
          <button
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            title="Compartilhar"
            type="button"
          >
            <Send className="w-6 h-6" />
          </button>
        </div>
        <button
          className="text-muted-foreground hover:text-foreground transition-colors"
          title="Salvar"
          type="button"
        >
          <Bookmark className="w-6 h-6" />
        </button>
      </div>

      <div className="px-5 py-4 space-y-2">
        {post.comments?.map(c => (
          <div key={c.id} className="text-sm text-foreground">
            <span className="font-semibold">{c.username}: </span>{c.text}
          </div>
        ))}
        <CommentInput postId={post.id} addComment={handleAddComment} />
      </div>
    </div>
  );
}
