import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Heart,
  Users,
  ShoppingBag,
  Sparkles,
  Shield,
  Users2Icon,
  Briefcase,
  Target,
  TrendingUp,
  Award,
  Globe,
  Stethoscope,
} from "lucide-react";
import heroImage from "@/assets/hero-illustration.jpg";
import { NavLink } from "@/components/NavLink";
import QuestionarioDiagnostico from "@/components/diagnosticos/QuestionarioDiagnostico";

const features = [
  {
    icon: Users,
    title: "Terapeutas Qualificados",
    description: "Conecte-se com profissionais especializados em terapias integrativas",
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
  {
    icon: Users2Icon,
    title: "Faça parte da nossa Comunidade",
    description:
      "Um espaço para terapeutas, pacientes e colaboradores crescerem juntos, compartilharem vivências e promoverem o bem-estar.",
  },
  {
    icon: Stethoscope,
    title: "Encontre Seu Equilíbrio",
    description:
      "Responda ao nosso questionário para receber uma análise preliminar do seu bem-estar.",
  },
];

const values = [
  {
    icon: Heart,
    title: "Cuidado Integral",
    description: "Tratamento holístico que considera corpo, mente e espírito como um todo integrado.",
  },
  {
    icon: Users,
    title: "Comunidade",
    description: "Uma rede de apoio onde terapeutas e pacientes se conectam de forma genuína.",
  },
  {
    icon: Target,
    title: "Excelência",
    description: "Profissionais qualificados e comprometidos com resultados reais e mensuráveis.",
  },
  {
    icon: Shield,
    title: "Segurança",
    description: "Ambiente seguro, privado e acolhedor para todas as interações.",
  },
  {
    icon: Sparkles,
    title: "Transformação",
    description: "Facilitamos jornadas de autoconhecimento e crescimento pessoal sustentável.",
  },
  {
    icon: Globe,
    title: "Acessibilidade",
    description: "Democratizamos o acesso a terapias integrativas através da tecnologia.",
  },
  {
    icon: Briefcase,
    title: "Cultive o Bem-Estar",
    description: "Oferecemos um espaço onde você também pode crescer, nutrir-se e florescer.",
  },
];

const team = [
  {
    name: "Selma Vilella Maia",
    role: "Fundadora",
    description: "Terapeuta integrativa apaixonada por conectar pessoas ao bem-estar com acolhimento e excelência.",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Hero principal da home */}
      <section className="pt-24 pb-16 px-4 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 leading-tight">
                Conectando Cuidado,{" "}
                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-solid">
                  Inspirando Equilíbrio
                </span>
              </h1>
              <p className="text-lg text-muted-foreground mb-2">Empowering Well-Being for Everyone</p>
              <p className="text-sm italic text-muted-foreground mb-8">Seu caminho para o bem-estar integrado</p>
              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-[hsl(244_45%_30%)] to-[hsl(245_50%_25%)] hover:brightness-110 text-white shadow-lg"
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

      {/* Features cards originais */}
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
                key={feature.title}
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

      {/* Bloco vindo do About: hero + estatísticas */}
      <section className="relative px-4 pt-24 pb-20 overflow-hidden bg-gradient-to-b from-background via-background to-muted/20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-harmonize/5 to-accent/5" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.1),transparent_50%)]" />

        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Transformando vidas desde 2020</span>
            </div>

            <h2 className="text-5xl md:text-6xl font-serif font-bold mb-6 leading-tight">
              Conectando você ao seu{" "}
              <span className="bg-gradient-to-r from-primary via-harmonize to-accent bg-clip-text text-solid">
                bem-estar
              </span>
            </h2>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-12">
              Somos uma plataforma dedicada a democratizar o acesso a terapias integrativas de qualidade,
              conectando pessoas em busca de equilíbrio com terapeutas experientes e certificados.
            </p>

          </div>
        </div>
      </section>

      {/* Missão, Visão, Valores */}
      <section className="px-4 py-20">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="group hover:shadow-xl transition-all duration-300 border-border/50 hover:border-primary/30">
              <CardContent className="pt-8 pb-8 text-center">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-harmonize flex items-center justify-center mb-6 group-hover:scale-110 transition-transform mx-auto">
                  <Target className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Nossa Missão</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Facilitar o acesso a terapias integrativas de qualidade, promovendo o equilíbrio e bem-estar de cada
                  indivíduo através da tecnologia.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-border/50 hover:border-harmonize/30">
              <CardContent className="pt-8 pb-8 text-center">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-harmonize flex items-center justify-center mb-6 group-hover:scale-110 transition-transform mx-auto">
                  <TrendingUp className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Nossa Visão</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Ser a principal plataforma de referência em terapias integrativas, transformando a forma como as
                  pessoas cuidam da sua saúde integral.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-border/50 hover:border-accent/30">
              <CardContent className="pt-8 pb-8 text-center">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent to-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform mx-auto">
                  <Award className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Nossos Valores</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Integridade, excelência, acolhimento e transformação guiam cada decisão e interação em nossa
                  plataforma.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Valores detalhados */}
      <section className="px-4 py-20 bg-gradient-to-br from-muted/30 via-background to-muted/20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">O que nos move</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Nossos princípios fundamentais que norteiam cada ação e decisão
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card
                  key={value.title}
                  className="group hover:shadow-lg transition-all duration-300 animate-slide-up border-border/50"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="pt-8 pb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-harmonize/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                    <p className="text-muted-foreground leading-relaxed text-sm">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Time */}
      <section className="px-4 py-20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">Conheça nosso time</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Pessoas apaixonadas e dedicadas a transformar o acesso ao bem-estar
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card
                key={member.name}
                className="group hover:shadow-xl transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <CardContent className="pt-8 pb-8 text-center">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary via-harmonize to-accent mx-auto mb-6 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Users className="w-12 h-12 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                  <p className="text-primary font-medium mb-4">{member.role}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* História */}
      <section className="px-4 py-20 bg-gradient-to-br from-primary/5 via-harmonize/5 to-accent/5">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Nossa história</h2>
          </div>

          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
            <p>
              A <strong className="text-foreground">HarmoniCare</strong> nasceu da observação de uma necessidade real:
              pessoas buscando terapias integrativas enfrentavam dificuldades em encontrar profissionais qualificados e
              de confiança.
            </p>
            <p>
              Em 2020, nossa fundadora Selma Vilella Maia reuniu uma equipe multidisciplinar para criar uma solução que
              conectasse terapeutas qualificados com pessoas em busca de bem-estar de forma simples, segura e acessível.
            </p>
            <p>
              Hoje, somos uma comunidade vibrante de milhares de usuários e centenas de terapeutas certificados, todos
              unidos pelo objetivo comum de promover saúde integral e transformação pessoal. Nossa plataforma vai além
              de um simples marketplace — somos um ecossistema completo de bem-estar.
            </p>
            <p className="text-foreground font-medium">
              Acreditamos que o acesso ao cuidado holístico é um direito de todos, e trabalhamos todos os dias para
              tornar essa visão uma realidade.
            </p>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary/10 via-harmonize/10 to-accent/10">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Pronto para começar sua jornada?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de pessoas que já encontraram equilíbrio e bem-estar através da HarmoniCare
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-primary to-harmonize hover:opacity-90 text-white shadow-lg"
            asChild
          >
            <NavLink to="/auth">Começar Agora</NavLink>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
