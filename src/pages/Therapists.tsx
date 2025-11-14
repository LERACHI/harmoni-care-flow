import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Calendar } from "lucide-react";

const Therapists = () => {
  const therapists = [
    {
      id: 1,
      name: "Ana Silva",
      specialty: "Reiki & Meditação",
      location: "São Paulo, SP",
      rating: 4.9,
      reviews: 127,
      description: "Especialista em terapias energéticas com mais de 10 anos de experiência",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    },
    {
      id: 2,
      name: "Carlos Mendes",
      specialty: "Acupuntura & Fitoterapia",
      location: "Rio de Janeiro, RJ",
      rating: 4.8,
      reviews: 98,
      description: "Mestre em medicina tradicional chinesa e terapias naturais",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    },
    {
      id: 3,
      name: "Mariana Costa",
      specialty: "Aromaterapia & Massagem",
      location: "Belo Horizonte, MG",
      rating: 5.0,
      reviews: 156,
      description: "Terapeuta holística certificada em diversas modalidades",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    },
    {
      id: 4,
      name: "João Santos",
      specialty: "Yoga & Ayurveda",
      location: "Curitiba, PR",
      rating: 4.9,
      reviews: 89,
      description: "Instrutor de yoga e consultor ayurvédico com formação na Índia",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    },
    {
      id: 5,
      name: "Patricia Lima",
      specialty: "Terapia Floral & Cromoterapia",
      location: "Porto Alegre, RS",
      rating: 4.7,
      reviews: 72,
      description: "Especialista em essências florais e terapias vibracionais",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
    },
    {
      id: 6,
      name: "Roberto Alves",
      specialty: "Reflexologia & Shiatsu",
      location: "Brasília, DF",
      rating: 4.8,
      reviews: 104,
      description: "Terapeuta corporal com técnicas orientais e ocidentais",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1 pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12 animate-slide-up">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              Nossos <span className="bg-gradient-to-r from-primary to-harmonize bg-clip-text text-transparent">Terapeutas</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Profissionais qualificados prontos para guiar sua jornada de bem-estar
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {therapists.map((therapist, index) => (
              <Card
                key={therapist.id}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={therapist.image}
                    alt={therapist.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <CardTitle className="text-xl mb-1">{therapist.name}</CardTitle>
                      <Badge variant="secondary" className="mb-2">
                        {therapist.specialty}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-accent text-accent" />
                      <span className="font-semibold">{therapist.rating}</span>
                      <span>({therapist.reviews})</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{therapist.location}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{therapist.description}</p>
                  <div className="flex gap-2">
                    <Button className="flex-1 bg-gradient-to-r from-primary to-harmonize hover:opacity-90">
                      Ver Perfil
                    </Button>
                    <Button variant="outline" size="icon">
                      <Calendar className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Therapists;
