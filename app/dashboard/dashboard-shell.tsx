'use client'

import { useState } from 'react'
import { Sidebar } from '@/components/dashboard/sidebar'
import { DashboardHome } from '@/components/dashboard/dashboard-home'
import InvestmentsPage from './investments/page'
import WalletPage from './wallet/page'
import SettingsPage from './settings/page'

type DashboardUser = {
  id: string
  fullName: string
  email: string
  kycStatus: string
}

export function DashboardShell({ user }: { user: DashboardUser }) {
  const [activeTab, setActiveTab] = useState('home')

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userName={user.fullName}
        userEmail={user.email}
      />
      <main className="flex-1 overflow-auto">
        {activeTab === 'home' && <DashboardHome user={user} />}
        {activeTab === 'investments' && <InvestmentsPage />}
        {activeTab === 'wallet' && <WalletPage />}
        {activeTab === 'settings' && <SettingsPage />}
      </main>
    </div>
  )
}

