import { motion } from "framer-motion";

const testimonials = [
  {
    quote: "Finalizei 3 projetos completos em uma semana usando o LovaZero. Antes eu ficava preso calculando créditos o tempo todo.",
    name: "Lucas M.",
    role: "Desenvolvedor Full-Stack",
    initials: "LM",
  },
  {
    quote: "Agora posso testar todas as ideias que tenho no Lovable sem me preocupar com limites. Mudou meu fluxo completamente.",
    name: "Ana Paula S.",
    role: "Designer UI/UX",
    initials: "AP",
  },
  {
    quote: "Como freelancer, o LovaZero me deu vantagem competitiva. Consigo entregar projetos maiores e mais rápido.",
    name: "Rafael C.",
    role: "Desenvolvedor Freelancer",
    initials: "RC",
  },
];

const TestimonialsSection = () => {
  return (
    <section id="depoimentos" className="py-20 md:py-28 relative z-10">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold text-center mb-12"
        >
          O Que Nossos Usuários Dizem
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <p className="text-sm text-muted-foreground mb-6 italic">"{t.quote}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/15 text-primary text-xs font-bold flex items-center justify-center">
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
