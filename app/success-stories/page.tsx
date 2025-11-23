import Link from 'next/link'
import Image from 'next/image'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { TrendingUp, DollarSign, Users, Award, Quote, ArrowRight, CheckCircle } from 'lucide-react'

const successStats = [
  {
    stat: '$42M+',
    label: 'Total Returns Generated',
    icon: DollarSign,
  },
  {
    stat: '12,500+',
    label: 'Successful Investors',
    icon: Users,
  },
  {
    stat: '9.8%',
    label: 'Average Annual ROI',
    icon: TrendingUp,
  },
  {
    stat: '98%',
    label: 'Satisfaction Rate',
    icon: Award,
  },
]

const successStories = [
  {
    id: 1,
    investorName: 'Sarah Johnson',
    location: 'New York, USA',
    investment: '$25,000',
    farm: 'Green Valley Rice Farm',
    roi: '22.5%',
    duration: '12 months',
    quote: 'AgriVest has transformed how I think about investing. Not only did I earn excellent returns, but I also feel good knowing my money is supporting sustainable agriculture and local farmers.',
    image: '/placeholder-user.jpg',
    achievements: [
      'Exceeded expected ROI by 4%',
      'Supported 50+ local farmers',
      'Generated $5,625 in returns',
    ],
  },
  {
    id: 2,
    investorName: 'Michael Chen',
    location: 'London, UK',
    investment: '$50,000',
    farm: 'Mango Orchard Project',
    roi: '19.8%',
    duration: '18 months',
    quote: 'The transparency and regular updates from AgriVest made me confident in my investment. I could track the farm\'s progress in real-time, which is something you don\'t get with traditional investments.',
    image: '/placeholder-user.jpg',
    achievements: [
      'Diversified across 3 farms',
      'Earned $9,900 in returns',
      'Impacted 200+ farming families',
    ],
  },
  {
    id: 3,
    investorName: 'Emma Williams',
    location: 'Sydney, Australia',
    investment: '$15,000',
    farm: 'Fish Farming Initiative',
    roi: '21.2%',
    duration: '10 months',
    quote: 'As someone passionate about environmental sustainability, AgriVest was the perfect platform. I\'m earning solid returns while contributing to regenerative farming practices.',
    image: '/placeholder-user.jpg',
    achievements: [
      'Achieved 21.2% ROI',
      'Supported sustainable aquaculture',
      'Generated $3,180 in returns',
    ],
  },
  {
    id: 4,
    investorName: 'David Martinez',
    location: 'Toronto, Canada',
    investment: '$75,000',
    farm: 'Strawberry Field Project',
    roi: '18.5%',
    duration: '12 months',
    quote: 'The team at AgriVest is incredibly professional and responsive. They provided detailed reports and were always available to answer questions. My investment exceeded expectations.',
    image: '/placeholder-user.jpg',
    achievements: [
      'Invested in premium crop project',
      'Earned $13,875 in returns',
      'Helped expand farm operations',
    ],
  },
  {
    id: 5,
    investorName: 'Lisa Anderson',
    location: 'Berlin, Germany',
    investment: '$30,000',
    farm: 'Rice Farm Expansion',
    roi: '20.3%',
    duration: '15 months',
    quote: 'I love that I can see exactly where my money is going and the impact it\'s making. The quarterly reports with photos and updates from the farms make this investment feel personal.',
    image: '/placeholder-user.jpg',
    achievements: [
      'Consistent monthly returns',
      'Generated $6,090 in returns',
      'Supported farm expansion',
    ],
  },
  {
    id: 6,
    investorName: 'James Wilson',
    location: 'Singapore',
    investment: '$100,000',
    farm: 'Multi-Crop Portfolio',
    roi: '19.5%',
    duration: '24 months',
    quote: 'AgriVest has become a core part of my investment strategy. The diversification across different crops and regions has provided stable returns while supporting agricultural development.',
    image: '/placeholder-user.jpg',
    achievements: [
      'Diversified portfolio',
      'Earned $19,500 in returns',
      'Impacted 500+ farmers',
    ],
  },
]

