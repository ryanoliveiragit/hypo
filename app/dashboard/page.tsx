"use client";

import { Eye, Link2, Image, TrendingUp, Copy, ExternalLink } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";
import Badge from "@/components/ui/Badge";

const data = [
  { t: "00h", v: 12 }, { t: "02h", v: 8  }, { t: "04h", v: 5  },
  { t: "06h", v: 14 }, { t: "08h", v: 32 }, { t: "10h", v: 58 },
  { t: "12h", v: 87 }, { t: "14h", v: 74 }, { t: "16h", v: 93 },
  { t: "18h", v: 112}, { t: "20h", v: 98 }, { t: "22h", v: 67 },
];

const stats = [
  { icon: Eye,   label: "Views hoje",    value: "342",  delta: "+12%"  },
  { icon: Eye,   label: "Views totais",  value: "24.8K", delta: "+5%"  },
  { icon: Link2, label: "Links ativos",  value: "8",    delta: null    },
  { icon: Image, label: "Imagens",       value: "14",   delta: null    },
];

const Tip = ({ active, payload, label }: any) =>
  active && payload?.length ? (
    <div className="card px-3 py-2 text-xs font-mono">
      <p className="text-[#888]">{label}</p>
      <p className="text-[#c0c0c0] font-bold">{payload[0].value}</p>
    </div>
  ) : null;

const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 8 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.28, ease: [0, 0, 0.4, 1] as const } },
};

export default function DashboardPage() {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="show"
      className="space-y-8"
    >
      {/* Header */}
      <motion.div variants={fadeUp}>
        <p className="label-mono mb-1">Dashboard</p>
        <h1 className="heading text-2xl text-[#c0c0c0]">Overview</h1>
      </motion.div>

      {/* Profile strip */}
      <motion.div variants={fadeUp} className="card p-4 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.1)] flex items-center justify-center text-xs font-bold text-[#888] shrink-0">
          D
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-mono text-[#c0c0c0]">demo_user</span>
            <Badge variant="amber">Premium</Badge>
            <Badge variant="blue">Verified</Badge>
          </div>
          <p className="text-xs text-[#555] font-mono mt-0.5">
            UID: usr_a1b2c3d4
          </p>
        </div>
        <a
          href="/demo_user"
          target="_blank"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--radius-sm)] text-xs text-[#888] hover:text-[#c0c0c0] border border-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.16)] transition-all"
        >
          <ExternalLink className="w-3 h-3" />
          Ver perfil
        </a>
      </motion.div>

      {/* Stats */}
      <motion.div variants={fadeUp} className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[rgba(255,255,255,0.06)]">
        {stats.map((s) => (
          <div key={s.label} className="bg-black p-5">
            <p className="label-mono text-[10px] mb-2">{s.label}</p>
            <p className="heading text-3xl text-[#c0c0c0]">{s.value}</p>
            {s.delta && (
              <p className="flex items-center gap-1 text-xs text-[#ff4444] font-mono mt-1">
                <TrendingUp className="w-3 h-3" />
                {s.delta}
              </p>
            )}
          </div>
        ))}
      </motion.div>

      {/* Chart */}
      <motion.div variants={fadeUp} className="card p-5">
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="label-mono text-[10px] mb-0.5">Analytics</p>
            <p className="text-sm font-mono text-[#c0c0c0]">Visualizações — últimas 24h</p>
          </div>
          <span className="text-xs font-mono text-[#555] border border-[rgba(255,255,255,0.06)] rounded px-2 py-1">
            Hoje
          </span>
        </div>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: -24 }}>
              <defs>
                <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#cc1111" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#cc1111" stopOpacity={0}    />
                </linearGradient>
              </defs>
              <XAxis dataKey="t" tick={{ fill: "#555", fontSize: 10, fontFamily: "monospace" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#555", fontSize: 10, fontFamily: "monospace" }} axisLine={false} tickLine={false} />
              <Tooltip content={<Tip />} cursor={{ stroke: "rgba(255,255,255,0.04)" }} />
              <Area
                type="monotone"
                dataKey="v"
                stroke="#cc1111"
                strokeWidth={1.5}
                fill="url(#g)"
                dot={false}
                activeDot={{ r: 3, fill: "#cc1111", stroke: "#000", strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Quick links */}
      <motion.div variants={fadeUp} className="grid sm:grid-cols-3 gap-2">
        {[
          { icon: Link2,         label: "Gerenciar links",   href: "/dashboard/links"  },
          { icon: Image,         label: "Image hosting",     href: "/dashboard/images" },
          { icon: ExternalLink,  label: "Ver perfil",        href: "/demo_user", external: true },
        ].map((a) => (
          <a
            key={a.label}
            href={a.href}
            target={a.external ? "_blank" : undefined}
            className="card card-hover p-4 flex items-center gap-3 group"
          >
            <a.icon className="w-4 h-4 text-[#555] group-hover:text-[#c0c0c0] transition-colors duration-150 shrink-0" />
            <span className="text-sm text-[#888] group-hover:text-[#c0c0c0] transition-colors duration-150">
              {a.label}
            </span>
          </a>
        ))}
      </motion.div>
    </motion.div>
  );
}
