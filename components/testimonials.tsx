'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Star } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: 'Rahman Ahmed',
    role: 'Investor',
    image: '/placeholder-user.jpg',
    content: 'I invested BDT 50,000 and received consistent monthly returns. iFarmer made agriculture investment transparent and accessible.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Fatema Islam',
    role: 'Farm Owner',
    image: '/placeholder-user.jpg',
    content: 'Through iFarmer, I expanded my farm operations and connected with reliable investors. The process was smooth and professional.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Karim Hassan',
    role: 'Investor',
    image: '/placeholder-user.jpg',
    content: 'The ROI has been exceptional. I appreciate the transparency and regular updates on farm progress. Highly recommended!',
    rating: 5,
  },
]

export default function Testimonials() {
  return (
    <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">What Our Users Say</h2>
          <p className="text-muted-foreground text-lg">Join thousands of successful investors</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="border-border hover:shadow-lg transition-shadow">
              <CardContent className="pt-6 space-y-4">
                <div className="flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                
                <p className="text-muted-foreground italic">"{testimonial.content}"</p>
                
                <div className="flex items-center gap-3 pt-4">
                  <Avatar>
                    <AvatarImage src={testimonial.image || "/placeholder.svg"} />
                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{testimonial.name}</p>
                    <p className="text-muted-foreground text-xs">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
