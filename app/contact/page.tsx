import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import ContactSection from '@/components/contact-section'

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-background flex flex-col">
            <Navigation />
            <div className="flex-grow">
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
                        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl mb-4 text-white">Contact Us</h1>
                        <p className="text-green-100 text-lg max-w-[700px] mx-auto">
                            We'd love to hear from you. Please reach out with any questions or feedback.
                        </p>
                    </div>
                </div>
                <ContactSection />
            </div>
            <Footer />
        </main>
    )
}
