"use client";

import { useState } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { Zap, ArrowLeft, CheckCircle } from "lucide-react";

export default function RecoverPage() {
  const [sent, setSent]     = useState(false);
  const [loading, setLoad]  = useState(false);

  const submit = (_: FormData) => {
    setLoad(true);
    setTimeout(() => { setLoad(false); setSent(true); }, 1400);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="w-full max-w-xs">
        <Link href="/" className="flex items-center gap-1.5 mb-12">
          <Zap className="w-4 h-4 text-[#cc1111]" />
          <span className="text-sm font-bold tracking-tight" style={{ fontFamily: "GeistMono, monospace" }}>hypo</span>
        </Link>

        {!sent ? (
          <>
            <p className="label-mono mb-3">Acesso</p>
            <h1 className="heading text-3xl text-[#c0c0c0] mb-2">Recuperar acesso.</h1>
            <p className="text-sm text-[#888] mb-8 leading-relaxed">
              Informe seu username. Nossa equipe verificará sua conta e entrará em contato pelo Discord.
            </p>

            <form action={submit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="label-mono block">Username</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#555] text-sm font-mono select-none">hypo.lol/</span>
                  <input
                    type="text"
                    placeholder="seu-usuario"
                    required
                    minLength={3}
                    className="w-full h-9 bg-black border border-[rgba(255,255,255,0.1)] rounded-[var(--radius)] pl-[76px] pr-3 text-[#c0c0c0] placeholder:text-[#444] font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#cc1111] focus:ring-offset-2 focus:ring-offset-black transition-all"
                  />
                </div>
              </div>
              <Button type="submit" variant="solid" size="lg" className="w-full" loading={loading}>
                Solicitar recuperação
              </Button>
            </form>

            <p className="text-xs text-[#555] mt-4 font-mono">Recuperação manual via Discord · até 24h</p>
          </>
        ) : (
          <div>
            <div className="flex items-center gap-1.5 mb-8">
              <span className="status-dot status-dot-green" />
              <span className="label-mono">Solicitação enviada</span>
            </div>
            <h2 className="heading text-3xl text-[#c0c0c0] mb-3">Tudo certo.</h2>
            <p className="text-sm text-[#888] mb-8 leading-relaxed">
              Verifique sua conta no Discord. Nossa equipe irá entrar em contato em até 24h.
            </p>
            <Button variant="outline" size="md" asChild>
              <Link href="/login">
                <ArrowLeft className="w-3.5 h-3.5" />
                Voltar para o login
              </Link>
            </Button>
          </div>
        )}

        <div className="mt-8">
          <Link
            href="/login"
            className="text-xs text-[#555] hover:text-[#888] transition-colors inline-flex items-center gap-1"
          >
            <ArrowLeft className="w-3 h-3" />
            Voltar para o login
          </Link>
        </div>
      </div>
    </div>
  );
}
