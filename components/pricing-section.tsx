'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Check } from 'lucide-react'

export default function PricingSection() {
    const plans = [
        {
            name: 'Starter',
            price: '$500',
            description: 'Perfect for first-time investors.',
            features: [
                'Access to 5 curated farms',
                'Quarterly performance reports',
                'Basic support',
                'Community access',
            ],
            cta: 'Start Investing',
            popular: false,
        },
        {
            name: 'Growth',
            price: '$2,500',
            description: 'Ideal for building a diverse portfolio.',
            features: [
                'Access to 20+ curated farms',
                'Monthly performance reports',
                'Priority support',
                'Community access',
                'Early access to new farms',
            ],
            cta: 'Join Growth',
            popular: true,
        },
        {
            name: 'Pro',
            price: '$10,000',
            description: 'For serious investors seeking maximum returns.',
            features: [
                'Unlimited farm access',
                'Real-time performance tracking',
                'Dedicated account manager',
                'VIP community events',
                'Direct farmer communication',
            ],
            cta: 'Go Pro',
            popular: false,
        },
    ]

    return (
        <section className="py-16 md:py-24 bg-background">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">Investment Plans</h2>
                    <p className="text-muted-foreground text-lg max-w-[700px] mx-auto">
                        Choose the plan that fits your investment goals and start growing your wealth with sustainable agriculture.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {plans.map((plan) => (
                        <Card key={plan.name} className={`flex flex-col ${plan.popular ? 'border-primary shadow-lg relative' : ''}`}>
                            {plan.popular && (
                                <div className="absolute top-0 right-0 -mt-3 -mr-3 px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full">
                                    Popular
                                </div>
                            )}
                            <CardHeader>
                                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                                <CardDescription>{plan.description}</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <div className="mb-6">
                                    <span className="text-4xl font-bold">{plan.price}</span>
                                    <span className="text-muted-foreground">/min investment</span>
                                </div>
                                <ul className="space-y-3">
                                    {plan.features.map((feature) => (
                                        <li key={feature} className="flex items-center gap-2">
                                            <Check className="w-4 h-4 text-primary" />
                                            <span className="text-sm">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full" variant={plan.popular ? 'default' : 'outline'}>
                                    {plan.cta}
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
