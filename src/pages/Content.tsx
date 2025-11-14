import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Play, FileText, Image, Calendar } from "lucide-react";

const Content = () => {
  const videos = [
    {
      id: 1,
      title: "Introdução à Meditação Mindfulness",
      duration: "15:30",
      category: "Meditação",
      thumbnail: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=300&fit=crop",
    },
    {
      id: 2,
      title: "Técnicas de Respiração para Ansiedade",
      duration: "10:45",
      category: "Bem-estar",
      thumbnail: "https://images.unsplash.com/photo-1545389336-cf090694435e?w=400&h=300&fit=crop",
    },
    {
      id: 3,
      title: "Yoga para Iniciantes",
      duration: "25:00",
      category: "Yoga",
      thumbnail: "https://images.unsplash.com/photo-1588286840104-8957b019727f?w=400&h=300&fit=crop",
    },
  ];

  const articles = [
    {
      id: 1,
      title: "Os Benefícios da Aromaterapia",
      date: "12 Nov 2024",
      category: "Aromaterapia",
      excerpt: "Descubra como os óleos essenciais podem transformar seu bem-estar...",
    },
    {
      id: 2,
      title: "Guia Completo de Autocuidado",
      date: "10 Nov 2024",
      category: "Autocuidado",
      excerpt: "Práticas diárias para nutrir corpo, mente e espírito...",
    },
    {
      id: 3,
      title: "Medicina Tradicional Chinesa: Uma Visão Holística",
      date: "08 Nov 2024",
      category: "MTC",
      excerpt: "Entenda os princípios milenares da medicina chinesa...",
    },
  ];

  const images = [
    {
      id: 1,
      title: "Pontos de Acupuntura",
      category: "Acupuntura",
      url: "https://images.unsplash.com/photo-1519824145371-296894a0daa9?w=400&h=300&fit=crop",
    },
    {
      id: 2,
      title: "Chakras e Energia",
      category: "Energia",
      url: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop",
    },
    {
      id: 3,
      title: "Plantas Medicinais",
      category: "Fitoterapia",
      url: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=300&fit=crop",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1 pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12 animate-slide-up">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              Meus <span className="bg-gradient-to-r from-primary to-harmonize bg-clip-text text-transparent">Conteúdos</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Seu acervo pessoal de materiais e recursos para sua jornada
            </p>
          </div>

          <Tabs defaultValue="videos" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="videos">Vídeos</TabsTrigger>
              <TabsTrigger value="articles">Artigos</TabsTrigger>
              <TabsTrigger value="images">Imagens</TabsTrigger>
            </TabsList>

            <TabsContent value="videos">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.map((video, index) => (
                  <Card
                    key={video.id}
                    className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="relative aspect-video overflow-hidden group">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          size="lg"
                          className="rounded-full bg-white text-primary hover:bg-white/90"
                        >
                          <Play className="w-6 h-6" />
                        </Button>
                      </div>
                      <Badge className="absolute top-4 right-4 bg-accent">
                        {video.duration}
                      </Badge>
                    </div>
                    <CardHeader>
                      <Badge variant="secondary" className="w-fit mb-2">
                        {video.category}
                      </Badge>
                      <CardTitle className="text-lg">{video.title}</CardTitle>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="articles">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map((article, index) => (
                  <Card
                    key={article.id}
                    className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary">{article.category}</Badge>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          <span>{article.date}</span>
                        </div>
                      </div>
                      <CardTitle className="text-lg mb-2">{article.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">{article.excerpt}</p>
                      <Button variant="outline" className="w-full">
                        <FileText className="w-4 h-4 mr-2" />
                        Ler Artigo
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="images">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {images.map((image, index) => (
                  <Card
                    key={image.id}
                    className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="aspect-video overflow-hidden group">
                      <img
                        src={image.url}
                        alt={image.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <CardHeader>
                      <Badge variant="secondary" className="w-fit mb-2">
                        {image.category}
                      </Badge>
                      <CardTitle className="text-lg">{image.title}</CardTitle>
                      <Button variant="outline" size="sm" className="mt-2">
                        <Image className="w-4 h-4 mr-2" />
                        Ver Imagem
                      </Button>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Content;
