"use client"

import { useState, useEffect } from 'react'
import { Star, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCart } from '../context/CartContext'
import Link from 'next/link'
import { useWishlist } from '../context/WishlistContext'

const flashSaleProducts = [
  {
    id: 1,
    name: "Samsung Galaxy A54 5G",
    originalPrice: 185000,
    salePrice: 129000,
    discount: 30,
    rating: 4.5,
    reviews: 234,
    image: "/images/samsung-phone.png",
    sold: 45,
    total: 100,
    category: "Phones & Tablets",
    brand: "Samsung",
    inStock: true
  },
  {
    id: 2,
    name: "Nike Air Max 270",
    originalPrice: 45000,
    salePrice: 31500,
    discount: 30,
    rating: 4.8,
    reviews: 156,
    image: "/images/nike-shoes.png",
    sold: 78,
    total: 120,
    category: "Fashion",
    brand: "Nike",
    inStock: true
  },
  {
    id: 3,
    name: "HP Pavilion Laptop",
    originalPrice: 320000,
    salePrice: 224000,
    discount: 30,
    rating: 4.3,
    reviews: 89,
    image: "/images/hp-laptop.png",
    sold: 23,
    total: 50,
    category: "Electronics",
    brand: "HP",
    inStock: true
  },
  {
    id: 4,
    name: "iPhone 13 Pro Max",
    originalPrice: 650000,
    salePrice: 520000,
    discount: 20,
    rating: 4.9,
    reviews: 445,
    image: "/images/samsung-phone.png",
    sold: 67,
    total: 80,
    category: "Phones & Tablets",
    brand: "Apple",
    inStock: true
  }
]

export default function FlashSales() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 45,
    seconds: 30
  })
  const { addItem } = useCart()
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist()

  const handleAddToCart = (product: typeof flashSaleProducts[0]) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.salePrice,
      originalPrice: product.originalPrice,
      image: product.image,
      rating: product.rating,
      reviews: product.reviews
    })
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="py-8 bg-red-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <h2 className="text-2xl font-bold text-red-600">⚡ Flash Sales</h2>
            <div className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg">
              <span className="text-sm">Time Left:</span>
              <div className="flex space-x-1">
                <span className="bg-white text-red-600 px-2 py-1 rounded text-sm font-bold">
                  {timeLeft.hours.toString().padStart(2, '0')}
                </span>
                <span>:</span>
                <span className="bg-white text-red-600 px-2 py-1 rounded text-sm font-bold">
                  {timeLeft.minutes.toString().padStart(2, '0')}
                </span>
                <span>:</span>
                <span className="bg-white text-red-600 px-2 py-1 rounded text-sm font-bold">
                  {timeLeft.seconds.toString().padStart(2, '0')}
                </span>
              </div>
            </div>
          </div>
          <Button variant="outline" className="text-red-600 border-red-600 hover:bg-red-50">
            View All
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {flashSaleProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group">
              <Link href={`/product/${product.id}`}>
                <div className="relative cursor-pointer">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded text-sm font-bold">
                    -{product.discount}%
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      if (isInWishlist(product.id)) {
                        removeFromWishlist(product.id)
                      } else {
                        addToWishlist({
                          id: product.id,
                          name: product.name,
                          price: product.salePrice,
                          originalPrice: product.originalPrice,
                          image: product.image,
                          rating: product.rating,
                          reviews: product.reviews
                        })
                      }
                    }}
                  >
                    <Heart className={`h-4 w-4 ${isInWishlist(product.id) ? 'text-red-500 fill-current' : ''}`} />
                  </Button>
                </div>
              </Link>
              
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">{product.name}</h3>
                
                <div className="flex items-center mb-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 ml-2">({product.reviews})</span>
                </div>

                <div className="flex items-center space-x-2 mb-3">
                  <span className="text-lg font-bold text-red-600">
                    ₦{product.salePrice.toLocaleString()}
                  </span>
                  <span className="text-sm text-gray-500 line-through">
                    ₦{product.originalPrice.toLocaleString()}
                  </span>
                </div>

                <div className="mb-3">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>{product.sold} sold</span>
                    <span>{product.total - product.sold} left</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-red-600 h-2 rounded-full"
                      style={{ width: `${(product.sold / product.total) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <Button 
                  className="w-full bg-orange-500 hover:bg-orange-600"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    handleAddToCart(product)
                  }}
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
