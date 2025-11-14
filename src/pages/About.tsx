import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Users, Target, Sparkles, Shield, Globe, Award, TrendingUp } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Cuidado Integral",
      description: "Tratamento holístico que considera corpo, mente e espírito como um todo integrado."
    },
    {
      icon: Users,
      title: "Comunidade",
      description: "Uma rede de apoio onde terapeutas e pacientes se conectam de forma genuína."
    },
    {
      icon: Target,
      title: "Excelência",
      description: "Profissionais qualificados e comprometidos com resultados reais e mensuráveis."
    },
    {
      icon: Shield,
      title: "Segurança",
      description: "Ambiente seguro, privado e acolhedor para todas as interações."
    },
    {
      icon: Sparkles,
      title: "Transformação",
      description: "Facilitamos jornadas de autoconhecimento e crescimento pessoal sustentável."
    },
    {
      icon: Globe,
      title: "Acessibilidade",
      description: "Democratizamos o acesso a terapias integrativas através da tecnologia."
    }
  ];

  const stats = [
    { number: "10k+", label: "Usuários Ativos" },
    { number: "500+", label: "Terapeutas Certificados" },
    { number: "98%", label: "Satisfação" },
    { number: "50k+", label: "Sessões Realizadas" }
  ];

  const team = [
    {
      name: "Ana Carolina",
      role: "Fundadora & CEO",
      description: "Terapeuta holística com 15 anos de experiência, apaixonada por conectar pessoas ao seu bem-estar."
    },
    {
      name: "Roberto Santos",
      role: "Diretor de Tecnologia",
      description: "Desenvolvedor com foco em criar soluções que realmente fazem diferença na vida das pessoas."
    },
    {
      name: "Marina Silva",
      role: "Coordenadora de Terapeutas",
      description: "Psicóloga e especialista em terapias integrativas, responsável pela curadoria dos profissionais."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background via-background to-muted/20">
      <Navigation />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative px-4 pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-harmonize/5 to-accent/5" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.1),transparent_50%)]" />
          
          <div className="container mx-auto relative z-10">
            <div className="max-w-4xl mx-auto text-center animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Transformando vidas desde 2020</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight">
                Conectando você ao seu{" "}
                <span className="bg-gradient-to-r from-primary via-harmonize to-accent bg-clip-text text-transparent">
                  bem-estar
                </span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-12">
                Somos uma plataforma dedicada a democratizar o acesso a terapias integrativas de qualidade, 
                conectando pessoas em busca de equilíbrio com terapeutas experientes e certificados.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
                {stats.map((stat, index) => (
                  <div key={index} className="animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                    <div className="text-4xl md:text-5xl font-bold bg-gradient-to-br from-primary to-harmonize bg-clip-text text-transparent mb-2">
                      {stat.number}
                    </div>
                    <div className="text-sm text-muted-foreground font-medium">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Mission, Vision, Values */}
        <section className="px-4 py-20">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="group hover:shadow-xl transition-all duration-300 border-border/50 hover:border-primary/30">
                <CardContent className="pt-8 pb-8">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-harmonize flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Target className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Nossa Missão</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Facilitar o acesso a terapias integrativas de qualidade, promovendo o equilíbrio 
                    e bem-estar de cada indivíduo através da tecnologia.
                  </p>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-xl transition-all duration-300 border-border/50 hover:border-harmonize/30">
                <CardContent className="pt-8 pb-8">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-harmonize to-accent flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <TrendingUp className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Nossa Visão</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Ser a principal plataforma de referência em terapias integrativas, 
                    transformando a forma como as pessoas cuidam da sua saúde integral.
                  </p>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-xl transition-all duration-300 border-border/50 hover:border-accent/30">
                <CardContent className="pt-8 pb-8">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent to-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Award className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Nossos Valores</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Integridade, excelência, acolhimento e transformação guiam cada decisão 
                    e interação em nossa plataforma.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Values Grid */}
        <section className="px-4 py-20 bg-gradient-to-br from-muted/30 via-background to-muted/20">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
                O que nos move
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Nossos princípios fundamentais que norteiam cada ação e decisão
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <Card 
                    key={index} 
                    className="group hover:shadow-lg transition-all duration-300 animate-slide-up border-border/50"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CardContent className="pt-8 pb-6">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-harmonize/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        {value.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="px-4 py-20">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
                Conheça nosso time
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Pessoas apaixonadas e dedicadas a transformar o acesso ao bem-estar
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <Card 
                  key={index} 
                  className="group hover:shadow-xl transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <CardContent className="pt-8 pb-8 text-center">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary via-harmonize to-accent mx-auto mb-6 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Users className="w-12 h-12 text-primary-foreground" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                    <p className="text-primary font-medium mb-4">{member.role}</p>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {member.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="px-4 py-20 bg-gradient-to-br from-primary/5 via-harmonize/5 to-accent/5">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
                Nossa história
              </h2>
            </div>

            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                A <strong className="text-foreground">HarmoniCare</strong> nasceu da observação de uma necessidade real: 
                pessoas buscando terapias integrativas enfrentavam dificuldades em encontrar profissionais 
                qualificados e de confiança.
              </p>
              <p>
                Em 2020, nossa fundadora Ana Carolina, com sua vasta experiência em terapias holísticas, 
                reuniu uma equipe multidisciplinar para criar uma solução que pudesse conectar terapeutas 
                qualificados com pessoas em busca de bem-estar de forma simples, segura e acessível.
              </p>
              <p>
                Hoje, somos uma comunidade vibrante de milhares de usuários e centenas de terapeutas 
                certificados, todos unidos pelo objetivo comum de promover saúde integral e transformação 
                pessoal. Nossa plataforma vai além de um simples marketplace – somos um ecossistema 
                completo de bem-estar.
              </p>
              <p className="text-foreground font-medium">
                Acreditamos que o acesso ao cuidado holístico é um direito de todos, e trabalhamos 
                todos os dias para tornar essa visão uma realidade.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;