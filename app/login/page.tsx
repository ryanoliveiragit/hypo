"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { Zap, Ticket, Check, X, Loader2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const VALID = ["HYPO-ALPHA", "HYPO-BETA", "VIP-2024", "EARLY-XYZ"];

export default function LoginPage() {
  const [invite, setInvite] = useState("");
  const [status, setStatus] = useState<"idle" | "checking" | "valid" | "invalid">("idle");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const raw = invite.trim().toUpperCase();
    if (raw.length < 4) { setStatus("idle"); return; }
    setStatus("checking");
    const t = setTimeout(() => setStatus(VALID.includes(raw) ? "valid" : "invalid"), 600);
    return () => clearTimeout(t);
  }, [invite]);

  const handleSubmit = (_: FormData) => {
    if (status !== "valid") return;
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <div className="min-h-screen bg-black flex">
      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0, 0, 0.4, 1] as const }}
        className="flex-1 flex flex-col justify-center px-6 py-12 max-w-sm mx-auto lg:mx-0 lg:max-w-none lg:w-[480px] lg:flex-none"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1.5 mb-12">
          <Zap className="w-4 h-4 text-[#cc1111]" />
          <span className="text-sm font-bold tracking-tight" style={{ fontFamily: "GeistMono, monospace" }}>
            hypo
          </span>
        </Link>

        <p className="label-mono mb-3">Acesso</p>
        <h1 className="heading text-3xl text-[#c0c0c0] mb-2">Bem-vindo de volta.</h1>
        <p className="text-sm text-[#888] mb-8 leading-relaxed">
          Use seu código de invite para acessar sua conta.
        </p>

        <form action={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="label-mono block">Código de invite</label>
            <div className="relative">
              <Ticket className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#555]" />
              <input
                type="text"
                placeholder="XXXX-XXXXX"
                value={invite}
                onChange={(e) => setInvite(e.target.value.toUpperCase())}
                required
                autoFocus
                className="w-full h-9 bg-black border border-[rgba(255,255,255,0.1)] rounded-[var(--radius)] pl-9 pr-9 text-[#c0c0c0] placeholder:text-[#444] font-mono text-sm tracking-widest focus:outline-none focus:ring-2 focus:ring-[#cc1111] focus:ring-offset-2 focus:ring-offset-black transition-all uppercase"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2">
                {status === "checking" && <Loader2 className="w-3.5 h-3.5 text-[#888] animate-spin" />}
                {status === "valid"    && <Check   className="w-3.5 h-3.5 text-[#ff4444]" />}
                {status === "invalid"  && <X       className="w-3.5 h-3.5 text-[#ff6b6b]" />}
              </span>
            </div>
            {status === "invalid" && (
              <p className="text-xs text-[#ff6b6b] font-mono">Código inválido.</p>
            )}
          </div>

          <Button
            type="submit"
            variant="solid"
            size="lg"
            className="w-full"
            loading={loading}
            disabled={status !== "valid"}
          >
            Entrar
            <ArrowRight className="w-4 h-4" />
          </Button>
        </form>

        <p className="mt-6 text-xs text-[#555]">
          Não tem conta?{" "}
          <Link href="/register" className="text-[#888] hover:text-[#c0c0c0] transition-colors underline underline-offset-2">
            Cadastre-se com um invite
          </Link>
        </p>
        <p className="mt-2 text-xs text-[#555]">
          Perdeu seu código?{" "}
          <Link href="/reset-password" className="text-[#888] hover:text-[#c0c0c0] transition-colors underline underline-offset-2">
            Recuperar acesso
          </Link>
        </p>
      </motion.div>

      {/* Right: decorative panel */}
      <div className="hidden lg:flex flex-1 bg-[#0a0a0a] border-l border-[rgba(255,255,255,0.06)] items-center justify-center p-12">
        <div className="max-w-xs">
          <div className="card p-5 text-xs font-mono leading-relaxed mb-4">
            <div className="flex items-center gap-1.5 mb-4 pb-3 border-b border-[rgba(255,255,255,0.06)]">
              <span className="label-mono text-[10px]">INVITE</span>
              <span className="ml-auto flex items-center gap-1.5">
                <span className="status-dot status-dot-green" />
                <span className="text-[#888] text-[10px]">Valid</span>
              </span>
            </div>
            <div className="space-y-1 text-[#888]">
              <div><span className="text-[#555]">code    </span><span className="text-[#c0c0c0]">HYPO-ALPHA</span></div>
              <div><span className="text-[#555]">user    </span><span className="text-[#e53535]">@demo</span></div>
              <div><span className="text-[#555]">joined  </span><span className="text-[#888]">2024-01-01</span></div>
              <div><span className="text-[#555]">status  </span><span className="text-[#ff4444]">active</span></div>
            </div>
          </div>
          <p className="text-xs text-[#555] leading-relaxed">
            Seu código de invite é sua chave de acesso.
            Guarde-o em lugar seguro.
          </p>
        </div>
      </div>
    </div>
  );
}
