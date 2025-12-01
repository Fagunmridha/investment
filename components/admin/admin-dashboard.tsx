'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Users, DollarSign, Layers, TrendingUp, ShieldCheck, Activity, Leaf } from 'lucide-react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const revenueData = [
  { month: 'Jan', revenue: 45000, users: 250 },
  { month: 'Feb', revenue: 62000, users: 320 },
  { month: 'Mar', revenue: 89000, users: 410 },
  { month: 'Apr', revenue: 124000, users: 550 },
  { month: 'May', revenue: 168000, users: 780 },
  { month: 'Jun', revenue: 210000, users: 1200 },
]

const investmentByCategory = [
  { category: 'Crops', amount: 890000 },
  { category: 'Fruits', amount: 650000 },
  { category: 'Fisheries', amount: 720000 },
  { category: 'Livestock', amount: 410000 },
  { category: 'Agroforestry', amount: 260000 },
]

const pendingWithdrawals = [
  { id: 1, investor: 'Ahmed Hasan', amount: 5000, requested: '2024-06-15', status: 'Pending' },
  { id: 2, investor: 'Fatima Khan', amount: 3500, requested: '2024-06-16', status: 'Pending' },
  { id: 3, investor: 'Md. Karim', amount: 7200, requested: '2024-06-17', status: 'Escalated' },
]

const activityFeed = [
  { id: 1, title: 'New farm approved', description: 'Savannah Agroforestry Collective', time: 'Just now' },
  { id: 2, title: 'KYC verified', description: 'Investor: Sofia Ibrahim', time: '12m ago' },
  { id: 3, title: 'Payout executed', description: '$42.2K • Mango Orchards cohort', time: '1h ago' },
  { id: 4, title: 'Sensor alert cleared', description: 'Delta Rice Cooperative', time: '2h ago' },
]

const spotlightFarms = [
  { name: 'Delta Rice Cooperative', region: 'Bangladesh Delta', roi: '18.5%', health: 'On Track', progress: 82 },
  { name: 'Solar Greenhouse Network', region: 'Ghana Highlands', roi: '19.7%', health: 'Ahead', progress: 64 },
  { name: 'Pasture-Raised Dairy Co-op', region: 'Kenya Rift', roi: '15.4%', health: 'Stable', progress: 73 },
]

const riskAlerts = [
  { id: 1, title: 'Rainfall deviation detected', detail: 'Mango Orchards Bangladesh', severity: 'High' },
  { id: 2, title: 'FX volatility watchlist', detail: 'EUR ↔︎ BDT corridor', severity: 'Medium' },
  { id: 3, title: 'Pending compliance update', detail: 'Investor documents (4)', severity: 'Low' },
]

