import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/5547989295131?text=Ol%C3%A1%2C%20quero%20testar%20o%20LovaZero%20gr%C3%A1tis%20por%2010%20minutos!";

const FreeTrialButton = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex justify-center"
    >
      <Button
        size="lg"
        asChild
        className="h-12 px-8 text-sm font-bold rounded-xl gap-2 bg-gradient-to-r from-[hsl(142,71%,45%)] to-[hsl(142,71%,35%)] hover:opacity-90 text-white border-0"
      >
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
          <Zap className="w-4 h-4" />
          TESTE GRÁTIS POR 10 MINUTOS
        </a>
      </Button>
    </motion.div>
  );
};

export default FreeTrialButton;
