"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sprout } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { motion, Variants } from "framer-motion";

export default function HeroSection() {
  const router = useRouter();
  const { data: session } = useSession();

  const handleStartInvesting = () => {
    if (session?.user) {
      router.push("/farms");
    } else {
      router.push("/signup");
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.42, 0, 0.58, 1], // ease-in-out cubic bezier
      },
    },
  };

  return (
    <section className="relative min-h-[80vh] sm:min-h-[90vh] flex items-center justify-center overflow-hidden pt-20 pb-20 sm:pb-32">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center max-w-5xl mx-auto"
        >
          <motion.div variants={itemVariants} className="mb-8 flex justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
              <Sprout className="w-4 h-4" />
              <span>Sustainable Agriculture Investment Platform</span>
            </div>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-3xl sm:text-5xl md:text-7xl font-display font-bold text-foreground mb-4 sm:mb-8 leading-[1.15] tracking-tight text-balance"
          >
            Grow Your Wealth with <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">
              Nature's Best Assets
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg md:text-2xl text-muted-foreground mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed text-pretty"
          >
            Join thousands of investors supporting sustainable farming. Earn guaranteed returns while making a positive impact on the planet's future.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-5 justify-center mb-20"
          >
            <Button
              size="lg"
              onClick={handleStartInvesting}
              className="bg-primary hover:bg-primary/90 text-base sm:text-lg h-12 sm:h-14 px-6 sm:px-8 rounded-full shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/30 hover:-translate-y-1 transition-all duration-300"
            >
              Start Investing Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              asChild
              className="text-base sm:text-lg h-12 sm:h-14 px-6 sm:px-8 rounded-full border-2 hover:bg-secondary/50 transition-all duration-300"
            >
              <Link href="/farms">Explore Farms</Link>
            </Button>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="relative rounded-3xl overflow-hidden shadow-2xl border border-border/50 bg-card"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10" />
            <img
              src="/farmers-in-lush-green-agricultural-field-with-crop.jpg"
              alt="Sustainable farming landscape"
              className="w-full h-[260px] sm:h-[400px] md:h-[600px] object-cover transform hover:scale-105 transition-transform duration-700"
            />

            {/* Floating Stats Cards */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="absolute bottom-8 left-8 z-20 bg-background/90 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-border/50 hidden md:block"
            >
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground font-medium">Total Invested</span>
                <span className="text-3xl font-bold text-primary">$2.5M+</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="absolute bottom-8 right-8 z-20 bg-background/90 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-border/50 hidden md:block"
            >
              <div className="flex flex-col items-end">
                <span className="text-sm text-muted-foreground font-medium">Happy Investors</span>
                <span className="text-3xl font-bold text-foreground">5,000+</span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
