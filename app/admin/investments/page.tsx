'use client'

import { AdminSidebar } from '@/components/admin/admin-sidebar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { CheckCircle2, Clock, DollarSign } from 'lucide-react'
import { useState } from 'react'

const investments = [
  {
    id: 1,
    investor: 'Ahmed Hasan',
    farm: 'Green Valley Rice Farm',
    amount: 25000,
    date: '2024-01-15',
    status: 'active',
    roi: 18.5,
  },
  {
    id: 2,
    investor: 'Fatima Khan',
    farm: 'Mango Orchards Bangladesh',
    amount: 15000,
    date: '2024-03-20',
    status: 'active',
    roi: 22.0,
  },
  {
    id: 3,
    investor: 'Md. Karim',
    farm: 'Aquaculture Fisheries',
    amount: 20000,
    date: '2024-04-10',
    status: 'active',
    roi: 20.5,
  },
  {
    id: 4,
    investor: 'Nasrin Akter',
    farm: 'Strawberry Fields',
    amount: 12000,
    date: '2024-08-15',
    status: 'completed',
    roi: 19.0,
  },
]

export default function InvestmentManagementPage() {
  const [activeTab, setActiveTab] = useState('home')
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredInvestments = investments.filter(inv =>
    (filter === 'all' || inv.status === filter) &&
    (inv.investor.toLowerCase().includes(searchTerm.toLowerCase()) ||
     inv.farm.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const stats = [
    { label: 'Total Investments', value: investments.length.toString(), icon: DollarSign },
    { label: 'Active', value: investments.filter(i => i.status === 'active').length.toString(), icon: Clock },
    { label: 'Completed', value: investments.filter(i => i.status === 'completed').length.toString(), icon: CheckCircle2 },
  ]

  return (
    <div className="flex min-h-screen bg-background">
      {/* <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} /> */}
      
      <main className="flex-1 overflow-auto p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Investment Management</h1>
            <p className="text-muted-foreground">Track and manage investor investments</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-muted-foreground text-sm">{stat.label}</p>
                        <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                      </div>
                      <Icon className="w-10 h-10 text-primary opacity-20" />
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Filters and Search */}
          <div className="space-y-4">
            <div className="flex gap-2 flex-wrap">
              {['all', 'active', 'completed'].map(status => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                    filter === status
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-foreground border border-border hover:bg-secondary/80'
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>

            <Input
              placeholder="Search by investor or farm name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-input text-foreground placeholder:text-muted-foreground max-w-md"
            />
          </div>

          {/* Investments Table */}
          <Card>
            <CardHeader>
              <CardTitle>Investment Records</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredInvestments.map((investment) => (
                  <div
                    key={investment.id}
                    className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-secondary/50 transition"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{investment.investor}</p>
                      <p className="text-sm text-muted-foreground">{investment.farm}</p>
                      <p className="text-xs text-muted-foreground mt-1">Date: {investment.date}</p>
                    </div>

                    <div className="text-right space-y-1">
                      <p className="font-bold text-lg text-foreground">${investment.amount.toLocaleString()}</p>
                      <div className="flex items-center justify-end gap-2">
                        <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">{investment.roi}% ROI</span>
                        <span className={`text-xs font-medium px-2 py-1 rounded ${
                          investment.status === 'active'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-green-100 text-green-700'
                        }`}>
                          {investment.status === 'active' ? 'Active' : 'Completed'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
