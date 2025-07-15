import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/lib/auth-context"
import BackToTop from "@/components/back-to-top"
import { Toaster } from "@/components/Toaster"
import { Providers } from "@/components/providers"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
   title: "PropFind - Real Estate Platform",
   description: "Find your perfect home with PropFind",
}

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode
}>) {
   return (
      <html lang="en" suppressHydrationWarning>
         <body className={inter.className}>
            <Providers>
            <AuthProvider>
               {children}
            </AuthProvider>
            </Providers>
            <BackToTop />
            <Toaster />
         </body>
      </html>
   )
}
