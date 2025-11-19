'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp, Clock, AlertCircle } from 'lucide-react'

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
  return (
    <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Featured Farms</h2>
          <p className="text-muted-foreground text-lg">Handpicked investment opportunities with verified returns</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {farms.map((farm) => {
            const progressPercent = (farm.collected / farm.target) * 100
            const riskColor = farm.riskLevel === 'Low' ? 'text-green-600' : farm.riskLevel === 'Medium' ? 'text-yellow-600' : 'text-red-600'
            
            return (
              <Card key={farm.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48 overflow-hidden bg-secondary">
                  <img
                    src={farm.image || "/placeholder.svg"}
                    alt={farm.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
                    {farm.category}
                  </div>
                </div>
                
                <CardHeader>
                  <CardTitle className="text-lg">{farm.name}</CardTitle>
                  <CardDescription>{farm.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-3 text-sm">
                    <div>
                      <p className="text-muted-foreground text-xs mb-1">ROI</p>
                      <p className="font-bold text-primary flex items-center gap-1">
                        <TrendingUp className="w-4 h-4" />
                        {farm.roi}%
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs mb-1">Duration</p>
                      <p className="font-bold flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {farm.duration}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs mb-1">Risk</p>
                      <p className={`font-bold flex items-center gap-1 ${riskColor}`}>
                        <AlertCircle className="w-4 h-4" />
                        {farm.riskLevel}
                      </p>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div>
                    <div className="flex justify-between text-xs text-muted-foreground mb-2">
                      <span>Funded</span>
                      <span>${farm.collected.toLocaleString()} / ${farm.target.toLocaleString()}</span>
                    </div>
                    <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all duration-300"
                        style={{ width: `${Math.min(progressPercent, 100)}%` }}
                      />
                    </div>
                  </div>

                  <Button className="w-full bg-primary hover:bg-primary/90" asChild>
                    <Link href={`/farms/${farm.id}`}>Invest Now</Link>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="text-center mt-12">
          <Button asChild variant="outline" size="lg">
            <Link href="/farms">View All Farms</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
