import Link from "next/link";
import { Zap } from "lucide-react";

const links = {
  Produto:  [
    { href: "/pricing",     label: "Preços"         },
    { href: "/leaderboard", label: "Ranking"         },
    { href: "/help",        label: "Documentação"    },
  ],
  Suporte:  [
    { href: "/help",           label: "Central de ajuda" },
    { href: "/reset-password", label: "Recuperar acesso" },
  ],
  Legal:    [
    { href: "/terms",   label: "Termos"      },
    { href: "/privacy", label: "Privacidade" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-[rgba(255,255,255,0.06)] bg-black mt-auto">
      <div className="max-w-[1100px] mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-1.5 mb-4">
              <Zap className="w-3.5 h-3.5 text-[#cc1111]" />
              <span
                className="text-sm font-bold text-[#c0c0c0] tracking-tight"
                style={{ fontFamily: "GeistMono, monospace" }}
              >
                hypo
              </span>
            </Link>
            <p className="text-xs text-[#888] leading-relaxed max-w-[160px]">
              Página pessoal exclusiva por convite.
            </p>
            {/* Status */}
            <div className="flex items-center gap-1.5 mt-4">
              <span className="status-dot status-dot-green status-dot-pulse" />
              <span className="text-xs text-[#888]">Todos os sistemas normais</span>
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <p className="label-mono mb-3">{category}</p>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-xs text-[#888] hover:text-[#c0c0c0] transition-colors duration-150"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <hr className="divider mb-6" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-xs text-[#888]">© 2024 Hypo. Todos os direitos reservados.</p>
          <p className="text-xs text-[#888] font-mono">v0.1.0-alpha</p>
        </div>
      </div>
    </footer>
  );
}
