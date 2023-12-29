import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from "./providers";
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
const inter = Inter({ subsets: ['latin'] })

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
        <main className="dark text-foreground bg-background">
          <Providers>
            <NavBar />
            {children}
            <Footer />
          </Providers>
        </main>
      </body>
    </html >
  )
}
