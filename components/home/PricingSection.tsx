"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

const plans = [
  {
    id: "free",
    name: "Free",
    price: "R$ 0",
    cycle: "para sempre",
    desc: "Comece agora, sem cartão de crédito.",
    featured: false,
    cta: "Registrar",
    href: "/register",
    features: [
      "Username único",
      "Links ilimitados",
      "Redes sociais",
      "Analytics básico",
      "Personalização básica",
    ],
    missing: [
      "Badge exclusivo",
      "Layouts premium",
      "Fontes personalizadas",
      "Efeitos especiais",
      "Image hosting",
      "SEO customizado",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    price: "R$ 29,90",
    cycle: "pagamento único vitalício",
    desc: "Uma vez. Para sempre. Sem mensalidade.",
    featured: true,
    cta: "Obter Premium",
    href: "/pricing",
    features: [
      "Tudo do plano Free",
      "Badge Premium exclusivo",
      "Layouts premium",
      "Fontes personalizadas",
      "Efeitos especiais",
      "Image hosting 1 GB",
      "SEO & OG tags customizados",
      "Analytics avançado",
      "Suporte prioritário",
    ],
    missing: [],
  },
];

export default function PricingSection() {
  return (
    <section className="py-20 border-t border-[rgba(255,255,255,0.06)]" id="pricing">
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="mb-12">
          <p className="label-mono mb-3">Preços</p>
          <h2 className="heading text-4xl sm:text-5xl text-[#c0c0c0] max-w-lg">
            Simples e justo.
          </h2>
          <p className="text-[#888] text-sm mt-3">
            Pague uma vez e tenha acesso vitalício. Sem pegadinhas.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 max-w-2xl">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.06, ease: [0, 0, 0.4, 1] as const }}
              className={`relative flex flex-col p-6 rounded-[var(--radius)] border transition-all duration-150 ${
                plan.featured
                  ? "border-[#cc1111] bg-[#0a0a0a] shadow-[0_0_0_1px_rgba(204,17,17,0.15)]"
                  : "border-[rgba(255,255,255,0.08)] bg-[#0a0a0a] hover:border-[rgba(255,255,255,0.16)]"
              }`}
            >
              {plan.featured && (
                <span className="absolute -top-px left-4 right-4 h-px bg-[#cc1111] opacity-60" />
              )}

              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="label-mono">{plan.name}</span>
                  {plan.featured && (
                    <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-[rgba(204,17,17,0.1)] text-[#e53535] border border-[rgba(204,17,17,0.2)]">
                      Popular
                    </span>
                  )}
                </div>
                <p className="heading text-4xl text-[#c0c0c0]">{plan.price}</p>
                <p className="text-[10px] text-[#555] font-mono mt-1">{plan.cycle}</p>
                <p className="text-xs text-[#888] mt-3 leading-relaxed">{plan.desc}</p>
              </div>

              <Button
                variant={plan.featured ? "solid" : "outline"}
                size="md"
                className="w-full mb-6"
                asChild
              >
                <Link href={plan.href}>{plan.cta}</Link>
              </Button>

              <ul className="space-y-2 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-xs text-[#888]">
                    <Check className="w-3 h-3 text-[#ff4444] mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
                {plan.missing.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-xs text-[#444] line-through">
                    <span className="w-3 h-3 mt-0.5 shrink-0 flex items-center justify-center text-[#333]">–</span>
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
