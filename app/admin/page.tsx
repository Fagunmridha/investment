'use client'

import { AdminSidebar } from '@/components/admin/admin-sidebar'
import { AdminDashboard } from '@/components/admin/admin-dashboard'
import { useState } from 'react'
import FarmManagementPage from './farms/page'
import InvestmentManagementPage from './investments/page'
import UserManagementPage from './users/page'
import WithdrawalManagementPage from './withdrawals/page'
import TransactionsPage from './transactions/page'

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('home')

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 overflow-auto">
        {activeTab === 'home' && <AdminDashboard />}
        {activeTab === 'farms' && <FarmManagementPageContent />}
        {activeTab === 'investments' && <InvestmentManagementPageContent />}
        {activeTab === 'users' && <UserManagementPageContent />}
        {activeTab === 'withdrawals' && <WithdrawalManagementPageContent />}
        {activeTab === 'transactions' && <TransactionsPageContent />}
      </main>
    </div>
  )
}

function FarmManagementPageContent() {
  return <FarmManagementPage />
}

function InvestmentManagementPageContent() {
  return <InvestmentManagementPage />
}

function UserManagementPageContent() {
  return <UserManagementPage />
}

function WithdrawalManagementPageContent() {
  return <WithdrawalManagementPage />
}

function TransactionsPageContent() {
  return <TransactionsPage />
}