const featuredStory = {
  investorName: 'Robert Thompson',
  location: 'San Francisco, USA',
  investment: '$200,000',
  totalReturns: '$45,000',
  farms: 5,
  portfolioROI: '22.5%',
  quote: 'Over the past two years, AgriVest has been my most reliable investment. The combination of strong returns, transparency, and positive impact makes it unbeatable. I\'ve reinvested my returns into new farms and plan to continue growing my portfolio.',
  image: '/placeholder-user.jpg',
  timeline: [
    { year: '2023', event: 'Started with $50,000 investment' },
    { year: '2023', event: 'First returns exceeded expectations' },
    { year: '2024', event: 'Expanded to $200,000 portfolio' },
    { year: '2024', event: 'Achieved 22.5% average ROI' },
  ],
}

export default function SuccessStoriesPage() {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-primary/5 via-background to-background">
        <div className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
              Success Stories
            </span>
            <h1 className="font-display text-4xl leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Real Returns, Real Impact
            </h1>
            <p className="text-lg text-muted-foreground">
              Discover how thousands of investors are earning strong returns while supporting sustainable agriculture and empowering farming communities worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {successStats.map((stat, index) => (
            <Card key={index} className="text-center">
              <CardContent className="pt-6">
                <stat.icon className="w-8 h-8 text-primary mx-auto mb-4" />
                <p className="font-display text-3xl font-bold text-primary mb-2">{stat.stat}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Featured Story */}
      <section className="bg-muted/40 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary mb-4">
              Featured Story
            </span>
            <h2 className="font-display text-3xl tracking-tight text-foreground sm:text-4xl">
              Building a Diversified Portfolio
            </h2>
          </div>

          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-[200px_1fr] gap-8">
                <div className="flex flex-col items-center">
                  <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-primary/20 mb-4">
                    <Image
                      src={featuredStory.image}
                      alt={featuredStory.investorName}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="font-semibold text-lg text-foreground">{featuredStory.investorName}</h3>
                  <p className="text-sm text-muted-foreground">{featuredStory.location}</p>
                </div>
                <div className="space-y-6">
                  <div className="flex items-start gap-2">
                    <Quote className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <p className="text-muted-foreground italic leading-relaxed">{featuredStory.quote}</p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-border">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Total Investment</p>
                      <p className="font-semibold text-foreground">{featuredStory.investment}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Total Returns</p>
                      <p className="font-semibold text-primary">{featuredStory.totalReturns}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Farms</p>
                      <p className="font-semibold text-foreground">{featuredStory.farms}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Portfolio ROI</p>
                      <p className="font-semibold text-primary">{featuredStory.portfolioROI}</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <p className="text-sm font-semibold text-foreground mb-4">Investment Timeline</p>
                    <div className="space-y-3">
                      {featuredStory.timeline.map((item, index) => (
                        <div key={index} className="flex gap-3">
                          <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-primary font-semibold text-xs">{index + 1}</span>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground">{item.year}</p>
                            <p className="text-sm text-muted-foreground">{item.event}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Success Stories Grid */}
      <section className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="font-display text-3xl tracking-tight text-foreground sm:text-4xl mb-4">
            Investor Success Stories
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Read how our investors are achieving their financial goals while making a positive impact on agriculture.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {successStories.map((story) => (
            <Card key={story.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-primary/20">
                    <Image
                      src={story.image}
                      alt={story.investorName}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{story.investorName}</CardTitle>
                    <CardDescription className="text-xs">{story.location}</CardDescription>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Quote className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <CardDescription className="italic text-sm leading-relaxed">{story.quote}</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Investment</p>
                    <p className="font-semibold text-foreground">{story.investment}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">ROI</p>
                    <p className="font-semibold text-primary">{story.roi}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Farm</p>
                    <p className="font-semibold text-foreground text-xs">{story.farm}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Duration</p>
                    <p className="font-semibold text-foreground">{story.duration}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <p className="text-xs font-semibold text-foreground mb-3">Key Achievements</p>
                  <ul className="space-y-2">
                    {story.achievements.map((achievement, index) => (
                      <li key={index} className="flex items-start gap-2 text-xs text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary/5 border-y border-border">
        <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl tracking-tight text-foreground sm:text-4xl mb-4">
            Ready to Start Your Success Story?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of investors earning strong returns while supporting sustainable agriculture. Start with as little as $100.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8">
              <Link href="/farms">Browse Farms</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg px-8">
              <Link href="/how-it-works">Learn How It Works</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

