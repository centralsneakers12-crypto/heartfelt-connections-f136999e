import { motion } from "framer-motion";
import useStarSound from "@/hooks/useStarSound";

const steps = [
  { step: "01", title: "Escolha seu plano", description: "Selecione o plano ideal e comece a usar o Lovable de graça." },
  { step: "02", title: "Instale a extensão", description: "Instale no Chrome, Firefox, Edge ou Opera em segundos." },
  { step: "03", title: "Ative sua licença", description: "Ativação instantânea com sua chave de acesso." },
  { step: "04", title: "Lovable Unlimited", description: "Pronto! Agora o Lovable é grátis, ilimitado e com hospedagem inclusa." },
];

const HowItWorksSection = () => {
  const playStarSound = useStarSound();

  return (
    <section id="como-funciona" className="py-20 md:py-28 relative z-10" aria-label="Como usar Lovable grátis pra sempre">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Como Usar Lovable Grátis?</h2>
          <p className="text-muted-foreground">Veja como ter Lovable unlimited em 4 passos simples.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="rounded-2xl border border-border bg-card p-6 text-center cursor-pointer"
              onMouseEnter={playStarSound}
            >
              <span className="inline-block text-xs text-primary font-bold bg-primary/10 px-3 py-1 rounded-full mb-4">
                Passo {item.step}
              </span>
              <h3 className="text-lg font-bold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;