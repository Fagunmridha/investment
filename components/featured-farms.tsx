'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight } from 'lucide-react'
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
  status?: string
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
    <section className="py-10 sm:py-16 md:py-32 px-3 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-2xl sm:text-3xl md:text-5xl font-display font-bold text-foreground mb-3 sm:mb-6 tracking-tight"
          >
            Featured Investment Opportunities
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-muted-foreground text-sm sm:text-base md:text-xl max-w-2xl mx-auto"
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
            viewport={{ once: true, margin: "-40px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8"
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
                    <div className="relative h-44 sm:h-56 overflow-hidden bg-secondary">
                      <img
                        src={imageUrl}
                        alt={farm.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                      <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm text-foreground px-3 py-1 rounded-full text-xs font-semibold shadow-sm border border-border/50">
                        {farm.category}
                      </div>
                      <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 text-white">
                        <p className="font-bold text-base sm:text-lg drop-shadow-md">{farm.name}</p>
                      </div>
                    </div>

                    <CardContent className="p-4 sm:p-6 flex-1 flex flex-col">
                      <p className="text-muted-foreground text-xs sm:text-sm mb-4 sm:mb-6 line-clamp-2">
                        {farm.description || 'No description available'}
                      </p>

                      <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-6 p-3 sm:p-4 bg-secondary/30 rounded-2xl border border-border/50">
                        <div className="text-center">
                          <p className="text-muted-foreground text-[9px] sm:text-[10px] uppercase tracking-wider font-semibold mb-1">ROI</p>
                          <p className="font-bold text-primary text-base sm:text-lg">
                            {farm.roi}%
                          </p>
                        </div>
                        <div className="text-center border-x border-border/50 px-1">
                          <p className="text-muted-foreground text-[9px] sm:text-[10px] uppercase tracking-wider font-semibold mb-1">Duration</p>
                          <p className="font-bold text-foreground text-base sm:text-lg">
                            {farm.durationMonths}{' '}
                            <span className="text-[10px] sm:text-xs font-normal text-muted-foreground">mo</span>
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-muted-foreground text-[9px] sm:text-[10px] uppercase tracking-wider font-semibold mb-1">Risk</p>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] sm:text-xs font-medium ${riskColor}`}>
                            {farm.riskLevel || 'N/A'}
                          </span>
                        </div>
                      </div>

                      {/* Progress bar */}
                      <div className="mt-auto space-y-3">
                        <div className="flex flex-col xs:flex-row sm:flex-row gap-1 sm:gap-0 sm:items-center justify-between text-xs sm:text-sm font-medium">
                          <span className="text-foreground">{Math.round(progressPercent)}% Funded</span>
                          <span className="text-muted-foreground">${farm.collectedAmount.toLocaleString()} / ${farm.targetFunding.toLocaleString()}</span>
                        </div>
                        <div className="w-full h-2 bg-secondary rounded-full overflow-hidden sm:h-2.5">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${Math.min(progressPercent, 100)}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                            className="h-full bg-primary rounded-full"
                          />
                        </div>

                        <Button className="w-full mt-3 sm:mt-4 bg-primary hover:bg-primary/90 group-hover:translate-y-0 transition-all" asChild>
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

        <div className="text-center mt-10 sm:mt-16">
          <Button asChild variant="outline" size="lg" className="rounded-full px-6 sm:px-8 border-2 hover:bg-secondary/50">
            <Link href="/farms">View All Opportunities</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
