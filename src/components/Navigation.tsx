import { NavLink } from "@/components/NavLink";
import { Button } from "@/components/ui/button";
import { Menu, X, Heart, LogOut } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast.error('Erro ao sair');
    } else {
      toast.success('Logout realizado com sucesso!');
    }
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Terapeutas", path: "/therapists" },
    { name: "Loja", path: "/shop" },
    { name: "Chat", path: "/chat" },
    { name: "Conteúdos", path: "/content" },
    { name: "Sobre", path: "/about" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-harmonize flex items-center justify-center transition-transform group-hover:scale-110">
              <Heart className="w-5 h-5 text-white fill-white" />
            </div>
            <span className="text-2xl font-serif font-semibold bg-gradient-to-r from-primary to-harmonize bg-clip-text text-transparent">
              HarmoniCare
            </span>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors"
                activeClassName="text-primary font-semibold"
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <Button variant="outline" size="sm" asChild>
                  <NavLink to="/profile">Perfil</NavLink>
                </Button>
                <Button 
                  size="sm" 
                  variant="ghost"
                  onClick={handleSignOut}
                  className="gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Sair
                </Button>
              </>
            ) : (
              <Button size="sm" className="bg-gradient-to-r from-primary to-harmonize hover:opacity-90" asChild>
                <NavLink to="/auth">Entrar</NavLink>
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className="px-4 py-2 text-sm font-medium text-foreground/70 hover:text-primary hover:bg-muted rounded-lg transition-colors"
                  activeClassName="text-primary bg-muted font-semibold"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </NavLink>
              ))}
              <div className="flex flex-col gap-2 px-4 pt-2">
                {user ? (
                  <>
                    <Button variant="outline" size="sm" asChild>
                      <NavLink to="/profile">Perfil</NavLink>
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={handleSignOut}
                      className="gap-2 justify-start"
                    >
                      <LogOut className="w-4 h-4" />
                      Sair
                    </Button>
                  </>
                ) : (
                  <Button size="sm" className="bg-gradient-to-r from-primary to-harmonize" asChild>
                    <NavLink to="/auth">Entrar</NavLink>
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
