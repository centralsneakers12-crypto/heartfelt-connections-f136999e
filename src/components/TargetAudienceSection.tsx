import { motion } from "framer-motion";
import { Code2, Briefcase, Rocket, Building, GraduationCap, Lightbulb } from "lucide-react";
import useStarSound from "@/hooks/useStarSound";

const audiences = [
  { icon: Code2, text: "Desenvolvedores que querem Lovable grátis e ilimitado" },
  { icon: Briefcase, text: "Freelancers usando Lovable de graça para entregar projetos" },
  { icon: Rocket, text: "Empreendedores com Lovable unlimited para criar MVPs" },
  { icon: Building, text: "Agências que precisam de Lovable ilimitado para múltiplos projetos" },
  { icon: GraduationCap, text: "Estudantes aprendendo a construir apps com Lovable grátis" },
  { icon: Lightbulb, text: "Criadores que querem Lovable com hospedagem inclusa" },
];

const TargetAudienceSection = () => {
  const playStarSound = useStarSound();

  return (
    <section className="py-20 md:py-28 relative z-10" aria-label="Quem pode usar Lovable de graça">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold text-center mb-4"
        >
          Para Quem é o Lovable Grátis?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto"
        >
          O LovaZero é perfeito para quem quer usar o Lovable de graça, ilimitado e com hospedagem.
        </motion.p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {audiences.map((item, index) => (
            <motion.div
              key={item.text}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 cursor-pointer"
              onMouseEnter={playStarSound}
            >
              <item.icon className="w-5 h-5 text-primary flex-shrink-0" />
              <span className="text-sm">{item.text}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TargetAudienceSection;