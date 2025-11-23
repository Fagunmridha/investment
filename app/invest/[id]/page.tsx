'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { TrendingUp, Clock, AlertCircle, MapPin, CheckCircle, ArrowLeft, Loader2 } from 'lucide-react'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'

const getFarmData = (id: string) => ({
  id: id,
  name: 'Green Valley Rice Farm',
  location: 'Khulna, Bangladesh',
  owner: 'Ahmed Farmer Co.',
  category: 'Crops',
  image: '/rice-farm-landscape.jpg',
  roi: 18.5,
  duration: '12 months',
  riskLevel: 'Low',
  collected: 75000,
  target: 100000,
  description: 'Premium rice cultivation in fertile delta lands with sustainable farming practices. Our farm spans 500 acres of the most productive agricultural land in the Khulna region.',
})

export default function InvestPage({ params }: { params: { id: string } }) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [investmentAmount, setInvestmentAmount] = useState('1000')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [investmentId, setInvestmentId] = useState<string | null>(null)

  const farmData = getFarmData(params.id)
  const expectedReturn = parseFloat(investmentAmount) || 0
  const roiAmount = (parseFloat(investmentAmount) || 0) * (farmData.roi / 100)
  const totalReturn = expectedReturn + roiAmount

  
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push(`/login?callbackUrl=/invest/${params.id}`)
    }
  }, [status, router, params.id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)

    if (!session?.user) {
      setError('Please login to make an investment')
      return
    }

    const amount = parseFloat(investmentAmount)
    if (!amount || amount < 100) {
      setError('Minimum investment amount is $100')
      return
    }

    setIsSubmitting(true)

    try {
      
      const userId = (session.user as any).id || session.user.email

      const response = await fetch('/api/investments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          farmId: params.id,
          amount: amount,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create investment')
      }

      setSuccess(true)
      setInvestmentId(data.investmentId)
      
      
      setTimeout(() => {
        router.push('/dashboard/investments')
      }, 2000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while processing your investment')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (status === 'loading') {
    return (
      <main className="min-h-screen bg-background flex flex-col">
        <Navigation />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
        <Footer />
      </main>
    )
  }

  if (!session?.user) {
    return null 
  }

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navigation />

      <section className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          
          <Link
            href={`/farms/${params.id}`}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Farm Details
          </Link>

    
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-block px-3 py-1 bg-primary text-primary-foreground text-sm font-semibold rounded-full">
                  {farmData.category}
                </span>
              </div>
              <CardTitle className="text-3xl">{farmData.name}</CardTitle>
              <CardDescription className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {farmData.location}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-muted-foreground text-sm mb-1">Expected ROI</p>
                  <p className="text-2xl font-bold text-primary flex items-center justify-center gap-1">
                    <TrendingUp className="w-5 h-5" />
                    {farmData.roi}%
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-muted-foreground text-sm mb-1">Duration</p>
                  <p className="text-2xl font-bold text-foreground flex items-center justify-center gap-1">
                    <Clock className="w-5 h-5" />
                    {farmData.duration}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-muted-foreground text-sm mb-1">Risk Level</p>
                  <p className={`text-2xl font-bold flex items-center justify-center gap-1 ${
                    farmData.riskLevel === 'Low' ? 'text-green-600' : 'text-yellow-600'
                  }`}>
                    <AlertCircle className="w-5 h-5" />
                    {farmData.riskLevel}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

      
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Complete Your Investment</CardTitle>
              <CardDescription>
                Enter your investment amount and review the details before confirming
              </CardDescription>
            </CardHeader>
            <CardContent>
              {error && (
                <Alert variant="destructive" className="mb-6">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert className="mb-6 border-green-500 bg-green-50 dark:bg-green-950">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800 dark:text-green-200">
                    Investment created successfully! Redirecting to your dashboard...
                  </AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="amount" className="text-sm font-medium text-foreground block mb-2">
                    Investment Amount ($)
                  </label>
                  <Input
                    id="amount"
                    type="number"
                    value={investmentAmount}
                    onChange={(e) => setInvestmentAmount(e.target.value)}
                    min="100"
                    step="100"
                    className="bg-input text-foreground text-lg"
                    required
                    disabled={isSubmitting || success}
                  />
                  <p className="text-xs text-muted-foreground mt-2">Minimum investment: $100</p>
                </div>

                
                <div className="bg-secondary/50 p-6 rounded-lg space-y-4 border border-border">
                  <h3 className="font-semibold text-foreground text-lg mb-4">Investment Summary</h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Investment Amount</span>
                      <span className="font-semibold text-foreground">
                        ${(parseFloat(investmentAmount) || 0).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Expected ROI ({farmData.roi}%)</span>
                      <span className="font-semibold text-foreground">
                        ${roiAmount.toLocaleString()}
                      </span>
                    </div>
                    <div className="border-t border-border pt-3 flex justify-between">
                      <span className="font-medium text-foreground">Total Expected Return</span>
                      <span className="font-bold text-primary text-xl">
                        ${totalReturn.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                
                <div className="bg-muted/30 p-4 rounded-lg">
                  <p className="text-xs text-muted-foreground">
                    By proceeding, you agree to our{' '}
                    <Link href="/terms" className="text-primary hover:underline">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link href="/privacy" className="text-primary hover:underline">
                      Privacy Policy
                    </Link>
                    . Investments are subject to market risks. Please read all related documents carefully.
                  </p>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-lg h-12"
                  disabled={isSubmitting || success || !investmentAmount || parseFloat(investmentAmount) < 100}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : success ? (
                    <>
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Investment Successful!
                    </>
                  ) : (
                    'Confirm Investment'
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

      
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>What Happens Next?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-primary font-semibold text-sm">1</span>
                </div>
                <div>
                  <p className="font-medium text-foreground">Investment Confirmed</p>
                  <p className="text-sm text-muted-foreground">
                    Your investment will be processed and funds will be allocated to the farm.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-primary font-semibold text-sm">2</span>
                </div>
                <div>
                  <p className="font-medium text-foreground">Track Your Investment</p>
                  <p className="text-sm text-muted-foreground">
                    Monitor your investment progress and returns in your dashboard.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-primary font-semibold text-sm">3</span>
                </div>
                <div>
                  <p className="font-medium text-foreground">Receive Returns</p>
                  <p className="text-sm text-muted-foreground">
                    Returns will be distributed monthly based on actual harvest and sales.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </main>
  )
}

