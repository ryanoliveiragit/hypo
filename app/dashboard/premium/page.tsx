import Button from "@/components/ui/Button";
import { Check, ArrowRight } from "lucide-react";
import Link from "next/link";

const features = [
  "Layouts premium exclusivos",
  "Efeitos especiais: partículas, aurora",
  "Image hosting — 1 GB de armazenamento",
  "Analytics avançado com histórico completo",
  "Badge Premium exclusivo",
  "Fontes personalizadas",
  "SEO & OG tags customizados",
  "Suporte prioritário",
];

export default function PremiumPage() {
  return (
    <div className="max-w-xl space-y-8">
      <div>
        <p className="label-mono mb-1">Premium</p>
        <h1 className="heading text-2xl text-[#c0c0c0]">Desbloqueie tudo.</h1>
      </div>

      <div className="card p-6 border-[rgba(204,17,17,0.3)] bg-[rgba(204,17,17,0.03)] relative overflow-hidden">
        {/* Top accent line */}
        <span className="absolute top-0 left-0 right-0 h-px bg-[#cc1111] opacity-50" />

        <div className="flex items-end justify-between mb-6">
          <div>
            <p className="heading text-5xl text-[#c0c0c0]">R$ 29,90</p>
            <p className="text-xs text-[#555] font-mono mt-1">pagamento único vitalício</p>
          </div>
          <span className="text-xs font-mono px-2 py-1 rounded border border-[rgba(204,17,17,0.3)] text-[#e53535] bg-[rgba(204,17,17,0.1)]">
            Popular
          </span>
        </div>

        <p className="text-sm text-[#888] mb-6 leading-relaxed">
          Pague uma vez e tenha acesso a todos os recursos premium para sempre.
          Sem mensalidade. Sem renovação. Sem pegadinhas.
        </p>

        <Button variant="solid" size="lg" className="w-full mb-6" asChild>
          <Link href="/pricing">
            Obter Premium
            <ArrowRight className="w-4 h-4" />
          </Link>
        </Button>

        <ul className="space-y-2.5">
          {features.map((f) => (
            <li key={f} className="flex items-center gap-2.5 text-sm text-[#888]">
              <Check className="w-3.5 h-3.5 text-[#ff4444] shrink-0" />
              {f}
            </li>
          ))}
        </ul>
      </div>

      <div className="card p-4 flex items-center gap-3">
        <div className="w-1.5 h-1.5 rounded-full bg-[#ff4444] shadow-[0_0_6px_rgba(255,68,68,0.6)] shrink-0" />
        <p className="text-xs text-[#888]">
          Garantia de 7 dias. Se não gostar, devolvemos seu dinheiro.
        </p>
      </div>
    </div>
  );
}
