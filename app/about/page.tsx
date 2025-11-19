import Image from 'next/image'
import Link from 'next/link'
import { getServerSession } from 'next-auth/next'
import type { Session } from 'next-auth'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import { authOptions } from '@/lib/auth'


const impactHighlights = [
  {
    stat: '$42M+',
    label: 'Capital deployed',
    detail: 'Channelled directly into regenerative farm projects across Africa and Asia.',
  },
  {
    stat: '18,400',
    label: 'Farmers empowered',
    detail: 'Producers gaining predictable cash flow via our harvest-share model.',
  },
  {
    stat: '9.8%',
    label: 'Avg. net yield',
    detail: 'Portfolio performance over the last 24 months, net of platform fees.',
  },
]

const values = [
  {
    title: 'Radical transparency',
    description:
      'Live farm telemetry, third-party audits, and quarterly impact notes keep every investor informed.',
  },
  {
    title: 'Farmer-first finance',
    description:
      'Flexible repayment schedules, agronomy coaching, and climate insurance protect smallholders first.',
  },
  {
    title: 'Sustainable growth',
    description:
      'We prioritize soil health, biodiversity, and circular inputs to unlock long-term alpha.',
  },
]





export default async function AboutPage() {
  const session: Session | null = await getServerSession(authOptions)
  const isAuthenticated = Boolean(session?.user)
  const primaryCtaHref = isAuthenticated ? '/farms' : '/signup'
  const primaryCtaLabel = isAuthenticated ? 'Browse farms' : 'Start investing'

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <main>
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-primary/5 via-background to-background">
        <div className="max-w-6xl mx-auto px-4 py-20 sm:px-6 lg:px-8 lg:py-28 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
          <div className="space-y-6">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
              About Agrivest
            </span>
            <h1 className="font-display text-4xl leading-tight tracking-tight text-foreground sm:text-5xl">
              Investing in food security should feel as intuitive as planting a seed.
            </h1>
            <p className="text-lg text-muted-foreground">
              We are a team of agronomists, fintech builders, and community lenders on a mission to unlock fair capital
              for regenerative farms. Every project listed on Agrivest is vetted with on-the-ground partners and backed by
              traceable outcomes so you can align returns with resilience.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href={primaryCtaHref}
                className="inline-flex items-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90"
              >
                {primaryCtaLabel}
              </Link>
              <Link
                href="/farms"
                className="inline-flex items-center rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-muted"
              >
                Browse live offerings
              </Link>
            </div>
          </div>
          <div className="relative isolate overflow-hidden rounded-3xl border border-border bg-card shadow-2xl">
            <Image
              src="/rice-farm-with-green-paddies.jpg"
              alt="Agrivest field team evaluating a rice farm"
              width={900}
              height={700}
              className="h-full w-full object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/30 bg-white/70 p-4 text-sm text-foreground backdrop-blur">
              <p className="font-semibold">Field telemetry + satellite imagery</p>
              <p className="text-muted-foreground">
                Every hectare is monitored weekly to surface risks early and keep investors updated.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8 lg:py-24 grid gap-8 md:grid-cols-3">
        {impactHighlights.map(highlight => (
          <div key={highlight.label} className="rounded-3xl border border-border bg-card p-6 shadow-sm">
            <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">{highlight.label}</p>
            <p className="mt-4 font-display text-4xl text-primary">{highlight.stat}</p>
            <p className="mt-2 text-sm text-muted-foreground">{highlight.detail}</p>
          </div>
        ))}
      </section>

      <section className="border-y border-border bg-muted/40">
        <div className="max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8 lg:py-24 grid gap-16 lg:grid-cols-2">
          <div className="space-y-5">
            <p className="font-semibold text-primary">Our Story</p>
            <h2 className="font-display text-3xl tracking-tight text-foreground sm:text-4xl">
              Built with farmers, backed by data.
            </h2>
            <p className="text-muted-foreground">
              Agrivest launched in 2021 after our founders spent a decade operating agri-coops and carbon projects across
              Ghana, Kenya, and the Philippines. Traditional financing simply did not fit the crop cycle; farmers needed
              more patient, insight-driven capital. We combined satellite analytics, agronomy expertise, and a regulated
              investment marketplace to close that gap.
            </p>
            <p className="text-muted-foreground">
              Today, independent agronomists, local co-ops, and impact funds collaborate on Agrivest to bring resilient
              farms online faster while giving everyday investors access to a diversified natural capital portfolio.
            </p>
          </div>
          <div className="space-y-6">
            {values.map(value => (
              <div key={value.title} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <h3 className="font-semibold text-lg text-foreground">{value.title}</h3>
                <p className="mt-2 text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-5">
            <p className="font-semibold text-primary">Impact pipeline</p>
            <h2 className="font-display text-3xl tracking-tight text-foreground sm:text-4xl">Scaling what works.</h2>
            <p className="text-muted-foreground">
              We underwrite every farm with a combination of satellite data, soil diagnostics, and cooperative references.
              Only 18% of proposals make it to the marketplace. Those that do receive climate insurance, agronomy support,
              and integrated payment rails so investor capital is safeguarded end-to-end.
            </p>
            <ul className="space-y-4 text-muted-foreground">
              <li className="flex gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-primary" aria-hidden />
                <span>ESG and SDG alignment verified through independent auditors twice a year.</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-primary" aria-hidden />
                <span>Investors get quarterly field notes, portfolio analytics, and carbon-footprint data.</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-primary" aria-hidden />
                <span>Farmers can reinvest at preferential rates once performance benchmarks are met.</span>
              </li>
            </ul>
          </div>
          <div className="rounded-3xl border border-border bg-card p-8 shadow-2xl">
            <h3 className="font-semibold text-lg text-muted-foreground">Platform Flywheel</h3>
            <div className="mt-8 grid gap-6">
              {['Discovery', 'Due diligence', 'Capital deployment', 'Impact reporting'].map((phase, index) => (
                <div key={phase} className="flex gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-base font-semibold text-primary">
                    {(index + 1).toString().padStart(2, '0')}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{phase}</p>
                    <p className="text-sm text-muted-foreground">
                      {[
                        'Local agronomy partners surface high-impact farms and climate tech pilots.',
                        'Telemetry, soil samples, and credit scoring feed our risk engine for approvals.',
                        'Investors fund tranches, disbursed in sync with crop inputs and milestones.',
                        'Dynamic dashboards keep impact + returns visible with real-time alerts.',
                      ][index]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

     
      </main>
      <Footer />
    </div>
  )
}

