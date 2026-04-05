"use client";

import Image from "next/image";
import Link from "next/link";
import { Eye, Zap, Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import type { Profile, SocialLink } from "./page";

const VIDEO_ID = "zeUERsJeWCs";

const fmt = (n: number) =>
  n >= 1_000_000
    ? `${(n / 1_000_000).toFixed(1)}M`
    : n >= 1_000
    ? `${(n / 1_000).toFixed(1)}K`
    : n.toString();

// ── Platform icons ─────────────────────────────────────────────
function PlatformIcon({ platform, size = 17 }: { platform: string; size?: number }) {
  const s = size;
  switch (platform) {
    case "discord":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.032.054a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
        </svg>
      );
    case "twitch":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor">
          <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z" />
        </svg>
      );
    case "twitter":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case "instagram":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
        </svg>
      );
    case "youtube":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      );
    case "github":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
        </svg>
      );
    case "spotify":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
        </svg>
      );
    default:
      return null;
  }
}

// ── Motion variants ────────────────────────────────────────────
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.065, delayChildren: 0.08 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.32, ease: [0, 0, 0.4, 1] as const } },
};

// ── ProfilePage ────────────────────────────────────────────────
export default function ProfilePage({ profile }: { profile: Profile }) {
  const [muted, setMuted] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const toggleMute = () => {
    const cmd = muted ? "unMute" : "mute";
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func: cmd, args: [] }),
      "*"
    );
    setMuted((m) => !m);
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden flex flex-col items-center justify-center">

      {/* ── YouTube video — true fullscreen cover ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <iframe
          ref={iframeRef}
          src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&mute=1&loop=1&playlist=${VIDEO_ID}&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&enablejsapi=1&playsinline=1`}
          allow="autoplay; encrypted-media"
          style={{
            border: "none",
            pointerEvents: "none",
            position: "absolute",
            width: "calc(100vh * 16 / 9)",
            height: "calc(100vw * 9 / 16)",
            minWidth: "100vw",
            minHeight: "100vh",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>

      {/* Very dark overlay — mais sombrio */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "rgba(0,0,0,0.68)" }}
      />
      {/* Vinheta nas bordas */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 75% 75% at 50% 50%, transparent 30%, rgba(0,0,0,0.65) 100%)",
        }}
      />

      {/* ── Sound toggle ── */}
      <button
        onClick={toggleMute}
        className="absolute top-4 right-4 z-20 flex items-center gap-1.5 text-[10px] font-mono text-white/20 hover:text-white/50 transition-colors bg-black/60 border border-white/[0.05] rounded px-2.5 py-1.5 backdrop-blur-sm"
      >
        {muted ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
        {muted ? "som off" : "som on"}
      </button>

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-[300px] px-4 py-16">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center gap-5"
        >
          {/* Avatar */}
          <motion.div variants={fadeUp}>
            <div
              className="w-[86px] h-[86px] rounded-full p-[2px]"
              style={
                profile.premium
                  ? {
                      background:
                        "conic-gradient(from 0deg, #cc1111 0%, #2a0000 40%, transparent 52%, #2a0000 64%, #cc1111 100%)",
                    }
                  : { background: "rgba(255,255,255,0.07)" }
              }
            >
              <div className="w-full h-full rounded-full overflow-hidden bg-[#080808]">
                {profile.avatar ? (
                  <Image
                    src={profile.avatar}
                    alt={profile.displayName}
                    width={86}
                    height={86}
                    className="w-full h-full object-cover"
                    unoptimized
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-2xl font-mono font-bold text-[#333]">
                    {profile.avatarInitial}
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Name + clan tag */}
          <motion.div variants={fadeUp} className="text-center space-y-2">
            <h1 className="heading text-[18px] text-white/85 leading-none">{profile.displayName}</h1>
            {profile.clan && (
              <div className="flex items-center justify-center">
                <span
                  className="text-[10px] font-mono px-2 py-0.5 rounded-sm tracking-widest uppercase"
                  style={{
                    background: "rgba(204,17,17,0.1)",
                    border: "1px solid rgba(204,17,17,0.25)",
                    color: "rgba(204,17,17,0.85)",
                  }}
                >
                  ◈ {profile.clan}
                </span>
              </div>
            )}
          </motion.div>

          {/* Bio */}
          {profile.bio && (
            <motion.p
              variants={fadeUp}
              className="text-[12px] text-white/35 text-center leading-relaxed"
            >
              {profile.bio}
            </motion.p>
          )}

          {/* Activity */}
          {profile.activity && (
            <motion.div
              variants={fadeUp}
              className="flex items-center gap-2.5 w-full rounded-sm px-3 py-2.5"
              style={{
                background: "rgba(0,0,0,0.4)",
                border: "1px solid rgba(255,255,255,0.06)",
                backdropFilter: "blur(8px)",
              }}
            >
              <span className="relative flex shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#cc1111] opacity-40" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#cc1111]" />
              </span>
              <div className="min-w-0">
                <p className="text-[11px] text-white/55 font-mono truncate">{profile.activity.line1}</p>
                {profile.activity.line2 && (
                  <p className="text-[10px] text-white/25 font-mono truncate">{profile.activity.line2}</p>
                )}
              </div>
            </motion.div>
          )}

          {/* Social icons row */}
          {profile.links.length > 0 && (
            <motion.div variants={fadeUp} className="flex items-center gap-2 flex-wrap justify-center">
              {profile.links.map((link: SocialLink) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={link.label}
                  style={{ "--c": link.color } as React.CSSProperties}
                  className="
                    w-9 h-9 rounded-sm flex items-center justify-center
                    text-white/30
                    hover:text-[var(--c)]
                    hover:shadow-[0_0_12px_color-mix(in_srgb,var(--c)_20%,transparent)]
                    hover:-translate-y-0.5
                    transition-all duration-200
                  "
                >
                  <PlatformIcon platform={link.platform} size={15} />
                </a>
              ))}
            </motion.div>
          )}

          {/* Views + powered by */}
          <motion.div variants={fadeUp} className="flex items-center gap-4 pt-1">
            <div className="flex items-center gap-1 text-[10px] text-white/20 font-mono">
              <Eye className="w-3 h-3" />
              {fmt(profile.views)} views
            </div>
            <Link
              href="/"
              className="flex items-center gap-0.5 text-white/20 hover:text-white/45 transition-colors text-[10px] font-mono"
            >
              <Zap className="w-2.5 h-2.5" />
              hypo
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
