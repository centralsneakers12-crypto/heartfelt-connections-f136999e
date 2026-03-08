import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, AlertTriangle } from "lucide-react";

const FinalCTASection = () => {
  return (
    <section className="py-20 md:py-28 relative z-10">
      <div className="container mx-auto px-4 text-center max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-primary to-accent text-primary-foreground font-black text-xs uppercase tracking-wider px-4 py-1.5 rounded-full mb-6 animate-pulse">
            <AlertTriangle className="w-3.5 h-3.5" />
            Últimas Vagas Disponíveis
          </span>

          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Não Perca Esta Oportunidade
          </h2>
          <p className="text-muted-foreground mb-4">
            Cada dia sem o LovaZero é um dia de projetos parados e ideias desperdiçadas.
          </p>
          <p className="text-muted-foreground mb-8">
            Essa oferta pode sair do ar a qualquer momento. Garanta sua vaga agora.
          </p>

          <Button size="lg" asChild className="h-16 px-12 text-lg font-black rounded-2xl gap-3 glow-purple bg-gradient-to-r from-primary to-accent hover:opacity-90 animate-pulse">
            <a href="https://wa.me/5547989295131?text=Ol%C3%A1%2C%20quero%20testar%20o%20LovaZero%20gr%C3%A1tis%20por%2010%20minutos!" target="_blank" rel="noopener noreferrer">
              🚀 TESTE GRÁTIS POR 10 MINUTOS
              <ArrowRight className="w-5 h-5" />
            </a>
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            ✅ Satisfação garantida · 🔒 Compra 100% segura · ⚡ Acesso imediato
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTASection;
