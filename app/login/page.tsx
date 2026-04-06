"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { Zap, User, Lock, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [step, setStep] = useState<"username" | "password">("username");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const passwordRef = useRef<HTMLInputElement>(null);

  const usernameReady = username.trim().length >= 3;
  const passwordReady = password.length >= 6;

  useEffect(() => {
    if (step === "password") {
      passwordRef.current?.focus();
    }
  }, [step]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (step === "username") {
      if (!usernameReady) return;
      setStep("password");
      return;
    }
    if (!passwordReady) return;
    setLoading(true);

    try {
      const res = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username: username.trim(), password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error === "invalid_credentials" ? "Username ou senha incorretos." : data.error);
        setLoading(false);
        return;
      }

      window.location.href = "/dashboard";
    } catch {
      alert("Erro ao conectar ao servidor.");
      setLoading(false);
    }
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
          Primeiro confirme seu username. Em seguida, informaremos sua senha.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="label-mono block">Username</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#555]" />
              <input
                type="text"
                placeholder="hypo.lol/seu-usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value.toLowerCase())}
                autoFocus
                className="w-full h-9 bg-black border border-[rgba(255,255,255,0.1)] rounded-[var(--radius)] pl-9 pr-3 text-[#c0c0c0] placeholder:text-[#444] font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#cc1111] focus:ring-offset-2 focus:ring-offset-black transition-all"
              />
            </div>
            <p className="text-xs text-[#555] font-mono">Use pelo menos 3 caracteres.</p>
          </div>

          {step === "password" && (
            <div className="space-y-1.5">
              <label className="label-mono block">Senha</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#555]" />
                <input
                  ref={passwordRef}
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-9 bg-black border border-[rgba(255,255,255,0.1)] rounded-[var(--radius)] pl-9 pr-3 text-[#c0c0c0] font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#cc1111] focus:ring-offset-2 focus:ring-offset-black transition-all"
                />
              </div>
              <p className="text-xs text-[#555] font-mono">Digite sua senha secreta.</p>
            </div>
          )}

          <Button
            type="submit"
            variant="solid"
            size="lg"
            className="w-full"
            loading={loading}
            disabled={step === "username" ? !usernameReady : !passwordReady || loading}
          >
            {step === "username" ? "Continuar" : "Entrar"}
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
              <span className="label-mono text-[10px]">LOGIN</span>
              <span className="ml-auto flex items-center gap-1.5">
                <span className="status-dot status-dot-green" />
                <span className="text-[#888] text-[10px]">Online</span>
              </span>
            </div>
            <div className="space-y-1 text-[#888]">
              <div><span className="text-[#555]">user    </span><span className="text-[#c0c0c0]">@demo</span></div>
              <div><span className="text-[#555]">device  </span><span className="text-[#e53535]">desktop</span></div>
              <div><span className="text-[#555]">passkey </span><span className="text-[#888]">••••••••</span></div>
              <div><span className="text-[#555]">status  </span><span className="text-[#ff4444]">autenticado</span></div>
            </div>
          </div>
          <p className="text-xs text-[#555] leading-relaxed">
            Use sua credencial pessoal. Nunca compartilhe sua senha com ninguém.
          </p>
        </div>
      </div>
    </div>
  );
}
