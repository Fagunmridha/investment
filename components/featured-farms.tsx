'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp, Clock, AlertCircle, ArrowRight } from 'lucide-react'
import { motion, Variants } from 'framer-motion'
import { useState, useEffect } from 'react'

interface Farm {
  id: string
  name: string
  category: string
  imageUrl?: string | null
  description?: string | null
  roi: number
  durationMonths: number
  riskLevel?: string | null
  collectedAmount: number
  targetFunding: number
}

export default function FeaturedFarms() {
  const [farms, setFarms] = useState<Farm[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFarms()
  }, [])

  const fetchFarms = async () => {
    try {
      const res = await fetch('/api/farms')
      if (res.ok) {
        const data = await res.json()
        // Show only active farms, limit to 6 for featured section
        const activeFarms = data
          .filter((farm: Farm) => farm.status === 'active')
          .slice(0, 6)
        setFarms(activeFarms)
      }
    } catch (error) {
      console.error('Error fetching farms:', error)
    } finally {
      setLoading(false)
    }
  }

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  return (
    <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6 tracking-tight"
          >
            Featured Investment Opportunities
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto"
          >
            Handpicked, high-yield agricultural projects with verified returns and sustainable impact.
          </motion.p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading farms...</p>
          </div>
        ) : farms.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No farms available at the moment.</p>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {farms.map((farm) => {
              const progressPercent = (farm.collectedAmount / farm.targetFunding) * 100
              const riskColor = farm.riskLevel === 'Low' ? 'text-emerald-600 bg-emerald-50' : farm.riskLevel === 'Medium' ? 'text-amber-600 bg-amber-50' : 'text-rose-600 bg-rose-50'
              const defaultImages: Record<string, string> = {
                'Crops': '/rice-farm-with-green-paddies.jpg',
                'Fruits': '/mango-orchard-trees-with-fruits.jpg',
                'Fisheries': '/fish-farming-ponds-water.jpg',
                'Agroforestry': '/farmers-in-lush-green-agricultural-field-with-crop.jpg',
                'Greenhouse': '/strawberry-field.png',
                'Livestock': '/rice-farm.jpg',
              }
              const imageUrl = farm.imageUrl || defaultImages[farm.category] || "/placeholder.svg"

              return (
                <motion.div key={farm.id} variants={itemVariants}>
                  <Card className="overflow-hidden border-border/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 group h-full flex flex-col">
                    <div className="relative h-56 overflow-hidden bg-secondary">
                      <img
                        src={imageUrl}
                        alt={farm.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                      <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm text-foreground px-3 py-1 rounded-full text-xs font-semibold shadow-sm border border-border/50">
                        {farm.category}
                      </div>
                      <div className="absolute bottom-4 left-4 text-white">
                        <p className="font-bold text-lg drop-shadow-md">{farm.name}</p>
                      </div>
                    </div>

                    <CardContent className="p-6 flex-1 flex flex-col">
                      <p className="text-muted-foreground text-sm mb-6 line-clamp-2">
                        {farm.description || 'No description available'}
                      </p>

                      <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-secondary/30 rounded-2xl border border-border/50">
                        <div className="text-center">
                          <p className="text-muted-foreground text-[10px] uppercase tracking-wider font-semibold mb-1">ROI</p>
                          <p className="font-bold text-primary text-lg">
                            {farm.roi}%
                          </p>
                        </div>
                        <div className="text-center border-x border-border/50">
                          <p className="text-muted-foreground text-[10px] uppercase tracking-wider font-semibold mb-1">Duration</p>
                          <p className="font-bold text-foreground text-lg">
                            {farm.durationMonths} <span className="text-xs font-normal text-muted-foreground">mo</span>
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-muted-foreground text-[10px] uppercase tracking-wider font-semibold mb-1">Risk</p>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${riskColor}`}>
                            {farm.riskLevel || 'N/A'}
                          </span>
                        </div>
                      </div>

                      {/* Progress bar */}
                      <div className="mt-auto space-y-3">
                        <div className="flex justify-between text-sm font-medium">
                          <span className="text-foreground">{Math.round(progressPercent)}% Funded</span>
                          <span className="text-muted-foreground">${farm.collectedAmount.toLocaleString()} / ${farm.targetFunding.toLocaleString()}</span>
                        </div>
                        <div className="w-full h-2.5 bg-secondary rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${Math.min(progressPercent, 100)}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                            className="h-full bg-primary rounded-full"
                          />
                        </div>

                        <Button className="w-full mt-4 bg-primary hover:bg-primary/90 group-hover:translate-y-0 transition-all" asChild>
                          <Link href={`/farms/${farm.id}`} className="flex items-center justify-center gap-2">
                            View Details <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>
        )}

        <div className="text-center mt-16">
          <Button asChild variant="outline" size="lg" className="rounded-full px-8 border-2 hover:bg-secondary/50">
            <Link href="/farms">View All Opportunities</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
