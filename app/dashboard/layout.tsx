"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Zap, LayoutDashboard, Palette, Link2, Crown, Image,
  Settings, LogOut, Menu, X, ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const nav = [
  { icon: LayoutDashboard, label: "Overview",      href: "/dashboard"            },
  { icon: Link2,           label: "Links",         href: "/dashboard/links"      },
  { icon: Palette,         label: "Personalizar",  href: "/dashboard/customize"  },
  { icon: Image,           label: "Image Host",    href: "/dashboard/images"     },
  { icon: Crown,           label: "Premium",       href: "/dashboard/premium"    },
  { icon: Settings,        label: "Conta",         href: "/dashboard/settings"   },
];

function SidebarContent({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();
  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="h-14 flex items-center px-4 border-b border-[rgba(255,255,255,0.06)] shrink-0">
        <Link href="/" className="flex items-center gap-1.5">
          <Zap className="w-4 h-4 text-[#cc1111]" />
          <span className="text-sm font-bold tracking-tight" style={{ fontFamily: "GeistMono, monospace" }}>
            hypo
          </span>
        </Link>
        {onClose && (
          <button onClick={onClose} className="ml-auto text-[#888] hover:text-[#c0c0c0] transition-colors p-1">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 py-3 space-y-0.5 overflow-y-auto">
        {nav.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={cn(
                "flex items-center gap-2.5 px-3 py-2 rounded-[var(--radius-sm)] text-sm transition-colors duration-150",
                active
                  ? "bg-[rgba(255,255,255,0.06)] text-[#c0c0c0]"
                  : "text-[#888] hover:text-[#c0c0c0] hover:bg-[rgba(255,255,255,0.04)]"
              )}
            >
              <item.icon className="w-4 h-4 shrink-0" />
              <span>{item.label}</span>
              {item.label === "Premium" && (
                <span className="ml-auto text-[10px] font-mono px-1.5 py-0.5 rounded bg-[rgba(245,158,11,0.1)] text-[#f5a623] border border-[rgba(245,158,11,0.2)]">
                  PRO
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User */}
      <div className="p-2 border-t border-[rgba(255,255,255,0.06)] shrink-0">
        <div className="flex items-center gap-2.5 px-3 py-2 rounded-[var(--radius-sm)] mb-0.5">
          <div className="w-6 h-6 rounded-full bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.1)] flex items-center justify-center text-xs font-bold text-[#888] shrink-0">
            D
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-mono text-[#c0c0c0] truncate">demo_user</p>
            <p className="text-[10px] text-[#555] truncate">hypo.to/demo_user</p>
          </div>
          <a
            href="/demo_user"
            target="_blank"
            className="text-[#555] hover:text-[#888] transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
        <button className="flex items-center gap-2 px-3 py-2 w-full rounded-[var(--radius-sm)] text-xs text-[#555] hover:text-[#ff6b6b] hover:bg-[rgba(255,68,68,0.04)] transition-all">
          <LogOut className="w-3.5 h-3.5" />
          Sair
        </button>
      </div>
    </div>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black flex">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-[240px] bg-[#0a0a0a] border-r border-[rgba(255,255,255,0.06)] flex-col shrink-0 sticky top-0 h-screen">
        <SidebarContent />
      </aside>

      {/* Mobile sidebar drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 z-40 bg-black/70 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: -240 }}
              animate={{ x: 0 }}
              exit={{ x: -240 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 left-0 z-50 w-[240px] h-full bg-[#0a0a0a] border-r border-[rgba(255,255,255,0.06)] lg:hidden"
            >
              <SidebarContent onClose={() => setMobileOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main */}
      <div className="flex-1 flex flex-col min-h-screen min-w-0">
        {/* Top bar mobile */}
        <header className="h-14 glass-nav flex items-center px-4 lg:hidden sticky top-0 z-20">
          <button
            className="p-1 text-[#888] hover:text-[#c0c0c0] transition-colors"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="w-4 h-4" />
          </button>
          <Link href="/" className="flex items-center gap-1.5 mx-auto">
            <Zap className="w-3.5 h-3.5 text-[#cc1111]" />
            <span className="text-sm font-bold tracking-tight" style={{ fontFamily: "GeistMono, monospace" }}>hypo</span>
          </Link>
          <div className="w-6" />
        </header>

        <main className="flex-1 p-6 max-w-[1100px] w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
