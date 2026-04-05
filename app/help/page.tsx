import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Zap, BookOpen, Shield, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Docs — Hypo" };

const categories = [
  {
    icon: Zap,
    title: "Primeiros passos",
    articles: [
      "Como funciona o sistema de invite",
      "Como criar meu perfil",
      "Como adicionar links",
      "Como personalizar o perfil",
    ],
  },
  {
    icon: Shield,
    title: "Segurança & Acesso",
    articles: [
      "Meu código de invite",
      "Como recuperar o acesso",
      "Alterar meu username",
      "Excluir minha conta",
    ],
  },
  {
    icon: BookOpen,
    title: "Premium",
    articles: [
      "O que está incluso",
      "Como adquirir o Premium",
      "Política de reembolso",
      "Premium é vitalício?",
    ],
  },
];

export default function HelpPage() {
  return (
    <>
      <Navbar />
      <main className="pt-14 min-h-screen">
        <div className="max-w-[1100px] mx-auto px-6 py-16">
          <div className="mb-12">
            <p className="label-mono mb-3">Documentação</p>
            <h1 className="heading text-5xl text-[#c0c0c0] mb-4">Como podemos ajudar?</h1>

            {/* Search */}
            <div className="max-w-md relative">
              <input
                type="text"
                placeholder="Buscar artigos..."
                className="w-full h-9 bg-black border border-[rgba(255,255,255,0.1)] rounded-[var(--radius)] px-3 pr-9 text-[#c0c0c0] placeholder:text-[#444] text-sm focus:outline-none focus:ring-2 focus:ring-[#cc1111] focus:ring-offset-2 focus:ring-offset-black transition-all"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="grid sm:grid-cols-3 gap-px bg-[rgba(255,255,255,0.06)] mb-16">
            {categories.map((cat) => (
              <div key={cat.title} className="bg-black p-6 space-y-4">
                <div className="flex items-center gap-2">
                  <cat.icon className="w-4 h-4 text-[#888]" />
                  <p className="text-sm font-semibold text-[#c0c0c0]">{cat.title}</p>
                </div>
                <ul className="space-y-2">
                  {cat.articles.map((a) => (
                    <li key={a}>
                      <a
                        href="#"
                        className="flex items-center justify-between text-xs text-[#888] hover:text-[#c0c0c0] transition-colors group"
                      >
                        {a}
                        <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-50 transition-opacity" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Contact */}
          <div className="card p-6 max-w-lg">
            <p className="label-mono text-[10px] mb-2">Suporte</p>
            <h2 className="text-sm font-semibold text-[#c0c0c0] mb-2">Ainda com dúvidas?</h2>
            <p className="text-xs text-[#888] leading-relaxed mb-4">
              Nossa comunidade no Discord está sempre pronta para ajudar.
              Resposta em até 24h.
            </p>
            <Link
              href="#"
              className="inline-flex items-center gap-1.5 text-xs text-[#cc1111] hover:text-[#e53535] transition-colors"
            >
              Entrar no Discord
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
