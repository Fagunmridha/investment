import Link from 'next/link'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'

const steps = [
  {
    title: 'Discover & research',
    description:
      'Explore curated farm offerings with impact metrics, climate resilience scores, and agronomist notes. Build a watchlist or download the diligence pack for deeper analysis.',
    details: ['Region filters + ESG tags', 'Audited farm financials', 'Livestream Q&A with operators'],
  },
  {
    title: 'Invest with confidence',
    description:
      'Reserve allocations in minutes. Funds are escrowed and released in crop-specific tranches, so capital is only used when milestones are met.',
    details: ['$100 minimum per tranche', 'Auto-diversification bundles', 'Capital held in regulated trust'],
  },
  {
    title: 'Track every outcome',
    description:
      'Real-time telemetry, quarterly field notes, and verified harvest statements keep you updated. Redeploy returns or withdraw to your wallet anytime.',
    details: ['Yield dashboards + IRR tracking', 'Impact certificates', 'Instant wallet withdrawals'],
  },
]

const faqs = [
  {
    question: 'Who can invest on Agrivest?',
    answer:
      'We currently serve residents of the EU, UK, and select African markets who are 18+ and pass KYC/AML verification. Institutional allocations are available on request.',
  },
  {
    question: 'How are farms vetted?',
    answer:
      'Each project passes agronomic scoring, cooperative references, satellite verification, and climate-risk simulations. Only 1 in 5 applications are approved.',
  },
  {
    question: 'What returns can I expect?',
    answer:
      'Portfolio IRR has averaged 9–11% net over the past 24 months. Individual opportunities list projected ranges based on crop cycles and revenue share.',
  },
]

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <main>
      <section className="border-b border-border bg-gradient-to-b from-primary/5 via-background to-background">
        <div className="max-w-5xl mx-auto px-4 py-20 text-center sm:px-6 lg:px-8 lg:py-24 space-y-6">
          <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
            How it works
          </span>
          <h1 className="font-display text-4xl tracking-tight sm:text-5xl">
            From curiosity to climate impact in three steps.
          </h1>
          <p className="text-lg text-muted-foreground">
            Agrivest removes friction between everyday investors and regenerative farms. Here&rsquo;s what the journey looks like from the
            first click to your first harvest payout.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8 lg:py-24 space-y-12">
        {steps.map((step, index) => (
          <div
            key={step.title}
            className="grid gap-6 rounded-3xl border border-border bg-card/60 p-6 shadow-sm lg:grid-cols-[0.35fr_1fr]"
          >
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Step {(index + 1).toString().padStart(2, '0')}
              </p>
              <h2 className="font-display text-2xl text-foreground">{step.title}</h2>
            </div>
            <div className="space-y-4">
              <p className="text-muted-foreground">{step.description}</p>
              <ul className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
                {step.details.map(item => (
                  <li key={item} className="flex items-center gap-2 rounded-2xl border border-border px-3 py-2">
                    <span className="h-2 w-2 rounded-full bg-primary" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </section>

      <section className="border-y border-border bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8 lg:py-24 grid gap-10 lg:grid-cols-2">
          <div className="space-y-4">
            <p className="font-semibold text-primary">Safeguards</p>
            <h2 className="font-display text-3xl tracking-tight sm:text-4xl">Risk controls at every step.</h2>
            <p className="text-muted-foreground">
              Multi-sig cold storage, insurance partners, and on-chain attestations keep capital and data secure.
              We share the same dashboards with farmers and investors, ensuring total transparency.
            </p>
            <ul className="space-y-3 text-muted-foreground">
              <li>• Escrowed disbursements tied to agronomy milestone sign-offs.</li>
              <li>• Climate insurance and hedging for key crops in every cohort.</li>
              <li>• Independent auditors verify impact statements twice a year.</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-border bg-card p-8 shadow-lg">
            <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Why investors stay</p>
            <div className="mt-8 space-y-6">
              <div>
                <p className="text-4xl font-display text-primary">72%</p>
                <p className="text-sm text-muted-foreground">Capital that is automatically re-invested every cycle.</p>
              </div>
              <div>
                <p className="text-4xl font-display text-primary">14</p>
                <p className="text-sm text-muted-foreground">Average farms per diversified portfolio.</p>
              </div>
              <div>
                <p className="text-4xl font-display text-primary">0</p>
                <p className="text-sm text-muted-foreground">Missed harvest repayments since launch.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-16 sm:px-6 lg:px-8 lg:py-24 space-y-10">
        <div className="space-y-3 text-center">
          <p className="font-semibold text-primary">FAQ</p>
          <h2 className="font-display text-3xl text-foreground sm:text-4xl">Still curious?</h2>
          <p className="text-muted-foreground">
            These are the questions new investors ask most. Need more details? Our team is an email away.
          </p>
        </div>
        <div className="space-y-4">
          {faqs.map(faq => (
            <details key={faq.question} className="group rounded-2xl border border-border bg-card p-6 shadow-sm">
              <summary className="flex cursor-pointer items-center justify-between text-left font-semibold text-foreground">
                {faq.question}
                <span className="ml-4 text-primary transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-4 text-muted-foreground">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

     
      </main>
      <Footer />
    </div>
  )
}

