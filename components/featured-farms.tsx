'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp, Clock, AlertCircle, ArrowRight } from 'lucide-react'
import { motion, Variants } from 'framer-motion'

const farms = [
  {
    id: 1,
    name: 'Green Valley Rice Farm',
    category: 'Crops',
    image: '/rice-farm-with-green-paddies.jpg',
    description: 'Premium rice cultivation in fertile delta lands',
    roi: 18.5,
    duration: '12 months',
    riskLevel: 'Low',
    collected: 75000,
    target: 100000,
  },
  {
    id: 2,
    name: 'Mango Orchards Bangladesh',
    category: 'Fruits',
    image: '/mango-orchard-trees-with-fruits.jpg',
    description: 'Organic mango cultivation in sustainable conditions',
    roi: 22.0,
    duration: '18 months',
    riskLevel: 'Medium',
    collected: 55000,
    target: 80000,
  },
  {
    id: 3,
    name: 'Aquaculture Fisheries',
    category: 'Fisheries',
    image: '/fish-farming-ponds-water.jpg',
    description: 'High-yield fish farming with modern techniques',
    roi: 20.5,
    duration: '10 months',
    riskLevel: 'Medium',
    collected: 92000,
    target: 120000,
  },
  {
    id: 4,
    name: 'Savannah Agroforestry Collective',
    category: 'Agroforestry',
    image: '/farmers-in-lush-green-agricultural-field-with-crop.jpg',
    description: 'Intercropped shea, moringa, and legumes restoring Sahel soil health',
    roi: 16.2,
    duration: '14 months',
    riskLevel: 'Low',
    collected: 48000,
    target: 70000,
  },
  {
    id: 5,
    name: 'Solar Greenhouse Network',
    category: 'Greenhouse',
    image: '/strawberry-field.png',
    description: 'Powered greenhouses producing berries and leafy greens year-round',
    roi: 19.7,
    duration: '9 months',
    riskLevel: 'Medium',
    collected: 61000,
    target: 90000,
  },
  {
    id: 6,
    name: 'Pasture-Raised Dairy Co-op',
    category: 'Livestock',
    image: '/rice-farm.jpg',
    description: 'Rotational grazing program with methane-capture incentives',
    roi: 15.4,
    duration: '15 months',
    riskLevel: 'Low',
    collected: 83000,
    target: 110000,
  },
]

export default function FeaturedFarms() {
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

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {farms.map((farm) => {
            const progressPercent = (farm.collected / farm.target) * 100
            const riskColor = farm.riskLevel === 'Low' ? 'text-emerald-600 bg-emerald-50' : farm.riskLevel === 'Medium' ? 'text-amber-600 bg-amber-50' : 'text-rose-600 bg-rose-50'

            return (
              <motion.div key={farm.id} variants={itemVariants}>
                <Card className="overflow-hidden border-border/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 group h-full flex flex-col">
                  <div className="relative h-56 overflow-hidden bg-secondary">
                    <img
                      src={farm.image || "/placeholder.svg"}
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
                    <p className="text-muted-foreground text-sm mb-6 line-clamp-2">{farm.description}</p>

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
                          {parseInt(farm.duration)} <span className="text-xs font-normal text-muted-foreground">mo</span>
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-muted-foreground text-[10px] uppercase tracking-wider font-semibold mb-1">Risk</p>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${riskColor}`}>
                          {farm.riskLevel}
                        </span>
                      </div>
                    </div>

                    {/* Progress bar */}
                    <div className="mt-auto space-y-3">
                      <div className="flex justify-between text-sm font-medium">
                        <span className="text-foreground">{Math.round(progressPercent)}% Funded</span>
                        <span className="text-muted-foreground">${farm.collected.toLocaleString()} / ${farm.target.toLocaleString()}</span>
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
                          Invest Now <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>

        <div className="text-center mt-16">
          <Button asChild variant="outline" size="lg" className="rounded-full px-8 border-2 hover:bg-secondary/50">
            <Link href="/farms">View All Opportunities</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
