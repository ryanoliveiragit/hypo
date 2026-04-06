"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Ticket, Check, X, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

const TAKEN = ["admin", "hypo", "root", "demo"];

export default function HeroSection() {
  const [username, setUsername] = useState("");
  const [status, setStatus] = useState<"idle" | "checking" | "ok" | "taken">("idle");
  const router = useRouter();

  const check = (val: string) => {
    const v = val.toLowerCase().replace(/[^a-z0-9-_]/g, "");
    setUsername(v);
    if (v.length < 3) { setStatus("idle"); return; }
    setStatus("checking");
    setTimeout(() => setStatus(TAKEN.includes(v) ? "taken" : "ok"), 500);
  };

  return (
    <section className="relative pt-28 pb-20 overflow-hidden">
      {/* Subtle radial glow */}
      <div className="absolute inset-0 hero-glow pointer-events-none" />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative max-w-[1100px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0, 0, 0.4, 1] as const }}
          className="max-w-2xl"
        >
          {/* Label */}
          <div className="flex items-center gap-2 mb-6">
            <span className="status-dot status-dot-red" />
            <span className="label-mono">Acesso exclusivo por invite</span>
          </div>

          {/* Headline */}
          <h1 className="heading text-5xl sm:text-6xl lg:text-7xl text-[#c0c0c0] mb-6">
            Sua página.<br />
            Seu convite.
          </h1>

          <p className="text-[#888] text-base sm:text-lg leading-relaxed mb-10 max-w-xl">
            Uma página pessoal única, acessível apenas por código de convite.
            Sem cadastro público, sem spam — só quem importa entra.
          </p>

          {/* Username claim */}
          <div className="flex flex-col sm:flex-row gap-2 max-w-lg">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#555] text-sm font-mono select-none">
                hypo.lol/
              </span>
              <input
                type="text"
                placeholder="seu-usuario"
                value={username}
                onChange={(e) => check(e.target.value)}
                className="w-full h-9 bg-black border border-[rgba(255,255,255,0.1)] rounded-[var(--radius)] pl-[92px] pr-9 text-[#c0c0c0] placeholder:text-[#444] text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#cc1111] focus:ring-offset-2 focus:ring-offset-black transition-all"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2">
                {status === "checking" && <Loader2 className="w-3.5 h-3.5 text-[#888] animate-spin" />}
                {status === "ok"       && <Check   className="w-3.5 h-3.5 text-[#ff4444]" />}
                {status === "taken"    && <X       className="w-3.5 h-3.5 text-[#ff6b6b]" />}
              </span>
            </div>
            <Button
              variant="solid"
              size="md"
              onClick={() => status === "ok" && router.push(`/register?u=${username}`)}
              disabled={status !== "ok"}
            >
              Garantir
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </div>

          {status === "taken" && (
            <p className="mt-2 text-xs text-[#ff6b6b] font-mono">Username indisponível.</p>
          )}
          {status === "ok" && username && (
            <p className="mt-2 text-xs text-[#ff4444] font-mono">
              hypo.lol/{username} está disponível.
            </p>
          )}

          {/* CTA pair */}
          <div className="flex items-center gap-3 mt-8">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/pricing">Ver planos</Link>
            </Button>
            <Link
              href="/leaderboard"
              className="text-sm text-[#888] hover:text-[#c0c0c0] transition-colors inline-flex items-center gap-1"
            >
              Ver ranking
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </motion.div>

        {/* Right: code-card mockup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15, ease: [0, 0, 0.4, 1] as const }}
          className="hidden lg:block absolute right-6 top-28 w-72"
        >
          <div className="card p-4 text-xs font-mono leading-relaxed">
            <div className="flex items-center gap-1.5 mb-3 pb-3 border-b border-[rgba(255,255,255,0.06)]">
              <span className="w-2.5 h-2.5 rounded-full bg-[rgba(255,255,255,0.12)]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[rgba(255,255,255,0.12)]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[rgba(255,255,255,0.12)]" />
              <span className="ml-auto text-[#555] text-[10px]">hypo.lol/demo</span>
            </div>
            <div className="space-y-1 text-[#888]">
              <span className="text-[#555]">{"// "}</span>
              <span className="text-[#cc1111]">username</span>
              <span className="text-[#888]">: "demo"</span><br />
              <span className="text-[#555]">{"// "}</span>
              <span className="text-[#ff4444]">badge</span>
              <span className="text-[#888]">: "Early Adopter"</span><br />
              <span className="text-[#555]">{"// "}</span>
              <span className="text-[#f5a623]">views</span>
              <span className="text-[#888]">: 24_812</span><br />
              <span className="text-[#555]">{"// "}</span>
              <span className="text-[#c0c0c0]">links</span>
              <span className="text-[#888]">: [ ... ]</span>
            </div>
            <div className="mt-3 pt-3 border-t border-[rgba(255,255,255,0.06)] flex items-center gap-1.5">
              <span className="status-dot status-dot-green status-dot-pulse" />
              <span className="text-[10px] text-[#888]">Online agora</span>
            </div>
          </div>
          {/* Stats row below card */}
          <div className="grid grid-cols-3 gap-2 mt-2">
            {[
              { label: "users",  val: "48K" },
              { label: "views",  val: "2.4M" },
              { label: "uptime", val: "99.9%" },
            ].map((s) => (
              <div key={s.label} className="card p-2.5 text-center">
                <p className="text-xs font-mono font-bold text-[#c0c0c0]">{s.val}</p>
                <p className="label-mono text-[10px] mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
