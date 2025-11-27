import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, FileText, Image, ListFilter, Play, UserRound } from "lucide-react";

import AspargoImage from "@/assets/CremeAspargos.jpeg";
import BrocolisImage from "@/assets/Brocolis.jpeg";
import CalmaBarriga from "@/assets/CalmaBarriga.jpeg";
import GoldMilkImage from "@/assets/LeiteDourado.jpeg";
import KaphaImage from "@/assets/Kapha.jpeg";
import KitchiriImage from "@/assets/Kitchiri.jpeg";
import LegumesImage from "@/assets/legumes.jpeg";
import TomilhoImage from "@/assets/Tomilho.jpeg";
import cuidadoMatinalImage from "@/assets/cuidadoMatinal.jpeg";
import FitoImuneImage from "@/assets/FitoImune.jpeg";
import MantraProfundoImage from "@/assets/MantraProfundo.jpeg";
import MedChineImage from "@/assets/MedChine.jpeg";
import RotinaPraiImage from "@/assets/RotinaPrai.jpeg";
import AromaImage from "@/assets/oleo.jpeg";


const categoryOptions = [
  "Alquimia",
  "Nutrição",
  "Yoga",
  "Meditação",
  "Mantra",
  "Aromaterapia",
  "Autocuidado",
  "Fitoterapia",
  "Energia",
  "MTC",
];

const videos = [
  {
    id: 1,
    title: "Introdução à Meditação Mindfulness",
    duration: "15:30",
    category: "Meditação",
    author: "Ana Silva",
    thumbnail:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=300&fit=crop",
    url: "https://www.youtube.com/shorts/tdwCpcdH8Mo",
  },
  {
    id: 2,
    title: "Técnicas de Respiração para Ansiedade",
    duration: "10:45",
    category: "Autocuidado",
    author: "Mariana Costa",
    thumbnail:
      "https://images.unsplash.com/photo-1545389336-cf090694435e?w=400&h=300&fit=crop",
    url: "https://www.youtube.com/watch?v=udpZlYnV9tQ",
  },
  {
    id: 3,
    title: "Yoga para Iniciantes",
    duration: "25:00",
    category: "Yoga",
    author: "João Santos",
    thumbnail:
      "https://images.unsplash.com/photo-1588286840104-8957b019727f?w=400&h=300&fit=crop",
    url: "https://www.youtube.com/shorts/Jz_TAmjlotU",
  },
  {
    id: 4,
    title: "Mantras para Relaxamento Profundo",
    duration: "12:10",
    category: "Mantra",
    author: "Patricia Lima",
    thumbnail:
      MantraProfundoImage,
    url: "https://www.youtube.com/watch?v=hTWURyd-6rM",
  },
  {
    id: 5,
    title: "Rotina Energizante com Pranayama",
    duration: "08:50",
    category: "Energia",
    author: "Carlos Mendes",
    thumbnail:
      RotinaPraiImage,
    url: "https://www.youtube.com/shorts/8wvfb6-3ecg",
  },
];

