import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PricingSection from "@/components/home/PricingSection";
import FAQSection from "@/components/home/FAQSection";
import { Check } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Preços — Hypo",
  description: "Plano Free e Premium vitalício. Uma vez, para sempre.",
};

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main className="pt-14">
        <div className="max-w-[1100px] mx-auto px-6 pt-16 pb-4">
          <p className="label-mono mb-3">Preços</p>
          <h1 className="heading text-5xl sm:text-7xl text-[#c0c0c0] mb-4">
            Simples e justo.
          </h1>
          <p className="text-[#888] text-base max-w-md leading-relaxed mb-10">
            Sem mensalidades. Sem renovações. Pague uma vez e tenha acesso
            vitalício a todos os recursos premium.
          </p>

          <div className="flex flex-wrap gap-4 mb-0">
            {["Pagamento único", "Acesso vitalício", "Garantia 7 dias", "Suporte prioritário"].map((t) => (
              <div key={t} className="flex items-center gap-1.5 text-xs text-[#888]">
                <Check className="w-3 h-3 text-[#ff4444]" />
                {t}
              </div>
            ))}
          </div>
        </div>

        <PricingSection />
        <FAQSection />
      </main>
      <Footer />
    </>
  );
}
