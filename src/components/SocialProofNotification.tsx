import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart } from "lucide-react";

const names = [
  "Gustavo H.", "Lucas M.", "Rafael S.", "Ana P.", "Mariana L.",
  "Pedro R.", "João V.", "Fernanda C.", "Bruno A.", "Camila T.",
  "Diego F.", "Juliana B.", "Matheus G.", "Larissa N.", "Thiago D.",
  "Carolina O.", "Felipe E.", "Isabela K.", "André W.", "Bianca Z.",
];

const cities = [
  "São Paulo", "Campinas", "Rio de Janeiro", "Belo Horizonte", "Curitiba",
  "Florianópolis", "Porto Alegre", "Brasília", "Salvador", "Recife",
  "Fortaleza", "Goiânia", "Manaus", "Belém", "Vitória",
];

const plans = ["Mensal", "Trimestral", "Anual"];

const getRandomItem = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];

const SocialProofNotification = () => {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState({ name: "", city: "", plan: "", time: "" });

  useEffect(() => {
    const show = () => {
      const minutes = Math.floor(Math.random() * 30) + 1;
      setData({
        name: getRandomItem(names),
        city: getRandomItem(cities),
        plan: getRandomItem(plans),
        time: `há ${minutes} min`,
      });
      setVisible(true);
      setTimeout(() => setVisible(false), 4000);
    };

    const initialDelay = setTimeout(show, 5000);
    const interval = setInterval(show, 12000 + Math.random() * 8000);

    return () => {
      clearTimeout(initialDelay);
      clearInterval(interval);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="fixed bottom-6 left-6 z-50 flex items-center gap-3 bg-card/95 backdrop-blur-sm border border-border rounded-xl px-4 py-3 shadow-2xl max-w-xs"
        >
          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
            <ShoppingCart className="w-5 h-5 text-primary" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-foreground leading-tight">
              {data.name} comprou o plano{" "}
              <span className="text-primary font-bold">{data.plan}</span>
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {data.city} · {data.time}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SocialProofNotification;
