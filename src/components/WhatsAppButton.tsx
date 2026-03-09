import { memo } from "react";
import { MessageCircle } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/5547989295131?text=Ol%C3%A1%2C%20Gostaria%20de%20saber%20mais%20sobre%20o%20LovaZero";

const WhatsAppButton = memo(() => {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg hover:scale-110 transition-transform will-change-transform"
      aria-label="Contato via WhatsApp"
    >
      <MessageCircle className="w-7 h-7" />
    </a>
  );
});

WhatsAppButton.displayName = "WhatsAppButton";

export default WhatsAppButton;
