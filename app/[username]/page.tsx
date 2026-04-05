import { Metadata } from "next";
import ProfilePage from "./ProfilePage";

export type SocialLink = {
  platform: string;
  label: string;
  url: string;
  /** hex color usado no hover/glow do botão */
  color: string;
};

export type ActivityStatus = {
  type: "music" | "game" | "coding" | "custom";
  line1: string;
  line2?: string;
};

export type Profile = {
  displayName: string;
  username: string;
  bio: string;
  /** URL ou emoji como fallback */
  avatar: string;
  avatarInitial: string;
  premium: boolean;
  verified: boolean;
  earlyAdopter: boolean;
  views: number;
  links: SocialLink[];
  activity: ActivityStatus | null;
  /** tag de clã/clube exibida no perfil */
  clan?: string;
  /** efeito de fundo do perfil */
  bg: "red-fog" | "noise" | "none";
};

// ── Mock profiles ──────────────────────────────────────────────
const profiles: Record<string, Profile> = {

  naafiriking: {
    displayName: "naafiriking",
    username:    "naafiriking",
    avatarInitial: "N",
    avatar: "https://distrokid.imgix.net/http%3A%2F%2Fgather.fandalism.com%2F2532463--0F2C9746-CA70-4693-939DA558D5B88B9A--0--603169--NAAFIRI.png?fm=jpg&q=75&w=800&s=a3bf3d59227d30d779d4000ca7c3f058",
    bio: "top diff. // league addict // darkness is comfort.",
    clan: "L9 Brasil",
    premium: true,
    verified: true,
    earlyAdopter: true,
    views: 38_412,
    bg: "red-fog",
    activity: {
      type: "game",
      line1: "League of Legends",
      line2: "GM — Naafiri OTP",
    },
    links: [

      { platform: "twitch",    label: "Twitch",       url: "#", color: "#9146ff" },
      { platform: "twitter",   label: "Twitter / X",  url: "#", color: "#e7e9ea" },
      { platform: "instagram", label: "Instagram",    url: "#", color: "#e1306c" },
      { platform: "github",    label: "GitHub",       url: "#", color: "#f0f6fc" },
    ],
  },

  demo: {
    displayName: "demo",
    username:    "demo",
    avatarInitial: "D",
    avatar: "",
    bio: "perfil de demonstração — crie o seu em hypo.to",
    premium: true,
    verified: true,
    earlyAdopter: false,
    views: 24_800,
    bg: "noise",
    activity: {
      type: "coding",
      line1: "Visual Studio Code",
      line2: "editando — hypo/app/page.tsx",
    },
    links: [
      { platform: "twitter",   label: "Twitter / X",  url: "#", color: "#e7e9ea" },
      { platform: "discord",   label: "Discord",      url: "#", color: "#5865f2" },
      { platform: "github",    label: "GitHub",       url: "#", color: "#f0f6fc" },
    ],
  },
};

// ── Metadata ───────────────────────────────────────────────────
type Params = { username: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { username } = await params;
  const p = profiles[username];
  const title = p ? `${p.displayName} — hypo` : `@${username} — hypo`;
  const desc  = p?.bio ?? `Perfil de @${username} no Hypo.`;
  return {
    title,
    description: desc,
    openGraph: { title, description: desc, type: "profile" },
  };
}

// ── Page ───────────────────────────────────────────────────────
export default async function Page({ params }: { params: Promise<Params> }) {
  const { username } = await params;
  const profile: Profile = profiles[username] ?? {
    displayName: username,
    username,
    avatarInitial: username[0]?.toUpperCase() ?? "?",
    avatar: "",
    bio: `hypo.to/${username}`,
    premium: false,
    verified: false,
    earlyAdopter: false,
    views: 0,
    bg: "none",
    activity: null,
    links: [],
  };
  return <ProfilePage profile={profile} />;
}
