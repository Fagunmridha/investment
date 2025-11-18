'use client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DollarSign, Download, Upload, TrendingUp } from 'lucide-react'
import { useState } from 'react'

const transactions = [
  { id: 1, type: 'investment', description: 'Investment in Rice Farm', amount: -25000, date: '2024-01-15', status: 'completed' },
  { id: 2, type: 'earning', description: 'Monthly earnings - Mango Orchard', amount: 275, date: '2024-06-01', status: 'completed' },
  { id: 3, type: 'withdrawal', description: 'Withdrawal to Bank Account', amount: -2000, date: '2024-05-20', status: 'completed' },
  { id: 4, type: 'earning', description: 'Monthly earnings - Rice Farm', amount: 390, date: '2024-06-01', status: 'completed' },
  { id: 5, type: 'deposit', description: 'Deposit from Bank', amount: 5000, date: '2024-04-10', status: 'completed' },
]

export default function WalletPage() {
  const [activeTab, setActiveTab] = useState('wallet')
  const [activeWalletTab, setActiveWalletTab] = useState('balance')

  const walletBalance = 12500
  const totalEarnings = 9880

  return (
    <div className="flex min-h-screen bg-background">
      {/* <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} /> */}
      
      <main className="flex-1 overflow-auto p-6 lg:p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Wallet</h1>
            <p className="text-muted-foreground">Manage your funds and transactions</p>
          </div>

          {/* Wallet Balance Card */}
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/30">
            <CardContent className="pt-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <p className="text-muted-foreground text-sm mb-2">Available Balance</p>
                  <p className="text-4xl font-bold text-foreground">${walletBalance.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm mb-2">Total Earnings</p>
                  <p className="text-4xl font-bold text-green-600">${totalEarnings.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm mb-2">Pending Returns</p>
                  <p className="text-4xl font-bold text-primary">$1,245</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabs */}
          <div className="flex gap-2 border-b border-border">
            <button
              onClick={() => setActiveWalletTab('balance')}
              className={`px-4 py-3 border-b-2 font-medium transition ${
                activeWalletTab === 'balance'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              Balance
            </button>
            <button
              onClick={() => setActiveWalletTab('transactions')}
              className={`px-4 py-3 border-b-2 font-medium transition ${
                activeWalletTab === 'transactions'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              Transactions
            </button>
          </div>

          {/* Balance Tab */}
          {activeWalletTab === 'balance' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Add Money */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="w-5 h-5" />
                    Add Money
                  </CardTitle>
                  <CardDescription>Fund your wallet to invest</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">Amount ($)</label>
                    <Input
                      type="number"
                      placeholder="Enter amount"
                      min="100"
                      step="100"
                      className="bg-input text-foreground"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">Payment Method</label>
                    <select className="w-full px-3 py-2 rounded-lg border border-border bg-card text-foreground">
                      <option>Bank Transfer</option>
                      <option>Credit Card</option>
                      <option>Debit Card</option>
                      <option>Mobile Payment</option>
                    </select>
                  </div>
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    Add Funds
                  </Button>
                </CardContent>
              </Card>

              {/* Withdraw Money */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Download className="w-5 h-5" />
                    Withdraw Money
                  </CardTitle>
                  <CardDescription>Withdraw your earnings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">Withdraw Amount ($)</label>
                    <Input
                      type="number"
                      placeholder="Enter amount"
                      min="100"
                      step="100"
                      max={walletBalance}
                      className="bg-input text-foreground"
                    />
                    <p className="text-xs text-muted-foreground mt-2">Available: ${walletBalance.toLocaleString()}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">Bank Account</label>
                    <select className="w-full px-3 py-2 rounded-lg border border-border bg-card text-foreground">
                      <option>Select Bank Account</option>
                      <option>Dhaka Bank - 1234567890</option>
                      <option>Add New Bank Account</option>
                    </select>
                  </div>
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    Request Withdrawal
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Transactions Tab */}
          {activeWalletTab === 'transactions' && (
            <Card>
              <CardHeader>
                <CardTitle>Transaction History</CardTitle>
                <CardDescription>All your wallet transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {transactions.map((transaction) => (
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
                          <p className="font-medium text-foreground">{transaction.description}</p>
                          <p className="text-xs text-muted-foreground">{transaction.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-bold text-lg ${
                          transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {transaction.amount > 0 ? '+' : ''} ${Math.abs(transaction.amount).toLocaleString()}
                        </p>
                        <span className="text-xs text-muted-foreground">{transaction.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
