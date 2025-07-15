import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Check, Award, Users, Home, Star } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function AboutPage() {
   const teamMembers = [
      {
         name: "Md. Raiham Uddin",
         role: "Founder & Managing Director",
         image: "/images/team-1.jpg",
         description: "5+ years of experience, expert in luxury and residential properties"
      },
      {
         name: "Farzana Akter",
         role: "Senior Property Advisor",
         image: "/images/team-2.jpg",
         description: "Skilled in residential sales and investment in Dhaka and Rajshahi"
      },
      {
         name: "Tanvir Hasan",
         role: "Marketing Director",
         image: "/images/team-3.jpg",
         description: "Expert in digital marketing and property promotion"
      },
      {
         name: "Adv. Nusrat Jahan",
         role: "Legal Advisor",
         image: "/images/team-4.jpg",
         description: "Handles all legal aspects of property transactions with expertise"
      }
   ]

   const stats = [
      { icon: Home, value: "575+", label: "Properties Sold" },
      { icon: Users, value: "980+", label: "Happy Clients" },
      { icon: Award, value: "5+", label: "Years Experience" },
      { icon: Star, value: "4.9", label: "Client Rating" }
   ]

   const values = [
      {
         title: "Trust & Transparency",
         description: "We believe in honest communication and transparent dealings with all our clients."
      },
      {
         title: "Expert Guidance",
         description: "Our experienced team provides professional advice to help you make informed decisions."
      },
      {
         title: "Customer First",
         description: "Your satisfaction is our priority. We go above and beyond to meet your needs."
      },
      {
         title: "Innovation",
         description: "We leverage the latest technology to provide the best property search experience."
      }
   ]

   return (
      <main className="min-h-screen">
         <Navbar />
         
         {/* Hero Section */}
         <section className="relative bg-gray-50">
            <div className="container mx-auto px-4 py-16 md:py-24">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className="order-2 md:order-1">
                     <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                        About <span className="text-emerald-500">Our Story</span>
                     </h1>
                     <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                        Founded with a passion for helping families find their perfect homes, we've been transforming the real estate experience for over 15 years. Our commitment to excellence and personalized service has made us a trusted name in the industry.
                     </p>
                     <div className="flex flex-wrap gap-4">
                        <Button asChild className="bg-emerald-500 hover:bg-emerald-600 text-white px-8">
                           <a href="/contact">Contact Us</a>
                        </Button>
                        <Button asChild variant="outline" className="border-emerald-500 text-emerald-500 hover:bg-emerald-50">
                           <a href="/properties">View Properties</a>
                        </Button>
                     </div>
                  </div>
                  <div className="order-1 md:order-2">
                     <div className="relative h-[400px] md:h-[500px] w-full">
                        <Image
                           src="/images/about.jpg"
                           alt="About Our Company"
                           fill
                           className="object-cover rounded-lg shadow-lg"
                           priority
                        />
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* Stats Section */}
         <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
               <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  {stats.map((stat, index) => (
                     <div key={index} className="text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4">
                           <stat.icon className="w-8 h-8 text-emerald-500" />
                        </div>
                        <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</h3>
                        <p className="text-gray-600">{stat.label}</p>
                     </div>
                  ))}
               </div>
            </div>
         </section>

         {/* Mission Section */}
         <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  <div className="relative">
                     <div className="relative h-[400px] w-full">
                        <Image
                           src="/images/property-3.jpg"
                           alt="Our Mission"
                           fill
                           className="object-cover rounded-lg"
                        />
                     </div>
                  </div>
                  <div>
                     <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        Our Mission & <span className="text-emerald-500">Vision</span>
                     </h2>
                     <p className="text-gray-600 mb-6 leading-relaxed">
                        We envision a world where finding the perfect home is simple, transparent, and enjoyable. Our mission is to revolutionize the real estate experience by combining cutting-edge technology with personalized service.
                     </p>
                     <div className="space-y-4">
                        {[
                           "Provide exceptional customer service",
                           "Offer comprehensive property solutions",
                           "Maintain the highest ethical standards",
                           "Build lasting relationships with our clients"
                        ].map((item, index) => (
                           <div key={index} className="flex items-center">
                              <Check className="text-emerald-500 mr-3 flex-shrink-0" />
                              <span className="text-gray-700">{item}</span>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* Team Section */}
         <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
               <div className="text-center mb-12">
                  <h2 className="text-4xl font-bold mb-4">Meet Our <span className="text-emerald-500">Expert Team</span></h2>
                  <p className="text-gray-600 max-w-3xl mx-auto">
                     Our dedicated professionals bring years of experience and a passion for real estate to help you achieve your property goals.
                  </p>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {teamMembers.map((member, index) => (
                     <div key={index} className="text-center group">
                        <div className="relative w-48 h-48 mx-auto mb-4 overflow-hidden rounded-full">
                           <Image
                              src={member.image}
                              alt={member.name}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-300"
                           />
                        </div>
                        <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                        <p className="text-emerald-500 font-medium mb-3">{member.role}</p>
                        <p className="text-gray-600 text-sm leading-relaxed">{member.description}</p>
                     </div>
                  ))}
               </div>
            </div>
         </section>

         {/* Values Section */}
         <section className="py-16 bg-emerald-50">
            <div className="container mx-auto px-4">
               <div className="text-center mb-12">
                  <h2 className="text-4xl font-bold mb-4">Our <span className="text-emerald-500">Core Values</span></h2>
                  <p className="text-gray-600 max-w-3xl mx-auto">
                     These principles guide everything we do and shape the way we serve our clients every day.
                  </p>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {values.map((value, index) => (
                     <div key={index} className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                        <h3 className="text-xl font-bold mb-4 text-gray-900">{value.title}</h3>
                        <p className="text-gray-600 leading-relaxed">{value.description}</p>
                     </div>
                  ))}
               </div>
            </div>
         </section>

         {/* Call to Action */}
         <section className="py-16 bg-gray-900 text-white">
            <div className="container mx-auto px-4 text-center">
               <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Ready to Find Your <span className="text-emerald-500">Dream Home</span>?
               </h2>
               <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                  Let our experienced team help you navigate the real estate market and find the perfect property that meets all your needs.
               </p>
               <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3">
                     <a href="/properties">Browse Properties</a>
                  </Button>
               </div>
            </div>
         </section>

         <Footer />
      </main>
   )
}