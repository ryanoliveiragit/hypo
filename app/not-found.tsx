import Link from "next/link";
import Button from "@/components/ui/Button";
import { Zap } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6 text-center">
      <Link href="/" className="flex items-center gap-1.5 mb-12">
        <Zap className="w-4 h-4 text-[#cc1111]" />
        <span className="text-sm font-bold tracking-tight" style={{ fontFamily: "GeistMono, monospace" }}>hypo</span>
      </Link>

      <p className="heading text-[120px] sm:text-[180px] text-[rgba(255,255,255,0.04)] leading-none select-none mb-0">
        404
      </p>
      <p className="label-mono mb-3 -mt-4">Página não encontrada</p>
      <p className="text-sm text-[#888] mb-8 max-w-xs leading-relaxed">
        Essa página não existe ou o perfil ainda não foi criado no Hypo.
      </p>
      <div className="flex items-center gap-2">
        <Button variant="solid" size="md" asChild>
          <Link href="/">Voltar ao início</Link>
        </Button>
        <Button variant="ghost" size="md" asChild>
          <Link href="/register">Criar perfil</Link>
        </Button>
      </div>
    </div>
  );
}
