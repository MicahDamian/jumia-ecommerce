import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'
import { WishlistProvider } from './context/WishlistContext'
import DemoSetup from './components/DemoSetup'
import LiveChat from './components/LiveChat'
import CallSupport from './components/CallSupport'
import EmailSupport from './components/EmailSupport'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Jumia Nigeria - Online Shopping for Electronics, Phones, Fashion & more',
  description: 'Shop online for electronics, phones, computers, fashion, beauty products, home & garden, kids & baby items and more on Jumia Nigeria. ✓ Best Prices ✓ Fast Delivery ✓ Genuine Products',
  keywords: 'online shopping, electronics, phones, fashion, Nigeria, Jumia',
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <DemoSetup />
              {children}
              <LiveChat />
              <CallSupport />
              <EmailSupport />
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
