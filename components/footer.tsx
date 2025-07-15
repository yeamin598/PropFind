"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MapPin, Phone, Mail, Twitter, Facebook, Youtube, Linkedin, ChevronRight } from "lucide-react"
import { toast } from "sonner"

export default function Footer() {
  return (
    <footer>
      <div className="bg-navy-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Get In Touch */}
            <div>
              <h3 className="text-xl font-bold mb-6">Get In Touch</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 mr-3 mt-1 text-emerald-500" />
                  <p>103 Vodra, Rajshahi, Bangladesh</p>
                </div>
                <div className="flex items-center">
                  <Phone className="w-5 h-5 mr-3 text-emerald-500" />
                  <p>+8801717171717</p>
                </div>
                <div className="flex items-center">
                  <Mail className="w-5 h-5 mr-3 text-emerald-500" />
                  <p>info@propfind.com</p>
                </div>
                <div className="flex space-x-3 pt-2">
                  <Link
                    href="https://x.com/PropFindTeam"
                    className="w-9 h-9 rounded-full border border-white flex items-center justify-center hover:bg-emerald-500 hover:border-emerald-500 transition-colors"
                  >
                    <Twitter className="w-4 h-4" />
                  </Link>
                  <Link
                    href="https://www.facebook.com/profile.php?id=61578309539965"
                    className="w-9 h-9 rounded-full border border-white flex items-center justify-center hover:bg-emerald-500 hover:border-emerald-500 transition-colors"
                  >
                    <Facebook className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-bold mb-6">Quick Links</h3>
              <div className="space-y-3">
                <Link href="/about" className="flex items-center hover:text-emerald-500 transition-colors">
                  <ChevronRight className="w-4 h-4 mr-2" />
                  <span>About Us</span>
                </Link>
                <Link href="/contact" className="flex items-center hover:text-emerald-500 transition-colors">
                  <ChevronRight className="w-4 h-4 mr-2" />
                  <span>Contact Us</span>
                </Link>
                {/*<Link href="/services" className="flex items-center hover:text-emerald-500 transition-colors">
                  <ChevronRight className="w-4 h-4 mr-2" />
                  <span>Our Services</span>
                </Link>
                <Link href="/privacy" className="flex items-center hover:text-emerald-500 transition-colors">
                  <ChevronRight className="w-4 h-4 mr-2" />
                  <span>Privacy Policy</span>
                </Link>
                <Link href="/terms" className="flex items-center hover:text-emerald-500 transition-colors">
                  <ChevronRight className="w-4 h-4 mr-2" />
                  <span>Terms & Condition</span>
                </Link>*/}
              </div>
            </div>

            {/* Photo Gallery 
            <div>
              <h3 className="text-xl font-bold mb-6">Photo Gallery</h3>
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div key={item} className="relative h-20 w-full rounded-md overflow-hidden">
                    <Image
                      src={`/placeholder.svg?height=80&width=80`}
                      alt={`Gallery image ${item}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
            */}
            {/* Newsletter */}
            <div>
              <h3 className="text-xl font-bold mb-6">Newsletter</h3>
              <p className="mb-4">Subscribe us for future promotion</p>
              <div className="flex">
                <Input
                  type="email"
                  placeholder="Your email"
                  className="rounded-r-none bg-white text-gray-800 focus-visible:ring-emerald-500"
                />
                <Button
                  className="rounded-l-none bg-emerald-500 hover:bg-emerald-600"
                  onClick={() => toast.success("You have successfully subscribed to our newsletter.")}
                >
                  SignUp
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-navy-800 border-t border-gray-700 py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-white">
            <p>
              © <span className="font-medium">PropFind</span>. All Right Reserved. Designed By{" "}
              <Link href="#" className="text-emerald-500">
                PropFind Team
              </Link>
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/" className="hover:text-emerald-500 transition-colors">
                Home
              </Link>
              {/*
              <Link href="/cookies" className="hover:text-emerald-500 transition-colors">
                Cookies
              </Link>
              <Link href="/help" className="hover:text-emerald-500 transition-colors">
                Help
              </Link>
              <Link href="/faqs" className="hover:text-emerald-500 transition-colors">
                FAQs
              </Link>
              */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
