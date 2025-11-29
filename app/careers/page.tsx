import Image from 'next/image'
import Link from 'next/link'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'

const talentHighlights = [
  {
    stat: '18+',
    label: 'Nationalities represented',
    detail: 'A distributed team spanning product, agronomy, and operations across multiple continents.',
  },
  {
    stat: '70%',
    label: 'Senior talent',
    detail: 'Most teammates have 7+ years of experience in fintech, climate, or agriculture.',
  },
  {
    stat: '90%',
    label: 'Offer acceptance',
    detail: 'Candidates who reach the final stage choose Agrivest for our mission and ownership culture.',
  },
]

const benefits = [
  {
    title: 'Remote-first, async friendly',
    description: 'Work from wherever you create best, with teammates across time zones who default to written clarity.',
  },
  {
    title: 'Ownership from day one',
    description: 'Meaningful equity, clear decision-making rights, and access to the same dashboards as leadership.',
  },
  {
    title: 'Learning budget',
    description: 'Annual stipend for conferences, courses, and coaching focused on climate, fintech, and leadership.',
  },
  {
    title: 'Flexible time off',
    description: 'Minimum time-off guidelines so you actually rest between planting and harvest cycles.',
  },
]

const openRoles = [
  {
    title: 'Senior Full‑Stack Engineer',
    location: 'Remote – Africa / Europe time zones',
    type: 'Full-time',
    tag: 'Engineering',
    description:
      'Help design and scale our investment and farm-telemetry platform. You will own features across the stack, from APIs to investor dashboards.',
  },
  {
    title: 'Agronomy & Impact Lead',
    location: 'Hybrid – Accra, Ghana',
    type: 'Full-time',
    tag: 'Impact',
    description:
      'Work with local cooperatives to vet farms, design impact frameworks, and translate field insights into investor-ready narratives.',
  },
  {
    title: 'Growth Marketing Manager',
    location: 'Remote',
    type: 'Full-time',
    tag: 'Growth',
    description:
      'Own our investor acquisition funnel across content, paid channels, and partnerships with climate and fintech communities.',
  },
]

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <main>
        <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-primary/5 via-background to-background">
          <div className="max-w-6xl mx-auto px-4 py-20 sm:px-6 lg:px-8 lg:py-28 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
            <div className="space-y-6">
              <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
                Careers at Agrivest
              </span>
              <h1 className="font-display text-4xl leading-tight tracking-tight text-foreground sm:text-5xl">
                Build the rails for the next generation of climate‑resilient farms.
              </h1>
              <p className="text-lg text-muted-foreground">
                We&apos;re a small, senior team of builders, agronomists, and operators obsessed with aligning capital
                with climate resilience. If you care about shipping useful products and learning from farmers as much as
                from investors, you&apos;ll fit right in.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="#open-roles"
                  className="inline-flex items-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90"
                >
                  View open roles
                </Link>
                <Link
                  href="mailto:careers@agrivest.com"
                  className="inline-flex items-center rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-muted"
                >
                  Email our team
                </Link>
              </div>
            </div>
            <div className="relative isolate overflow-hidden rounded-3xl border border-border bg-card shadow-2xl">
              <Image
                src="/farmers-in-lush-green-agricultural-field-with-crop.jpg"
                alt="Agrivest team visiting partner farmers"
                width={900}
                height={700}
                className="h-full w-full object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/30 bg-white/70 p-4 text-sm text-foreground backdrop-blur">
                <p className="font-semibold">Mission-driven, globally distributed</p>
                <p className="text-muted-foreground">
                  We work across continents but ship as one team, with farmers and investors in every major decision.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8 lg:py-24 grid gap-8 md:grid-cols-3">
          {talentHighlights.map((highlight) => (
            <div key={highlight.label} className="rounded-3xl border border-border bg-card p-6 shadow-sm">
              <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">{highlight.label}</p>
              <p className="mt-4 font-display text-4xl text-primary">{highlight.stat}</p>
              <p className="mt-2 text-sm text-muted-foreground">{highlight.detail}</p>
            </div>
          ))}
        </section>

        <section className="border-y border-border bg-muted/40">
          <div className="max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8 lg:py-24 grid gap-8 md:grid-cols-2">
          <div className="space-y-5">
            <p className="font-semibold text-primary">How we work</p>
            <h2 className="font-display text-3xl tracking-tight text-foreground sm:text-4xl">
              High-trust, high-ownership culture.
            </h2>
            <p className="text-muted-foreground">
              We keep the team intentionally small so everyone can own critical systems and see their work in the hands
              of farmers and investors quickly. We default to transparency, from product metrics to impact data and
              fundraising updates.
            </p>
            <p className="text-muted-foreground">
              You&apos;ll work closely with founders and domain experts, ship iteratively, and spend time in the field
              learning from the people we serve.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                <h3 className="font-semibold text-foreground">{benefit.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
          </div>
        </section>

        <section
          id="open-roles"
          className="bg-background"
        >
          <div className="max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8 lg:py-24 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                <p className="font-semibold text-primary">Open roles</p>
                <h2 className="font-display text-3xl tracking-tight text-foreground sm:text-4xl">
                  Join the Agrivest team.
                </h2>
                <p className="mt-2 text-muted-foreground">
                  Don&apos;t see a perfect match? We&apos;re always excited to meet people passionate about climate,
                  agriculture, and fintech—reach out anyway.
                </p>
              </div>
              <Link
                href="mailto:careers@agrivest.com?subject=Speculative%20application"
                className="inline-flex items-center rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition hover:bg-muted"
              >
                Send a speculative application
              </Link>
            </div>

            <div className="grid gap-6">
              {openRoles.map((role) => (
                <div
                  key={role.title}
                  className="rounded-3xl border border-border bg-card p-6 sm:p-7 shadow-sm flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="space-y-2">
                    <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                      {role.tag}
                    </div>
                    <h3 className="font-semibold text-lg text-foreground">{role.title}</h3>
                    <p className="text-sm text-muted-foreground">{role.description}</p>
                    <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                      <span className="rounded-full border border-border px-3 py-1">{role.location}</span>
                      <span className="rounded-full border border-border px-3 py-1">{role.type}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-start sm:items-end gap-3">
                    <Link
                      href="mailto:careers@agrivest.com?subject=Application%20for%20role"
                      className="inline-flex items-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90"
                    >
                      Apply via email
                    </Link>
                    <p className="text-xs text-muted-foreground max-w-xs">
                      Please include your CV, a short note on why Agrivest, and links to relevant work (GitHub,
                      portfolio, writing, or case studies).
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}


