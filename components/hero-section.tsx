"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"

export default function HeroSection() {
   const router = useRouter()
   const { user } = useAuth();

   const handleGetStarted = () => {
      if (user) {
         router.push("/properties");
      } else {
         router.push("/login");
      }
   }

   return (
      <div className="relative">
         <div className="container mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 z-10">
               <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                  Find A <span className="text-emerald-500">Perfect Home</span> To Live With Your Family
               </h1>
               <p className="text-gray-600 mb-8 max-w-lg">
               Discover a place where comfort meets convenience. Whether you're looking for a spacious house in a peaceful neighborhood or a modern apartment close to top schools and amenities, we help you find the ideal home tailored to your family's needs. Start your journey to a better living space today!
               </p>
               <Button
                  className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-6 text-lg"
                  onClick={handleGetStarted}
               >
                  Get Started
               </Button>
            </div>
            <div className="md:w-1/2 mt-8 md:mt-0">
               <div className="relative h-[400px] md:h-[500px] w-full">
                  <Image
                     src="/images/property-1.jpg"
                     alt="Luxury Home"
                     fill
                     className="object-cover rounded-lg"
                     priority
                  />
               </div>
            </div>
         </div>
      </div>
   )
}
