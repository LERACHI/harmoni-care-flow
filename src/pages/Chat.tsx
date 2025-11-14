import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, Paperclip, Image as ImageIcon, Video as VideoIcon, FileText } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useChat } from "@/hooks/useChat";
import { useFileUpload } from "@/hooks/useFileUpload";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import MessageBubble from "@/components/chat/MessageBubble";
import FileUploadProgress from "@/components/chat/FileUploadProgress";

const Chat = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [message, setMessage] = useState("");
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const { messages, loading, sendMessage } = useChat(conversationId);
  const { uploadFile, uploadProgress } = useFileUpload();

  // Redirect to auth if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      toast({
        title: "Autenticação necessária",
        description: "Faça login para acessar o chat",
        variant: "destructive",
      });
      navigate('/auth');
    }
  }, [user, authLoading, navigate, toast]);

  // Get current user and create/get conversation
  useEffect(() => {
    if (!user) return;

    const initChat = async () => {
      setCurrentUserId(user.id);

      // For demo purposes, create or get a conversation
      const { data: existingConversations } = await supabase
        .from('conversation_participants')
        .select('conversation_id')
        .eq('user_id', user.id)
        .limit(1);

      if (existingConversations && existingConversations.length > 0) {
        setConversationId(existingConversations[0].conversation_id);
      } else {
        // Create new conversation
        const { data: newConversation } = await supabase
          .from('conversations')
          .insert({})
          .select()
          .single();

        if (newConversation) {
          await supabase.from('conversation_participants').insert({
            conversation_id: newConversation.id,
            user_id: user.id,
          });
          setConversationId(newConversation.id);
        }
      }
    };

    initChat();
  }, [user]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    await sendMessage(message, 'text');
    setMessage("");
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    for (const file of Array.from(files)) {
      const result = await uploadFile(file);
      if (result) {
        await sendMessage(null, result.messageType, result.url, file.name, file.size);
      }
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1 pt-24 pb-16 px-4">
        <div className="container mx-auto h-[calc(100vh-200px)]">
          <div className="text-center mb-8 animate-slide-up">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              <span className="bg-gradient-to-r from-primary to-harmonize bg-clip-text text-transparent">Chat</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Converse com seus terapeutas de forma segura e privada
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 h-[600px]">
            {/* Conversas - Placeholder for future implementation */}
            <Card className="md:col-span-1 overflow-hidden">
              <CardHeader className="border-b">
                <CardTitle>Conversas</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground text-center">
                  Sistema de conversas em desenvolvimento
                </p>
              </CardContent>
            </Card>

            {/* Mensagens */}
            <Card className="md:col-span-2 flex flex-col overflow-hidden">
              <CardHeader className="border-b flex-shrink-0">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>HC</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">Chat HarmoniCare</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {loading ? 'Carregando...' : 'Online'}
                    </p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                {loading && (
                  <p className="text-center text-muted-foreground">
                    Carregando mensagens...
                  </p>
                )}
                
                {!loading && messages.length === 0 && (
                  <p className="text-center text-muted-foreground">
                    Nenhuma mensagem ainda. Comece a conversar!
                  </p>
                )}

                {messages.map((msg) => (
                  <MessageBubble
                    key={msg.id}
                    message={msg}
                    isCurrentUser={msg.sender_id === currentUserId}
                  />
                ))}
                <div ref={messagesEndRef} />
              </CardContent>

              <div className="border-t p-4 flex-shrink-0">
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  onChange={handleFileUpload}
                  accept="image/*,video/*,application/pdf"
                  multiple
                />
                
                <FileUploadProgress uploads={uploadProgress} />
                
                <div className="flex gap-2 mb-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => fileInputRef.current?.click()}
                    title="Anexar arquivo"
                  >
                    <Paperclip className="w-5 h-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      if (fileInputRef.current) {
                        fileInputRef.current.accept = 'image/*';
                        fileInputRef.current.click();
                      }
                    }}
                    title="Enviar imagem"
                  >
                    <ImageIcon className="w-5 h-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      if (fileInputRef.current) {
                        fileInputRef.current.accept = 'video/*';
                        fileInputRef.current.click();
                      }
                    }}
                    title="Enviar vídeo"
                  >
                    <VideoIcon className="w-5 h-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      if (fileInputRef.current) {
                        fileInputRef.current.accept = 'application/pdf';
                        fileInputRef.current.click();
                      }
                    }}
                    title="Enviar PDF"
                  >
                    <FileText className="w-5 h-5" />
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Digite sua mensagem..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1"
                    disabled={!conversationId}
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!message.trim() || !conversationId}
                    className="bg-gradient-to-r from-primary to-harmonize hover:opacity-90"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Chat;
