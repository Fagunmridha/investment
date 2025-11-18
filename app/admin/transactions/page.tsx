'use client'

import { AdminSidebar } from '@/components/admin/admin-sidebar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { DollarSign } from 'lucide-react'
import { useState } from 'react'

const transactions = [
  { id: 1, type: 'investment', user: 'Ahmed Hasan', description: 'Investment in Rice Farm', amount: 25000, date: '2024-01-15', status: 'completed' },
  { id: 2, type: 'earning', user: 'Fatima Khan', description: 'Monthly earnings - Mango', amount: 275, date: '2024-06-01', status: 'completed' },
  { id: 3, type: 'withdrawal', user: 'Md. Karim', description: 'Withdrawal to Bank', amount: -2000, date: '2024-05-20', status: 'completed' },
  { id: 4, type: 'earning', user: 'Ahmed Hasan', description: 'Monthly earnings - Rice', amount: 390, date: '2024-06-01', status: 'completed' },
  { id: 5, type: 'deposit', user: 'Nasrin Akter', description: 'Deposit from Bank', amount: 5000, date: '2024-04-10', status: 'completed' },
]

export default function TransactionsPage() {
  const [activeTab, setActiveTab] = useState('home')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredTransactions = transactions.filter(t =>
    t.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const stats = [
    { label: 'Total Transactions', value: transactions.length.toString() },
    { label: 'Total Volume', value: `$${transactions.reduce((sum, t) => sum + Math.abs(t.amount), 0).toLocaleString()}` },
  ]

  return (
    <div className="flex min-h-screen bg-background">
      {/* <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} /> */}
      
      <main className="flex-1 overflow-auto p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Transaction Logs</h1>
            <p className="text-muted-foreground">Complete transaction history</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <p className="text-muted-foreground text-sm mb-2">{stat.label}</p>
                  <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Search */}
          <Input
            placeholder="Search by user or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-input text-foreground placeholder:text-muted-foreground max-w-md"
          />

          {/* Transactions Table */}
          <Card>
            <CardHeader>
              <CardTitle>All Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredTransactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-secondary/50 transition"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        transaction.type === 'investment' ? 'bg-orange-100' :
                        transaction.type === 'earning' ? 'bg-green-100' :
                        transaction.type === 'withdrawal' ? 'bg-red-100' :
                        'bg-blue-100'
                      }`}>
                        <DollarSign className={`w-5 h-5 ${
                          transaction.type === 'investment' ? 'text-orange-600' :
                          transaction.type === 'earning' ? 'text-green-600' :
                          transaction.type === 'withdrawal' ? 'text-red-600' :
                          'text-blue-600'
                        }`} />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{transaction.user}</p>
                        <p className="text-sm text-muted-foreground">{transaction.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">{transaction.date}</p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className={`font-bold text-lg ${
                        transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.amount > 0 ? '+' : ''} ${Math.abs(transaction.amount).toLocaleString()}
                      </p>
                      <span className="text-xs text-muted-foreground font-medium">Completed</span>
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
