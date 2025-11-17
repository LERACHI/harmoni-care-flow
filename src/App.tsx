// src/App.tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import Therapists from "./pages/Therapists";
import Shop from "./pages/Shop";
import Chat from "./pages/Chat";
import Content from "./pages/Content";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import Auth from "./pages/Auth";
import About from "./pages/About";
import Vagas from "./pages/vagas";
import Contact from "./pages/Contato";
import NotFound from "./pages/NotFound";

import { AuthProvider } from "@/hooks/useAuth";
import UserList from "./components/UserList"; // Página de usuários Supabase

// Supabase client importado aqui para garantir inicialização
import { supabase } from "@/lib/supabaseClient";

// QueryClient para React Query
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        <HashRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/therapists" element={<Therapists />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/content" element={<Content />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/about" element={<About />} />

            {/* Página de usuários do Supabase */}
            <Route path="/users" element={<UserList />} />

            {/* Rotas novas */}
            <Route path="/vagas" element={<Vagas />} />
            <Route path="/contato" element={<Contact />} />

            {/* Sempre por último */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </HashRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
