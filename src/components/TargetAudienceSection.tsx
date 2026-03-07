import { motion } from "framer-motion";
import { Code2, Briefcase, Rocket, Building, GraduationCap, Lightbulb } from "lucide-react";
import useStarSound from "@/hooks/useStarSound";

const audiences = [
  { icon: Code2, text: "Desenvolvedores que querem criar apps sem limites" },
  { icon: Briefcase, text: "Freelancers entregando projetos para clientes" },
  { icon: Rocket, text: "Empreendedores construindo seus MVPs rapidamente" },
  { icon: Building, text: "Agências criando múltiplos projetos simultaneamente" },
  { icon: GraduationCap, text: "Estudantes aprendendo a construir com IA" },
  { icon: Lightbulb, text: "Criadores transformando ideias em produtos reais" },
];

const TargetAudienceSection = () => {
  const playStarSound = useStarSound();

  return (
    <section className="py-20 md:py-28 relative z-10">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold text-center mb-12"
        >
          Para Quem é o LovaZero?
        </motion.h2>

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
