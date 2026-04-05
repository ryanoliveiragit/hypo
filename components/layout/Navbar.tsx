"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Button from "@/components/ui/Button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import logoAsset from "@/public/logo.png";

const navLinks = [
  { href: "/help",        label: "Docs"    },
  { href: "/leaderboard", label: "Ranking" },
  { href: "/pricing",     label: "Preços"  },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 h-14 glass-nav">
        <div className="max-w-[1100px] mx-auto px-6 h-full flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Image
              src={logoAsset}
              alt="Logo Hypo"
              width={48}
              height={48}
              className="w-12 h-12 object-contain"
              priority
            />
            <span
              className="text-sm font-bold text-[#c0c0c0] tracking-tight"
              style={{ fontFamily: "GeistMono, monospace" }}
            >
              hypo
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-1.5 rounded-[var(--radius-sm)] text-sm transition-colors duration-150",
                  pathname === link.href
                    ? "text-[#c0c0c0] bg-[rgba(255,255,255,0.06)]"
                    : "text-[#888] hover:text-[#c0c0c0]"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Auth */}
          <div className="hidden md:flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/login">Entrar</Link>
            </Button>
            <Button variant="solid" size="sm" asChild>
              <Link href="/register">Tenho um invite</Link>
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 text-[#888] hover:text-[#c0c0c0] transition-colors"
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      {open && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          onClick={() => setOpen(false)}
        >
          <div className="absolute inset-0 bg-black/60" />
          <nav
            className="absolute top-14 left-0 right-0 bg-[#0a0a0a] border-b border-[rgba(255,255,255,0.06)] p-4 space-y-1"
            onClick={(e) => e.stopPropagation()}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-3 py-2 rounded text-sm text-[#888] hover:text-[#c0c0c0] hover:bg-[rgba(255,255,255,0.04)] transition-colors"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <hr className="divider my-2" />
            <div className="flex flex-col gap-2 pt-1">
              <Button variant="ghost" size="sm" className="justify-start" asChild>
                <Link href="/login" onClick={() => setOpen(false)}>Entrar</Link>
              </Button>
              <Button variant="solid" size="sm" className="justify-start" asChild>
                <Link href="/register" onClick={() => setOpen(false)}>Tenho um invite</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
