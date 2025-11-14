import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// *** MUDANÇA 1: Trocamos BrowserRouter por HashRouter no import ***
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
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// A variável BASE_PATH não é mais usada, mas pode permanecer.
const BASE_PATH = "/harmoni-care-flow/"; 

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      {/* *** MUDANÇA 2: Usamos <HashRouter> sem o basename *** */}
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
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
