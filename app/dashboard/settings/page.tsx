"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { User, Bell, Link2, Trash2 } from "lucide-react";

export default function SettingsPage() {
  const [username, setUsername] = useState("demo_user");

  return (
    <div className="max-w-xl space-y-8">
      <div>
        <p className="label-mono mb-1">Configurações</p>
        <h1 className="heading text-2xl text-[#c0c0c0]">Conta</h1>
      </div>

      {/* Account */}
      <section className="space-y-4">
        <p className="label-mono text-[10px]">Informações</p>
        <div className="card p-5 space-y-4">
          <div className="space-y-1.5">
            <label className="label-mono block">Username</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#555] text-sm font-mono select-none">hypo.lol/</span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full h-9 bg-black border border-[rgba(255,255,255,0.1)] rounded-[var(--radius)] pl-[76px] pr-3 text-[#c0c0c0] font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#cc1111] focus:ring-offset-2 focus:ring-offset-black transition-all"
              />
            </div>
            <p className="text-xs text-[#555] font-mono">Pode ser alterado 1× por mês (plano Free)</p>
          </div>
          <Button variant="outline" size="sm">Salvar</Button>
        </div>
      </section>

      {/* Connections */}
      <section className="space-y-4">
        <p className="label-mono text-[10px]">Conexões</p>
        <div className="card p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link2 className="w-4 h-4 text-[#888]" />
              <div>
                <p className="text-sm text-[#c0c0c0]">Discord</p>
                <p className="text-xs text-[#555] font-mono">Não conectado</p>
              </div>
            </div>
            <Button variant="outline" size="sm">Conectar</Button>
          </div>
        </div>
      </section>

      {/* Notifications */}
      <section className="space-y-4">
        <p className="label-mono text-[10px]">Notificações</p>
        <div className="card divide-y divide-[rgba(255,255,255,0.06)]">
          {[
            { label: "Novidades e atualizações", on: true  },
            { label: "Relatório semanal de views", on: true  },
            { label: "Alertas de segurança",       on: true  },
          ].map((n, i) => (
            <div key={i} className="flex items-center justify-between px-5 py-3.5">
              <p className="text-sm text-[#888]">{n.label}</p>
              <button
                className={`relative w-8 rounded-full transition-colors duration-200 ${n.on ? "bg-[#cc1111]" : "bg-[rgba(255,255,255,0.1)]"}`}
                style={{ height: "18px" }}
              >
                <span
                  className="absolute top-0.5 w-3.5 h-3.5 rounded-full bg-white shadow transition-all duration-200"
                  style={{ left: n.on ? "calc(100% - 16px)" : "2px" }}
                />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Danger */}
      <section className="space-y-4">
        <p className="label-mono text-[10px] text-[#ff6b6b]">Zona de perigo</p>
        <div className="border border-[rgba(255,68,68,0.15)] rounded-[var(--radius)] p-5 bg-[rgba(255,68,68,0.03)]">
          <p className="text-sm text-[#888] mb-4 leading-relaxed">
            Ao excluir sua conta, todos os dados serão removidos permanentemente. Esta ação não pode ser desfeita.
          </p>
          <Button variant="danger" size="sm">
            <Trash2 className="w-3.5 h-3.5" />
            Excluir minha conta
          </Button>
        </div>
      </section>
    </div>
  );
}
