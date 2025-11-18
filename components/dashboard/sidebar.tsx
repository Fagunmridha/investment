'use client'

import Link from 'next/link'
import { Leaf, Home, TrendingUp, Wallet, Settings, LogOut, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { signOut } from 'next-auth/react'

interface SidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
  userName?: string
  userEmail?: string
}

export function Sidebar({ activeTab, setActiveTab, userName, userEmail }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false)

  const menuItems = [
    { id: 'home', label: 'Dashboard Home', icon: Home },
    { id: 'investments', label: 'My Investments', icon: TrendingUp },
    { id: 'wallet', label: 'Wallet', icon: Wallet },
    { id: 'settings', label: 'Settings', icon: Settings },
  ]

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed lg:relative w-64 h-screen bg-sidebar border-r border-sidebar-border transition-transform duration-300 lg:translate-x-0 z-40 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 border-b border-sidebar-border space-y-1">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-sidebar-primary rounded-full flex items-center justify-center">
              <Leaf className="w-5 h-5 text-sidebar-primary-foreground" />
            </div>
            <span className="font-bold text-lg text-sidebar-foreground">AgriVest</span>
          </Link>
          <div>
            <p className="text-sm font-medium text-sidebar-foreground truncate">
              {userName ?? 'Investor'}
            </p>
            <p className="text-xs text-sidebar-accent-foreground truncate">
              {userEmail ?? 'user@ifarmer.com'}
            </p>
          </div>
        </div>

        <nav className="p-4 space-y-2 flex-1">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.id
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id)
                  setIsOpen(false)
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${
                  isActive
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent'
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </button>
            )
          })}
        </nav>

        <div className="p-4 border-t border-sidebar-border">
          <Button
            variant="outline"
            className="w-full flex items-center gap-2 justify-center"
            onClick={() => signOut({ callbackUrl: '/login' })}
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}
