import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Badge from "@/components/ui/Badge";
import { Eye, Trophy } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ranking — Hypo",
  description: "Os perfis mais visitados do Hypo.",
};

const leaders = [
  { rank: 1,  name: "Æri Studio",  username: "aeri",    views: 142800, badge: "premium"  },
  { rank: 2,  name: "Volt Dev",    username: "voltdev", views: 98400,  badge: "verified" },
  { rank: 3,  name: "Neon Plays",  username: "neon",    views: 87200,  badge: "premium"  },
  { rank: 4,  name: "Sora Art",    username: "soraart", views: 74100,  badge: "verified" },
  { rank: 5,  name: "Kairo",       username: "kairo",   views: 65500,  badge: "premium"  },
  { rank: 6,  name: "Lyra Music",  username: "lyra",    views: 58300,  badge: "default"  },
  { rank: 7,  name: "ZeroX",       username: "zerox",   views: 51200,  badge: "verified" },
  { rank: 8,  name: "Mako Dev",    username: "mako",    views: 47800,  badge: "premium"  },
  { rank: 9,  name: "Echo Coder",  username: "echo",    views: 43100,  badge: "default"  },
  { rank: 10, name: "Nova Creator",username: "nova",    views: 38700,  badge: "verified" },
];

const fmt = (n: number) =>
  n >= 1000 ? `${(n / 1000).toFixed(1)}K` : n.toString();

const badgeMap: Record<string, { variant: "amber" | "blue" | "default"; label: string }> = {
  premium:  { variant: "amber", label: "Premium"  },
  verified: { variant: "blue",  label: "Verified" },
  default:  { variant: "default", label: "Free"   },
};

export default function LeaderboardPage() {
  return (
    <>
      <Navbar />
      <main className="pt-14 min-h-screen">
        <div className="max-w-[1100px] mx-auto px-6 py-16">
          {/* Header */}
          <div className="mb-10">
            <p className="label-mono mb-2">Ranking</p>
            <h1 className="heading text-5xl text-[#c0c0c0] mb-3">Top perfis.</h1>
            <p className="text-[#888] text-sm">
              Os perfis mais visitados do Hypo. Atualizado em tempo real.
            </p>
          </div>

          {/* Table */}
          <div className="card overflow-hidden">
            <div className="grid grid-cols-[2rem_1fr_auto_auto] gap-x-4 px-5 py-2.5 border-b border-[rgba(255,255,255,0.06)]">
              <span className="label-mono text-[10px]">#</span>
              <span className="label-mono text-[10px]">Usuário</span>
              <span className="label-mono text-[10px]">Badge</span>
              <span className="label-mono text-[10px]">Views</span>
            </div>

            <div className="divide-y divide-[rgba(255,255,255,0.04)]">
              {leaders.map((l) => {
                const b = badgeMap[l.badge];
                return (
                  <div
                    key={l.username}
                    className="grid grid-cols-[2rem_1fr_auto_auto] gap-x-4 px-5 py-3.5 items-center hover:bg-[rgba(255,255,255,0.02)] transition-colors duration-150 group"
                  >
                    {/* Rank */}
                    <span className={`text-sm font-mono font-bold ${l.rank <= 3 ? "text-[#f5a623]" : "text-[#555]"}`}>
                      {l.rank}
                    </span>

                    {/* User */}
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-7 h-7 rounded-full bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.08)] flex items-center justify-center text-xs font-bold text-[#888] shrink-0">
                        {l.name[0]}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm text-[#c0c0c0] font-mono truncate group-hover:text-white transition-colors">
                          {l.name}
                        </p>
                        <p className="text-xs text-[#555] truncate">/{l.username}</p>
                      </div>
                    </div>

                    {/* Badge */}
                    <Badge variant={b.variant}>{b.label}</Badge>

                    {/* Views */}
                    <div className="flex items-center gap-1 text-xs font-mono text-[#888]">
                      <Eye className="w-3 h-3" />
                      {fmt(l.views)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
