import { Message } from '@/hooks/useChat';
import { FileText, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MessageBubbleProps {
  message: Message;
  isCurrentUser: boolean;
}

const MessageBubble = ({ message, isCurrentUser }: MessageBubbleProps) => {
  const formatTime = (date: string) => {
    return new Date(date).toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const renderContent = () => {
    switch (message.message_type) {
      case 'image':
        return (
          <div className="space-y-2">
            <img
              src={message.file_url!}
              alt={message.file_name || 'Imagem'}
              className="rounded-lg max-w-sm w-full"
            />
            {message.content && <p className="text-sm">{message.content}</p>}
          </div>
        );

      case 'video':
        return (
          <div className="space-y-2">
            <video
              src={message.file_url!}
              controls
              className="rounded-lg max-w-sm w-full"
            />
            {message.content && <p className="text-sm">{message.content}</p>}
          </div>
        );

      case 'pdf':
      case 'file':
        return (
          <div className="space-y-2">
            <div className="flex items-center gap-2 p-3 bg-background/50 rounded-lg">
              <FileText className="w-5 h-5" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  {message.file_name}
                </p>
                {message.file_size && (
                  <p className="text-xs text-muted-foreground">
                    {(message.file_size / 1024 / 1024).toFixed(2)} MB
                  </p>
                )}
              </div>
              <Button
                variant="ghost"
                size="icon"
                asChild
              >
                <a
                  href={message.file_url!}
                  download={message.file_name || undefined}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Download className="w-4 h-4" />
                </a>
              </Button>
            </div>
            {message.content && <p className="text-sm">{message.content}</p>}
          </div>
        );

      default:
        return <p className="text-sm">{message.content}</p>;
    }
  };

  return (
    <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[70%] rounded-2xl p-3 ${
          isCurrentUser
            ? 'bg-gradient-to-r from-primary to-harmonize text-white'
            : 'bg-muted'
        }`}
      >
        {renderContent()}
        <span
          className={`text-xs mt-1 block ${
            isCurrentUser ? 'text-white/70' : 'text-muted-foreground'
          }`}
        >
          {formatTime(message.created_at)}
        </span>
      </div>
    </div>
  );
};

export default MessageBubble;
