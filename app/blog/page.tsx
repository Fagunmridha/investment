import Link from 'next/link'
import Image from 'next/image'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar, ArrowRight, User } from 'lucide-react'

const blogPosts = [
  {
    id: 1,
    title: 'The Future of Sustainable Agriculture Investment',
    excerpt: 'Discover how regenerative farming practices are creating new opportunities for investors while building climate resilience.',
    author: 'Sarah Johnson',
    date: '2025-01-15',
    category: 'Investment Insights',
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=800&q=80',
    readTime: '5 min read',
  },
  {
    id: 2,
    title: 'Understanding ROI in Agricultural Investments',
    excerpt: 'A comprehensive guide to calculating returns on agricultural investments and what factors influence profitability.',
    author: 'Michael Chen',
    date: '2025-01-10',
    category: 'Education',
    image: 'https://images.unsplash.com/photo-1574943320219-553eb6f63f77?auto=format&fit=crop&w=800&q=80',
    readTime: '7 min read',
  },
  {
    id: 3,
    title: 'Success Story: Green Valley Rice Farm',
    excerpt: 'How one investment project exceeded expectations and delivered 22% returns while supporting local farmers.',
    author: 'Emma Williams',
    date: '2025-01-05',
    category: 'Success Stories',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
    readTime: '6 min read',
  },
  {
    id: 4,
    title: 'Risk Management in Farm Investments',
    excerpt: 'Learn about the strategies and tools we use to mitigate risks and protect investor capital in agricultural projects.',
    author: 'David Martinez',
    date: '2024-12-28',
    category: 'Investment Insights',
    image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=800&q=80',
    readTime: '8 min read',
  },
  {
    id: 5,
    title: 'Technology in Modern Agriculture',
    excerpt: 'Exploring how satellite imagery, IoT sensors, and data analytics are revolutionizing farm management and investment tracking.',
    author: 'Lisa Anderson',
    date: '2024-12-20',
    category: 'Technology',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    readTime: '6 min read',
  },
  {
    id: 6,
    title: 'Building a Diversified Agricultural Portfolio',
    excerpt: 'Tips for spreading your investments across different crops, regions, and risk levels to maximize returns.',
    author: 'James Wilson',
    date: '2024-12-15',
    category: 'Education',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=800&q=80',
    readTime: '9 min read',
  },
]

export default function BlogPage() {
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
            Our Blog
          </h1>
          <p className="text-green-100 text-lg max-w-[700px] mx-auto">
            Insights, stories, and updates from the world of agricultural investment
          </p>
        </div>
      </div>

      {/* Blog Posts Section */}
      <div className="flex-grow py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48 w-full">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded">
                      {post.category}
                    </span>
                    <span className="text-xs text-muted-foreground">{post.readTime}</span>
                  </div>
                  <CardTitle className="text-xl mb-2">{post.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{post.excerpt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                  </div>
                  <Link
                    href={`/blog/${post.id}`}
                    className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium text-sm transition"
                  >
                    Read more
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Newsletter Signup */}
          <div className="mt-16 max-w-3xl mx-auto">
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Stay Updated</CardTitle>
                <CardDescription>
                  Subscribe to our newsletter to get the latest insights and investment opportunities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition">
                    Subscribe
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}

