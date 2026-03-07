import { Button } from "@/components/ui/button";
import logo from "@/assets/lovazero-logo.png";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full bg-background/90 backdrop-blur-xl border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-20 px-4">
        <a href="#" className="flex items-center">
          <img src={logo} alt="LovaZero" className="h-[142px]" />
        </a>

        <div className="hidden md:flex items-center gap-8">
          <a href="#recursos" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Recursos
          </a>
          <a href="#precos" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Preços
          </a>
          <a href="#depoimentos" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Depoimentos
          </a>
          <a href="#faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Contatos
          </a>
        </div>

        <Button asChild size="sm">
          <a href="https://wa.me/5547989295131?text=Ol%C3%A1%2C%20Gostaria%20de%20saber%20mais%20sobre%20o%20LovaZero" target="_blank" rel="noopener noreferrer">Desbloquear</a>
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
