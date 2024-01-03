import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from "./providers";
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
const inter = Inter({ subsets: ['latin'] })
import { Image } from "@nextui-org/react";
export const metadata: Metadata = {
  title: 'HABERTO',
  description: 'En güncel haberler',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <main className="dark text-foreground bg-background relative">
          <Providers>
            <NavBar />
            {children}
            <Footer />
          </Providers>
        </main>
        <div
          aria-hidden="true"
          className="fixed hidden dark:md:block dark:opacity-70 scale-110 -translate-y-6 blur-lg -bottom-[40%] -left-[20%] z-0 pointer-events-none"
        >
          <Image removeWrapper alt="docs left background" src="/gradients/docs-left.png" />
        </div>
        <div
          aria-hidden="true"
          className="fixed hidden dark:md:block dark:opacity-70 scale-110 -translate-y-6 blur-lg -top-[80%] -right-[60%] 2xl:-top-[60%] 2xl:-right-[45%] z-0 rotate-12 pointer-events-none"
        >
          <Image removeWrapper alt="docs right background" src="/gradients/docs-right.png" />
        </div>
      </body>
    </html >
  )
}
