"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Button from "@/components/ui/Button";
import { Zap, Ticket, Check, X, Loader2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const VALID_CODES = ["HYPO-ALPHA", "HYPO-BETA", "VIP-2024", "EARLY-XYZ"];

function RegisterForm() {
  const params = useSearchParams();
  const [step, setStep] = useState<"invite" | "profile">("invite");
  const [invite, setInvite] = useState(params.get("invite") ?? "");
  const [inviteStatus, setInviteStatus] = useState<"idle" | "checking" | "valid" | "invalid">("idle");
  const [username, setUsername] = useState(params.get("u") ?? "");
  const [usernameStatus, setUsernameStatus] = useState<"idle" | "checking" | "ok" | "taken">("idle");
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const raw = invite.trim().toUpperCase();
    if (raw.length < 4) { setInviteStatus("idle"); return; }
    setInviteStatus("checking");
    const t = setTimeout(() => setInviteStatus(VALID_CODES.includes(raw) ? "valid" : "invalid"), 600);
    return () => clearTimeout(t);
  }, [invite]);

  useEffect(() => {
    if (step !== "profile" || username.length < 3) { setUsernameStatus("idle"); return; }
    setUsernameStatus("checking");
    const t = setTimeout(() => {
      const taken = ["admin", "hypo", "root", "support", "demo"].includes(username.toLowerCase());
      setUsernameStatus(taken ? "taken" : "ok");
    }, 600);
    return () => clearTimeout(t);
  }, [username, step]);

  if (done) {
    return (
      <div className="max-w-xs">
        <div className="flex items-center gap-2 mb-8">
          <span className="status-dot status-dot-green" />
          <span className="label-mono">Conta criada</span>
        </div>
        <h2 className="heading text-3xl text-[#c0c0c0] mb-3">Tudo certo.</h2>
        <p className="text-sm text-[#888] mb-6 leading-relaxed">
          Seu perfil está em{" "}
          <span className="font-mono text-[#c0c0c0]">hypo.lol/{username}</span>.
        </p>
        <div className="card p-4 mb-6">
          <p className="label-mono text-[10px] mb-2">Código de acesso</p>
          <p className="font-mono text-sm text-[#c0c0c0] tracking-widest">{invite.trim().toUpperCase()}</p>
          <p className="text-xs text-[#555] mt-2">Este código é usado para entrar na sua conta. Guarde-o.</p>
        </div>
        <Button variant="solid" size="lg" className="w-full" asChild>
          <Link href="/dashboard">Ir para o Dashboard <ArrowRight className="w-4 h-4" /></Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-xs w-full">
      <Link href="/" className="flex items-center gap-1.5 mb-12">
        <Zap className="w-4 h-4 text-[#cc1111]" />
        <span className="text-sm font-bold tracking-tight" style={{ fontFamily: "GeistMono, monospace" }}>hypo</span>
      </Link>

      {/* Steps */}
      <div className="flex items-center gap-2 mb-8">
        <div className={`flex items-center gap-1.5 text-xs font-mono ${step === "invite" ? "text-[#c0c0c0]" : "text-[#ff4444]"}`}>
          {step === "profile"
            ? <Check className="w-3.5 h-3.5" />
            : <span className="w-4 h-4 rounded-full border border-current flex items-center justify-center text-[10px]">1</span>
          }
          Invite
        </div>
        <span className="flex-1 h-px bg-[rgba(255,255,255,0.06)]" />
        <div className={`flex items-center gap-1.5 text-xs font-mono ${step === "profile" ? "text-[#c0c0c0]" : "text-[#555]"}`}>
          <span className={`w-4 h-4 rounded-full border flex items-center justify-center text-[10px] ${step === "profile" ? "border-[#c0c0c0]" : "border-[#333]"}`}>2</span>
          Perfil
        </div>
      </div>

      {step === "invite" && (
        <>
          <p className="label-mono mb-3">Acesso</p>
          <h1 className="heading text-3xl text-[#c0c0c0] mb-2">Código de invite.</h1>
          <p className="text-sm text-[#888] mb-8 leading-relaxed">
            O Hypo é exclusivo por convite. Insira seu código para continuar.
          </p>

          <form action={(_: FormData) => { if (inviteStatus === "valid") setStep("profile"); }} className="space-y-4">
            <div className="space-y-1.5">
              <label className="label-mono block">Código</label>
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
                  {inviteStatus === "checking" && <Loader2 className="w-3.5 h-3.5 text-[#888] animate-spin" />}
                  {inviteStatus === "valid"    && <Check   className="w-3.5 h-3.5 text-[#ff4444]" />}
                  {inviteStatus === "invalid"  && <X       className="w-3.5 h-3.5 text-[#ff6b6b]" />}
                </span>
              </div>
              {inviteStatus === "invalid" && <p className="text-xs text-[#ff6b6b] font-mono">Código inválido ou já utilizado.</p>}
            </div>
            <Button type="submit" variant="solid" size="lg" className="w-full" disabled={inviteStatus !== "valid"}>
              Continuar <ArrowRight className="w-4 h-4" />
            </Button>
          </form>

          <p className="mt-6 text-xs text-[#555]">
            Já tem conta?{" "}
            <Link href="/login" className="text-[#888] hover:text-[#c0c0c0] transition-colors underline underline-offset-2">
              Entrar
            </Link>
          </p>
        </>
      )}

      {step === "profile" && (
        <>
          <p className="label-mono mb-3">Perfil</p>
          <h1 className="heading text-3xl text-[#c0c0c0] mb-2">Crie seu perfil.</h1>
          <p className="text-sm text-[#888] mb-8 leading-relaxed">
            Escolha seu username e nome de exibição.
          </p>

          <form action={(_: FormData) => {
            if (usernameStatus !== "ok" || !displayName.trim()) return;
            setLoading(true);
            setTimeout(() => { setLoading(false); setDone(true); }, 1500);
          }} className="space-y-4">
            <div className="space-y-1.5">
              <label className="label-mono block">Username</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#555] text-sm font-mono select-none">hypo.lol/</span>
                <input
                  type="text"
                  placeholder="meu-usuario"
                  value={username}
                  onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9-_]/g, ""))}
                  required
                  minLength={3}
                  maxLength={30}
                  autoFocus
                  className="w-full h-9 bg-black border border-[rgba(255,255,255,0.1)] rounded-[var(--radius)] pl-[76px] pr-9 text-[#c0c0c0] placeholder:text-[#444] font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#cc1111] focus:ring-offset-2 focus:ring-offset-black transition-all"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2">
                  {usernameStatus === "checking" && <Loader2 className="w-3.5 h-3.5 text-[#888] animate-spin" />}
                  {usernameStatus === "ok"       && <Check   className="w-3.5 h-3.5 text-[#ff4444]" />}
                  {usernameStatus === "taken"    && <X       className="w-3.5 h-3.5 text-[#ff6b6b]" />}
                </span>
              </div>
              {usernameStatus === "ok" && <p className="text-xs text-[#ff4444] font-mono">Disponível.</p>}
              {usernameStatus === "taken" && <p className="text-xs text-[#ff6b6b] font-mono">Já em uso.</p>}
            </div>

            <div className="space-y-1.5">
              <label className="label-mono block">Nome de exibição</label>
              <input
                type="text"
                placeholder="Como quer ser chamado?"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                required
                maxLength={40}
                className="w-full h-9 bg-black border border-[rgba(255,255,255,0.1)] rounded-[var(--radius)] px-3 text-[#c0c0c0] placeholder:text-[#444] text-sm focus:outline-none focus:ring-2 focus:ring-[#cc1111] focus:ring-offset-2 focus:ring-offset-black transition-all"
              />
            </div>

            <div className="card p-3 text-xs text-[#555] font-mono leading-relaxed">
              Seu código{" "}
              <span className="text-[#888] tracking-widest">{invite.trim().toUpperCase()}</span>{" "}
              será sua chave de acesso. Guarde-o.
            </div>

            <Button
              type="submit"
              variant="solid"
              size="lg"
              className="w-full"
              loading={loading}
              disabled={usernameStatus !== "ok" || !displayName.trim()}
            >
              Criar conta
            </Button>
          </form>

          <button
            onClick={() => setStep("invite")}
            className="mt-4 text-xs text-[#555] hover:text-[#888] transition-colors"
          >
            ← Voltar
          </button>
        </>
      )}
    </div>
  );
}

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-black flex">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0, 0, 0.4, 1] as const }}
        className="flex-1 flex flex-col justify-center px-6 py-12 items-start lg:max-w-[480px] lg:flex-none"
      >
        <Suspense fallback={<div className="text-xs text-[#888]">Carregando...</div>}>
          <RegisterForm />
        </Suspense>
      </motion.div>

      {/* Decorative right panel */}
      <div className="hidden lg:flex flex-1 bg-[#0a0a0a] border-l border-[rgba(255,255,255,0.06)] items-center justify-center p-12">
        <div className="max-w-xs space-y-3">
          {[
            { label: "Sem senha",        desc: "Seu invite é sua autenticação." },
            { label: "Sem email",         desc: "Nenhum dado obrigatório além do username." },
            { label: "Comunidade seleta", desc: "Só entra quem recebe um convite." },
            { label: "Controle total",    desc: "Sua página, suas regras." },
          ].map((item) => (
            <div key={item.label} className="card p-4">
              <p className="text-xs font-semibold text-[#c0c0c0] mb-1">{item.label}</p>
              <p className="text-xs text-[#888]">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
