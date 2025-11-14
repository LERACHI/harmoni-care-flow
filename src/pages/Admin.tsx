import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, ShoppingBag, FileText, TrendingUp, CheckSquare, Flag } from "lucide-react";

const Admin = () => {
  const stats = [
    { label: "Total Usuários", value: "1,234", change: "+12%", icon: Users, color: "primary" },
    { label: "Vendas (mês)", value: "R$ 45,6k", change: "+23%", icon: ShoppingBag, color: "success" },
    { label: "Conteúdos", value: "156", change: "+8", icon: FileText, color: "harmonize" },
    { label: "Taxa Conversão", value: "12.5%", change: "+2.3%", icon: TrendingUp, color: "accent" },
  ];

  const requirements = [
    {
      id: 1,
      title: "Sistema de Chat em Tempo Real",
      priority: "high",
      status: "in-progress",
      description: "Implementar chat com suporte a texto, imagens, vídeos e PDFs",
    },
    {
      id: 2,
      title: "Upload de Mídias",
      priority: "high",
      status: "pending",
      description: "Sistema de upload e gestão de vídeos, imagens e documentos",
    },
    {
      id: 3,
      title: "Loja Virtual",
      priority: "medium",
      status: "in-progress",
      description: "E-commerce para produtos e serviços de terapias",
    },
    {
      id: 4,
      title: "Sistema de Autenticação",
      priority: "high",
      status: "completed",
      description: "Login e cadastro para pacientes e terapeutas",
    },
    {
      id: 5,
      title: "Painel Administrativo",
      priority: "medium",
      status: "in-progress",
      description: "Dashboard para gerenciamento de usuários e conteúdos",
    },
  ];

  const recentUsers = [
    { name: "Maria Santos", type: "Paciente", date: "14 Nov 2024" },
    { name: "Pedro Lima", type: "Terapeuta", date: "14 Nov 2024" },
    { name: "Ana Costa", type: "Paciente", date: "13 Nov 2024" },
    { name: "Carlos Souza", type: "Terapeuta", date: "13 Nov 2024" },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-destructive text-white";
      case "medium":
        return "bg-accent text-white";
      case "low":
        return "bg-muted text-foreground";
      default:
        return "bg-muted";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-success";
      case "in-progress":
        return "text-accent";
      case "pending":
        return "text-muted-foreground";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1 pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <div className="mb-8 animate-slide-up">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-2">
              Painel <span className="bg-gradient-to-r from-primary to-harmonize bg-clip-text text-transparent">Admin</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Gerenciamento e métricas da plataforma HarmoniCare
            </p>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br from-${stat.color}/20 to-${stat.color}/10 flex items-center justify-center`}>
                      <stat.icon className={`w-6 h-6 text-${stat.color}`} />
                    </div>
                    <span className="text-sm font-semibold text-success">{stat.change}</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-1">{stat.value}</h3>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Tabs defaultValue="requirements" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="requirements">Requisitos</TabsTrigger>
              <TabsTrigger value="users">Usuários</TabsTrigger>
              <TabsTrigger value="content">Conteúdo</TabsTrigger>
            </TabsList>

            <TabsContent value="requirements">
              <Card>
                <CardHeader>
                  <CardTitle>Requisitos Funcionais</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {requirements.map((req) => (
                      <div key={req.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold">{req.title}</h3>
                              <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(req.priority)}`}>
                                {req.priority === "high" ? "Alta" : req.priority === "medium" ? "Média" : "Baixa"}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{req.description}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            {req.status === "completed" && <CheckSquare className={`w-5 h-5 ${getStatusColor(req.status)}`} />}
                            {req.status === "in-progress" && <TrendingUp className={`w-5 h-5 ${getStatusColor(req.status)}`} />}
                            {req.status === "pending" && <Flag className={`w-5 h-5 ${getStatusColor(req.status)}`} />}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <span className={`font-medium ${getStatusColor(req.status)}`}>
                            {req.status === "completed" ? "Concluído" : req.status === "in-progress" ? "Em Progresso" : "Pendente"}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="users">
              <Card>
                <CardHeader>
                  <CardTitle>Usuários Recentes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentUsers.map((user, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-semibold">{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.type}</p>
                        </div>
                        <span className="text-sm text-muted-foreground">{user.date}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="content">
              <Card>
                <CardHeader>
                  <CardTitle>Gestão de Conteúdo</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">Vídeos</h3>
                        <span className="text-2xl font-bold">48</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Total de vídeos publicados</p>
                    </div>
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">Artigos</h3>
                        <span className="text-2xl font-bold">72</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Total de artigos publicados</p>
                    </div>
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">Imagens</h3>
                        <span className="text-2xl font-bold">36</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Total de imagens na biblioteca</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Admin;
