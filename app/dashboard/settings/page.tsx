'use client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { User, Lock, Shield } from 'lucide-react'
import { useState } from 'react'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('settings')
  const [activeSettingsTab, setActiveSettingsTab] = useState('profile')

  const [profileData, setProfileData] = useState({
    fullName: 'Ahmed Hasan',
    email: 'ahmed@example.com',
    phone: '+880 1812345678',
    dateOfBirth: '1990-05-15',
  })

  const [kycData, setKycData] = useState({
    nidNumber: '1234567890',
    dateOfIssue: '2020-01-01',
    dateOfExpiry: '2030-01-01',
    status: 'verified',
  })

  const [bankData, setBankData] = useState({
    accountHolder: 'Ahmed Hasan',
    bankName: 'Dhaka Bank',
    accountNumber: '1234567890',
    routingNumber: '020050001',
  })

  return (
    <div className="flex min-h-screen bg-background">
      {/* <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} /> */}
      
      <main className="flex-1 overflow-auto p-6 lg:p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
            <p className="text-muted-foreground">Manage your account information</p>
          </div>

          {/* Settings Tabs */}
          <div className="flex gap-2 border-b border-border overflow-x-auto">
            <button
              onClick={() => setActiveSettingsTab('profile')}
              className={`px-4 py-3 border-b-2 font-medium transition whitespace-nowrap flex items-center gap-2 ${
                activeSettingsTab === 'profile'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <User className="w-4 h-4" />
              Profile
            </button>
            <button
              onClick={() => setActiveSettingsTab('kyc')}
              className={`px-4 py-3 border-b-2 font-medium transition whitespace-nowrap flex items-center gap-2 ${
                activeSettingsTab === 'kyc'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <Shield className="w-4 h-4" />
              KYC Verification
            </button>
            <button
              onClick={() => setActiveSettingsTab('bank')}
              className={`px-4 py-3 border-b-2 font-medium transition whitespace-nowrap flex items-center gap-2 ${
                activeSettingsTab === 'bank'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              Bank Details
            </button>
            <button
              onClick={() => setActiveSettingsTab('password')}
              className={`px-4 py-3 border-b-2 font-medium transition whitespace-nowrap flex items-center gap-2 ${
                activeSettingsTab === 'password'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <Lock className="w-4 h-4" />
              Password
            </button>
          </div>

          {/* Profile Tab */}
          {activeSettingsTab === 'profile' && (
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your profile details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">Full Name</label>
                    <Input
                      type="text"
                      value={profileData.fullName}
                      onChange={(e) => setProfileData({...profileData, fullName: e.target.value})}
                      className="bg-input text-foreground"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">Email</label>
                    <Input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      className="bg-input text-foreground"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">Phone Number</label>
                    <Input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                      className="bg-input text-foreground"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">Date of Birth</label>
                    <Input
                      type="date"
                      value={profileData.dateOfBirth}
                      onChange={(e) => setProfileData({...profileData, dateOfBirth: e.target.value})}
                      className="bg-input text-foreground"
                    />
                  </div>
                </div>
                <Button className="bg-primary hover:bg-primary/90">Save Changes</Button>
              </CardContent>
            </Card>
          )}

          {/* KYC Tab */}
          {activeSettingsTab === 'kyc' && (
            <Card>
              <CardHeader>
                <CardTitle>KYC Verification</CardTitle>
                <CardDescription>Your Know Your Customer verification status</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
                  <Shield className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-green-900">Verified</p>
                    <p className="text-sm text-green-800">Your KYC is verified and active</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">NID Number</label>
                    <Input
                      type="text"
                      value={kycData.nidNumber}
                      disabled
                      className="bg-muted text-muted-foreground"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">Date of Issue</label>
                    <Input
                      type="date"
                      value={kycData.dateOfIssue}
                      disabled
                      className="bg-muted text-muted-foreground"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">Date of Expiry</label>
                    <Input
                      type="date"
                      value={kycData.dateOfExpiry}
                      disabled
                      className="bg-muted text-muted-foreground"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Bank Details Tab */}
          {activeSettingsTab === 'bank' && (
            <Card>
              <CardHeader>
                <CardTitle>Bank Details</CardTitle>
                <CardDescription>Your bank account information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">Account Holder Name</label>
                    <Input
                      type="text"
                      value={bankData.accountHolder}
                      onChange={(e) => setBankData({...bankData, accountHolder: e.target.value})}
                      className="bg-input text-foreground"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">Bank Name</label>
                    <Input
                      type="text"
                      value={bankData.bankName}
                      onChange={(e) => setBankData({...bankData, bankName: e.target.value})}
                      className="bg-input text-foreground"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">Account Number</label>
                    <Input
                      type="text"
                      value={bankData.accountNumber}
                      onChange={(e) => setBankData({...bankData, accountNumber: e.target.value})}
                      className="bg-input text-foreground"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">Routing Number</label>
                    <Input
                      type="text"
                      value={bankData.routingNumber}
                      onChange={(e) => setBankData({...bankData, routingNumber: e.target.value})}
                      className="bg-input text-foreground"
                    />
                  </div>
                </div>
                <Button className="bg-primary hover:bg-primary/90">Update Bank Details</Button>
              </CardContent>
            </Card>
          )}

          {/* Password Tab */}
          {activeSettingsTab === 'password' && (
            <Card>
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>Update your account password</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 max-w-md">
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Current Password</label>
                  <Input
                    type="password"
                    placeholder="Enter current password"
                    className="bg-input text-foreground"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">New Password</label>
                  <Input
                    type="password"
                    placeholder="Enter new password"
                    className="bg-input text-foreground"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Confirm Password</label>
                  <Input
                    type="password"
                    placeholder="Confirm new password"
                    className="bg-input text-foreground"
                  />
                </div>
                <Button className="bg-primary hover:bg-primary/90">Change Password</Button>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
