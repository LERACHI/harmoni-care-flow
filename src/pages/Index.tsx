import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Users, ShoppingBag, MessageCircle, Sparkles, Shield } from "lucide-react";
import heroImage from "@/assets/hero-illustration.jpg";
import { NavLink } from "@/components/NavLink";

const Index = () => {
  const features = [
    {
      icon: Users,
      title: "Terapeutas Qualificados",
      description: "Conecte-se com profissionais especializados em terapias integrativas",
    },
    {
      icon: MessageCircle,
      title: "Chat em Tempo Real",
      description: "Comunicação direta e segura com seu terapeuta",
    },
    {
      icon: ShoppingBag,
      title: "Loja Completa",
      description: "Produtos e serviços para seu bem-estar integral",
    },
    {
      icon: Sparkles,
      title: "Conteúdos Exclusivos",
      description: "Vídeos, artigos e materiais para sua jornada de autoconhecimento",
    },
    {
      icon: Shield,
      title: "Ambiente Seguro",
      description: "Privacidade e cuidado em cada interação",
    },
    {
      icon: Heart,
      title: "Cuidado Personalizado",
      description: "Cada pessoa é única, e seu tratamento também",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 leading-tight">
                Conectando Cuidado,{" "}
                <span className="bg-gradient-to-r from-primary via-harmonize to-accent bg-clip-text text-transparent">
                  Inspirando Equilíbrio
                </span>
              </h1>
              <p className="text-lg text-muted-foreground mb-2">
                Empowering Well-Being for Everyone
              </p>
              <p className="text-sm italic text-muted-foreground/80 mb-8">
                Seu caminho para o bem-estar integrado
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-primary to-harmonize hover:opacity-90 text-white shadow-lg"
                  asChild
                >
                  <NavLink to="/therapists">Encontrar Terapeuta</NavLink>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <NavLink to="/shop">Explorar Loja</NavLink>
                </Button>
              </div>
            </div>

            <div className="animate-fade-in">
              <img
                src={heroImage}
                alt="Bem-estar e harmonia"
                className="w-full h-auto rounded-3xl shadow-2xl animate-float"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Uma plataforma completa para sua jornada
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Tudo o que você precisa para seu bem-estar integral em um só lugar
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border-2 hover:border-primary/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-harmonize/20 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary/10 via-harmonize/10 to-accent/10">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Pronto para começar sua jornada?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de pessoas que já encontraram equilíbrio e bem-estar através da HarmoniCare
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-primary to-harmonize hover:opacity-90 text-white shadow-lg"
          >
            Começar Agora
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
