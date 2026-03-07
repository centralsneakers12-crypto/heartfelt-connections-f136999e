import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const MotivationSection = () => {
  return (
    <section className="py-20 md:py-28 relative z-10">
      <div className="container mx-auto px-4 text-center max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-8">
            Da Ideia ao App Completo
          </h2>

          <div className="space-y-4 text-muted-foreground mb-8">
            <p>Quantos projetos você deixou de criar por falta de créditos?</p>
            <p>Quantas ideias ficaram pela metade porque você atingiu o limite?</p>
            <p>Quantas oportunidades de negócio você perdeu?</p>
          </div>

          <p className="text-xl font-bold text-primary mb-8">Isso acaba agora.</p>

          <p className="text-muted-foreground mb-8">
            Com o LovaZero, você cria sem restrições. Sem calcular créditos. Sem pausas forçadas. Apenas você, suas ideias e o poder da IA.
          </p>

          <Button size="lg" asChild className="glow-purple font-bold bg-gradient-to-r from-primary to-accent hover:opacity-90">
            <a href="#precos">🔥 QUERO CRIAR SEM LIMITES</a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default MotivationSection;
