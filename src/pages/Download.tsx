import { Download, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import logoImg from "@/assets/lovazero-logo-wide.png";

const DOWNLOAD_URL = "https://www.mediafire.com/file/ipkmerewyqsvqn8/Potter%252B.apk/file";

const DownloadPage = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      <img src={logoImg} alt="LovaZero" className="h-12 mb-10" />

      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
          <Download className="w-6 h-6 text-primary" />
        </div>

        <h1 className="text-xl font-bold text-foreground font-['Space_Grotesk']">
          LovaZero V9.7.0
        </h1>
        <p className="text-muted-foreground text-sm">
          Clique abaixo para baixar a extensão.
        </p>

        <a
          href={DOWNLOAD_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-center flex items-center justify-center gap-2 transition-colors"
        >
          <Download className="w-5 h-5" />
          Baixar Extensão
        </a>
      </div>

      <Link
        to="/"
        className="mt-6 text-muted-foreground hover:text-foreground text-sm flex items-center gap-1 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Voltar ao início
      </Link>
    </div>
  );
};

export default DownloadPage;
