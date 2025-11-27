import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

interface Props {
  handlePost: (content: string, image: File | null) => void;
  uploading: boolean;
}

export default function NewPostForm({ handlePost, uploading }: Props) {
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const onSubmit = () => {
    handlePost(content, image);
    setContent("");
    setImage(null);
  };

  return (
    <div className="mb-8 p-6 rounded-2xl bg-white shadow-xl shadow-primary/15 border border-primary/10 space-y-3">
      <textarea
        className="w-full p-3 border border-muted rounded-lg bg-white mb-2 resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40"
        placeholder="Compartilhe algo com a comunidade..."
        value={content}
        onChange={e => setContent(e.target.value)}
      />
      {image && (
        <img
          src={URL.createObjectURL(image)}
          alt="preview"
          className="mb-2 max-h-48 object-cover rounded-md"
        />
      )}
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 cursor-pointer text-sm text-muted-foreground hover:text-foreground">
          <Upload className="w-4 h-4" />
          Adicionar imagem
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={e => e.target.files && setImage(e.target.files[0])}
          />
        </label>
        <Button onClick={onSubmit} disabled={uploading} className="shadow-lg shadow-primary/25">
          {uploading ? "Enviando..." : "Postar"}
        </Button>
      </div>
    </div>
  );
}
