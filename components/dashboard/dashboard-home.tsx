'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { TrendingUp, DollarSign, CheckCircle2, Clock, Mail, ShieldCheck } from 'lucide-react'
import Link from 'next/link'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts'

const monthlyEarningsData = [
  { month: 'Jan', earnings: 450 },
  { month: 'Feb', earnings: 620 },
  { month: 'Mar', earnings: 890 },
  { month: 'Apr', earnings: 1240 },
  { month: 'May', earnings: 1680 },
  { month: 'Jun', earnings: 2100 },
]

const investmentBreakdown = [
  { name: 'Rice Farm', value: 25000, roi: 18.5 },
  { name: 'Mango Orchard', value: 15000, roi: 22.0 },
  { name: 'Fisheries', value: 20000, roi: 20.5 },
]

type DashboardUser = {
  fullName: string
  email: string
  kycStatus: string
}

export function DashboardHome({ user }: { user: DashboardUser }) {
  const totalInvested = 60000
  const totalEarned = 9880
  const activeInvestments = 3
  const completedInvestments = 2

  return (
    <div className="p-6 lg:p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, {user.fullName}!</h1>
        <p className="text-muted-foreground">Here's your investment portfolio overview</p>
      </div>

      {/* User Info */}
      <Card>
        <CardContent className="pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Signed in as</p>
            <div className="flex items-center gap-2 text-foreground font-medium">
              <Mail className="w-4 h-4" />
              {user.email}
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-secondary px-4 py-2">
            <ShieldCheck className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-foreground">
              KYC Status: {user.kycStatus}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-muted-foreground text-sm mb-2">Total Invested</p>
                <p className="text-3xl font-bold text-foreground">${totalInvested.toLocaleString()}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-muted-foreground text-sm mb-2">Total Earned</p>
                <p className="text-3xl font-bold text-green-600">${totalEarned.toLocaleString()}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-green-600/20 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-muted-foreground text-sm mb-2">Active Investments</p>
                <p className="text-3xl font-bold text-foreground">{activeInvestments}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Clock className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-muted-foreground text-sm mb-2">Completed</p>
                <p className="text-3xl font-bold text-foreground">{completedInvestments}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-green-600/20 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Earnings Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Monthly Earnings</CardTitle>
            <CardDescription>Your earnings trend over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={monthlyEarningsData}>
                <defs>
                  <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="month" stroke="var(--color-muted-foreground)" />
                <YAxis stroke="var(--color-muted-foreground)" />
                <Tooltip contentStyle={{ backgroundColor: 'var(--color-card)', border: '1px solid var(--color-border)' }} />
                <Area type="monotone" dataKey="earnings" stroke="var(--color-primary)" fillOpacity={1} fill="url(#colorEarnings)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Portfolio Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Portfolio Breakdown</CardTitle>
            <CardDescription>Your investment allocation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {investmentBreakdown.map((investment, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                <div>
                  <p className="font-medium text-sm text-foreground">{investment.name}</p>
                  <p className="text-xs text-muted-foreground">{investment.roi}% ROI</p>
                </div>
                <p className="font-bold text-foreground">${investment.value.toLocaleString()}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Active Investments */}
      <Card>
        <CardHeader>
          <CardTitle>Active Investments</CardTitle>
          <CardDescription>Your current farming investments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {investmentBreakdown.map((investment, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-secondary/50 transition">
                <div>
                  <p className="font-medium text-foreground">{investment.name}</p>
                  <p className="text-sm text-muted-foreground">Invested: ${investment.value.toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-primary">{investment.roi}% ROI</p>
                  <p className="text-sm text-muted-foreground">Monthly return: ${(investment.value * investment.roi / 100 / 12).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
          <Button asChild className="w-full mt-6 bg-primary hover:bg-primary/90">
            <Link href="/farms">Invest More</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
