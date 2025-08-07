"use client"

import { useState } from 'react'
import { Search, ShoppingCart, User, Heart, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { useWishlist } from '../context/WishlistContext'
import SearchSuggestions from './SearchSuggestions'
import Link from 'next/link'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { itemCount } = useCart()
  const { user } = useAuth()
  const { itemCount: wishlistCount } = useWishlist()

  return (
    <header className="bg-white shadow-sm">
      {/* Top bar */}
      <div className="bg-orange-500 text-white text-sm py-2">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex space-x-4">
            <span>📞 Call to Order: 0700-600-0000</span>
            <span>🚚 Free delivery on orders above ₦15,000</span>
          </div>
          <div className="hidden md:flex space-x-4">
            <span>Help</span>
            <span>Sell on Jumia</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-orange-500">Jumia</h1>
          </div>

          {/* Search bar */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <SearchSuggestions onSearch={(query) => console.log('Search:', query)} />
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            {user ? (
              <Link href="/account">
                <Button variant="ghost" className="hidden md:flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>{user.firstName}</span>
                </Button>
              </Link>
            ) : (
              <Link href="/login">
                <Button variant="ghost" className="hidden md:flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>Login</span>
                </Button>
              </Link>
            )}
            <Link href="/wishlist">
              <Button variant="ghost" className="hidden md:flex items-center space-x-2 relative">
                <Heart className="h-5 w-5" />
                <span>Wishlist</span>
                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Button>
            </Link>
            <Link href="/cart">
              <Button variant="ghost" className="flex items-center space-x-2 relative">
                <ShoppingCart className="h-5 w-5" />
                <span className="hidden md:inline">Cart</span>
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Button>
            </Link>
            <Button
              variant="ghost"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile search */}
        <div className="md:hidden mt-4">
          <SearchSuggestions onSearch={(query) => console.log('Search:', query)} />
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 bg-white border-t pt-4">
            <div className="flex flex-col space-y-4">
              {user ? (
                <Link href="/account">
                  <Button variant="ghost" className="justify-start">
                    <User className="h-5 w-5 mr-2" />
                    {user.firstName}
                  </Button>
                </Link>
              ) : (
                <Link href="/login">
                  <Button variant="ghost" className="justify-start">
                    <User className="h-5 w-5 mr-2" />
                    Login
                  </Button>
                </Link>
              )}
              <Link href="/wishlist">
                <Button variant="ghost" className="justify-start relative">
                  <Heart className="h-5 w-5 mr-2" />
                  Wishlist
                  {wishlistCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {wishlistCount}
                    </span>
                  )}
                </Button>
              </Link>
              <Button variant="ghost" className="justify-start">
                <Heart className="h-5 w-5 mr-2" />
                Help
              </Button>
              <Button variant="ghost" className="justify-start">
                <Heart className="h-5 w-5 mr-2" />
                Sell on Jumia
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
