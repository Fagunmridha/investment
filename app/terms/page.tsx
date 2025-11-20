import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function TermsOfServicePage() {
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
            Terms of Service
          </h1>
          <p className="text-green-100 text-lg max-w-[700px] mx-auto">
            Please read these terms carefully before using our agricultural investment platform.
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
                <CardTitle>1. Acceptance of Terms</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  Welcome to iFarmer ("we," "our," "us," or "the Platform"). These Terms of Service ("Terms") govern your access to and use of our agricultural investment platform, including our website, mobile applications, and related services (collectively, the "Services").
                </p>
                <p>
                  By accessing or using our Services, you agree to be bound by these Terms and our Privacy Policy. If you do not agree to these Terms, you may not access or use our Services.
                </p>
                <p>
                  We reserve the right to modify these Terms at any time. We will notify you of any material changes by posting the updated Terms on this page and updating the "Last updated" date. Your continued use of the Services after such modifications constitutes your acceptance of the updated Terms.
                </p>
              </CardContent>
            </Card>

            {/* Eligibility */}
            <Card>
              <CardHeader>
                <CardTitle>2. Eligibility and Account Registration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">2.1 Eligibility Requirements</h3>
                  <p className="mb-2">To use our Services, you must:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Be at least 18 years of age</li>
                    <li>Have the legal capacity to enter into binding contracts</li>
                    <li>Reside in a jurisdiction where our Services are legally available</li>
                    <li>Comply with all applicable laws and regulations</li>
                    <li>Provide accurate and complete information during registration</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">2.2 Account Registration</h3>
                  <p>
                    To access certain features of our Services, you must create an account. You agree to:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li>Provide accurate, current, and complete information</li>
                    <li>Maintain and update your account information as necessary</li>
                    <li>Maintain the security of your account credentials</li>
                    <li>Accept responsibility for all activities under your account</li>
                    <li>Notify us immediately of any unauthorized access</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">2.3 KYC/AML Verification</h3>
                  <p>
                    We are required to verify your identity and conduct Know Your Customer (KYC) and Anti-Money Laundering (AML) checks. You agree to provide all necessary documentation and information for these verification processes. We reserve the right to suspend or terminate your account if verification cannot be completed.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Investment Services */}
            <Card>
              <CardHeader>
                <CardTitle>3. Investment Services</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">3.1 Investment Opportunities</h3>
                  <p>
                    Our Platform connects investors with agricultural investment opportunities. We facilitate investments in various agricultural projects, including crop farming, livestock, fisheries, and related agricultural ventures.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">3.2 Investment Risks</h3>
                  <p className="mb-2">All investments carry inherent risks, including but not limited to:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Loss of principal investment</li>
                    <li>Market volatility and economic conditions</li>
                    <li>Agricultural risks (weather, pests, diseases, crop failure)</li>
                    <li>Regulatory and policy changes</li>
                    <li>Currency fluctuations</li>
                    <li>Liquidity risks</li>
                  </ul>
                  <p className="mt-4">
                    You acknowledge that you understand these risks and that past performance does not guarantee future results. You should only invest funds that you can afford to lose.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">3.3 No Investment Advice</h3>
                  <p>
                    Our Platform provides information about investment opportunities but does not constitute financial, investment, or legal advice. We do not recommend or endorse any specific investment. You should consult with qualified financial, legal, and tax advisors before making investment decisions.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">3.4 Investment Returns</h3>
                  <p>
                    Projected returns and performance metrics are estimates based on historical data and assumptions. Actual returns may vary significantly. We do not guarantee any specific returns or investment outcomes.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* User Conduct */}
            <Card>
              <CardHeader>
                <CardTitle>4. User Conduct and Responsibilities</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>You agree to use our Services only for lawful purposes and in accordance with these Terms. You agree not to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Violate any applicable laws, regulations, or third-party rights</li>
                  <li>Engage in fraudulent, deceptive, or manipulative activities</li>
                  <li>Interfere with or disrupt the Services or servers</li>
                  <li>Attempt to gain unauthorized access to any part of the Services</li>
                  <li>Transmit viruses, malware, or other harmful code</li>
                  <li>Use automated systems to access the Services without permission</li>
                  <li>Impersonate any person or entity</li>
                  <li>Collect or harvest information about other users</li>
                  <li>Use the Services for any commercial purpose without our written consent</li>
                </ul>
                <p className="mt-4">
                  Violation of these provisions may result in immediate termination of your account and legal action.
                </p>
              </CardContent>
            </Card>

            {/* Fees and Payments */}
            <Card>
              <CardHeader>
                <CardTitle>5. Fees and Payments</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">5.1 Platform Fees</h3>
                  <p>
                    We may charge fees for our Services, including but not limited to transaction fees, management fees, and service fees. All fees will be clearly disclosed before you complete a transaction. Fees are non-refundable unless otherwise stated.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">5.2 Payment Processing</h3>
                  <p>
                    Payments are processed through third-party payment processors. You agree to comply with their terms and conditions. We are not responsible for any issues arising from payment processing.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">5.3 Refunds</h3>
                  <p>
                    Investment transactions are generally final and non-refundable. Refund policies for specific investments will be disclosed in the investment documentation. Platform fees are non-refundable except as required by law.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">5.4 Taxes</h3>
                  <p>
                    You are solely responsible for determining and paying all applicable taxes on your investments and returns. We may be required to report certain transactions to tax authorities as required by law.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Intellectual Property */}
            <Card>
              <CardHeader>
                <CardTitle>6. Intellectual Property Rights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  The Services, including all content, features, functionality, logos, trademarks, and software, are owned by iFarmer or our licensors and are protected by copyright, trademark, and other intellectual property laws.
                </p>
                <p>
                  You are granted a limited, non-exclusive, non-transferable license to access and use the Services for personal, non-commercial purposes in accordance with these Terms. You may not:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Reproduce, distribute, or create derivative works</li>
                  <li>Modify, reverse engineer, or decompile any software</li>
                  <li>Remove any copyright or proprietary notices</li>
                  <li>Use our trademarks or logos without permission</li>
                </ul>
              </CardContent>
            </Card>

            {/* Disclaimers */}
            <Card>
              <CardHeader>
                <CardTitle>7. Disclaimers and Limitations of Liability</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">7.1 Service Availability</h3>
                  <p>
                    We strive to provide reliable Services but do not guarantee uninterrupted, error-free, or secure access. The Services are provided "as is" and "as available" without warranties of any kind.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">7.2 Investment Disclaimers</h3>
                  <p>
                    We do not guarantee the performance, returns, or success of any investment opportunity. All investments are subject to risk, and you may lose your entire investment. We are not liable for any investment losses.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">7.3 Limitation of Liability</h3>
                  <p>
                    To the maximum extent permitted by law, iFarmer and its affiliates, officers, directors, employees, and agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or investment capital, arising from your use of the Services.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">7.4 Third-Party Content</h3>
                  <p>
                    Our Services may contain links to third-party websites or content. We are not responsible for the accuracy, legality, or content of third-party sites. Your interactions with third parties are solely between you and the third party.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Indemnification */}
            <Card>
              <CardHeader>
                <CardTitle>8. Indemnification</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  You agree to indemnify, defend, and hold harmless iFarmer and its affiliates, officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, costs, or expenses (including reasonable attorneys' fees) arising from:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Your use of the Services</li>
                  <li>Your violation of these Terms</li>
                  <li>Your violation of any rights of another party</li>
                  <li>Your investment decisions and activities</li>
                  <li>Any content you submit or transmit through the Services</li>
                </ul>
              </CardContent>
            </Card>

            {/* Termination */}
            <Card>
              <CardHeader>
                <CardTitle>9. Termination</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">9.1 Termination by You</h3>
                  <p>
                    You may terminate your account at any time by contacting us or using the account deletion feature in your account settings. Note that termination does not affect your obligations regarding active investments.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">9.2 Termination by Us</h3>
                  <p>
                    We may suspend or terminate your account immediately if you violate these Terms, engage in fraudulent activity, or for any other reason we deem necessary to protect the Platform and other users.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">9.3 Effect of Termination</h3>
                  <p>
                    Upon termination, your right to access and use the Services will immediately cease. Provisions that by their nature should survive termination will remain in effect, including but not limited to indemnification, disclaimers, and limitations of liability.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Dispute Resolution */}
            <Card>
              <CardHeader>
                <CardTitle>10. Dispute Resolution</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">10.1 Governing Law</h3>
                  <p>
                    These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which iFarmer is incorporated, without regard to its conflict of law provisions.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">10.2 Dispute Resolution Process</h3>
                  <p className="mb-2">In the event of a dispute, you agree to:</p>
                  <ol className="list-decimal list-inside space-y-1 ml-4">
                    <li>First contact us to attempt to resolve the dispute informally</li>
                    <li>If informal resolution fails, participate in good faith in mediation</li>
                    <li>If mediation fails, submit to binding arbitration in accordance with applicable arbitration rules</li>
                  </ol>
                  <p className="mt-4">
                    You waive your right to a jury trial and to participate in class action lawsuits, except where prohibited by law.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Miscellaneous */}
            <Card>
              <CardHeader>
                <CardTitle>11. Miscellaneous Provisions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">11.1 Entire Agreement</h3>
                  <p>
                    These Terms, together with our Privacy Policy, constitute the entire agreement between you and iFarmer regarding the Services and supersede all prior agreements.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">11.2 Severability</h3>
                  <p>
                    If any provision of these Terms is found to be unenforceable, the remaining provisions will remain in full effect.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">11.3 Waiver</h3>
                  <p>
                    Our failure to enforce any provision of these Terms does not constitute a waiver of that provision or any other provision.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">11.4 Assignment</h3>
                  <p>
                    You may not assign or transfer your rights or obligations under these Terms without our prior written consent. We may assign these Terms without restriction.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">11.5 Force Majeure</h3>
                  <p>
                    We are not liable for any failure to perform our obligations due to circumstances beyond our reasonable control, including natural disasters, war, terrorism, or government actions.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>12. Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  If you have any questions about these Terms of Service, please contact us:
                </p>
                <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                  <p><strong className="text-foreground">Email:</strong> legal@ifarmer.com</p>
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

