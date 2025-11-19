'use client'

import { useMemo, useState } from 'react'
import { Sparkles, Bell } from 'lucide-react'
import { AdminSidebar } from '@/components/admin/admin-sidebar'
import { AdminDashboard } from '@/components/admin/admin-dashboard'
import FarmManagementPage from './farms/page'
import InvestmentManagementPage from './investments/page'
import UserManagementPage from './users/page'
import WithdrawalManagementPage from './withdrawals/page'
import TransactionsPage from './transactions/page'
import { Button } from '@/components/ui/button'

const sections = [
  { id: 'home', label: 'Overview', subline: 'Live metrics & governance alerts', component: <AdminDashboard /> },
  { id: 'farms', label: 'Farm Management', subline: 'Create, edit, and monitor farm cohorts', component: <FarmManagementPage /> },
  { id: 'investments', label: 'Investments', subline: 'Allocation funnels & performance', component: <InvestmentManagementPage /> },
  { id: 'users', label: 'Users', subline: 'Investor onboarding & KYC status', component: <UserManagementPage /> },
  { id: 'withdrawals', label: 'Withdrawals', subline: 'Payout queues & treasury ops', component: <WithdrawalManagementPage /> },
  { id: 'transactions', label: 'Transactions', subline: 'Ledger visibility & audit trails', component: <TransactionsPage /> },
]

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('home')
  const activeSection = useMemo(
    () => sections.find(section => section.id === activeTab) ?? sections[0],
    [activeTab]
  )

  return (
    <div className="flex min-h-screen bg-[radial-gradient(circle_at_top,_rgba(18,83,41,0.12),_transparent_55%),_radial-gradient(circle_at_bottom,_rgba(23,78,157,0.08),_transparent_60%)]">
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="sticky top-0 z-10 border-b border-border/60 bg-background/80 backdrop-blur-xl">
          <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground/80">Control Center</p>
              <h1 className="text-2xl font-semibold text-foreground sm:text-3xl">{activeSection.label}</h1>
              <p className="text-sm text-muted-foreground">{activeSection.subline}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="rounded-full border border-border/80 text-muted-foreground hover:text-foreground">
                <Bell className="h-4 w-4" />
              </Button>
              <Button className="hidden sm:inline-flex items-center gap-2 rounded-full bg-primary px-4 text-sm font-semibold hover:bg-primary/90">
                <Sparkles className="h-4 w-4" />
                Generate report
              </Button>
            </div>
          </div>
        </header>
        <section className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-7xl">
            {activeSection.component}
          </div>
        </section>
      </main>
    </div>
  )
}
