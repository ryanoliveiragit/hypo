import Link from "next/link";
import Button from "@/components/ui/Button";
import { ArrowRight, Ticket } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-20 border-t border-[rgba(255,255,255,0.06)]">
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="max-w-lg">
          <Ticket className="w-5 h-5 text-[#cc1111] mb-5" />
          <h2 className="heading text-4xl sm:text-5xl text-[#c0c0c0] mb-4">
            Tem um invite?
          </h2>
          <p className="text-[#888] text-sm leading-relaxed mb-8">
            Crie sua conta agora e garanta seu username antes que alguém ocupe.
            Acesso exclusivo, comunidade seleta.
          </p>
          <div className="flex items-center gap-3">
            <Button variant="solid" size="lg" asChild>
              <Link href="/register">
                Criar minha conta
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button variant="ghost" size="lg" asChild>
              <Link href="/login">Já tenho conta</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
