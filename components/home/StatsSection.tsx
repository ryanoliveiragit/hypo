"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const stats = [
  { value: 48000,    label: "usuários ativos",       suffix: "+" },
  { value: 2400000,  label: "visualizações de perfil", suffix: "+" },
  { value: 890000,   label: "imagens hospedadas",    suffix: "+" },
  { value: 12000,    label: "assinantes premium",    suffix: "+" },
];

function fmt(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000)     return `${(n / 1_000).toFixed(0)}K`;
  return n.toString();
}

function CountUp({ to, start }: { to: number; start: boolean }) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!start) return;
    let frame: number;
    const duration = 1600;
    const t0 = performance.now();
    const step = (t: number) => {
      const p = Math.min((t - t0) / duration, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(e * to));
      if (p < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [to, start]);

  return <>{fmt(val)}</>;
}

export default function StatsSection() {
  const ref  = useRef<HTMLDivElement>(null);
  const [go, setGo] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setGo(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="border-t border-[rgba(255,255,255,0.06)] py-16">
      <div className="max-w-[1100px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, ease: [0, 0, 0.4, 1] as const }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[rgba(255,255,255,0.06)]"
        >
          {stats.map((s, i) => (
            <div key={s.label} className="bg-black p-8">
              <p className="heading text-4xl text-[#c0c0c0] mb-1">
                <CountUp to={s.value} start={go} />
                {s.suffix}
              </p>
              <p className="label-mono">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
