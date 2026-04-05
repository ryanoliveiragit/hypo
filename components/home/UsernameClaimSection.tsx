"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Check, X, Loader2, ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";

export default function UsernameClaimSection() {
  const [username, setUsername] = useState("");
  const [status, setStatus] = useState<"idle" | "checking" | "ok" | "taken">("idle");
  const router = useRouter();

  useEffect(() => {
    if (username.length < 3) { setStatus("idle"); return; }
    setStatus("checking");
    const t = setTimeout(() => {
      const taken = ["admin", "hypo", "root", "support"].includes(username.toLowerCase());
      setStatus(taken ? "taken" : "ok");
    }, 600);
    return () => clearTimeout(t);
  }, [username]);

  return (
    <section className="py-16 border-t border-[rgba(255,255,255,0.06)] bg-[#0a0a0a]">
      <div className="max-w-[1100px] mx-auto px-6">
        <p className="label-mono mb-3">Username</p>
        <h2 className="heading text-3xl text-[#c0c0c0] mb-6">
          Seu username está disponível?
        </h2>

        <div className="flex flex-col sm:flex-row gap-2 max-w-lg">
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#555] text-sm font-mono select-none">
              hypo.to/
            </span>
            <input
              type="text"
              placeholder="seu-usuario"
              value={username}
              onChange={(e) =>
                setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9-_]/g, ""))
              }
              className="w-full h-9 bg-black border border-[rgba(255,255,255,0.1)] rounded-[var(--radius)] pl-[72px] pr-9 text-[#c0c0c0] placeholder:text-[#444] text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#cc1111] focus:ring-offset-2 focus:ring-offset-black transition-all"
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
            disabled={status !== "ok"}
            onClick={() => status === "ok" && router.push(`/register?u=${username}`)}
          >
            Garantir
            <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </div>

        {status === "ok" && username && (
          <p className="mt-2 text-xs font-mono text-[#ff4444]">
            hypo.to/{username} está disponível.
          </p>
        )}
        {status === "taken" && (
          <p className="mt-2 text-xs font-mono text-[#ff6b6b]">
            Username indisponível.
          </p>
        )}
      </div>
    </section>
  );
}
