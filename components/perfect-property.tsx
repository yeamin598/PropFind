import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

export default function PerfectProperty() {
   return (
      <section className="py-16 bg-white">
         <div className="container mx-auto px-4">
            <div className="relative">
               {/* Green background shape */}
               <div className="absolute left-0 top-0 w-[45%] h-[110%] bg-emerald-500 clip-path-polygon"></div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                  {/* Image */}
                  <div className="relative">
                     <div className="relative h-[500px] w-full overflow-hidden">
                        <Image
                           src="/images/property-2.jpg"
                           alt="Luxury Property with Pool"
                           fill
                           className="object-cover"
                        />
                     </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col justify-center">
                     <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy-800 mb-6">
                        #1 Place To Find The Perfect Property
                     </h2>

                     <p className="text-gray-600 mb-8">
                     Your search for the ideal property ends here. Whether you're buying, selling, or investing, we offer a wide range of verified listings, expert guidance, and seamless service to help you make the right move. Explore the best homes, apartments, and commercial spaces—all in one trusted place.

                     </p>

                     <div className="space-y-4 mb-8">
                        <div className="flex items-center">
                           <Check className="text-emerald-500 mr-3" />
                           <span>Extensive Property Listings
                           </span>
                        </div>
                        <div className="flex items-center">
                           <Check className="text-emerald-500 mr-3" />
                           <span>Smart Search & Filters
                           </span>
                        </div>
                        <div className="flex items-center">
                           <Check className="text-emerald-500 mr-3" />
                           <span>Get guidance from certified agents</span>
                        </div>
                     </div>

                     <div>
                        <Button asChild className="bg-emerald-500 hover:bg-emerald-600 text-white px-8">
                           <a href="/properties">Explore Listing</a>
                        </Button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   )
}
