import React from "react";
import { Heart, MessageSquare } from "lucide-react";
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
    <div className="p-4 rounded-xl shadow-md bg-background">
      <div className="flex items-center justify-between mb-2">
        <span className="font-semibold">{post.username}</span>
        <span className="text-sm text-muted-foreground">{post.likes} likes</span>
      </div>
      <p className="mb-2 whitespace-pre-wrap">{post.content}</p>
      {post.image_url && (
        <img src={post.image_url} alt="post" className="mb-2 rounded-md max-h-72 object-cover w-full" />
      )}
      <div className="flex items-center gap-4 mb-2">
        <button onClick={() => handleLike(post)} className="flex items-center gap-1 text-red-500">
          <Heart className="w-4 h-4" /> Curtir
        </button>
      </div>

      {/* Comentários */}
      <div className="mt-2 space-y-2">
        {post.comments?.map(c => (
          <div key={c.id} className="text-sm">
            <span className="font-semibold">{c.username}: </span>{c.text}
          </div>
        ))}
        <CommentInput postId={post.id} addComment={handleAddComment} />
      </div>
    </div>
  );
}
