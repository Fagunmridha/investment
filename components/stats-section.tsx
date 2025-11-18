'use client'

import { Users, DollarSign, Sprout } from 'lucide-react'

const stats = [
  {
    label: 'Active Investors',
    value: '15,247',
    icon: Users,
  },
  {
    label: 'Total Investment',
    value: '$42.3M',
    icon: DollarSign,
  },
  {
    label: 'Farmers Supported',
    value: '1,854',
    icon: Sprout,
  },
]

export default function StatsSection() {
  return (
    <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <p className="text-muted-foreground text-sm mb-2">{stat.label}</p>
                <p className="text-3xl md:text-4xl font-bold text-foreground">{stat.value}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
