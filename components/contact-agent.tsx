import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Phone, Calendar } from "lucide-react"

export default function ContactAgent() {
   return (
      <section className="py-16 bg-emerald-50/50">
         <div className="container mx-auto px-4">
            <div className="border border-dashed border-emerald-200 rounded-lg overflow-hidden">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-10">
                  <div className="relative h-[300px] md:h-[400px] w-full">
                     <Image
                        src="/images/property-3.jpg"
                        alt="Real Estate Agent"
                        fill
                        className="object-cover rounded-lg"
                     />
                  </div>

                  <div className="flex flex-col justify-center">
                     <h2 className="text-3xl md:text-4xl font-bold text-navy-800 mb-4">Contact With Our Certified Agent</h2>

                     <p className="text-gray-600 mb-8">
                     Have questions or ready to take the next step? Our certified real estate agents are here to guide you every step of the way. With expert knowledge and personalized service, they'll help you find the perfect home that fits your lifestyle and budget. Get in touch today and make your dream home a reality!
                     </p>

                     <div className="flex flex-col sm:flex-row gap-4">
                        <a href="tel:+8801717171717" className="w-full sm:w-auto">
                           <Button className="bg-emerald-500 hover:bg-emerald-600 text-white w-full">
                              <Phone className="w-4 h-4 mr-2" />
                              Make A Call: +8801717171717
                           </Button>
                        </a>

                        <a href="mailto:info@propfind.com" className="w-full sm:w-auto">
                           <Button variant="outline" className="border-navy-800 text-navy-800 hover:bg-navy-800 hover:text-white w-full">
                              Get Appointment Via Email: info@propfind.com
                           </Button>
                        </a>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   )
}
