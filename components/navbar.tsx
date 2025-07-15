"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
   NavigationMenu,
   NavigationMenuContent,
   NavigationMenuItem,
   NavigationMenuLink,
   NavigationMenuList,
   NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Menu, X, LogOut, User } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

export default function Navbar() {
   const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
   const router = useRouter()
   const { user, logout, isLoading } = useAuth()

   const handleLogout = async () => {
      await logout()
      setMobileMenuOpen(false)
   }

   return (
      <header className="bg-white shadow-sm">
         <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <Link href="/" className="flex items-center gap-2">
               <span className="text-3xl font-bold text-emerald-500">PropFind</span>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
               <NavigationMenu>
                  <NavigationMenuList className="space-x-8">
                     <NavigationMenuItem>
                        <Link href="/" legacyBehavior passHref>
                           <NavigationMenuLink className="font-medium text-gray-800 hover:text-emerald-500">
                              HOME
                           </NavigationMenuLink>
                        </Link>
                     </NavigationMenuItem>

                     <NavigationMenuItem>
                        <Link href="/properties" legacyBehavior passHref>
                           <NavigationMenuLink className="font-medium text-gray-800 hover:text-emerald-500">
                              PROPERTIES
                           </NavigationMenuLink>
                        </Link>
                     </NavigationMenuItem>

                     <NavigationMenuItem>
                        <Link href="/about" legacyBehavior passHref>
                           <NavigationMenuLink className="font-medium text-gray-800 hover:text-emerald-500">
                              ABOUT
                           </NavigationMenuLink>
                        </Link>
                     </NavigationMenuItem>
                     

                     <NavigationMenuItem>
                        <Link href="/contact" legacyBehavior passHref>
                           <NavigationMenuLink className="font-medium text-gray-800 hover:text-emerald-500">
                              CONTACT
                           </NavigationMenuLink>
                        </Link>
                     </NavigationMenuItem>
                  </NavigationMenuList>
               </NavigationMenu>

               <div className="flex items-center space-x-4">
                  {isLoading ? (
                     <div className="h-10 w-20 bg-gray-100 animate-pulse rounded"></div>
                  ) : user ? (
                     <>
                        <button
                           className="flex items-center space-x-2 px-3 py-1 rounded hover:bg-gray-100 transition"
                           onClick={() => router.push('/profile')}
                           type="button"
                        >
                           <User className="h-5 w-5 text-emerald-500" />
                           <span className="font-medium text-gray-800">{user.name}</span>
                        </button>
                        <Button
                           variant="outline"
                           className="border-emerald-500 text-emerald-500 hover:bg-emerald-50"
                           onClick={handleLogout}
                        >
                           <LogOut className="h-4 w-4 mr-2" />
                           Logout
                        </Button>
                        <Button
                           className="bg-emerald-500 hover:bg-emerald-600 text-white"
                           onClick={() => router.push("/property/add")}
                        >
                           Add Property
                        </Button>
                     </>
                  ) : (
                     <>
                        <Button
                           variant="outline"
                           className="border-emerald-500 text-emerald-500 hover:bg-emerald-50"
                           onClick={() => router.push("/login")}
                        >
                           Login
                        </Button>
                        <Button
                           className="bg-emerald-500 hover:bg-emerald-600 text-white"
                           onClick={() => router.push("/signup")}
                        >
                           Sign Up
                        </Button>
                     </>
                  )}
               </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
               <button
                  type="button"
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
               >
                  {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
               </button>
            </div>
         </div>

         {/* Mobile menu */}
         {mobileMenuOpen && (
            <div className="md:hidden bg-white border-t border-gray-200 py-2">
               <div className="container mx-auto px-4 space-y-1">
                  <Link
                     href="/"
                     className="block py-2 px-3 rounded-md hover:bg-gray-100 font-medium"
                     onClick={() => setMobileMenuOpen(false)}
                  >
                     HOME
                  </Link>
                  <Link
                     href="/about"
                     className="block py-2 px-3 rounded-md hover:bg-gray-100 font-medium"
                     onClick={() => setMobileMenuOpen(false)}
                  >
                     ABOUT
                  </Link>
                  <Link
                     href="/contact"
                     className="block py-2 px-3 rounded-md hover:bg-gray-100 font-medium"
                     onClick={() => setMobileMenuOpen(false)}
                  >
                     CONTACT
                  </Link>
                  <div className="pt-4 flex flex-col space-y-2">
                     {isLoading ? (
                        <div className="h-10 w-full bg-gray-100 animate-pulse rounded"></div>
                     ) : user ? (
                        <>
                           <button
                              className="flex items-center space-x-2 py-2 px-3 w-full rounded hover:bg-gray-100 transition"
                              onClick={() => {
                                 router.push('/profile');
                                 setMobileMenuOpen(false);
                              }}
                              type="button"
                           >
                              <User className="h-5 w-5 text-emerald-500" />
                              <span className="font-medium text-gray-800">{user.name}</span>
                           </button>
                           <Button
                              variant="outline"
                              className="border-emerald-500 text-emerald-500 hover:bg-emerald-50 w-full"
                              onClick={handleLogout}
                           >
                              <LogOut className="h-4 w-4 mr-2" />
                              Logout
                           </Button>
                           <Button
                              className="bg-emerald-500 hover:bg-emerald-600 text-white w-full"
                              onClick={() => {
                                 router.push("/property/add")
                                 setMobileMenuOpen(false)
                              }}
                           >
                              Add Property
                           </Button>
                        </>
                     ) : (
                        <>
                           <Button
                              variant="outline"
                              className="border-emerald-500 text-emerald-500 hover:bg-emerald-50 w-full"
                              onClick={() => {
                                 router.push("/login")
                                 setMobileMenuOpen(false)
                              }}
                           >
                              Login
                           </Button>
                           <Button
                              className="bg-emerald-500 hover:bg-emerald-600 text-white w-full"
                              onClick={() => {
                                 router.push("/signup")
                                 setMobileMenuOpen(false)
                              }}
                           >
                              Sign Up
                           </Button>
                        </>
                     )}
                  </div>
               </div>
            </div>
         )}
      </header>
   )
}
