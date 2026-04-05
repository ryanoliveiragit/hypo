"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Plus, Trash2, GripVertical, ExternalLink, Link2 } from "lucide-react";
import { motion } from "framer-motion";

const initial = [
  { id: 1, label: "Twitter / X",    url: "https://twitter.com/demo",    icon: "twitter",  active: true  },
  { id: 2, label: "Instagram",      url: "https://instagram.com/demo",  icon: "instagram", active: true  },
  { id: 3, label: "Discord Server", url: "https://discord.gg/demo",     icon: "discord",  active: true  },
  { id: 4, label: "YouTube",        url: "https://youtube.com/@demo",   icon: "youtube",  active: false },
  { id: 5, label: "GitHub",         url: "https://github.com/demo",     icon: "github",   active: true  },
];

export default function LinksPage() {
  const [links, setLinks]   = useState(initial);
  const [adding, setAdding] = useState(false);
  const [form, setForm]     = useState({ label: "", url: "" });

  const toggle = (id: number) =>
    setLinks(links.map((l) => (l.id === id ? { ...l, active: !l.active } : l)));

  const remove = (id: number) =>
    setLinks(links.filter((l) => l.id !== id));

  const add = () => {
    if (!form.label || !form.url) return;
    setLinks([...links, { id: Date.now(), ...form, icon: "link", active: true }]);
    setForm({ label: "", url: "" });
    setAdding(false);
  };

  return (
    <div className="max-w-xl space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="label-mono mb-1">Links</p>
          <h1 className="heading text-2xl text-[#c0c0c0]">Gerenciar links</h1>
        </div>
        <Button variant="outline" size="sm" onClick={() => setAdding(true)}>
          <Plus className="w-3.5 h-3.5" />
          Adicionar
        </Button>
      </div>

      {adding && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-5 space-y-3"
        >
          <p className="label-mono text-[10px]">Novo link</p>
          <Input
            label="Nome"
            placeholder="ex: Instagram"
            value={form.label}
            onChange={(e) => setForm({ ...form, label: e.target.value })}
          />
          <Input
            label="URL"
            type="url"
            placeholder="https://..."
            prefix={<Link2 className="w-3.5 h-3.5" />}
            value={form.url}
            onChange={(e) => setForm({ ...form, url: e.target.value })}
          />
          <div className="flex gap-2 justify-end pt-1">
            <Button variant="ghost" size="sm" onClick={() => setAdding(false)}>Cancelar</Button>
            <Button variant="solid" size="sm" onClick={add}>Adicionar</Button>
          </div>
        </motion.div>
      )}

      <div className="divide-y divide-[rgba(255,255,255,0.06)]">
        {links.map((link) => (
          <div
            key={link.id}
            className={`flex items-center gap-3 py-3 transition-opacity duration-150 ${!link.active && "opacity-40"}`}
          >
            <GripVertical className="w-4 h-4 text-[#333] cursor-grab shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-[#c0c0c0] truncate">{link.label}</p>
              <p className="text-xs text-[#555] font-mono truncate">{link.url}</p>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1 text-[#555] hover:text-[#888] transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              {/* Toggle switch */}
              <button
                onClick={() => toggle(link.id)}
                className={`relative w-8 h-4.5 rounded-full transition-colors duration-200 ${link.active ? "bg-[#cc1111]" : "bg-[rgba(255,255,255,0.1)]"}`}
                style={{ height: "18px" }}
              >
                <span
                  className="absolute top-0.5 w-3.5 h-3.5 rounded-full bg-white shadow transition-all duration-200"
                  style={{ left: link.active ? "calc(100% - 16px)" : "2px" }}
                />
              </button>
              <button
                onClick={() => remove(link.id)}
                className="p-1 text-[#555] hover:text-[#ff6b6b] transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {links.length === 0 && (
        <div className="py-12 text-center">
          <Link2 className="w-8 h-8 text-[#333] mx-auto mb-3" />
          <p className="text-sm text-[#555]">Nenhum link adicionado.</p>
        </div>
      )}

      <hr className="divider" />
      <div className="flex justify-end">
        <Button variant="solid" size="md">Salvar</Button>
      </div>
    </div>
  );
}
