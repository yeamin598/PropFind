"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff } from "lucide-react"
import { toast } from "sonner"

export default function SignupPage() {
   const [showPassword, setShowPassword] = useState(false)
   const [firstName, setFirstName] = useState("")
   const [lastName, setLastName] = useState("")
   const [email, setEmail] = useState("")
   const [password, setPassword] = useState("")
   const [isLoading, setIsLoading] = useState(false)
   const router = useRouter()

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      setIsLoading(true)

      try {
         const response = await fetch("/api/signup", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({
               name: `${firstName} ${lastName}`,
               email,
               password
            }),
         })

         const data = await response.json()

         if (data.success) {
            toast.success("Account created successfully, please login")
            router.push("/login")
         } else {
            toast.error(data.message || "Signup failed")
         }
      } catch (error) {
         console.error("Signup error:", error)
         toast.error("An error occurred during signup")
      } finally {
         setIsLoading(false)
      }
   }

   return (
      <div className="min-h-screen bg-emerald-50/50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
         <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <Link href="/" className="flex justify-center">

               <span className="text-3xl font-bold text-emerald-500 ml-2">PropFind</span>
            </Link>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-navy-800">Create your account</h2>
            <p className="mt-2 text-center text-sm text-gray-600">Join PropFind to find your perfect home</p>
         </div>

         <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
               <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div>
                        <Label htmlFor="first-name">First name</Label>
                        <div className="mt-1">
                           <Input
                              id="first-name"
                              name="first-name"
                              type="text"
                              autoComplete="given-name"
                              required
                              className="h-10"
                              value={firstName}
                              onChange={(e) => setFirstName(e.target.value)}
                           />
                        </div>
                     </div>

                     <div>
                        <Label htmlFor="last-name">Last name</Label>
                        <div className="mt-1">
                           <Input
                              id="last-name"
                              name="last-name"
                              type="text"
                              autoComplete="family-name"
                              required
                              className="h-10"
                              value={lastName}
                              onChange={(e) => setLastName(e.target.value)}
                           />
                        </div>
                     </div>
                  </div>

                  <div>
                     <Label htmlFor="email">Email address</Label>
                     <div className="mt-1">
                        <Input
                           id="email"
                           name="email"
                           type="email"
                           autoComplete="email"
                           required
                           className="h-10"
                           placeholder="name@example.com"
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                        />
                     </div>
                  </div>

                  <div>
                     <Label htmlFor="password">Password</Label>
                     <div className="mt-1 relative">
                        <Input
                           id="password"
                           name="password"
                           type={showPassword ? "text" : "password"}
                           autoComplete="new-password"
                           required
                           className="h-10 pr-10"
                           placeholder="••••••••"
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                           type="button"
                           className="absolute inset-y-0 right-0 pr-3 flex items-center"
                           onClick={() => setShowPassword(!showPassword)}
                        >
                           {showPassword ? (
                              <EyeOff className="h-5 w-5 text-gray-400" />
                           ) : (
                              <Eye className="h-5 w-5 text-gray-400" />
                           )}
                        </button>
                     </div>
                     <p className="mt-1 text-xs text-gray-500">
                        Must be at least 8 characters and include a number and a special character
                     </p>
                  </div>



                  <div>
                     <Button
                        type="submit"
                        className="w-full bg-emerald-500 hover:bg-emerald-600 h-10"
                        disabled={isLoading}
                     >
                        {isLoading ? "Creating account..." : "Sign up"}
                     </Button>
                  </div>
               </form>

               <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                     Already have an account?{" "}
                     <Link href="/login" className="font-medium text-emerald-500 hover:text-emerald-600">
                        Sign in
                     </Link>
                  </p>
               </div>
            </div>
         </div>
      </div>
   )
}
