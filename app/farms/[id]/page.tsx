'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, Clock, AlertCircle, MapPin, User, Leaf, DollarSign, Target, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react'
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

    
      <section className="relative">
        <div className="relative h-[500px] md:h-[600px] overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={farmData.image || "/placeholder.svg"}
              alt={farmData.name}
              className="w-full h-full object-cover scale-105 transition-transform duration-700 hover:scale-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/40" />
          </div>

         
          <div className="relative z-10 h-full flex items-end">
            <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-12">
              <div className="max-w-3xl">
                <div className="flex items-center gap-3 mb-4">
                  <Badge className="bg-primary/90 backdrop-blur-sm text-primary-foreground px-4 py-1.5 text-sm font-semibold border-0 shadow-lg">
                    <Leaf className="w-3.5 h-3.5 mr-1.5" />
                    {farmData.category}
                  </Badge>
                  <Badge variant="outline" className="backdrop-blur-sm bg-background/50 border-white/20 text-foreground">
                    <MapPin className="w-3.5 h-3.5 mr-1.5" />
                    {farmData.location}
                  </Badge>
                </div>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4 leading-tight drop-shadow-lg">
                  {farmData.name}
                </h1>
                <p className="text-lg md:text-xl text-foreground/90 max-w-2xl leading-relaxed">
                  {farmData.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="flex-1 py-12 px-4 sm:px-6 lg:px-8 -mt-20 relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
            <div className="lg:col-span-2 space-y-8">
            
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                        <TrendingUp className="w-6 h-6 text-primary" />
                      </div>
                      <Sparkles className="w-5 h-5 text-primary/50" />
                    </div>
                    <p className="text-muted-foreground text-sm font-medium mb-1">Expected ROI</p>
                    <p className="text-4xl font-bold text-primary mb-1">{farmData.roi}%</p>
                    <p className="text-xs text-muted-foreground">Annual return</p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-border/50 bg-gradient-to-br from-background to-secondary/30 hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                        <Clock className="w-6 h-6 text-foreground" />
                      </div>
                      <Target className="w-5 h-5 text-muted-foreground/50" />
                    </div>
                    <p className="text-muted-foreground text-sm font-medium mb-1">Duration</p>
                    <p className="text-4xl font-bold text-foreground mb-1">{farmData.duration}</p>
                    <p className="text-xs text-muted-foreground">Investment period</p>
                  </CardContent>
                </Card>

                <Card className={`border-2 ${
                  farmData.riskLevel === 'Low' 
                    ? 'border-green-500/30 bg-gradient-to-br from-green-500/10 to-green-500/5' 
                    : 'border-yellow-500/30 bg-gradient-to-br from-yellow-500/10 to-yellow-500/5'
                } hover:shadow-xl transition-all duration-300 hover:scale-105`}>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        farmData.riskLevel === 'Low' ? 'bg-green-500/20' : 'bg-yellow-500/20'
                      }`}>
                        <AlertCircle className={`w-6 h-6 ${
                          farmData.riskLevel === 'Low' ? 'text-green-600' : 'text-yellow-600'
                        }`} />
                      </div>
                      <CheckCircle2 className={`w-5 h-5 ${
                        farmData.riskLevel === 'Low' ? 'text-green-600/50' : 'text-yellow-600/50'
                      }`} />
                    </div>
                    <p className="text-muted-foreground text-sm font-medium mb-1">Risk Level</p>
                    <p className={`text-4xl font-bold mb-1 ${
                      farmData.riskLevel === 'Low' ? 'text-green-600' : 'text-yellow-600'
                    }`}>
                      {farmData.riskLevel}
                    </p>
                    <p className="text-xs text-muted-foreground">Risk assessment</p>
                  </CardContent>
                </Card>
              </div>

             
              <Card className="border-2 border-border/50 overflow-hidden">
                <div className="bg-gradient-to-r from-primary/5 via-transparent to-primary/5 p-6 border-b border-border/50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                      <Leaf className="w-5 h-5 text-primary" />
                    </div>
                    <CardTitle className="text-2xl">About This Farm</CardTitle>
                  </div>
                </div>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed text-base">
                      {farmData.description}
                    </p>
                    <div className="flex items-center gap-4 pt-4 border-t border-border/50">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <User className="w-4 h-4" />
                        <span>Owner: {farmData.owner}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

             
              <Card className="border-2 border-border/50 overflow-hidden">
                <div className="bg-gradient-to-r from-primary/5 via-transparent to-primary/5 p-6 border-b border-border/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                        <Target className="w-5 h-5 text-primary" />
                      </div>
                      <CardTitle className="text-2xl">Investment Progress</CardTitle>
                    </div>
                    <Badge variant="outline" className="text-sm">
                      {Math.round(progressPercent)}% Complete
                    </Badge>
                  </div>
                </div>
                <CardContent className="pt-6 space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">Total Funded</p>
                        <p className="text-2xl font-bold text-foreground">
                          ${farmData.collected.toLocaleString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-muted-foreground mb-1">Target</p>
                        <p className="text-2xl font-bold text-primary">
                          ${farmData.target.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="relative w-full h-4 bg-secondary rounded-full overflow-hidden shadow-inner">
                      <div
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary via-primary to-primary/80 rounded-full transition-all duration-1000 ease-out shadow-lg"
                        style={{ width: `${Math.min(progressPercent, 100)}%` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                      </div>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground mt-2">
                      <span>${farmData.collected.toLocaleString()} raised</span>
                      <span>${(farmData.target - farmData.collected).toLocaleString()} remaining</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              
              <Card className="border-2 border-border/50 overflow-hidden">
                <div className="bg-gradient-to-r from-primary/5 via-transparent to-primary/5 p-6 border-b border-border/50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-primary" />
                    </div>
                    <CardTitle className="text-2xl">Projected vs Actual Returns</CardTitle>
                  </div>
                </div>
                <CardContent className="pt-6">
                  <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={farmData.chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                      <XAxis 
                        dataKey="month" 
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                        tickLine={false}
                      />
                      <YAxis 
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                        tickLine={false}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))', 
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px',
                          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                        }} 
                      />
                      <Legend 
                        wrapperStyle={{ paddingTop: '20px' }}
                        iconType="circle"
                      />
                      <Bar 
                        dataKey="projected" 
                        fill="hsl(var(--muted))"
                        radius={[8, 8, 0, 0]}
                        name="Projected"
                      />
                      <Bar 
                        dataKey="actual" 
                        fill="hsl(var(--primary))"
                        radius={[8, 8, 0, 0]}
                        name="Actual"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="border-2 border-border/50 overflow-hidden">
                <div className="bg-gradient-to-r from-primary/5 via-transparent to-primary/5 p-6 border-b border-border/50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-primary" />
                    </div>
                    <CardTitle className="text-2xl">Frequently Asked Questions</CardTitle>
                  </div>
                </div>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    <div className="pb-6 border-b border-border/50 last:border-0 last:pb-0">
                      <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                        When do I receive returns?
                      </h4>
                      <p className="text-muted-foreground text-sm leading-relaxed ml-6">
                        Returns are distributed monthly based on actual harvest and sales.
                      </p>
                    </div>
                    <div className="pb-6 border-b border-border/50 last:border-0 last:pb-0">
                      <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                        What if the harvest fails?
                      </h4>
                      <p className="text-muted-foreground text-sm leading-relaxed ml-6">
                        We have crop insurance that covers up to 80% of investment value.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                        Can I withdraw my investment early?
                      </h4>
                      <p className="text-muted-foreground text-sm leading-relaxed ml-6">
                        Early withdrawal is possible but may incur a 5% penalty fee.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

           
            <div className="lg:col-span-1">
              <Card className="sticky top-24 border-2 border-primary/20 bg-gradient-to-br from-background via-background to-primary/5 shadow-2xl">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg">
                      <DollarSign className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-2xl">Invest Now</CardTitle>
                  </div>
                  <CardDescription className="text-base">
                    Start your investment journey today
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="amount" className="text-sm font-semibold text-foreground">
                      Investment Amount ($)
                    </Label>
                    <Input
                      id="amount"
                      type="number"
                      value={investmentAmount}
                      onChange={(e) => setInvestmentAmount(e.target.value)}
                      min="100"
                      step="100"
                      className="bg-background border-2 border-border/50 text-lg h-12 font-semibold focus:border-primary transition-colors"
                    />
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      Minimum investment: $100
                    </p>
                  </div>

                 
                  <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-secondary/30 p-6 rounded-xl border-2 border-primary/20 space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                      <Sparkles className="w-4 h-4 text-primary" />
                      <h4 className="font-semibold text-foreground">Investment Summary</h4>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center pb-3 border-b border-border/50">
                        <span className="text-sm text-muted-foreground">Investment</span>
                        <span className="font-bold text-foreground text-lg">
                          ${parseFloat(investmentAmount).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center pb-3 border-b border-border/50">
                        <span className="text-sm text-muted-foreground">
                          Expected ROI ({farmData.roi}%)
                        </span>
                        <span className="font-bold text-primary text-lg">
                          ${(parseFloat(investmentAmount) * farmData.roi / 100).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center pt-2">
                        <span className="font-semibold text-foreground">Total Return</span>
                        <span className="font-bold text-primary text-2xl">
                          ${expectedReturn.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Link href={`/invest/${params.id}`} className="block">
                    <Button className="w-full bg-primary hover:bg-primary/90 text-lg h-12 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 hover:scale-105 group">
                      <span>Invest Now</span>
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>

                  <div className="pt-4 border-t border-border/50">
                    <p className="text-xs text-muted-foreground text-center leading-relaxed">
                      By investing, you agree to our{' '}
                      <Link href="/terms" className="text-primary hover:underline font-medium">
                        Terms
                      </Link>{' '}
                      and{' '}
                      <Link href="/privacy" className="text-primary hover:underline font-medium">
                        Privacy Policy
                      </Link>
                    </p>
                  </div>
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
