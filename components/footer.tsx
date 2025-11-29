'use client'

import Link from 'next/link'
import { Leaf, Facebook, Twitter, Instagram, Linkedin, Mail, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function Footer() {
  return (
    <footer className="bg-secondary/30 border-t border-border pt-16 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 transition-transform group-hover:scale-105">
                <Leaf className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-foreground group-hover:text-primary transition-colors">AgriVest</span>
            </Link>
            <p className="text-muted-foreground leading-relaxed max-w-xs">
              Empowering sustainable agriculture through transparent investment. Join us in cultivating a greener, more prosperous future.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary hover:bg-primary/5 transition-all duration-300"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-6 text-lg">Platform</h4>
            <ul className="space-y-4">
              {['Browse Farms', 'How It Works', 'Pricing', 'Success Stories'].map((item) => {
                const slug = item.toLowerCase().replace(/\s+/g, '-')
                const href = item === 'Browse Farms' ? '/farms' : `/${slug}`

                return (
                <li key={item}>
                  <Link
                    href={href}
                    className="text-muted-foreground hover:text-primary hover:translate-x-1 transition-all duration-300 inline-block"
                  >
                    {item}
                  </Link>
                </li>
              )})}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-6 text-lg">Company</h4>
            <ul className="space-y-4">
              {['About Us', 'Blog', 'Careers', 'Contact'].map((item) => {
                const slug = item.toLowerCase().replace(/\s+/g, '-')
                const href = item === 'About Us' ? '/about' : `/${slug}`

                return (
                <li key={item}>
                  <Link
                    href={href}
                    className="text-muted-foreground hover:text-primary hover:translate-x-1 transition-all duration-300 inline-block"
                  >
                    {item}
                  </Link>
                </li>
              )})}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-6 text-lg">Stay Updated</h4>
            <p className="text-muted-foreground mb-4">Subscribe to our newsletter for the latest investment opportunities.</p>
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="pl-10 bg-background border-border focus:border-primary focus:ring-primary/20"
                />
              </div>
              <Button className="w-full bg-primary hover:bg-primary/90 group">
                Subscribe <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>&copy; 2025 AgriVest. All rights reserved.</p>
          <div className="flex gap-8">
            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
            <Link href="/disclaimer" className="hover:text-foreground transition-colors">Disclaimer</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
