import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock, MessageCircle, HeadphonesIcon } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function ContactPage() {
   const contactInfo = [
      {
         icon: MapPin,
         title: "Our Location",
         details: ["103 Vodra, Rajshahi, Bangladesh"],
         color: "text-blue-500"
      },
      {
         icon: Phone,
         title: "Call Us",
         details: ["+880 1717-171717"],
         color: "text-green-500"
      },
      {
         icon: Mail,
         title: "Email Us",
         details: ["info@propfind.com", "sales@propfind.com", "support@propfind.com"],
         color: "text-purple-500"
      },
      {
         icon: Clock,
         title: "Business Hours",
         details: ["Sunday - Thursday: 9:00 AM - 5:00 PM"],
         color: "text-orange-500"
      }
   ]

   const faqs = [
      {
         question: "How do I schedule a property viewing?",
         answer: "You can schedule a viewing by calling us, filling out our contact form, or live chat via Social Media."
      },
      {
         question: "Do you offer virtual property tours?",
         answer: "Yes! We offer comprehensive virtual tours for most of our properties. Contact us to arrange a virtual viewing session."
      },
      {
         question: "What areas do you serve?",
         answer: "We serve the greater Rajshahi Metropolitan Area, including Uposohor, Talaimari, Rajpara, and surrounding suburbs."
      },
      {
         question: "How long does the buying process take?",
         answer: "The typical buying process takes 7-15 days from offer acceptance to closing, though this can vary based on financing and other factors."
      }
   ]

   const contactMethods = [
      {
         icon: MessageCircle,
         title: "Live Chat",
         description: "Get instant answers to your questions",
         action: "Start Chat Via X or Facebook",
         available: "Available 24/7"
      },
      {
         icon: HeadphonesIcon,
         title: "Phone Support",
         description: "Speak directly with our experts",
         action: "Call Now +880 1717-171717",
         available: "Sun-Thu 9AM-5PM"
      },
      {
         icon: Mail,
         title: "Email Support",
         description: "Send us your detailed inquiries",
         action: "Send Email info@propfind.com",
         available: "Response in 24hrs"
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
                        Get In <span className="text-emerald-500">Touch</span> With Us
                     </h1>
                     <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                        Ready to find your dream property or have questions about our services? Our experienced team is here to help you every step of the way. Reach out to us today and let's make your real estate goals a reality.
                     </p>
                  </div>
                  <div className="order-1 md:order-2">
                     <div className="relative h-[400px] md:h-[500px] w-full">
                        <Image
                           src="/images/call-to-action.jpg"
                           alt="Contact Our Team"
                           fill
                           className="object-cover rounded-lg shadow-lg"
                           priority
                        />
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* Contact Methods Section */}
         <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
               <div className="text-center mb-12">
                  <h2 className="text-4xl font-bold mb-4">How Can We <span className="text-emerald-500">Help You</span>?</h2>
                  <p className="text-gray-600 max-w-3xl mx-auto">
                     Choose the best way to reach us. Our team is available through multiple channels to provide you with the support you need.
                  </p>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {contactMethods.map((method, index) => (
                     <div key={index} className="text-center p-6 rounded-lg border border-gray-200 hover:border-emerald-200 hover:shadow-md transition-all">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4">
                           <method.icon className="w-8 h-8 text-emerald-500" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">{method.title}</h3>
                        <p className="text-gray-600 mb-4">{method.description}</p>
                        <p className="text-sm text-gray-500 mb-4">{method.available}</p>
                        <Button className="bg-emerald-500 hover:bg-emerald-600 text-white">
                           {method.action}
                        </Button>
                     </div>
                  ))}
               </div>
            </div>
         </section>

         {/* Contact Form & Info Section */}
         <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  {/* Contact Form */}
                  <div className="bg-white rounded-lg p-8 shadow-sm">
                     <h3 className="text-2xl font-bold mb-6">Send Us a Message</h3>
                     <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                              <Input placeholder="Enter Your First Name" className="w-full" />
                           </div>
                           <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                              <Input placeholder="Enter Your Last Name" className="w-full" />
                           </div>
                        </div>
                        
                        <div>
                           <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                           <Input type="email" placeholder="Enter Your Email Address" className="w-full" />
                        </div>
                        
                        <div>
                           <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                           <Input type="tel" placeholder="Enter Your Phone Number" className="w-full" />
                        </div>
                        
                        <div>
                           <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                           <Input placeholder="Property Inquiry" className="w-full" />
                        </div>
                        
                        <div>
                           <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                           <Textarea 
                              placeholder="Tell us about your property needs or ask any questions..."
                              className="w-full h-32 resize-none"
                           />
                        </div>
                        
                        <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3">
                           Send Message
                        </Button>
                     </form>
                  </div>

                  {/* Contact Information */}
                  <div className="space-y-8">
                     {contactInfo.map((info, index) => (
                        <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
                           <div className="flex items-start">
                              <div className={`p-3 rounded-full bg-gray-100 mr-4`}>
                                 <info.icon className={`w-6 h-6 ${info.color}`} />
                              </div>
                              <div>
                                 <h4 className="text-lg font-bold mb-2">{info.title}</h4>
                                 {info.details.map((detail, i) => (
                                    <p key={i} className="text-gray-600">{detail}</p>
                                 ))}
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </section>

         {/* Map Section */}
         <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
               <div className="text-center mb-12">
                  <h2 className="text-4xl font-bold mb-4">Find Our <span className="text-emerald-500">Office</span></h2>
                  <p className="text-gray-600 max-w-3xl mx-auto">
                     Visit us at our downtown location. We're conveniently located in the heart of the business district with easy access to public transportation.
                  </p>
               </div>
               
               {/* Map Placeholder */}
               <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
                  <div className="text-center">
                     <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                     <p className="text-gray-500 text-lg">Interactive Map Coming Soon</p>
                     <p className="text-gray-800"><b>103 Vodra, Rajshahi, Bangladesh</b></p>
                  </div>
               </div>
            </div>
         </section>

         {/* FAQ Section */}
         <section className="py-16 bg-emerald-50">
            <div className="container mx-auto px-4">
               <div className="text-center mb-12">
                  <h2 className="text-4xl font-bold mb-4">Frequently Asked <span className="text-emerald-500">Questions</span></h2>
                  <p className="text-gray-600 max-w-3xl mx-auto">
                     Find quick answers to common questions about our services and the real estate process.
                  </p>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                  {faqs.map((faq, index) => (
                     <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
                        <h4 className="text-lg font-bold mb-3 text-gray-900">{faq.question}</h4>
                        <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                     </div>
                  ))}
               </div>
               
               
            </div>
         </section>

         {/* Call to Action */}
         <section className="py-16 bg-gray-900 text-white">
            <div className="container mx-auto px-4 text-center">
               <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Ready to Start Your <span className="text-emerald-500">Property Journey</span>?
               </h2>
               <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                  Don't wait any longer. Contact our expert team today and take the first step towards finding your perfect property or selling your current one.
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