'use client'

import { Users, DollarSign, Sprout } from 'lucide-react'
import { motion, useInView, useSpring, useTransform, Variants } from 'framer-motion'
import { useEffect, useRef } from 'react'

const stats = [
  {
    label: 'Active Investors',
    value: 15247,
    prefix: '',
    suffix: '',
    icon: Users,
  },
  {
    label: 'Total Investment',
    value: 42.3,
    prefix: '$',
    suffix: 'M',
    icon: DollarSign,
  },
  {
    label: 'Farmers Supported',
    value: 1854,
    prefix: '',
    suffix: '',
    icon: Sprout,
  },
]

function Counter({ value, prefix = '', suffix = '' }: { value: number, prefix?: string, suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })

  const spring = useSpring(0, { mass: 0.8, stiffness: 75, damping: 15 })
  const display = useTransform(spring, (current) => {
    if (value % 1 !== 0) {
      return `${prefix}${current.toFixed(1)}${suffix}`
    }
    return `${prefix}${Math.round(current).toLocaleString()}${suffix}`
  })

  useEffect(() => {
    if (inView) {
      spring.set(value)
    }
  }, [inView, spring, value])

  return <motion.span ref={ref}>{display}</motion.span>
}

export default function StatsSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  return (
    <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-secondary/30 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl transform transition-transform duration-500 group-hover:scale-105" />
                <div className="relative p-8 rounded-3xl border border-primary/10 bg-card/50 backdrop-blur-sm hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 transform transition-transform duration-500 group-hover:rotate-6">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <p className="text-muted-foreground font-medium mb-2">{stat.label}</p>
                    <p className="text-4xl md:text-5xl font-display font-bold text-foreground tracking-tight">
                      <Counter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                    </p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
