"use client"

import { useWishlist } from '../context/WishlistContext'
import { useCart } from '../context/CartContext'
import { Heart, ShoppingCart, Trash2, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function WishlistPage() {
  const { items, removeItem, itemCount } = useWishlist()
  const { addItem } = useCart()

  const handleAddToCart = (item: any) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      originalPrice: item.originalPrice,
      image: item.image,
      rating: item.rating,
      reviews: item.reviews,
      quantity: 1
    })
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <Heart className="h-24 w-24 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-8">Save items you love to your wishlist and shop them later.</p>
            <Link href="/">
              <Button className="bg-orange-500 hover:bg-orange-600">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-800">
            My Wishlist ({itemCount} {itemCount === 1 ? 'item' : 'items'})
          </h1>
          <Button
            variant="outline"
            onClick={() => {
              items.forEach(item => handleAddToCart(item))
            }}
            className="text-orange-600 border-orange-600 hover:bg-orange-50"
          >
            Add All to Cart
          </Button>
        </div>

        {/* Wishlist Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow group">
              <Link href={`/product/${item.id}`}>
                <div className="relative cursor-pointer">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    width={300}
                    height={300}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
                  />
                  {!item.inStock && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <span className="text-white font-semibold">Out of Stock</span>
                    </div>
                  )}
                </div>
              </Link>
              
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">{item.name}</h3>
                
                <div className="flex items-center mb-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(item.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 ml-2">({item.reviews})</span>
                </div>

                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-lg font-bold text-orange-600">
                    ₦{item.price.toLocaleString()}
                  </span>
                  {item.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">
                      ₦{item.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>

                <div className="flex space-x-2">
                  <Button 
                    className="flex-1 bg-orange-500 hover:bg-orange-600"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      handleAddToCart(item)
                    }}
                    disabled={!item.inStock}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      removeItem(item.id)
                    }}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}
