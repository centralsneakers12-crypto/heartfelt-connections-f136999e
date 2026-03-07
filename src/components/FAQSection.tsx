import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";

const faqs = [
  {
    question: "Como o LovaZero funciona?",
    answer: "A extensão desbloqueia o uso ilimitado do Lovable, permitindo que você envie quantos prompts quiser sem consumir créditos. Instale, ative e crie.",
  },
  {
    question: "É seguro usar?",
    answer: "Sim! A extensão é totalmente segura. Ela não altera seus dados nem compromete sua conta.",
  },
  {
    question: "Em quais navegadores funciona?",
    answer: "Chrome, Firefox, Edge e Opera.",
  },
  {
    question: "E se a extensão parar de funcionar?",
    answer: "Nosso suporte via WhatsApp está sempre disponível. Oferecemos atualizações automáticas para garantir compatibilidade.",
  },
  {
    question: "Quanto tempo leva para ativar?",
    answer: "A ativação é instantânea. Após o pagamento, você recebe sua licença e pode começar em menos de 2 minutos.",
  },
  {
    question: "Posso usar em mais de um computador?",
    answer: "Sim, você pode usar a extensão em diferentes dispositivos com o mesmo navegador compatível.",
  },
];

const FAQSection = () => {
  return (
    <section id="faq" className="py-20 md:py-28 relative z-10">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold text-center mb-12"
        >
          Perguntas Frequentes
        </motion.h2>

        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border border-border rounded-xl px-6 bg-card"
            >
              <AccordionTrigger className="text-left text-sm font-medium hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
