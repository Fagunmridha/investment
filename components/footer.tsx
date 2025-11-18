'use client'

import Link from 'next/link'
import { Leaf } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-secondary/50 border-t border-border py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Leaf className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-lg text-foreground">iFarmer</span>
            </div>
            <p className="text-sm text-muted-foreground">Investing in sustainable agriculture for a better future.</p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Platform</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/farms" className="text-muted-foreground hover:text-foreground transition">Browse Farms</Link></li>
              <li><Link href="/how-it-works" className="text-muted-foreground hover:text-foreground transition">How It Works</Link></li>
              <li><Link href="/pricing" className="text-muted-foreground hover:text-foreground transition">Pricing</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="text-muted-foreground hover:text-foreground transition">About Us</Link></li>
              <li><Link href="/blog" className="text-muted-foreground hover:text-foreground transition">Blog</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-foreground transition">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/privacy" className="text-muted-foreground hover:text-foreground transition">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-muted-foreground hover:text-foreground transition">Terms of Service</Link></li>
              <li><Link href="/disclaimer" className="text-muted-foreground hover:text-foreground transition">Disclaimer</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 iFarmer. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