const articles = [
  {
    id: 1,
    title: "Os Benefícios da Aromaterapia no Dia a Dia",
    date: "12 Nov 2024",
    category: "Aromaterapia",
    author: "Mariana Costa",
    excerpt: "Descubra como óleos essenciais podem transformar sua rotina de forma segura e prática.",
    image: AromaImage,
    body: [
      "A aromaterapia utiliza óleos essenciais para equilibrar emoções, apoiar o sistema imunológico e melhorar o sono. Uma simples difusão noturna pode sinalizar ao corpo que é hora de desacelerar.",
      "Para começar, escolha óleos suaves como lavanda, laranja-doce ou camomila. Difunda por 20–30 minutos em um ambiente ventilado e observe como o aroma muda seu estado interno.",
      "Integre no autocuidado diário: pingue duas gotas em um lenço para respirações profundas, faça um escalda-pés com 5 gotas diluídas em sal ou finalize o banho com 2 gotas no chão do box, deixando o vapor trazer a fragrância.",
    ],
  },
  {
    id: 2,
    title: "Guia Completo de Autocuidado Matinal",
    date: "10 Nov 2024",
    category: "Autocuidado",
    author: "Ana Silva",
    excerpt: "Pequenos rituais para acordar com clareza, foco e compaixão por si mesma.",
    image: cuidadoMatinalImage,
    body: [
      "Um despertar consciente começa antes de sair da cama: três respirações profundas, alongamento suave e uma intenção para o dia criam um marcador mental positivo.",
      "Hidratação e movimento leve despertam o metabolismo. Experimente água morna com limão e 5 minutos de mobilidade articular para lubrificar as juntas.",
      "Finalize com um ritual âncora: escrever três gratidões, preparar um café ou chá consciente, ou ouvir uma playlist tranquila. O segredo é constância e gentileza com o próprio ritmo.",
    ],
  },
  {
    id: 3,
    title: "Fitoterapia para Imunidade",
    date: "08 Nov 2024",
    category: "Fitoterapia",
    author: "Carlos Mendes",
    excerpt: "Conheça plantas e combinações que fortalecem o sistema imune de forma natural.",
    image: FitoImuneImage,
    body: [
      "Plantas como equinácea, gengibre e tomilho oferecem suporte imunológico por meio de compostos anti-inflamatórios e antimicrobianos.",
      "Uma infusão clássica: gengibre fresco com tomilho e mel, 10 minutos em água quente. Tome ao longo do dia para aliviar garganta e apoiar vias respiratórias.",
      "Para manutenção, rotacione chás de camomila, hortelã e rooibos. Consulte um profissional para dosagens seguras, especialmente se usar medicamentos ou estiver gestante.",
    ],
  },
  {
    id: 4,
    title: "Equilíbrio de Energia na Medicina Tradicional Chinesa",
    date: "05 Nov 2024",
    category: "MTC",
    author: "Roberto Alves",
    excerpt: "Os pilares da MTC para harmonizar corpo e mente nas estações do ano.",
    image: MedChineImage,
    body: [
      "A MTC observa o fluxo de Qi pelos meridianos e adapta rotinas às estações. Primavera pede leveza; inverno, aquecimento e recolhimento.",
      "Integre alimentação sazonal: sopas ricas no frio, folhas verdes e brotos na primavera. Alongamentos matinais ajudam a destravar o Qi estagnado.",
      "Práticas como acupressão em pontos de relaxamento (IG4, VC17) e respiração diafragmática alinham energia e acalmam o sistema nervoso.",
    ],
  },
  {
    id: 5,
    title: "Alquimia das Especiarias na Cozinha",
    date: "02 Nov 2024",
    category: "Alquimia",
    author: "Patricia Lima",
    excerpt: "Como combinar temperos para potencializar sabor, vitalidade e digestão.",
    image: LegumesImage,
    body: [
      "Especiarias equilibram sabor e digestão: cúrcuma e pimenta-do-reino ativam circulação; cominho e coentro aliviam inchaço; cardamomo suaviza acidez.",
      "Monte bases aromáticas: refogue gengibre, cúrcuma e alho-poró para caldos; use garam masala no final das preparações para manter volatilidade dos óleos.",
      "Crie blends pessoais: doce (canela, cardamomo, baunilha) para bebidas; cítrico (coentro, limão, alecrim) para saladas; quente (páprica, pimenta, mostarda) para legumes assados.",
    ],
  },
];

const recipes = [
  {
    id: 1,
    title: "Leite Dourado Anti-inflamatório",
    category: "Nutrição",
    author: "Ana Silva",
    url: GoldMilkImage,
  },
  {
    id: 2,
    title: 'Infusão "Calma-Barriga"',
    category: "Fitoterapia",
    author: "Mariana Costa",
    url: CalmaBarriga,
  },
  {
    id: 3,
    title: "Xarope de Tomilho e Gengibre",
    category: "Fitoterapia",
    author: "Carlos Mendes",
    url: TomilhoImage,
  },
  {
    id: 4,
    title: "Creme de Aspargos Reconfortante",
    category: "Nutrição",
    author: "Patricia Lima",
    url: AspargoImage,
  },
  {
    id: 5,
    title: "Brócolis, Couve-flor e Cenoura ao Vapor",
    category: "Nutrição",
    author: "Roberto Alves",
    url: BrocolisImage,
  },
  {
    id: 6,
    title: "Kapha Ayurvédico Detox",
    category: "Energia",
    author: "João Santos",
    url: KaphaImage,
  },
  {
    id: 7,
    title: "Kitchiri Ayurvédico Nutritivo",
    category: "Nutrição",
    author: "Ana Silva",
    url: KitchiriImage,
  },
  {
    id: 8,
    title: "Legumes Picantes com Especiarias",
    category: "Alquimia",
    author: "Carlos Mendes",
    url: LegumesImage,
  },
];

