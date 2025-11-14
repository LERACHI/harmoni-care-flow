import { Heart, Mail, Phone, MapPin } from "lucide-react";
import { NavLink } from "@/components/NavLink";

const Footer = () => {
  return (
    <footer className="bg-muted/50 border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-harmonize flex items-center justify-center">
                <Heart className="w-5 h-5 text-white fill-white" />
              </div>
              <span className="text-xl font-serif font-semibold">HarmoniCare</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Conectando cuidado, inspirando equilíbrio e bem-estar integral.
            </p>
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className="font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <NavLink to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/therapists" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Terapeutas
                </NavLink>
              </li>
              <li>
                <NavLink to="/shop" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Loja
                </NavLink>
              </li>
              <li>
                <NavLink to="/chat" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Chat
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Recursos */}
          <div>
            <h3 className="font-semibold mb-4">Recursos</h3>
            <ul className="space-y-2">
              <li>
                <NavLink to="/content" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Meus Conteúdos
                </NavLink>
              </li>
              <li>
                <NavLink to="/profile" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Perfil
                </NavLink>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Sobre Nós
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Contato
                </a>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="font-semibold mb-4">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 text-primary" />
                contato@harmonicare.com
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 text-primary" />
                +55 (11) 98765-4321
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary" />
                São Paulo, Brasil
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} HarmoniCare. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
