"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

type Testimonial = {
   id: number
   content: string
   name: string
   profession: string
   image: string
}

export default function Testimonials() {
   const [currentIndex, setCurrentIndex] = useState(0)

   const testimonials: Testimonial[] = [
      {
         id: 1,
         content:
            "We were nervous about buying our first house, but they made the whole process easy and reassuring. We felt supported every step of the way.",
         name: "Sanjida Akter",
         profession: "Biologist",
         image: "/images/testimonial-1.jpg",
      },
      {
         id: 2,
         content:
            "I had a fantastic experience! They listened to what I was looking for and helped me find a beautiful home for my family.",
         name: "Rakibul Islam",
         profession: "Service Holder",
         image: "/images/testimonial-2.jpg",
      },
      {
         id: 3,
         content:
            "Their service was exceptional! I found my dream home within weeks. The team was professional and understood exactly what I was looking for.",
         name: "Arafat Hossain",
         profession: "Teacher",
         image: "/images/testimonial-3.jpg",
      },
      {
         id: 4,
         content:
            "As a first-time buyer, I was nervous about the process. PropFind made everything simple and stress-free. I couldn't be happier with my new apartment!",
         name: "Anika Rahman",
         profession: "Software Engineer",
         image: "/images/testimonial-4.jpg",
      },
   ]

   const showPreviousTestimonial = () => {
      setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 2 : prevIndex - 1))
   }

   const showNextTestimonial = () => {
      setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 2 ? 0 : prevIndex + 1))
   }

   return (
      <section className="py-16 bg-white">
         <div className="container mx-auto px-4">
            <div className="text-center mb-12">
               <h2 className="text-4xl font-bold text-navy-800 mb-4">Our Clients Say!</h2>
               <p className="text-gray-600 max-w-3xl mx-auto">
               Here's what our happy homeowners have to say about their journey with us — from the first viewing to the final key handover, we're proud to be part of their story.
               </p>
            </div>

            <div className="relative max-w-5xl mx-auto">
               <button
                  onClick={showPreviousTestimonial}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center z-10 hover:bg-emerald-600 transition-colors"
                  aria-label="Previous testimonial"
               >
                  <ChevronLeft className="w-6 h-6" />
               </button>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {testimonials.slice(currentIndex, currentIndex + 2).map((testimonial) => (
                     <div
                        key={testimonial.id}
                        className="border border-dashed border-emerald-200 bg-emerald-50/50 rounded-lg p-6"
                     >
                        <p className="text-gray-600 mb-6">{testimonial.content}</p>
                        <div className="flex items-center">
                           <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                              <Image
                                 src={testimonial.image || "/placeholder.svg"}
                                 alt={testimonial.name}
                                 fill
                                 className="object-cover"
                              />
                           </div>
                           <div>
                              <h4 className="font-bold text-navy-800">{testimonial.name}</h4>
                              <p className="text-gray-500 text-sm">{testimonial.profession}</p>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>

               <button
                  onClick={showNextTestimonial}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center z-10 hover:bg-emerald-600 transition-colors"
                  aria-label="Next testimonial"
               >
                  <ChevronRight className="w-6 h-6" />
               </button>
            </div>
         </div>
      </section>
   )
}
