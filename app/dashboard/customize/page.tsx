"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

type Option = { id: string; label: string; free: boolean };

function OptionGrid({ options, value, onChange }: { options: Option[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {options.map((o) => (
        <button
          key={o.id}
          disabled={!o.free}
          onClick={() => o.free && onChange(o.id)}
          className={`relative px-4 py-3 rounded-[var(--radius)] border text-sm text-left transition-all duration-150 ${
            value === o.id
              ? "border-[#cc1111] bg-[rgba(204,17,17,0.06)] text-[#c0c0c0]"
              : o.free
                ? "border-[rgba(255,255,255,0.08)] text-[#888] hover:border-[rgba(255,255,255,0.16)] hover:text-[#c0c0c0]"
                : "border-[rgba(255,255,255,0.04)] text-[#444] cursor-not-allowed"
          }`}
        >
          {o.label}
          {!o.free && (
            <span className="absolute top-2 right-2 text-[10px] font-mono px-1.5 py-0.5 rounded bg-[rgba(245,158,11,0.1)] text-[#f5a623] border border-[rgba(245,158,11,0.2)]">
              PRO
            </span>
          )}
        </button>
      ))}
    </div>
  );
}

const layouts: Option[] = [
  { id: "centered",      label: "Centralizado",    free: true  },
  { id: "card",          label: "Card Moderno",     free: true  },
  { id: "minimal",       label: "Minimalista",      free: false },
  { id: "glassmorphism", label: "Glassmorphism",    free: false },
];

const effects: Option[] = [
  { id: "none",      label: "Nenhum",    free: true  },
  { id: "gradient",  label: "Gradiente", free: true  },
  { id: "particles", label: "Partículas",free: false },
  { id: "aurora",    label: "Aurora",    free: false },
];

const fonts: Option[] = [
  { id: "inter",   label: "Inter",            free: true  },
  { id: "geist",   label: "Geist Mono",        free: true  },
  { id: "cabinet", label: "Cabinet Grotesk",   free: false },
  { id: "syne",    label: "Syne",              free: false },
];

export default function CustomizePage() {
  const [layout,  setLayout]  = useState("centered");
  const [effect,  setEffect]  = useState("gradient");
  const [font,    setFont]    = useState("inter");
  const [accent,  setAccent]  = useState("#cc1111");
  const [bio,     setBio]     = useState("Desenvolvedor · Gamer · Creator");
  const [display, setDisplay] = useState("demo_user");

  return (
    <div className="max-w-xl space-y-8">
      <div>
        <p className="label-mono mb-1">Personalizar</p>
        <h1 className="heading text-2xl text-[#c0c0c0]">Aparência do perfil</h1>
      </div>

      {/* Profile info */}
      <section className="space-y-4">
        <p className="label-mono text-[10px]">Informações</p>
        <div className="card p-5 space-y-4">
          <Input label="Nome de exibição" value={display} onChange={(e) => setDisplay(e.target.value)} />
          <div className="space-y-1.5">
            <label className="label-mono block">Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
              maxLength={160}
              className="w-full bg-black border border-[rgba(255,255,255,0.1)] rounded-[var(--radius)] px-3 py-2.5 text-[#c0c0c0] placeholder:text-[#444] text-sm focus:outline-none focus:ring-2 focus:ring-[#cc1111] focus:ring-offset-2 focus:ring-offset-black transition-all resize-none"
            />
            <p className="text-xs text-[#555] font-mono text-right">{bio.length}/160</p>
          </div>
        </div>
      </section>

      {/* Layout */}
      <section className="space-y-4">
        <p className="label-mono text-[10px]">Layout</p>
        <OptionGrid options={layouts} value={layout} onChange={setLayout} />
      </section>

      {/* Effect */}
      <section className="space-y-4">
        <p className="label-mono text-[10px]">Efeito de fundo</p>
        <OptionGrid options={effects} value={effect} onChange={setEffect} />
      </section>

      {/* Font */}
      <section className="space-y-4">
        <p className="label-mono text-[10px]">Fonte</p>
        <OptionGrid options={fonts} value={font} onChange={setFont} />
      </section>

      {/* Accent */}
      <section className="space-y-3">
        <p className="label-mono text-[10px]">Cor de destaque</p>
        <div className="card p-4 flex items-center gap-4">
          <input
            type="color"
            value={accent}
            onChange={(e) => setAccent(e.target.value)}
            className="w-10 h-10 rounded-[var(--radius-sm)] border border-[rgba(255,255,255,0.08)] bg-transparent cursor-pointer p-1"
          />
          <div>
            <p className="text-sm font-mono text-[#c0c0c0]">{accent}</p>
            <p className="text-xs text-[#555]">Cor principal do perfil</p>
          </div>
        </div>
      </section>

      <hr className="divider" />
      <div className="flex justify-end">
        <Button variant="solid" size="md">Salvar alterações</Button>
      </div>
    </div>
  );
}
