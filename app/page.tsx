import Link from 'next/link'
import { ArrowRight, TrendingUp, Users, Leaf } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import HeroSection from '@/components/hero-section'
import StatsSection from '@/components/stats-section'
import FeaturedFarms from '@/components/featured-farms'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import Testimonials from '@/components/testimonials'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <StatsSection />
      <FeaturedFarms />
      <Testimonials />
      <Footer />
    </main>
  )
}
