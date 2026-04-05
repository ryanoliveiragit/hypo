"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  { q: "Como funciona o sistema de invite?",
    a: "Cada código de invite é único e intransferível. Você recebe um código de alguém que já usa o Hypo e usa esse código para criar sua conta. O código também serve como sua chave de acesso." },
  { q: "O Premium é realmente vitalício?",
    a: "Sim. Você paga uma vez e tem acesso a todos os recursos premium para sempre, sem mensalidades ou cobranças recorrentes." },
  { q: "Como faço login se perdi meu código?",
    a: "Acesse /reset-password e informe seu username. Nossa equipe entrará em contato pelo Discord em até 24h." },
  { q: "Posso alterar meu username?",
    a: "Usuários Free podem alterar uma vez por mês. Usuários Premium podem alterar sem restrições." },
  { q: "Como funciona o Image Hosting?",
    a: "Usuários Premium têm 1 GB de armazenamento. Faça upload de imagens e use as URLs permanentes em qualquer lugar." },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-20 border-t border-[rgba(255,255,255,0.06)]">
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="mb-12">
          <p className="label-mono mb-3">FAQ</p>
          <h2 className="heading text-4xl sm:text-5xl text-[#c0c0c0] max-w-lg">
            Dúvidas frequentes.
          </h2>
        </div>

        <div className="max-w-2xl divide-y divide-[rgba(255,255,255,0.06)]">
          {faqs.map((faq, i) => (
            <div key={i}>
              <button
                className="w-full flex items-center justify-between py-4 text-left group"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className={`text-sm transition-colors duration-150 ${open === i ? "text-[#c0c0c0]" : "text-[#888] group-hover:text-[#c0c0c0]"}`}>
                  {faq.q}
                </span>
                {open === i
                  ? <Minus className="w-4 h-4 text-[#888] shrink-0 ml-4" />
                  : <Plus  className="w-4 h-4 text-[#888] shrink-0 ml-4" />
                }
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22, ease: [0.4, 0, 0.6, 1] as const }}
                    className="overflow-hidden"
                  >
                    <p className="pb-4 text-sm text-[#888] leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
