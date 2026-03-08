import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock } from "lucide-react";
import logo from "@/assets/lovazero-logo-wide.png";

const HeroSection = () => {
  return (
    <section className="relative flex flex-col items-center justify-start overflow-hidden text-center pt-4 md:pt-6 pb-4">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/8 via-transparent to-accent/5 pointer-events-none" />
      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-1"
        >
          <img src={logo} alt="LovaZero" className="h-16 md:h-20 mx-auto drop-shadow-lg" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mb-4"
        >
          <span className="inline-flex items-center gap-2 bg-destructive/15 border border-destructive/30 rounded-full px-3 py-1.5 text-xs text-destructive font-semibold">
            <Clock className="w-3.5 h-3.5" />
            Oferta válida apenas hoje
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] mb-4"
        >
          Lovable sem limites.
          <br />
          <span className="text-gradient-purple">Todo mês.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto mb-6"
        >
          <span className="text-foreground font-semibold">LovaZero</span> é a extensão que remove todas as limitações de créditos do Lovable. Crie projetos ilimitados, sem pausas, sem restrições com plano mensal acessível.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.35 }}
          className="flex flex-col items-center gap-2"
        >
          <Button
            size="lg"
            asChild
            className="h-12 px-8 text-sm font-bold rounded-xl gap-2 glow-purple bg-gradient-to-r from-primary to-accent hover:opacity-90"
          >
            <a href="#precos">
              🚀 GARANTIR MINHA VAGA AGORA
              <ArrowRight className="w-4 h-4" />
            </a>
          </Button>
          <span className="text-xs text-muted-foreground">⚡ Ativação instantânea · 🔒 Pagamento seguro</span>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