export function AdminDashboard() {
  const [range, setRange] = useState<'7d' | '30d' | '90d'>('30d')

  const stats = [
    {
      label: 'Total Users',
      value: '12,847',
      change: '+12.5% vs last month',
      icon: Users,
      iconBg: 'bg-primary/10',
      iconColor: 'text-primary',
    },
    {
      label: 'Capital Deployed',
      value: '$2.4M',
      change: '+8.2% committed',
      icon: DollarSign,
      iconBg: 'bg-emerald-600/10',
      iconColor: 'text-emerald-500',
    },
    {
      label: 'Active Farms',
      value: '234',
      change: '18 in on-boarding',
      icon: Layers,
      iconBg: 'bg-amber-500/10',
      iconColor: 'text-amber-500',
    },
    {
      label: 'Avg. Net Yield',
      value: '9.8%',
      change: '+0.6% QoQ',
      icon: TrendingUp,
      iconBg: 'bg-sky-500/10',
      iconColor: 'text-sky-500',
    },
  ]

  return (
    <div className="space-y-6 sm:space-y-8 rounded-3xl border border-border/60 bg-card/80 p-4 sm:p-6 shadow-xl backdrop-blur-xl lg:p-8">
      <div className="grid gap-4 sm:gap-6 lg:grid-cols-[1.4fr_0.6fr]">
        <Card className="border-0 bg-gradient-to-br from-primary/15 via-background to-background">
          <CardHeader className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center sm:justify-between gap-3">
      <div>
                <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-muted-foreground/80">Live posture</p>
                <CardTitle className="text-xl sm:text-2xl font-semibold text-foreground">Operational health</CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  Telemetry, capital flow, and workforce signals for the last {range}.
                </CardDescription>
              </div>
              <div className="inline-flex items-center gap-1 sm:gap-2 rounded-full border border-border/70 bg-card/70 px-1.5 sm:px-2 py-1 text-[11px] sm:text-xs font-semibold text-muted-foreground self-start">
                {(['7d', '30d', '90d'] as const).map(option => (
                  <button
                    key={option}
                    onClick={() => setRange(option)}
                    className={`rounded-full px-3 py-1 transition ${
                      option === range ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-primary/40 bg-background/60 p-3 sm:p-4">
                <p className="text-xs sm:text-sm text-muted-foreground">Telemetry uptime</p>
                <p className="text-2xl sm:text-3xl font-semibold text-foreground">99.2%</p>
                <p className="text-[11px] sm:text-xs text-green-500 mt-1">+0.3% vs last week</p>
              </div>
              <div className="rounded-2xl border border-border bg-background/60 p-3 sm:p-4">
                <p className="text-xs sm:text-sm text-muted-foreground">Capital available</p>
                <p className="text-2xl sm:text-3xl font-semibold text-foreground">$640K</p>
                <p className="text-[11px] sm:text-xs text-muted-foreground mt-1">Across 4 treasury wallets</p>
              </div>
            </div>
          </CardHeader>
        </Card>

        <Card className="border border-border/60 bg-card">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-primary" />
              <CardTitle className="text-base sm:text-lg">Operational focus</CardTitle>
            </div>
            <CardDescription className="text-xs sm:text-sm">3 items need decision support</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4">
            {riskAlerts.map(alert => (
              <div key={alert.id} className="rounded-2xl border border-border/60 bg-muted/40 p-4">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-foreground">{alert.title}</p>
                  <Badge variant={alert.severity === 'High' ? 'destructive' : 'secondary'} className="rounded-full">
                    {alert.severity}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{alert.detail}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map(stat => {
          const Icon = stat.icon
          return (
            <Card key={stat.label} className="border border-border/60 bg-card/90 backdrop-blur">
              <CardContent className="space-y-3 pt-5 sm:pt-6">
                <div className={`flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-2xl ${stat.iconBg}`}>
                  <Icon className={`h-5 w-5 sm:h-6 sm:w-6 ${stat.iconColor}`} />
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl sm:text-3xl font-semibold text-foreground">{stat.value}</p>
                  <p className="text-[11px] sm:text-xs text-muted-foreground">{stat.change}</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
        <Card className="border border-border/60 bg-card">
          <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="text-base sm:text-lg">Revenue & User Growth</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Monthly platform metrics</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="text-[11px] sm:text-xs self-start sm:self-auto">Export CSV</Button>
          </CardHeader>
          <CardContent className="pt-2 sm:pt-4">
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="month" stroke="var(--color-muted-foreground)" />
                <YAxis stroke="var(--color-muted-foreground)" />
                <Tooltip contentStyle={{ backgroundColor: 'var(--color-card)', border: '1px solid var(--color-border)' }} />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="var(--color-primary)" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="users" stroke="var(--color-chart-2)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border border-border/60 bg-card">
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">Investment by Category</CardTitle>
            <CardDescription className="text-xs sm:text-sm">Fund allocation across farm types</CardDescription>
          </CardHeader>
          <CardContent className="pt-2 sm:pt-4">
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={investmentByCategory}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="category" stroke="var(--color-muted-foreground)" />
                <YAxis stroke="var(--color-muted-foreground)" />
                <Tooltip contentStyle={{ backgroundColor: 'var(--color-card)', border: '1px solid var(--color-border)' }} />
                <Bar dataKey="amount" fill="var(--color-primary)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 sm:gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <Card className="border border-border/60 bg-card/80">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              <CardTitle className="text-base sm:text-lg">Live activity</CardTitle>
            </div>
            <CardDescription className="text-xs sm:text-sm">Latest events across the network</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4">
            {activityFeed.map(item => (
              <div key={item.id} className="rounded-2xl border border-border/60 bg-muted/30 p-4">
                <div className="flex flex-col">
                  <p className="font-medium text-foreground">{item.title}</p>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                  <span className="text-xs text-muted-foreground mt-2">{item.time}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border border-border/60 bg-card">
          <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="text-base sm:text-lg">Pending Withdrawals</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Awaiting approval ({pendingWithdrawals.length})</CardDescription>
            </div>
            <Button size="sm" variant="secondary" className="rounded-full text-[11px] sm:text-xs self-start sm:self-auto">
              Prioritize queue
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {pendingWithdrawals.map(withdrawal => (
              <div key={withdrawal.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-border/60 bg-muted/30 p-3 sm:p-4 gap-3">
                <div>
                  <p className="font-medium text-sm sm:text-base text-foreground">{withdrawal.investor}</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">Requested: {withdrawal.requested}</p>
                </div>
                <div className="text-right">
                  <p className="text-base sm:text-lg font-semibold text-foreground">${withdrawal.amount.toLocaleString()}</p>
                  <Badge variant={withdrawal.status === 'Escalated' ? 'destructive' : 'secondary'} className="rounded-full">
                    {withdrawal.status}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="border border-border/60 bg-card/90">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Spotlight farms</CardTitle>
            <CardDescription>Performance + funding velocity</CardDescription>
          </div>
          <Button variant="ghost" size="sm" className="text-xs">View cohorts</Button>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          {spotlightFarms.map(farm => (
            <div key={farm.name} className="rounded-2xl border border-border/60 bg-muted/30 p-4">
              <div className="flex items-center gap-2">
                <Leaf className="h-4 w-4 text-primary" />
                <p className="font-semibold text-foreground">{farm.name}</p>
              </div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">{farm.region}</p>
              <div className="mt-4 flex items-center justify-between text-sm">
                <span className="font-semibold text-foreground">ROI {farm.roi}</span>
                <span className="text-muted-foreground">{farm.health}</span>
              </div>
              <div className="mt-3">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Funding progress</span>
                  <span>{farm.progress}%</span>
                </div>
                <div className="mt-1 h-2 w-full rounded-full bg-border">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${farm.progress}%` }} />
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
