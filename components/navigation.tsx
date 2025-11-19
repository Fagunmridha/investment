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
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <Leaf className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg text-foreground">AgriVest</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/farms"
              className="text-sm text-muted-foreground hover:text-foreground transition"
            >
              Browse Farms
            </Link>
            <Link
              href="/how-it-works"
              className="text-sm text-muted-foreground hover:text-foreground transition"
            >
              How It Works
            </Link>
            <Link
              href="/about"
              className="text-sm text-muted-foreground hover:text-foreground transition"
            >
              About
            </Link>
          </div>

          <div className="flex items-center gap-3">
            {!session?.user ? (
              <>
                <Button variant="ghost" asChild>
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild className="bg-primary hover:bg-primary/90">
                  <Link href={primaryCtaHref}>{primaryCtaLabel}</Link>
                </Button>
              </>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className="flex items-center gap-2 rounded-full border border-border bg-card px-2 py-1 shadow-sm transition hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={session.user.image ?? undefined} alt={session.user.name ?? ''} />
                      <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-44">
                  <DropdownMenuItem onSelect={handleDashboard}>Dashboard</DropdownMenuItem>
                  <DropdownMenuItem onSelect={handleLogout}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