const Content = () => {
  const [activeTab, setActiveTab] = useState("videos");
  const [selectedCategory, setSelectedCategory] = useState("todas");
  const [selectedAuthor, setSelectedAuthor] = useState("todos");
  const [selectedArticle, setSelectedArticle] = useState<typeof articles[number] | null>(null);

  const baseContent = useMemo(() => {
    if (activeTab === "articles") return articles;
    if (activeTab === "recipes") return recipes;
    return videos;
  }, [activeTab]);

  const availableAuthors = useMemo(
    () => Array.from(new Set(baseContent.map((item) => item.author))),
    [baseContent],
  );

  const filterContent = <T extends { category: string; author: string }>(items: T[]) =>
    items.filter(
      (item) =>
        (selectedCategory === "todas" || item.category === selectedCategory) &&
        (selectedAuthor === "todos" || item.author === selectedAuthor),
    );

  const filteredVideos = useMemo(() => filterContent(videos), [selectedCategory, selectedAuthor]);
  const filteredArticles = useMemo(() => filterContent(articles), [selectedCategory, selectedAuthor]);
  const filteredRecipes = useMemo(() => filterContent(recipes), [selectedCategory, selectedAuthor]);

  const resetFilters = () => {
    setSelectedCategory("todas");
    setSelectedAuthor("todos");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1 pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12 animate-slide-up">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              Meus{" "}
              <span className="bg-gradient-to-r from-primary to-harmonize bg-clip-text text-transparent">
                Conteúdos
              </span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Seu acervo pessoal de materiais e recursos para sua jornada
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="videos">Vídeos</TabsTrigger>
              <TabsTrigger value="articles">Artigos</TabsTrigger>
              <TabsTrigger value="recipes">Receitas</TabsTrigger>
            </TabsList>

            <div className="mb-10 space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <ListFilter className="w-4 h-4" />
                <span>Refine o que deseja ver por categoria ou pelo terapeuta responsável.</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full bg-white text-foreground shadow-sm">
                    <SelectValue placeholder="Filtrar por categoria" />
                  </SelectTrigger>
                  <SelectContent position="popper" sideOffset={6} className="max-h-64">
                    <SelectItem value="todas">Todas as categorias</SelectItem>
                    {categoryOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedAuthor} onValueChange={setSelectedAuthor}>
                  <SelectTrigger className="w-full bg-white text-foreground shadow-sm">
                    <SelectValue placeholder="Filtrar por autor" />
                  </SelectTrigger>
                  <SelectContent position="popper" sideOffset={6} className="max-h-64">
                    <SelectItem value="todos">Todos os autores</SelectItem>
                    {availableAuthors.map((author) => (
                      <SelectItem key={author} value={author}>
                        {author}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button
                  variant="outline"
                  className="bg-white text-foreground hover:bg-white/90 shadow-sm border"
                  onClick={resetFilters}
                >
                  Limpar filtros
                </Button>
              </div>
            </div>

            <TabsContent value="videos">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredVideos.map((video, index) => (
                  <Card
                    key={video.id}
                    className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="relative aspect-video overflow-hidden group">
                      <Link to={video.url} target="_blank" rel="noreferrer">
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button size="lg" className="rounded-full bg-white text-primary hover:bg-white/90">
                            <Play className="w-6 h-6" />
                          </Button>
                        </div>
                        <Badge className="absolute top-4 right-4 bg-accent">{video.duration}</Badge>
                      </Link>
                    </div>
                    <CardHeader>
                      <Badge variant="secondary" className="w-fit mb-2">
                        {video.category}
                      </Badge>
                      <CardTitle className="text-lg">{video.title}</CardTitle>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <UserRound className="w-4 h-4" />
                        <span>{video.author}</span>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="articles">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArticles.map((article, index) => (
                  <Card
                    key={article.id}
                    className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="h-44 overflow-hidden rounded-t-xl">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary">{article.category}</Badge>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          <span>{article.date}</span>
                        </div>
                      </div>
                      <CardTitle className="text-lg mb-2">{article.title}</CardTitle>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <UserRound className="w-4 h-4" />
                        <span>{article.author}</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">{article.excerpt}</p>
                      <Button variant="outline" className="w-full" onClick={() => setSelectedArticle(article)}>
                        <FileText className="w-4 h-4 mr-2" />
                        Ler Artigo
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="recipes">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRecipes.map((recipe, index) => (
                  <Card
                    key={recipe.id}
                    className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="aspect-video overflow-hidden group">
                      <img
                        src={recipe.url}
                        alt={recipe.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <CardHeader>
                      <Badge variant="secondary" className="w-fit mb-2">
                        {recipe.category}
                      </Badge>
                      <CardTitle className="text-lg">{recipe.title}</CardTitle>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <UserRound className="w-4 h-4" />
                        <span>{recipe.author}</span>
                      </div>
                      <Button asChild variant="outline" size="sm" className="mt-2">
                        <Link to={`/receita/${recipe.id}`}>
                          <Image className="w-4 h-4 mr-2" />
                          Ver Receita
                        </Link>
                      </Button>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <Dialog open={!!selectedArticle} onOpenChange={() => setSelectedArticle(null)}>
            <DialogContent className="max-w-3xl">
              {selectedArticle && (
                <>
                  <div className="overflow-hidden rounded-2xl mb-4">
                    <img
                      src={selectedArticle.image}
                      alt={selectedArticle.title}
                      className="w-full h-64 object-cover"
                    />
                  </div>
                  <DialogHeader className="space-y-2">
                    <DialogTitle className="text-2xl">{selectedArticle.title}</DialogTitle>
                    <DialogDescription className="flex items-center gap-3 text-sm">
                      <Badge variant="secondary">{selectedArticle.category}</Badge>
                      <span className="text-muted-foreground flex items-center gap-1">
                        <Calendar className="w-4 h-4" /> {selectedArticle.date}
                      </span>
                      <span className="text-muted-foreground flex items-center gap-1">
                        <UserRound className="w-4 h-4" /> {selectedArticle.author}
                      </span>
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 text-muted-foreground leading-relaxed">
                    <p className="text-base text-foreground font-medium">
                      {selectedArticle.excerpt}
                    </p>
                    {selectedArticle.body.map((paragraph, idx) => (
                      <p key={idx}>{paragraph}</p>
                    ))}
                  </div>
                </>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Content;
