'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp, Clock, AlertCircle, Filter } from 'lucide-react'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import { Badge } from '@/components/ui/badge'

const allFarms = [
  {
    id: 1,
    name: 'Green Valley Rice Farm',
    category: 'Crops',
    image: '/rice-farm.jpg',
    description: 'Premium rice cultivation in fertile delta lands',
    roi: 18.5,
    duration: '12 months',
    riskLevel: 'Low',
    collected: 75000,
    target: 100000,
    minInvestment: 100,
    verified: true,
  },
  {
    id: 2,
    name: 'Mango Orchards Bangladesh',
    category: 'Fruits',
    image: '/mango-orchard.jpg',
    description: 'Organic mango cultivation',
    roi: 22.0,
    duration: '18 months',
    riskLevel: 'Medium',
    collected: 55000,
    target: 80000,
    minInvestment: 100,
    verified: true,
  },
  {
    id: 3,
    name: 'Aquaculture Fisheries',
    category: 'Fisheries',
    image: '/fish-farming.jpg',
    description: 'High-yield fish farming',
    roi: 20.5,
    duration: '10 months',
    riskLevel: 'Medium',
    collected: 92000,
    target: 120000,
    minInvestment: 150,
    verified: true,
  },
  {
    id: 4,
    name: 'Strawberry Fields',
    category: 'Fruits',
    image: '/strawberry-field.png',
    description: 'Premium strawberry cultivation',
    roi: 19.0,
    duration: '8 months',
    riskLevel: 'Low',
    collected: 60000,
    target: 90000,
    minInvestment: 100,
    verified: true,
  },
]

export default function FarmsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedRisk, setSelectedRisk] = useState('All')
  const [sortBy, setSortBy] = useState('newest')

  const categories = ['All', 'Crops', 'Fruits', 'Livestock', 'Fisheries']
  const riskLevels = ['All', 'Low', 'Medium', 'High']

  let filteredFarms = selectedCategory === 'All'
    ? allFarms
    : allFarms.filter(farm => farm.category === selectedCategory)

  filteredFarms = selectedRisk === 'All'
    ? filteredFarms
    : filteredFarms.filter(farm => farm.riskLevel === selectedRisk)

  if (sortBy === 'roi-high') {
    filteredFarms.sort((a, b) => b.roi - a.roi)
  } else if (sortBy === 'roi-low') {
    filteredFarms.sort((a, b) => a.roi - b.roi)
  } else if (sortBy === 'funded') {
    filteredFarms.sort((a, b) => (b.collected / b.target) - (a.collected / a.target))
  }

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navigation />
      
      <section className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">Browse Farm Opportunities</h1>
            <p className="text-muted-foreground text-lg">Discover verified investment opportunities with guaranteed returns</p>
          </div>

          {/* Filters */}
          <div className="bg-secondary/50 rounded-lg p-6 mb-8 border border-border space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="text-sm font-medium text-foreground block mb-3">Category</label>
                <div className="flex flex-wrap gap-2">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                        selectedCategory === cat
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-card text-foreground border border-border hover:bg-secondary'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground block mb-3">Risk Level</label>
                <div className="flex flex-wrap gap-2">
                  {riskLevels.map(risk => (
                    <button
                      key={risk}
                      onClick={() => setSelectedRisk(risk)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                        selectedRisk === risk
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-card text-foreground border border-border hover:bg-secondary'
                      }`}
                    >
                      {risk}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground block mb-3">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-card text-foreground"
                >
                  <option value="newest">Newest</option>
                  <option value="roi-high">Highest ROI</option>
                  <option value="roi-low">Lowest ROI</option>
                  <option value="funded">Most Funded</option>
                </select>
              </div>
            </div>
          </div>

          {/* Farm Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredFarms.map((farm) => {
              const progressPercent = (farm.collected / farm.target) * 100
              const riskColor = farm.riskLevel === 'Low' ? 'bg-green-100 text-green-800' : farm.riskLevel === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
              
              return (
                <Card key={farm.id} className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
                  <div className="relative h-40 overflow-hidden bg-secondary">
                    <img
                      src={farm.image || "/placeholder.svg"}
                      alt={farm.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                    />
                    <div className="absolute top-3 right-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
                      {farm.category}
                    </div>
                    {farm.verified && (
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-green-600">Verified</Badge>
                      </div>
                    )}
                  </div>
                  
                  <CardHeader className="pb-2 flex-1">
                    <CardTitle className="text-base line-clamp-2">{farm.name}</CardTitle>
                    <CardDescription className="text-xs line-clamp-2">{farm.description}</CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <p className="text-muted-foreground mb-1">ROI</p>
                        <p className="font-bold text-primary">{farm.roi}%</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-1">Risk</p>
                        <p className={`font-bold px-2 py-1 rounded text-center ${riskColor}`}>{farm.riskLevel}</p>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs text-muted-foreground mb-1">
                        <span>Funded</span>
                        <span>{Math.round(progressPercent)}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary"
                          style={{ width: `${Math.min(progressPercent, 100)}%` }}
                        />
                      </div>
                    </div>

                    <Button className="w-full bg-primary hover:bg-primary/90 text-sm h-8" asChild>
                      <Link href={`/farms/${farm.id}`}>View Details</Link>
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {filteredFarms.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No farms found with selected filters</p>
            </div>
          )}
        </div>
      </section>
      
      <Footer />
    </main>
  )
}
