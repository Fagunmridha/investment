'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { TrendingUp, Clock, AlertCircle, MapPin, User, Leaf } from 'lucide-react'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const farmData = {
  id: 1,
  name: 'Green Valley Rice Farm',
  location: 'Khulna, Bangladesh',
  owner: 'Ahmed Farmer Co.',
  category: 'Crops',
  image: '/rice-farm-landscape.jpg',
  roi: 18.5,
  duration: '12 months',
  riskLevel: 'Low',
  collected: 75000,
  target: 100000,
  description: 'Premium rice cultivation in fertile delta lands with sustainable farming practices. Our farm spans 500 acres of the most productive agricultural land in the Khulna region.',
  chartData: [
    { month: 'Month 1', projected: 4500, actual: 4500 },
    { month: 'Month 2', projected: 4500, actual: 4700 },
    { month: 'Month 3', projected: 4500, actual: 4600 },
    { month: 'Month 4', projected: 4500, actual: 4800 },
    { month: 'Month 5', projected: 4500, actual: 4900 },
    { month: 'Month 6', projected: 4500, actual: 5100 },
  ]
}

export default function FarmDetailsPage({ params }: { params: { id: string } }) {
  const [investmentAmount, setInvestmentAmount] = useState('1000')
  const expectedReturn = parseFloat(investmentAmount) * (1 + farmData.roi / 100)

  const progressPercent = (farmData.collected / farmData.target) * 100

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navigation />
      
      <section className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Image */}
          <div className="relative h-96 rounded-2xl overflow-hidden mb-8 shadow-lg">
            <img
              src={farmData.image || "/placeholder.svg"}
              alt={farmData.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-block px-3 py-1 bg-primary text-primary-foreground text-sm font-semibold rounded-full">
                    {farmData.category}
                  </span>
                </div>
                <h1 className="text-4xl font-bold text-foreground mb-2">{farmData.name}</h1>
                <p className="text-muted-foreground flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  {farmData.location}
                </p>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-3 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-muted-foreground text-sm mb-2">Expected ROI</p>
                      <p className="text-3xl font-bold text-primary flex items-center justify-center gap-1">
                        <TrendingUp className="w-6 h-6" />
                        {farmData.roi}%
                      </p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-muted-foreground text-sm mb-2">Investment Period</p>
                      <p className="text-3xl font-bold text-foreground flex items-center justify-center gap-1">
                        <Clock className="w-6 h-6" />
                        {farmData.duration}
                      </p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-muted-foreground text-sm mb-2">Risk Level</p>
                      <p className={`text-3xl font-bold flex items-center justify-center gap-1 ${
                        farmData.riskLevel === 'Low' ? 'text-green-600' : 'text-yellow-600'
                      }`}>
                        <AlertCircle className="w-6 h-6" />
                        {farmData.riskLevel}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Description */}
              <Card>
                <CardHeader>
                  <CardTitle>About This Farm</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {farmData.description}
                  </p>
                </CardContent>
              </Card>

              {/* Investment Progress */}
              <Card>
                <CardHeader>
                  <CardTitle>Investment Progress</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-foreground font-medium">Total Funded</span>
                      <span className="text-muted-foreground">${farmData.collected.toLocaleString()} / ${farmData.target.toLocaleString()}</span>
                    </div>
                    <div className="w-full h-3 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all duration-300"
                        style={{ width: `${Math.min(progressPercent, 100)}%` }}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">{Math.round(progressPercent)}% funded</p>
                  </div>
                </CardContent>
              </Card>

              {/* Performance Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Projected vs Actual Returns</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={farmData.chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                      <XAxis dataKey="month" stroke="var(--color-muted-foreground)" />
                      <YAxis stroke="var(--color-muted-foreground)" />
                      <Tooltip contentStyle={{ backgroundColor: 'var(--color-card)', border: '1px solid var(--color-border)' }} />
                      <Legend />
                      <Bar dataKey="projected" fill="var(--color-muted)" />
                      <Bar dataKey="actual" fill="var(--color-primary)" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* FAQ */}
              <Card>
                <CardHeader>
                  <CardTitle>Frequently Asked Questions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">When do I receive returns?</h4>
                    <p className="text-muted-foreground text-sm">Returns are distributed monthly based on actual harvest and sales.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">What if the harvest fails?</h4>
                    <p className="text-muted-foreground text-sm">We have crop insurance that covers up to 80% of investment value.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Can I withdraw my investment early?</h4>
                    <p className="text-muted-foreground text-sm">Early withdrawal is possible but may incur a 5% penalty fee.</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Investment Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-20 shadow-lg">
                <CardHeader>
                  <CardTitle>Invest Now</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">Investment Amount ($)</label>
                    <Input
                      type="number"
                      value={investmentAmount}
                      onChange={(e) => setInvestmentAmount(e.target.value)}
                      min="100"
                      step="100"
                      className="bg-input text-foreground"
                    />
                    <p className="text-xs text-muted-foreground mt-2">Minimum investment: $100</p>
                  </div>

                  <div className="bg-secondary/50 p-4 rounded-lg space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Investment</span>
                      <span className="font-semibold text-foreground">${parseFloat(investmentAmount).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Expected ROI ({farmData.roi}%)</span>
                      <span className="font-semibold text-foreground">${(parseFloat(investmentAmount) * farmData.roi / 100).toLocaleString()}</span>
                    </div>
                    <div className="border-t border-border pt-2 flex justify-between">
                      <span className="font-medium text-foreground">Total Return</span>
                      <span className="font-bold text-primary text-lg">${expectedReturn.toLocaleString()}</span>
                    </div>
                  </div>

                  <Button className="w-full bg-primary hover:bg-primary/90 text-lg h-10">
                    Invest Now
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    By investing, you agree to our <Link href="/terms" className="text-primary hover:underline">Terms</Link>
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  )
}
