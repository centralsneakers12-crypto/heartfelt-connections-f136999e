import { motion } from "framer-motion";
import { Zap, Gauge, Clock, Settings } from "lucide-react";
import useStarSound from "@/hooks/useStarSound";

const items = [
  {
    icon: Zap,
    title: "Uso 100% Ilimitado",
    description: "Crie quantos projetos quiser, sem limite de créditos. Use o Lovable o dia inteiro sem preocupações.",
  },
  {
    icon: Gauge,
    title: "Velocidade Máxima",
    description: "Sem filas, sem espera. Suas requisições são processadas com prioridade total.",
  },
  {
    icon: Clock,
    title: "Plano Mensal",
    description: "Assine por R$ 97 a cada 30 dias, com renovação simples e sem surpresas.",
  },
  {
    icon: Settings,
    title: "Setup em 2 Minutos",
    description: "Instale a extensão, ative sua licença e comece a criar imediatamente.",
  },
];

const WhyChooseSection = () => {
  const playStarSound = useStarSound();

  return (
    <section className="py-20 md:py-28 relative z-10">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Por que escolher o <span className="text-gradient-purple">LovaZero?</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Tudo o que você precisa para criar sem limites, em uma única extensão.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="rounded-2xl border border-border bg-card p-6 hover:border-primary/30 transition-colors text-center cursor-pointer"
              onMouseEnter={playStarSound}
            >
              <div className="icon-box mx-auto mb-5">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-base font-bold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
