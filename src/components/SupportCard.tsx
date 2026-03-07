import { MessageCircle, Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const WHATSAPP_URL = "https://wa.me/5547989295131?text=Ol%C3%A1%2C%20Gostaria%20de%20saber%20mais%20sobre%20o%20LovaZero";

const SupportCard = () => {
  return (
    <section className="py-16 relative z-10">
      <div className="container mx-auto px-4 max-w-xl">
        <Card className="text-center">
          <CardContent className="p-8 space-y-4">
            <div className="mx-auto w-14 h-14 rounded-full bg-[#25D366]/15 flex items-center justify-center">
              <Phone className="w-7 h-7 text-[#25D366]" />
            </div>
            <h3 className="text-xl font-bold text-foreground font-['Space_Grotesk']">
              Suporte LovaZero
            </h3>
            <p className="text-muted-foreground text-sm">
              Fale conosco pelo WhatsApp para tirar dúvidas ou obter suporte.
            </p>
            <p className="text-foreground font-medium">(47) 8929-5131</p>
            <Button asChild className="bg-[#25D366] hover:bg-[#1da851] text-white w-full">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-5 h-5 mr-2" />
                Falar no WhatsApp
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default SupportCard;
