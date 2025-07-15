import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import PropertyTypes from "@/components/property-types"
import PerfectProperty from "@/components/perfect-property"
import PropertyListing from "@/components/property-listing"
import ContactAgent from "@/components/contact-agent"
import Testimonials from "@/components/testimonials"
import Footer from "@/components/footer"

export default function Home() {
   return (
      <main className="min-h-screen">
         <Navbar />
         <HeroSection />
         <PropertyTypes />
         <PerfectProperty />
         <PropertyListing />
         <Testimonials />
         <ContactAgent />
         <Footer />
      </main>
   )
} 

