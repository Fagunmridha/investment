'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Textarea } from '@/components/ui/textarea'
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
  
  // Personal Details State
  const [personal, setPersonal] = useState({
    fullName: '',
    email: '',
    phone: '',
    nid: '',
    dob: '',
    address: '',
  })

  // Payment Method State
  const [paymentMethod, setPaymentMethod] = useState<'bank' | 'wallet'>('bank')
  const [bankDetails, setBankDetails] = useState({
    bankName: '',
    accountHolder: '',
    accountNumber: '',
    branchName: '',
    routingNumber: '',
  })
  const [walletDetails, setWalletDetails] = useState({
    provider: '',
    walletNumber: '',
  })

  // Investment Details State
  const [investmentAmount, setInvestmentAmount] = useState('1000')
  const [termsAccepted, setTermsAccepted] = useState(false)

  // Form State
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [investmentId, setInvestmentId] = useState<string | null>(null)
  
  // Validation Errors
  const [personalErrors, setPersonalErrors] = useState<Record<string, string>>({})
  const [paymentErrors, setPaymentErrors] = useState<Record<string, string>>({})
  const [investmentErrors, setInvestmentErrors] = useState<Record<string, string>>({})

  const farmData = getFarmData(params.id)
  const expectedReturn = parseFloat(investmentAmount) || 0
  const roiAmount = (parseFloat(investmentAmount) || 0) * (farmData.roi / 100)
  const totalReturn = expectedReturn + roiAmount

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push(`/login?callbackUrl=/invest/${params.id}`)
    }
  }, [status, router, params.id])

  // Validation Functions
  const validatePersonal = (): boolean => {
    const errors: Record<string, string> = {}

    if (!personal.fullName.trim()) {
      errors.fullName = 'Full name is required'
    }

    if (!personal.email.trim()) {
      errors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personal.email)) {
      errors.email = 'Please enter a valid email address'
    }

    if (!personal.phone.trim()) {
      errors.phone = 'Phone number is required'
    }

    if (!personal.nid.trim()) {
      errors.nid = 'NID / Passport number is required'
    }

    if (!personal.dob.trim()) {
      errors.dob = 'Date of birth is required'
    }

    if (!personal.address.trim()) {
      errors.address = 'Address is required'
    }

    setPersonalErrors(errors)
    return Object.keys(errors).length === 0
  }

  const validatePayment = (): boolean => {
    const errors: Record<string, string> = {}

    if (paymentMethod === 'bank') {
      if (!bankDetails.bankName.trim()) {
        errors.bankName = 'Bank name is required'
      }
      if (!bankDetails.accountHolder.trim()) {
        errors.accountHolder = 'Account holder name is required'
      }
      if (!bankDetails.accountNumber.trim()) {
        errors.accountNumber = 'Account number is required'
      }
      if (!bankDetails.branchName.trim()) {
        errors.branchName = 'Branch name is required'
      }
    } else {
      if (!walletDetails.provider) {
        errors.provider = 'Wallet provider is required'
      }
      if (!walletDetails.walletNumber.trim()) {
        errors.walletNumber = 'Wallet number is required'
      }
    }

    setPaymentErrors(errors)
    return Object.keys(errors).length === 0
  }

  const validateInvestment = (): boolean => {
    const errors: Record<string, string> = {}

    const amount = parseFloat(investmentAmount)
    if (!amount || amount < 100) {
      errors.amount = 'Minimum investment amount is $100'
    }

    if (!termsAccepted) {
      errors.terms = 'You must accept the terms and conditions'
    }

    setInvestmentErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)

    // Clear previous errors
    setPersonalErrors({})
    setPaymentErrors({})
    setInvestmentErrors({})

    // Validate all sections
    const isPersonalValid = validatePersonal()
    const isPaymentValid = validatePayment()
    const isInvestmentValid = validateInvestment()

    if (!isPersonalValid || !isPaymentValid || !isInvestmentValid) {
      setError('Please fill in all required fields correctly')
      return
    }

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
          amount,
          personalDetails: personal,
          paymentDetails: paymentMethod === 'bank' ? {
            method: 'bank',
            ...bankDetails,
          } : {
            method: 'wallet',
            ...walletDetails,
          },
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

  const isFormValid = () => {
    const amount = parseFloat(investmentAmount)
    return (
      personal.fullName.trim() !== '' &&
      personal.email.trim() !== '' &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personal.email) &&
      personal.phone.trim() !== '' &&
      personal.nid.trim() !== '' &&
      personal.dob.trim() !== '' &&
      personal.address.trim() !== '' &&
      (paymentMethod === 'bank'
        ? bankDetails.bankName.trim() !== '' &&
          bankDetails.accountHolder.trim() !== '' &&
          bankDetails.accountNumber.trim() !== '' &&
          bankDetails.branchName.trim() !== ''
        : walletDetails.provider !== '' && walletDetails.walletNumber.trim() !== '') &&
      amount >= 100 &&
      termsAccepted
    )
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

          {/* Farm Hero Card */}
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

          {/* Main Investment Form Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Complete Your Investment</CardTitle>
              <CardDescription>
                Fill in your details and investment amount to proceed
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
                {/* Personal Details Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Personal Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">
                        Full Name <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="fullName"
                        type="text"
                        value={personal.fullName}
                        onChange={(e) =>
                          setPersonal({ ...personal, fullName: e.target.value })
                        }
                        className={personalErrors.fullName ? 'border-destructive' : ''}
                        placeholder="Enter your full name"
                        disabled={isSubmitting || success}
                        required
                      />
                      {personalErrors.fullName && (
                        <p className="text-sm text-destructive">{personalErrors.fullName}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">
                        Email <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={personal.email}
                        onChange={(e) =>
                          setPersonal({ ...personal, email: e.target.value })
                        }
                        className={personalErrors.email ? 'border-destructive' : ''}
                        placeholder="Enter your email"
                        disabled={isSubmitting || success}
                        required
                      />
                      {personalErrors.email && (
                        <p className="text-sm text-destructive">{personalErrors.email}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">
                        Phone Number <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={personal.phone}
                        onChange={(e) =>
                          setPersonal({ ...personal, phone: e.target.value })
                        }
                        className={personalErrors.phone ? 'border-destructive' : ''}
                        placeholder="Enter your phone number"
                        disabled={isSubmitting || success}
                        required
                      />
                      {personalErrors.phone && (
                        <p className="text-sm text-destructive">{personalErrors.phone}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="nid">
                        NID / Passport Number <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="nid"
                        type="text"
                        value={personal.nid}
                        onChange={(e) =>
                          setPersonal({ ...personal, nid: e.target.value })
                        }
                        className={personalErrors.nid ? 'border-destructive' : ''}
                        placeholder="Enter NID or Passport number"
                        disabled={isSubmitting || success}
                        required
                      />
                      {personalErrors.nid && (
                        <p className="text-sm text-destructive">{personalErrors.nid}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="dob">
                        Date of Birth <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="dob"
                        type="date"
                        value={personal.dob}
                        onChange={(e) =>
                          setPersonal({ ...personal, dob: e.target.value })
                        }
                        className={personalErrors.dob ? 'border-destructive' : ''}
                        max={new Date(new Date().setFullYear(new Date().getFullYear() - 18))
                          .toISOString()
                          .split('T')[0]}
                        disabled={isSubmitting || success}
                        required
                      />
                      {personalErrors.dob && (
                        <p className="text-sm text-destructive">{personalErrors.dob}</p>
                      )}
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="address">
                        Address <span className="text-destructive">*</span>
                      </Label>
                      <Textarea
                        id="address"
                        value={personal.address}
                        onChange={(e) =>
                          setPersonal({ ...personal, address: e.target.value })
                        }
                        className={personalErrors.address ? 'border-destructive' : ''}
                        placeholder="Enter your full address"
                        rows={3}
                        disabled={isSubmitting || success}
                        required
                      />
                      {personalErrors.address && (
                        <p className="text-sm text-destructive">{personalErrors.address}</p>
                      )}
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Payment / Bank Details Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Payment / Bank Details</h3>
                  
                  {/* Payment Method Selection */}
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => {
                        setPaymentMethod('bank')
                        setPaymentErrors({})
                      }}
                      className={`flex-1 p-4 rounded-lg border-2 transition-all text-left ${
                        paymentMethod === 'bank'
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                      disabled={isSubmitting || success}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <div
                          className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                            paymentMethod === 'bank'
                              ? 'border-primary bg-primary'
                              : 'border-border'
                          }`}
                        >
                          {paymentMethod === 'bank' && (
                            <div className="w-2 h-2 rounded-full bg-primary-foreground" />
                          )}
                        </div>
                        <span className="font-semibold">Use Bank Account</span>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setPaymentMethod('wallet')
                        setPaymentErrors({})
                      }}
                      className={`flex-1 p-4 rounded-lg border-2 transition-all text-left ${
                        paymentMethod === 'wallet'
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                      disabled={isSubmitting || success}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <div
                          className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                            paymentMethod === 'wallet'
                              ? 'border-primary bg-primary'
                              : 'border-border'
                          }`}
                        >
                          {paymentMethod === 'wallet' && (
                            <div className="w-2 h-2 rounded-full bg-primary-foreground" />
                          )}
                        </div>
                        <span className="font-semibold">Use Mobile Wallet</span>
                      </div>
                    </button>
                  </div>

                  {/* Bank Details */}
                  {paymentMethod === 'bank' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="bankName">
                          Bank Name <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="bankName"
                          type="text"
                          value={bankDetails.bankName}
                          onChange={(e) =>
                            setBankDetails({ ...bankDetails, bankName: e.target.value })
                          }
                          className={paymentErrors.bankName ? 'border-destructive' : ''}
                          placeholder="Enter bank name"
                          disabled={isSubmitting || success}
                          required
                        />
                        {paymentErrors.bankName && (
                          <p className="text-sm text-destructive">{paymentErrors.bankName}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="accountHolder">
                          Account Holder Name <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="accountHolder"
                          type="text"
                          value={bankDetails.accountHolder}
                          onChange={(e) =>
                            setBankDetails({ ...bankDetails, accountHolder: e.target.value })
                          }
                          className={paymentErrors.accountHolder ? 'border-destructive' : ''}
                          placeholder="Enter account holder name"
                          disabled={isSubmitting || success}
                          required
                        />
                        {paymentErrors.accountHolder && (
                          <p className="text-sm text-destructive">{paymentErrors.accountHolder}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="accountNumber">
                          Account Number <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="accountNumber"
                          type="text"
                          value={bankDetails.accountNumber}
                          onChange={(e) =>
                            setBankDetails({ ...bankDetails, accountNumber: e.target.value })
                          }
                          className={paymentErrors.accountNumber ? 'border-destructive' : ''}
                          placeholder="Enter account number"
                          disabled={isSubmitting || success}
                          required
                        />
                        {paymentErrors.accountNumber && (
                          <p className="text-sm text-destructive">{paymentErrors.accountNumber}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="branchName">
                          Branch Name <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="branchName"
                          type="text"
                          value={bankDetails.branchName}
                          onChange={(e) =>
                            setBankDetails({ ...bankDetails, branchName: e.target.value })
                          }
                          className={paymentErrors.branchName ? 'border-destructive' : ''}
                          placeholder="Enter branch name"
                          disabled={isSubmitting || success}
                          required
                        />
                        {paymentErrors.branchName && (
                          <p className="text-sm text-destructive">{paymentErrors.branchName}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="routingNumber">
                          Routing Number <span className="text-muted-foreground">(Optional)</span>
                        </Label>
                        <Input
                          id="routingNumber"
                          type="text"
                          value={bankDetails.routingNumber}
                          onChange={(e) =>
                            setBankDetails({ ...bankDetails, routingNumber: e.target.value })
                          }
                          placeholder="Enter routing number (optional)"
                          disabled={isSubmitting || success}
                        />
                      </div>
                    </div>
                  )}

                  {/* Wallet Details */}
                  {paymentMethod === 'wallet' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="walletProvider">
                          Wallet Provider <span className="text-destructive">*</span>
                        </Label>
                        <Select
                          value={walletDetails.provider}
                          onValueChange={(value) =>
                            setWalletDetails({ ...walletDetails, provider: value })
                          }
                          disabled={isSubmitting || success}
                        >
                          <SelectTrigger
                            className={paymentErrors.provider ? 'border-destructive' : ''}
                          >
                            <SelectValue placeholder="Select wallet provider" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="bkash">bKash</SelectItem>
                            <SelectItem value="nagad">Nagad</SelectItem>
                            <SelectItem value="rocket">Rocket</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        {paymentErrors.provider && (
                          <p className="text-sm text-destructive">{paymentErrors.provider}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="walletNumber">
                          Wallet Number <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="walletNumber"
                          type="tel"
                          value={walletDetails.walletNumber}
                          onChange={(e) =>
                            setWalletDetails({ ...walletDetails, walletNumber: e.target.value })
                          }
                          className={paymentErrors.walletNumber ? 'border-destructive' : ''}
                          placeholder="Enter wallet number"
                          disabled={isSubmitting || success}
                          required
                        />
                        {paymentErrors.walletNumber && (
                          <p className="text-sm text-destructive">{paymentErrors.walletNumber}</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <Separator />

                {/* Investment Details Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Investment Details</h3>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="amount">
                        Investment Amount ($) <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="amount"
                        type="number"
                        value={investmentAmount}
                        onChange={(e) => setInvestmentAmount(e.target.value)}
                        min="100"
                        step="100"
                        className={`bg-input text-foreground text-lg ${
                          investmentErrors.amount ? 'border-destructive' : ''
                        }`}
                        disabled={isSubmitting || success}
                        required
                      />
                      {investmentErrors.amount && (
                        <p className="text-sm text-destructive">{investmentErrors.amount}</p>
                      )}
                      <p className="text-xs text-muted-foreground">Minimum investment: $100</p>
                    </div>

                    {/* Quick Amount Buttons */}
                    <div className="space-y-2">
                      <Label className="text-sm text-muted-foreground">Quick Select:</Label>
                      <div className="flex flex-wrap gap-2">
                        {[100, 500, 1000, 2000].map((amount) => (
                          <Button
                            key={amount}
                            type="button"
                            variant={
                              parseFloat(investmentAmount) === amount ? 'default' : 'outline'
                            }
                            onClick={() => setInvestmentAmount(amount.toString())}
                            disabled={isSubmitting || success}
                            className={
                              parseFloat(investmentAmount) === amount
                                ? 'bg-primary hover:bg-primary/90'
                                : ''
                            }
                          >
                            ${amount.toLocaleString()}
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Investment Summary */}
                    <div className="bg-secondary/50 p-6 rounded-lg space-y-4 border border-border">
                      <h4 className="font-semibold text-foreground text-base">Investment Summary</h4>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Investment Amount</span>
                          <span className="font-semibold text-foreground">
                            ${(parseFloat(investmentAmount) || 0).toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            Expected ROI ({farmData.roi}%)
                          </span>
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

                    {/* Terms Checkbox */}
                    <div className="flex items-start gap-3 space-y-0">
                      <Checkbox
                        id="terms"
                        checked={termsAccepted}
                        onCheckedChange={(checked) => setTermsAccepted(checked === true)}
                        disabled={isSubmitting || success}
                        className={investmentErrors.terms ? 'border-destructive' : ''}
                      />
                      <div className="space-y-1">
                        <Label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          I have read and agree to the terms, risks, and conditions of this
                          investment.{' '}
                          <span className="text-destructive">*</span>
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          By checking this box, you agree to our{' '}
                          <Link href="/terms" className="text-primary hover:underline">
                            Terms of Service
                          </Link>{' '}
                          and{' '}
                          <Link href="/privacy" className="text-primary hover:underline">
                            Privacy Policy
                          </Link>
                          . Investments are subject to market risks.
                        </p>
                        {investmentErrors.terms && (
                          <p className="text-sm text-destructive">{investmentErrors.terms}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-lg h-12"
                  disabled={isSubmitting || success || !isFormValid()}
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

          {/* What Happens Next Card */}
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
