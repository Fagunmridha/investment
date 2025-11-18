"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function HeroSection() {
  const router = useRouter();
  const { data: session } = useSession(); // NEXT AUTH SESSION

  const handleStartInvesting = () => {
    if (session?.user) {
      router.push("/farms"); // Logged-in → Farms page
    } else {
      router.push("/signup"); // Not logged-in → Signup page
    }
  };

  return (
    <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="mb-6 inline-block px-4 py-2 bg-secondary rounded-full border border-primary/20">
          <span className="text-sm font-medium text-primary">
            Invest in Agriculture, Earn Profit
          </span>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight text-balance">
          Invest in Sustainable <span className="text-primary">Agriculture</span> & Earn Returns
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed text-pretty">
          Support local farmers and sustainable farming practices while earning guaranteed returns. Start investing from as little as $100.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          
          {/* ⭐ Updated Button (with NextAuth session logic) */}
          <Button
            size="lg"
            onClick={handleStartInvesting}
            className="bg-primary hover:bg-primary/90 text-lg flex items-center gap-2"
          >
            Start Investing
            <ArrowRight className="w-5 h-5" />
          </Button>

          <Button size="lg" variant="outline" asChild className="text-lg">
            <Link href="/farms">Browse Farms</Link>
          </Button>
        </div>

        <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden bg-secondary border border-border shadow-lg">
          <img
            src="/farmers-in-lush-green-agricultural-field-with-crop.jpg"
            alt="Agricultural landscape"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent"></div>
        </div>
      </div>
    </section>
  );
}
