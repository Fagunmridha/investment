'use client'

import { AdminSidebar } from '@/components/admin/admin-sidebar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Shield, Ban, CheckCircle2, AlertCircle } from 'lucide-react'
import { useState } from 'react'

const users = [
  {
    id: 1,
    name: 'Ahmed Hasan',
    email: 'ahmed@example.com',
    phone: '+880 1812345678',
    status: 'active',
    kyc: 'verified',
    joined: '2024-01-15',
    investments: 3,
  },
  {
    id: 2,
    name: 'Fatima Khan',
    email: 'fatima@example.com',
    phone: '+880 1912345679',
    status: 'active',
    kyc: 'verified',
    joined: '2024-02-20',
    investments: 2,
  },
  {
    id: 3,
    name: 'Md. Karim',
    email: 'karim@example.com',
    phone: '+880 1712345680',
    status: 'blocked',
    kyc: 'pending',
    joined: '2024-03-10',
    investments: 0,
  },
]

export default function UserManagementPage() {
  const [activeTab, setActiveTab] = useState('home')
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredUsers = users.filter(user =>
    (filter === 'all' || user.status === filter) &&
    (user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     user.email.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const stats = [
    { label: 'Total Users', value: users.length.toString() },
    { label: 'Active', value: users.filter(u => u.status === 'active').length.toString() },
    { label: 'KYC Verified', value: users.filter(u => u.kyc === 'verified').length.toString() },
  ]

  return (
    <div className="flex min-h-screen bg-background">
      {/* <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} /> */}
      
      <main className="flex-1 overflow-auto p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">User Management</h1>
            <p className="text-muted-foreground">Manage platform users and their accounts</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <p className="text-muted-foreground text-sm mb-2">{stat.label}</p>
                  <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Filters and Search */}
          <div className="space-y-4">
            <div className="flex gap-2 flex-wrap">
              {['all', 'active', 'blocked'].map(status => (
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
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-input text-foreground placeholder:text-muted-foreground max-w-md"
            />
          </div>

          {/* Users Table */}
          <Card>
            <CardHeader>
              <CardTitle>User Accounts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredUsers.map((user) => (
                  <div
                    key={user.id}
                    className="p-4 border border-border rounded-lg hover:bg-secondary/50 transition"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex-1">
                        <p className="font-bold text-lg text-foreground">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                        <p className="text-sm text-muted-foreground">{user.phone}</p>
                        <div className="flex gap-2 mt-2">
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                            Joined: {user.joined}
                          </span>
                          <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                            {user.investments} investments
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col items-start md:items-end gap-2">
                        <div className="flex items-center gap-2">
                          {user.status === 'active' ? (
                            <span className="flex items-center gap-1 text-sm font-medium text-green-600">
                              <CheckCircle2 className="w-4 h-4" />
                              Active
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 text-sm font-medium text-red-600">
                              <Ban className="w-4 h-4" />
                              Blocked
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          {user.kyc === 'verified' ? (
                            <span className="flex items-center gap-1 text-sm font-medium text-green-600">
                              <Shield className="w-4 h-4" />
                              KYC Verified
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 text-sm font-medium text-yellow-600">
                              <AlertCircle className="w-4 h-4" />
                              KYC Pending
                            </span>
                          )}
                        </div>

                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            {user.status === 'active' ? 'Block' : 'Unblock'}
                          </Button>
                          {user.kyc === 'pending' && (
                            <Button size="sm" className="bg-primary hover:bg-primary/90">
                              Approve KYC
                            </Button>
                          )}
                        </div>
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
