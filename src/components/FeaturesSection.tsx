import { motion } from "framer-motion";
import { Lock, FileUp, Mic, Sparkles, FolderPlus, EyeOff, Globe } from "lucide-react";
import useStarSound from "@/hooks/useStarSound";

const features = [
  {
    icon: Lock,
    title: "Bloqueio do Chat",
    description: "Bloqueie o chat da Lovable e evite que seus créditos sejam consumidos. Lovable de graça de verdade.",
  },
  {
    icon: FileUp,
    title: "Envio de Arquivos",
    description: "Envie qualquer tipo de arquivo diretamente no chat para usar nos seus projetos.",
  },
  {
    icon: Mic,
    title: "Envio de Áudio",
    description: "Grave e envie áudios para descrever o que precisa — sem precisar digitar.",
  },
  {
    icon: Sparkles,
    title: "IA para Prompts",
    description: "Uma IA integrada que melhora seus prompts automaticamente para resultados superiores.",
  },
  {
    icon: FolderPlus,
    title: "Novo Projeto Grátis",
    description: "Crie novos projetos sem gastar nenhum crédito. Lovable ilimitado e unlimited de verdade.",
  },
  {
    icon: EyeOff,
    title: "Tirar Marca d'Água",
    description: "Remova a marca d'água da Lovable e tenha seu projeto com visual 100% profissional.",
  },
  {
    icon: Globe,
    title: "Hospedagem Grátis",
    description: "Publique e hospede seu projeto gratuitamente. Lovable com hospedagem inclusa, pronto para o mundo ver.",
  },
];

const FeaturesSection = () => {
  const playStarSound = useStarSound();

  return (
    <section id="recursos" className="py-20 md:py-28 relative z-10" aria-label="Funcionalidades do Lovable grátis e ilimitado">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Tudo que a extensão <span className="text-gradient-purple">faz por você</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Funcionalidades que tornam o Lovable grátis, ilimitado e com hospedagem. Tudo incluso, sem custo extra.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.slice(0, 4).map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="rounded-2xl border border-border bg-card p-6 hover:border-primary/30 transition-colors text-center cursor-pointer"
              onMouseEnter={playStarSound}
            >
              <div className="icon-box mx-auto mb-5">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-base font-bold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-5 mt-5 max-w-4xl mx-auto">
          {features.slice(4).map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (index + 4) * 0.1 }}
              className="rounded-2xl border border-border bg-card p-6 hover:border-primary/30 transition-colors text-center cursor-pointer"
              onMouseEnter={playStarSound}
            >
              <div className="icon-box mx-auto mb-5">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-base font-bold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;