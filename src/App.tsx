// src/App.tsx

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";

// 1. Importação do Hook de Usabilidade
import useScrollToTop from "@/hooks/useScrollToTop"; 

// Importação das Páginas
import Index from "./pages/Index";
import Therapists from "./pages/Therapists";
import Shop from "./pages/Shop";
import Content from "./pages/Content";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import Auth from "./pages/Auth";
import Diagnosticos from "./pages/Diagnosticos";
import Contact from "./pages/Contato";
import TherapistProfile from "@/pages/TherapistProfile";
import Community from "@/pages/Community";
import ReceitaPage from "@/pages/ReceitaPage";
import NotFound from "./pages/NotFound";

import { AuthProvider } from "@/hooks/useAuth";
import UserList from "./components/UserList"; 

// 2. CORREÇÃO DO AVISO: Importação lateral para garantir que o cliente Supabase seja inicializado.
// A variável 'supabase' não é usada aqui, então o aviso é ignorado.
import "@/integrations/supabase/client"; 

// QueryClient para React Query
const queryClient = new QueryClient();

// Componente Wrapper para injetar o useScrollToTop
const AppWrapper = () => {
  // 3. Aplica o hook para garantir que a tela role para o topo a cada navegação
  useScrollToTop(); 

  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/therapists" element={<Therapists />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/content" element={<Content />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/diagnosticos" element={<Diagnosticos />} />
      <Route path="/contato" element={<Contact />} />
      <Route path="/users" element={<UserList />} />
      <Route path="/terapeuta/:id" element={<TherapistProfile />} />
      <Route path="/therapist/:id" element={<TherapistProfile />} />
      <Route path="/comunidade" element={<Community />} />
      <Route path="/receita/:id" element={<ReceitaPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        <HashRouter>
          {/* Usa o Wrapper que contém o useScrollToTop */}
          <AppWrapper />
        </HashRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;