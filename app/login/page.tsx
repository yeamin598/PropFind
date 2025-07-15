"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

export default function LoginPage() {
   const [showPassword, setShowPassword] = useState(false)
   const [email, setEmail] = useState("")
   const [password, setPassword] = useState("")
   const [isLoading, setIsLoading] = useState(false)
   const [error, setError] = useState("")
   const router = useRouter()
   const searchParams = useSearchParams()
   const redirectTo = searchParams.get("from") || "/"
   const { login } = useAuth()

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      setIsLoading(true)
      setError("")

      try {
         await login(email, password)
            router.push(redirectTo)
      } catch (err) {
         setError(err instanceof Error ? err.message : "An error occurred during login")
         console.error(err)
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
            <h2 className="mt-6 text-center text-3xl font-extrabold text-navy-800">Sign in to your account</h2>
            <p className="mt-2 text-center text-sm text-gray-600">Find your perfect home with PropFind</p>
         </div>

         <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
               {error && (
                  <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md text-sm">
                     {error}
                  </div>
               )}
               <form className="space-y-6" onSubmit={handleSubmit}>
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
                     <div className="flex items-center justify-between">
                        <Label htmlFor="password">Password</Label>
                        <div className="text-sm">
                           <Link href="/forgot-password" className="font-medium text-emerald-500 hover:text-emerald-600">
                              Forgot your password?
                           </Link>
                        </div>
                     </div>
                     <div className="mt-1 relative">
                        <Input
                           id="password"
                           name="password"
                           type={showPassword ? "text" : "password"}
                           autoComplete="current-password"
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
                  </div>

                  <div className="flex items-center justify-between">
                     <div className="flex items-center">
                        <Checkbox id="remember-me" />
                        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                           Remember me
                        </label>
                     </div>
                  </div>

                  <div>
                     <Button
                        type="submit"
                        className="w-full bg-emerald-500 hover:bg-emerald-600 h-10"
                        disabled={isLoading}
                     >
                        {isLoading ? "Signing in..." : "Sign in"}
                     </Button>
                  </div>
               </form>

               <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                     Don&apos;t have an account?{" "}
                     <Link href="/signup" className="font-medium text-emerald-500 hover:text-emerald-600">
                        Sign up
                     </Link>
                  </p>
               </div>
            </div>
         </div>
      </div>
   )
}
