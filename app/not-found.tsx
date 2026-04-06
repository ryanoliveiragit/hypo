import Link from "next/link";
import Button from "@/components/ui/Button";
import { Zap, ArrowLeft, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">
      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Red fog */}
      <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-[80vw] h-[80vw] bg-[radial-gradient(circle,rgba(204,17,17,0.06),transparent_65%)] blur-[120px] pointer-events-none" />

      {/* Top nav */}
      <Link href="/" className="absolute top-6 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10">
        <Zap className="w-3.5 h-3.5 text-[#cc1111]" />
        <span className="text-xs font-bold tracking-tight text-[#888]" style={{ fontFamily: "GeistMono, monospace" }}>
          hypo
        </span>
      </Link>

      {/* Content */}
      <div className="relative z-10 max-w-md">
        {/* 404 - massive */}
        <p className="heading text-[120px] sm:text-[180px] leading-none select-none mb-0 tracking-tighter"
           style={{
             color: "transparent",
             WebkitTextStroke: "1px rgba(204,17,17,0.15)",
             fontFamily: "GeistMono, monospace",
           }}>
          404
        </p>

        {/* Accent line */}
        <div className="w-12 h-px bg-[#cc1111] mx-auto my-6 opacity-60" />

        {/* Error code */}
        <p className="label-mono mb-1.5">hypo.lol/404</p>

        {/* Title */}
        <h2 className="heading text-2xl text-[#c0c0c0] mb-3">Página perdida.</h2>

        {/* Description */}
        <p className="text-sm text-[#555] leading-relaxed mb-8">
          Essa rota não foi encontrada. O perfil pode ter sido removido,
          o username está incorreto, ou você digitou uma URL que não existe.
        </p>

        {/* CTA */}
        <div className="flex items-center gap-3 justify-center flex-wrap">
          <Button variant="solid" size="md" asChild>
            <Link href="/">
              Voltar ao início
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </Button>
          <Button variant="outline" size="md" asChild>
            <Link href="/register">
              Criar perfil
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </Button>
        </div>

        {/* Terminal hint */}
        <div className="mt-10 card p-3 text-xs font-mono inline-flex items-center gap-2">
          <span className="status-dot status-dot-red" />
          <span className="text-[#555]">$</span>
          <span className="text-[#888]">redirecionar para <span className="text-[#cc1111]">hypo.lol/</span></span>
          <span className="cursor-[inherit] w-2 h-4 bg-[#555] animate-pulse" />
        </div>
      </div>

      {/* Footer */}
      <p className="absolute bottom-6 text-[10px] text-[#333] font-mono">
        hypo.lol · acesso por invite · 2026
      </p>
    </div>
  );
}
