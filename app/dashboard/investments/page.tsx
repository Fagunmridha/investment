'use client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { TrendingUp, Clock, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

const investments = [
  {
    id: 1,
    name: 'Green Valley Rice Farm',
    category: 'Crops',
    status: 'active',
    amount: 25000,
    roi: 18.5,
    invested: '2024-01-15',
    maturity: '2025-01-15',
    earnedSoFar: 4680,
    monthlyReturn: 390,
  },
  {
    id: 2,
    name: 'Mango Orchards Bangladesh',
    category: 'Fruits',
    status: 'active',
    amount: 15000,
    roi: 22.0,
    invested: '2024-03-20',
    maturity: '2025-09-20',
    earnedSoFar: 2750,
    monthlyReturn: 275,
  },
  {
    id: 3,
    name: 'Aquaculture Fisheries',
    category: 'Fisheries',
    status: 'active',
    amount: 20000,
    roi: 20.5,
    invested: '2024-04-10',
    maturity: '2025-02-10',
    earnedSoFar: 2450,
    monthlyReturn: 341,
  },
  {
    id: 4,
    name: 'Strawberry Fields',
    category: 'Fruits',
    status: 'completed',
    amount: 12000,
    roi: 19.0,
    invested: '2023-08-15',
    maturity: '2024-04-15',
    earnedSoFar: 2280,
    monthlyReturn: 0,
  },
]

export default function InvestmentsPage() {
  const [filter, setFilter] = useState('all')
  const [activeTab, setActiveTab] = useState('investments')

  const filteredInvestments = filter === 'all'
    ? investments
    : investments.filter(inv => inv.status === filter)

  const totalInvested = investments.reduce((sum, inv) => sum + inv.amount, 0)
  const totalEarned = investments.reduce((sum, inv) => sum + inv.earnedSoFar, 0)
  const monthlyIncome = investments
    .filter(inv => inv.status === 'active')
    .reduce((sum, inv) => sum + inv.monthlyReturn, 0)

  return (
    <div className="flex min-h-screen bg-background">
      {/* <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} /> */}
      
      <main className="flex-1 overflow-auto p-6 lg:p-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">My Investments</h1>
            <p className="text-muted-foreground">Track all your farming investments in one place</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground text-sm mb-2">Total Invested</p>
                <p className="text-2xl font-bold text-foreground">${totalInvested.toLocaleString()}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground text-sm mb-2">Total Earned</p>
                <p className="text-2xl font-bold text-green-600">${totalEarned.toLocaleString()}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground text-sm mb-2">Monthly Income</p>
                <p className="text-2xl font-bold text-primary">${monthlyIncome.toLocaleString()}</p>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                filter === 'all'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-foreground border border-border hover:bg-secondary/80'
              }`}
            >
              All Investments
            </button>
            <button
              onClick={() => setFilter('active')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                filter === 'active'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-foreground border border-border hover:bg-secondary/80'
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                filter === 'completed'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-foreground border border-border hover:bg-secondary/80'
              }`}
            >
              Completed
            </button>
          </div>

          {/* Investments Table */}
          <Card>
            <CardHeader>
              <CardTitle>Investment Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredInvestments.map((investment) => (
                  <div
                    key={investment.id}
                    className="p-4 border border-border rounded-lg hover:bg-secondary/50 transition"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Investment</p>
                        <p className="font-semibold text-foreground">{investment.name}</p>
                        <p className="text-xs text-muted-foreground">{investment.category}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Status</p>
                        <div className="flex items-center gap-1">
                          {investment.status === 'active' ? (
                            <>
                              <Clock className="w-4 h-4 text-yellow-600" />
                              <span className="text-sm font-medium text-yellow-600">Active</span>
                            </>
                          ) : (
                            <>
                              <CheckCircle2 className="w-4 h-4 text-green-600" />
                              <span className="text-sm font-medium text-green-600">Completed</span>
                            </>
                          )}
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Amount</p>
                        <p className="font-semibold text-foreground">${investment.amount.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">ROI</p>
                        <p className="font-semibold text-primary flex items-center gap-1">
                          <TrendingUp className="w-4 h-4" />
                          {investment.roi}%
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-border">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Invested Date</p>
                        <p className="text-sm text-foreground">{investment.invested}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Maturity Date</p>
                        <p className="text-sm text-foreground">{investment.maturity}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Earned So Far</p>
                        <p className="text-sm font-semibold text-green-600">${investment.earnedSoFar.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Monthly Return</p>
                        <p className="text-sm font-semibold text-foreground">${investment.monthlyReturn.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Browse More Button */}
          <Button asChild size="lg" className="w-full bg-primary hover:bg-primary/90">
            <Link href="/farms">Browse More Farms</Link>
          </Button>
        </div>
      </main>
    </div>
  )
}
