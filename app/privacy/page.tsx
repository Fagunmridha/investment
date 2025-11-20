import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative py-20 md:py-32 bg-green-950">
        <div
          className="absolute inset-0 z-0 opacity-40"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1920&q=80")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="container relative z-10 px-4 md:px-6 mx-auto text-center">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl mb-4 text-white">
            Privacy Policy
          </h1>
          <p className="text-green-100 text-lg max-w-[700px] mx-auto">
            Your privacy is important to us. Learn how we collect, use, and protect your personal information.
          </p>
          <p className="text-green-200 text-sm mt-2">
            Last updated: January 15, 2025
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-grow py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            
            {/* Introduction */}
            <Card>
              <CardHeader>
                <CardTitle>1. Introduction</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  Welcome to iFarmer ("we," "our," or "us"). We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our agricultural investment platform.
                </p>
                <p>
                  By using our services, you agree to the collection and use of information in accordance with this policy. If you do not agree with our policies and practices, please do not use our services.
                </p>
              </CardContent>
            </Card>

            {/* Information We Collect */}
            <Card>
              <CardHeader>
                <CardTitle>2. Information We Collect</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">2.1 Personal Information</h3>
                  <p className="mb-2">We may collect the following types of personal information:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Name, email address, phone number, and mailing address</li>
                    <li>Government-issued identification documents (for KYC verification)</li>
                    <li>Financial information, including bank account details and payment information</li>
                    <li>Investment preferences and risk tolerance</li>
                    <li>Tax identification numbers</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">2.2 Usage Information</h3>
                  <p className="mb-2">We automatically collect certain information when you use our platform:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>IP address and device information</li>
                    <li>Browser type and version</li>
                    <li>Pages visited and time spent on pages</li>
                    <li>Referring website addresses</li>
                    <li>Cookies and similar tracking technologies</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">2.3 Transaction Information</h3>
                  <p>We collect information about your investment transactions, including investment amounts, returns, and transaction history.</p>
                </div>
              </CardContent>
            </Card>

            {/* How We Use Your Information */}
            <Card>
              <CardHeader>
                <CardTitle>3. How We Use Your Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>We use the information we collect for the following purposes:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong className="text-foreground">Service Provision:</strong> To provide, maintain, and improve our investment platform and services</li>
                  <li><strong className="text-foreground">Account Management:</strong> To create and manage your account, process transactions, and communicate with you</li>
                  <li><strong className="text-foreground">Compliance:</strong> To comply with legal obligations, including KYC/AML requirements and tax reporting</li>
                  <li><strong className="text-foreground">Security:</strong> To detect, prevent, and address fraud, security issues, and other harmful activities</li>
                  <li><strong className="text-foreground">Communication:</strong> To send you updates, newsletters, and important information about your investments</li>
                  <li><strong className="text-foreground">Analytics:</strong> To analyze usage patterns and improve our platform's functionality and user experience</li>
                  <li><strong className="text-foreground">Marketing:</strong> To send you promotional materials (with your consent) about our services and investment opportunities</li>
                </ul>
              </CardContent>
            </Card>

            {/* Information Sharing */}
            <Card>
              <CardHeader>
                <CardTitle>4. Information Sharing and Disclosure</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>We do not sell your personal information. We may share your information in the following circumstances:</p>
                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">4.1 Service Providers</h3>
                    <p>We may share information with third-party service providers who perform services on our behalf, such as payment processing, data storage, and customer support.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">4.2 Legal Requirements</h3>
                    <p>We may disclose information if required by law, court order, or government regulation, or to protect our rights, property, or safety.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">4.3 Business Transfers</h3>
                    <p>In the event of a merger, acquisition, or sale of assets, your information may be transferred to the acquiring entity.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">4.4 With Your Consent</h3>
                    <p>We may share information with third parties when you explicitly consent to such sharing.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Data Security */}
            <Card>
              <CardHeader>
                <CardTitle>5. Data Security</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. These measures include:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Encryption of data in transit and at rest</li>
                  <li>Secure authentication and access controls</li>
                  <li>Regular security audits and assessments</li>
                  <li>Employee training on data protection</li>
                  <li>Compliance with industry security standards</li>
                </ul>
                <p className="mt-4">
                  However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your information, we cannot guarantee absolute security.
                </p>
              </CardContent>
            </Card>

            {/* Your Rights */}
            <Card>
              <CardHeader>
                <CardTitle>6. Your Rights and Choices</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>You have the following rights regarding your personal information:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong className="text-foreground">Access:</strong> Request access to your personal information</li>
                  <li><strong className="text-foreground">Correction:</strong> Request correction of inaccurate or incomplete information</li>
                  <li><strong className="text-foreground">Deletion:</strong> Request deletion of your personal information (subject to legal obligations)</li>
                  <li><strong className="text-foreground">Portability:</strong> Request transfer of your data to another service</li>
                  <li><strong className="text-foreground">Opt-out:</strong> Opt-out of marketing communications at any time</li>
                  <li><strong className="text-foreground">Cookies:</strong> Manage cookie preferences through your browser settings</li>
                </ul>
                <p className="mt-4">
                  To exercise these rights, please contact us using the information provided in the "Contact Us" section below.
                </p>
              </CardContent>
            </Card>

            {/* Cookies */}
            <Card>
              <CardHeader>
                <CardTitle>7. Cookies and Tracking Technologies</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  We use cookies and similar tracking technologies to collect and store information about your preferences and activity on our platform. Cookies help us:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Remember your login credentials and preferences</li>
                  <li>Analyze how you use our platform</li>
                  <li>Improve our services and user experience</li>
                  <li>Provide personalized content and advertisements</li>
                </ul>
                <p className="mt-4">
                  You can control cookies through your browser settings. However, disabling cookies may limit your ability to use certain features of our platform.
                </p>
              </CardContent>
            </Card>

            {/* Data Retention */}
            <Card>
              <CardHeader>
                <CardTitle>8. Data Retention</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. We will delete or anonymize your information when it is no longer needed, except where we are required to retain it for legal, regulatory, or accounting purposes.
                </p>
              </CardContent>
            </Card>

            {/* Children's Privacy */}
            <Card>
              <CardHeader>
                <CardTitle>9. Children's Privacy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately, and we will take steps to delete such information.
                </p>
              </CardContent>
            </Card>

            {/* International Transfers */}
            <Card>
              <CardHeader>
                <CardTitle>10. International Data Transfers</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  Your information may be transferred to and processed in countries other than your country of residence. These countries may have data protection laws that differ from those in your country. By using our services, you consent to the transfer of your information to these countries. We take appropriate measures to ensure your information is protected in accordance with this Privacy Policy.
                </p>
              </CardContent>
            </Card>

            {/* Changes to Policy */}
            <Card>
              <CardHeader>
                <CardTitle>11. Changes to This Privacy Policy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  We may update this Privacy Policy from time to time to reflect changes in our practices or for legal, operational, or regulatory reasons. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last updated" date. We encourage you to review this Privacy Policy periodically.
                </p>
              </CardContent>
            </Card>

            {/* Contact Us */}
            <Card>
              <CardHeader>
                <CardTitle>12. Contact Us</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
                </p>
                <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                  <p><strong className="text-foreground">Email:</strong> privacy@ifarmer.com</p>
                  <p><strong className="text-foreground">Address:</strong> iFarmer, 123 Investment Street, Financial District, City, Country</p>
                  <p><strong className="text-foreground">Phone:</strong> +1 (555) 123-4567</p>
                </div>
                <p className="mt-4">
                  You can also visit our <a href="/contact" className="text-primary hover:underline">Contact Us</a> page for additional ways to reach us.
                </p>
              </CardContent>
            </Card>

          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}

