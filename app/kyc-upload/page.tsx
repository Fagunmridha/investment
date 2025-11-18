'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Leaf, Upload, CheckCircle2 } from 'lucide-react'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'

export default function KYCUploadPage() {
  const [uploadedFiles, setUploadedFiles] = useState({
    nidPhoto: '',
    nidBack: '',
    selfie: '',
  })

  const [submitting, setSubmitting] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const file = e.target.files?.[0]
    if (file) {
      setUploadedFiles(prev => ({
        ...prev,
        [field]: file.name
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    // Simulate submission
    setTimeout(() => {
      setSubmitting(false)
      alert('KYC documents submitted for verification')
    }, 1500)
  }

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Leaf className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-lg text-foreground">iFarmer</span>
            </div>
            <CardTitle className="text-2xl">KYC Verification</CardTitle>
            <CardDescription>Please upload your identity documents for verification</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* NID Front */}
              <div>
                <label className="text-sm font-medium text-foreground block mb-3">National ID (Front Side)</label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:bg-secondary/50 transition cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, 'nidPhoto')}
                    className="hidden"
                    id="nid-photo"
                    required
                  />
                  <label htmlFor="nid-photo" className="cursor-pointer">
                    <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="font-medium text-foreground">{uploadedFiles.nidPhoto || 'Click to upload'}</p>
                    <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 5MB</p>
                  </label>
                </div>
              </div>

              {/* NID Back */}
              <div>
                <label className="text-sm font-medium text-foreground block mb-3">National ID (Back Side)</label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:bg-secondary/50 transition cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, 'nidBack')}
                    className="hidden"
                    id="nid-back"
                    required
                  />
                  <label htmlFor="nid-back" className="cursor-pointer">
                    <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="font-medium text-foreground">{uploadedFiles.nidBack || 'Click to upload'}</p>
                    <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 5MB</p>
                  </label>
                </div>
              </div>

              {/* Selfie */}
              <div>
                <label className="text-sm font-medium text-foreground block mb-3">Selfie with ID</label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:bg-secondary/50 transition cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, 'selfie')}
                    className="hidden"
                    id="selfie"
                    required
                  />
                  <label htmlFor="selfie" className="cursor-pointer">
                    <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="font-medium text-foreground">{uploadedFiles.selfie || 'Click to upload'}</p>
                    <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 5MB</p>
                  </label>
                </div>
              </div>

              {/* Verification Info */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2">
                <p className="text-sm font-medium text-blue-900">Verification Tips:</p>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Ensure all document edges are visible</li>
                  <li>• Good lighting and clear visibility of text</li>
                  <li>• Face clearly visible in selfie</li>
                  <li>• Documents should not be expired</li>
                </ul>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90 text-lg h-10"
                disabled={submitting}
              >
                {submitting ? 'Submitting...' : 'Submit for Verification'}
              </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground mt-6">
              Your documents will be verified within 24 hours.{' '}
              <Link href="/dashboard" className="text-primary hover:underline font-medium">
                Go to Dashboard
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </main>
  )
}
