'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Star, Quote } from 'lucide-react'
import { motion, Variants } from 'framer-motion'

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
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  return (
    <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-secondary/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/3 h-full bg-gradient-to-r from-accent/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-5xl font-display font-bold text-foreground mb-6"
          >
            Trusted by Thousands
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto"
          >
            Join a growing community of investors and farmers building a sustainable future together.
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial) => (
            <motion.div key={testimonial.id} variants={itemVariants}>
              <Card className="h-full border-none shadow-lg bg-card/50 backdrop-blur-sm hover:bg-card transition-colors duration-300 relative">
                <CardContent className="pt-8 px-8 pb-8 flex flex-col h-full">
                  <Quote className="w-10 h-10 text-primary/20 absolute top-6 right-6" />

                  <div className="flex gap-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                    ))}
                  </div>

                  <p className="text-foreground/80 text-lg italic leading-relaxed mb-8 flex-grow">
                    "{testimonial.content}"
                  </p>

                  <div className="flex items-center gap-4 pt-4 border-t border-border/50">
                    <Avatar className="w-12 h-12 border-2 border-background shadow-sm">
                      <AvatarImage src={testimonial.image || "/placeholder.svg"} />
                      <AvatarFallback className="bg-primary/10 text-primary font-bold">{testimonial.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-bold text-foreground text-base">{testimonial.name}</p>
                      <p className="text-primary text-sm font-medium">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
