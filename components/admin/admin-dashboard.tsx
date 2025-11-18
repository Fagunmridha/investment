'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, DollarSign, Layers, TrendingUp, AlertCircle, CheckCircle2 } from 'lucide-react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const revenueData = [
  { month: 'Jan', revenue: 45000, users: 250 },
  { month: 'Feb', revenue: 62000, users: 320 },
  { month: 'Mar', revenue: 89000, users: 410 },
  { month: 'Apr', revenue: 124000, users: 550 },
  { month: 'May', revenue: 168000, users: 780 },
  { month: 'Jun', revenue: 210000, users: 1200 },
]

const pendingWithdrawals = [
  { id: 1, investor: 'Ahmed Hasan', amount: 5000, requested: '2024-06-15', status: 'pending' },
  { id: 2, investor: 'Fatima Khan', amount: 3500, requested: '2024-06-16', status: 'pending' },
  { id: 3, investor: 'Md. Karim', amount: 7200, requested: '2024-06-17', status: 'pending' },
]

export function AdminDashboard() {
  const stats = [
    {
      label: 'Total Users',
      value: '12,847',
      change: '+12.5%',
      icon: Users,
      color: 'text-blue-600',
    },
    {
      label: 'Total Investment',
      value: '$2.4M',
      change: '+8.2%',
      icon: DollarSign,
      color: 'text-green-600',
    },
    {
      label: 'Active Farms',
      value: '234',
      change: '+5.1%',
      icon: Layers,
      color: 'text-primary',
    },
    {
      label: 'Total Payouts',
      value: '$890K',
      change: '+15.3%',
      icon: TrendingUp,
      color: 'text-orange-600',
    },
  ]

  return (
    <div className="p-6 lg:p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">Platform overview and key metrics</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm mb-2">{stat.label}</p>
                    <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-xs text-green-600 mt-2">{stat.change} from last month</p>
                  </div>
                  <div className={`w-10 h-10 rounded-full bg-${stat.color}/10 flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue & User Growth</CardTitle>
            <CardDescription>Monthly platform metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="month" stroke="var(--color-muted-foreground)" />
                <YAxis stroke="var(--color-muted-foreground)" />
                <Tooltip contentStyle={{ backgroundColor: 'var(--color-card)', border: '1px solid var(--color-border)' }} />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="var(--color-primary)" strokeWidth={2} />
                <Line type="monotone" dataKey="users" stroke="var(--color-chart-2)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Investment Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Investment by Category</CardTitle>
            <CardDescription>Fund allocation across farm types</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={[
                { category: 'Crops', amount: 890000 },
                { category: 'Fruits', amount: 650000 },
                { category: 'Fisheries', amount: 720000 },
                { category: 'Livestock', amount: 140000 },
              ]}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="category" stroke="var(--color-muted-foreground)" />
                <YAxis stroke="var(--color-muted-foreground)" />
                <Tooltip contentStyle={{ backgroundColor: 'var(--color-card)', border: '1px solid var(--color-border)' }} />
                <Bar dataKey="amount" fill="var(--color-primary)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Pending Withdrawals */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-orange-600" />
            Pending Withdrawals
          </CardTitle>
          <CardDescription>Awaiting approval ({pendingWithdrawals.length})</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {pendingWithdrawals.map((withdrawal) => (
              <div key={withdrawal.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div>
                  <p className="font-medium text-foreground">{withdrawal.investor}</p>
                  <p className="text-sm text-muted-foreground">Requested: {withdrawal.requested}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg text-foreground">${withdrawal.amount.toLocaleString()}</p>
                  <span className="text-xs font-medium text-orange-600">Pending</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
