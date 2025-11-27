import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

interface Props {
  postId: number;
  addComment: (postId: number, text: string) => void;
}

export default function CommentInput({ postId, addComment }: Props) {
  const [text, setText] = useState("");

  const handleSend = () => {
    addComment(postId, text);
    setText("");
  };

  return (
    <div className="flex gap-2 mt-1">
      <input
        type="text"
        placeholder="Comente..."
        value={text}
        onChange={e => setText(e.target.value)}
        className="flex-1 p-2 border rounded-md text-sm"
      />
      <Button size="sm" onClick={handleSend}>
        <MessageSquare className="w-4 h-4" />
      </Button>
    </div>
  );
}
