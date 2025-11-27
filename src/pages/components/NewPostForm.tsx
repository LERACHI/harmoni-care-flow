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
    <div className="mb-8 p-4 rounded-xl shadow-md bg-background">
      <textarea
        className="w-full p-3 border rounded-md mb-2 resize-none"
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
        <label className="flex items-center gap-2 cursor-pointer text-sm text-muted-foreground">
          <Upload className="w-4 h-4" />
          Adicionar imagem
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={e => e.target.files && setImage(e.target.files[0])}
          />
        </label>
        <Button onClick={onSubmit} disabled={uploading}>
          {uploading ? "Enviando..." : "Postar"}
        </Button>
      </div>
    </div>
  );
}
