'use client'

import { AdminSidebar } from '@/components/admin/admin-sidebar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Clock, CheckCircle2, XCircle, DollarSign } from 'lucide-react'
import { useState } from 'react'

const withdrawalRequests = [
  {
    id: 1,
    investor: 'Ahmed Hasan',
    amount: 5000,
    bankAccount: 'Dhaka Bank - 1234567890',
    requested: '2024-06-15',
    status: 'pending',
  },
  {
    id: 2,
    investor: 'Fatima Khan',
    amount: 3500,
    bankAccount: 'Trust Bank - 0987654321',
    requested: '2024-06-16',
    status: 'pending',
  },
  {
    id: 3,
    investor: 'Md. Karim',
    amount: 7200,
    bankAccount: 'Prime Bank - 5555555555',
    requested: '2024-06-17',
    status: 'pending',
  },
  {
    id: 4,
    investor: 'Nasrin Akter',
    amount: 2000,
    bankAccount: 'AB Bank - 1111111111',
    requested: '2024-06-10',
    status: 'approved',
    approvedDate: '2024-06-11',
  },
]

export default function WithdrawalManagementPage() {
  const [activeTab, setActiveTab] = useState('home')
  const [filter, setFilter] = useState('pending')

  const filteredWithdrawals = withdrawalRequests.filter(wr => wr.status === filter)
  const totalPending = withdrawalRequests
    .filter(wr => wr.status === 'pending')
    .reduce((sum, wr) => sum + wr.amount, 0)

  return (
    <div className="flex min-h-screen bg-background">
      {/* <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} /> */}
      
      <main className="flex-1 overflow-auto p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Withdrawals & Payouts</h1>
            <p className="text-muted-foreground">Manage investor withdrawal requests</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">Pending Withdrawals</p>
                    <p className="text-3xl font-bold text-foreground">
                      ${totalPending.toLocaleString()}
                    </p>
                  </div>
                  <Clock className="w-10 h-10 text-orange-600 opacity-20" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">Pending Requests</p>
                    <p className="text-3xl font-bold text-foreground">
                      {withdrawalRequests.filter(wr => wr.status === 'pending').length}
                    </p>
                  </div>
                  <DollarSign className="w-10 h-10 text-yellow-600 opacity-20" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">Approved This Month</p>
                    <p className="text-3xl font-bold text-foreground">
                      ${withdrawalRequests
                        .filter(wr => wr.status === 'approved')
                        .reduce((sum, wr) => sum + wr.amount, 0)
                        .toLocaleString()}
                    </p>
                  </div>
                  <CheckCircle2 className="w-10 h-10 text-green-600 opacity-20" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <div className="flex gap-2">
            {['pending', 'approved', 'rejected'].map(status => (
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

          {/* Withdrawal Requests */}
          <Card>
            <CardHeader>
              <CardTitle>Withdrawal Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredWithdrawals.map((withdrawal) => (
                  <div
                    key={withdrawal.id}
                    className="p-4 border border-border rounded-lg"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex-1">
                        <p className="font-bold text-lg text-foreground">{withdrawal.investor}</p>
                        <p className="text-sm text-muted-foreground">{withdrawal.bankAccount}</p>
                        <div className="flex gap-2 mt-2">
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                            Requested: {withdrawal.requested}
                          </span>
                          {withdrawal.approvedDate && (
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                              Approved: {withdrawal.approvedDate}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="text-right space-y-3">
                        <p className="text-3xl font-bold text-foreground">${withdrawal.amount.toLocaleString()}</p>
                        {withdrawal.status === 'pending' && (
                          <div className="flex gap-2">
                            <Button size="sm" className="bg-green-600 hover:bg-green-700">
                              <CheckCircle2 className="w-4 h-4 mr-1" />
                              Approve
                            </Button>
                            <Button size="sm" variant="outline" className="border-red-200 hover:bg-red-50">
                              <XCircle className="w-4 h-4 mr-1" />
                              Reject
                            </Button>
                          </div>
                        )}
                        {withdrawal.status === 'approved' && (
                          <span className="text-sm font-medium text-green-600 flex items-center gap-1 justify-end">
                            <CheckCircle2 className="w-4 h-4" />
                            Approved
                          </span>
                        )}
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
