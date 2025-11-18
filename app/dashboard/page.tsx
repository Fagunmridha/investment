import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth/next'
import type { Session } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { DashboardShell } from './dashboard-shell'

export default async function DashboardPage() {
  const session = (await getServerSession(authOptions)) as Session | null

  if (!session?.user?.id) {
    redirect('/login')
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      fullName: true,
      email: true,
      kycStatus: true,
    },
  })

  if (!user) {
    redirect('/login')
  }

  return <DashboardShell user={user} />
}
