'use client'

import Link from 'next/link'
import { Leaf, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useSession, signOut } from 'next-auth/react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

export default function Navigation() {
  const { data: session } = useSession()
  const router = useRouter()
  const primaryCtaHref = session?.user ? '/farms' : '/signup'
  const primaryCtaLabel = session?.user ? 'Go to Farms' : 'Get Started'

  const initials = (session?.user?.name || session?.user?.email || 'User')
    .split(' ')
    .map(part => part.charAt(0))
    .slice(0, 2)
    .join('')
    .toUpperCase()

  const handleDashboard = () => {
    router.push('/dashboard')
  }

  const handleLogout = () => {
    signOut({ callbackUrl: '/' })
  }

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50 supports-[backdrop-filter]:bg-background/60"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 transition-transform group-hover:scale-105">
              <Leaf className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-foreground group-hover:text-primary transition-colors">AgriVest</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {[
              { label: 'Browse Farms', href: '/farms' },
              { label: 'How It Works', href: '/how-it-works' },
              { label: 'About', href: '/about' }
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {!session?.user ? (
              <>
                <Button variant="ghost" asChild className="text-base font-medium hover:text-primary hover:bg-primary/5">
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild className="bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25 text-base px-6 rounded-full transition-all hover:scale-105">
                  <Link href={primaryCtaHref}>{primaryCtaLabel}</Link>
                </Button>
              </>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className="flex items-center gap-2 rounded-full border border-border bg-card pl-1 pr-3 py-1 shadow-sm transition hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  >
                    <Avatar className="h-8 w-8 border border-border">
                      <AvatarImage src={session.user.image ?? undefined} alt={session.user.name ?? ''} />
                      <AvatarFallback className="bg-primary/10 text-primary font-medium">{initials}</AvatarFallback>
                    </Avatar>
                    {/* <span className="text-sm font-medium text-foreground max-w-[100px] truncate hidden sm:block">
                      {session.user.name?.split(' ')[0]}
                    </span> */}
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 p-2">
                  <DropdownMenuItem onSelect={handleDashboard} className="cursor-pointer rounded-md focus:bg-primary/10 focus:text-primary">
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={handleLogout} className="cursor-pointer rounded-md text-destructive focus:bg-destructive/10 focus:text-destructive">
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  )
}
