import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Hypo — Link-in-bio exclusivo por invite",
  description:
    "Crie sua página pessoal única. Compartilhe links, conquistas e presença online — acesso por convite.",
  keywords: ["link in bio", "perfil", "invite only", "criador de conteúdo"],
  openGraph: {
    title: "Hypo — Link-in-bio exclusivo por invite",
    description: "Acesso exclusivo por convite. Crie sua página pessoal única.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${GeistMono.variable}`}
    >
      <body className="min-h-screen bg-black text-[#c0c0c0] font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
