import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function DisclaimerPage() {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navigation />

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
            Investment Disclaimer
          </h1>
          <p className="text-green-100 text-lg max-w-[700px] mx-auto">
            Important information about the risks, limitations, and responsibilities associated with using our platform.
          </p>
          <p className="text-green-200 text-sm mt-2">Last updated: January 15, 2025</p>
        </div>
      </div>

      <div className="flex-grow py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>1. No Investment Advice</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  The information provided on the iFarmer platform, including investment opportunities, performance data, research, articles, webinars, or any educational materials, is for general informational purposes only. Nothing on this platform constitutes investment, financial, legal, or tax advice, nor should it be relied upon as such.
                </p>
                <p>
                  You should consult with qualified financial, legal, and tax advisors before making any investment decisions. All investment decisions are made at your own risk, and you are solely responsible for evaluating the merits and risks of any opportunity.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>2. Risk of Loss</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  Investing in agricultural projects involves significant risks, including the possible loss of your entire investment. Risks may arise from weather events, crop disease, market volatility, supply-chain disruption, regulatory changes, geopolitical events, and other factors beyond our control.
                </p>
                <p>
                  Past performance is not indicative of future results. No assurance can be given that any investment objectives will be achieved. You should carefully consider your financial situation, investment experience, and risk tolerance before investing.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>3. No Guarantee of Returns</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  Any projections, forecasts, or forward-looking statements presented on our platform are hypothetical and based on assumptions that may not materialize. Actual results may differ materially from expectations. iFarmer does not guarantee any specific yields, returns, or timelines for distributions.
                </p>
                <p>
                  Investments may experience delays, reduced returns, or total loss due to operational, environmental, or financial factors. You should not rely solely on projected returns when making investment decisions.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>4. Due Diligence Responsibility</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  While we perform internal screening and due diligence on projects listed on our platform, this does not replace your own due diligence. You are encouraged to review all available documentation, financial statements, risk disclosures, licenses, and third-party reports before investing.
                </p>
                <p>
                  Relying solely on iFarmer's assessment may result in incomplete understanding of the project's risk profile. Independent verification is strongly recommended.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>5. Regulatory Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  Depending on your jurisdiction, certain investment opportunities offered on iFarmer may be restricted to qualified or accredited investors. We do not guarantee that your participation complies with local laws. It is your responsibility to ensure that your use of the platform and participation in investments comply with applicable regulations.
                </p>
                <p>
                  Regulatory requirements can change, potentially affecting the availability or structure of investment opportunities. iFarmer assumes no liability for compliance issues arising from your jurisdiction.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>6. Third-Party Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  The platform may include links, reports, or data from third-party sources. These materials are provided for convenience and informational purposes only. We do not independently verify third-party data and are not responsible for its accuracy, completeness, or reliability.
                </p>
                <p>
                  Inclusion of third-party content does not constitute endorsement or approval. You should exercise caution and conduct your own verification before relying on any third-party information.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>7. Platform Availability</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  We strive to maintain continuous access to the platform but do not guarantee uninterrupted service. Scheduled maintenance, technical issues, or circumstances beyond our control may temporarily limit access to your account or investment information.
                </p>
                <p>
                  iFarmer is not liable for any losses arising from platform downtime, delayed transactions, or communication failures. You should retain independent records of your investment activity whenever possible.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>8. Forward-Looking Statements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  Statements that are not historical facts, including information about future plans, market trends, expected returns, or project milestones, are forward-looking statements. These statements involve risks and uncertainties and should not be relied upon as guarantees of future performance.
                </p>
                <p>
                  Factors such as economic conditions, climate events, supply chain disruptions, and regulatory changes may cause actual outcomes to differ materially from forward-looking statements.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>9. Liability Limitation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  To the fullest extent permitted by law, iFarmer and its affiliates, directors, officers, employees, and agents are not liable for any direct, indirect, incidental, consequential, or punitive damages arising from your use of the platform or your investments in agricultural projects.
                </p>
                <p>
                  This limitation applies to damages resulting from reliance on platform content, investment losses, delays, service interruptions, or any other use of the platform.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>10. Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  If you have questions about this Disclaimer or need additional information, please contact us:
                </p>
                <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                  <p><strong className="text-foreground">Email:</strong> legal@ifarmer.com</p>
                  <p><strong className="text-foreground">Address:</strong> iFarmer, 123 Investment Street, Financial District, City, Country</p>
                  <p><strong className="text-foreground">Phone:</strong> +1 (555) 123-4567</p>
                </div>
                <p className="mt-4">
                  You can also visit our <a href="/contact" className="text-primary hover:underline">Contact Us</a> page for additional support.
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
