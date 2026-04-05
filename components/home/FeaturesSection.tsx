"use client";

import { BarChart2, Shield, Zap, Globe, Image as Img, Link2, Palette, Layers } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  { icon: Link2,    title: "Links ilimitados",       desc: "Adicione quantos links quiser, sem limite de quantidade ou tipo."          },
  { icon: BarChart2,title: "Analytics em tempo real",desc: "Visualizações, cliques e engajamento com histórico completo."              },
  { icon: Img,      title: "Image hosting",          desc: "Hospede imagens com 1 GB de armazenamento e use as URLs onde quiser."      },
  { icon: Globe,    title: "SEO & OG tags",           desc: "Metadados dinâmicos por perfil para compartilhamento perfeito."            },
  { icon: Shield,   title: "Badges exclusivos",       desc: "Verified, Early Adopter, Premium — destaque quem realmente importa."      },
  { icon: Palette,  title: "Personalização total",    desc: "Cores, fontes, layouts e efeitos de fundo únicos para seu perfil."         },
  { icon: Zap,      title: "Rápido por padrão",       desc: "CDN global, zero JS desnecessário, tempo de carregamento <1s."            },
  { icon: Layers,   title: "Invite system",           desc: "Controle quem entra. Comunidade fechada, sem spam, sem ruído."            },
];

const container = {
  hidden:  {},
  show: {
    transition: { staggerChildren: 0.04, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0, 0, 0.4, 1] as const } },
};

export default function FeaturesSection() {
  return (
    <section className="py-20 border-t border-[rgba(255,255,255,0.06)]">
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="mb-12">
          <p className="label-mono mb-3">Funcionalidades</p>
          <h2 className="heading text-4xl sm:text-5xl text-[#c0c0c0] max-w-lg">
            Tudo que você precisa.
          </h2>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[rgba(255,255,255,0.06)]"
        >
          {features.map((f) => (
            <motion.div
              key={f.title}
              variants={item}
              className="bg-black p-6 group hover:bg-[#0a0a0a] transition-colors duration-150 cursor-default"
            >
              <f.icon className="w-4 h-4 text-[#888] mb-4 group-hover:text-[#c0c0c0] transition-colors duration-150" />
              <h3 className="text-sm font-semibold text-[#c0c0c0] mb-2">{f.title}</h3>
              <p className="text-xs text-[#888] leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
