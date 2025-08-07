"use client"

import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import Image from 'next/image'

export default function CartPage() {
  const { items, total, updateQuantity, removeItem, itemCount } = useCart()
  const [promoCode, setPromoCode] = useState('')
  const [discount, setDiscount] = useState(0)

  const shipping = total > 15000 ? 0 : 2000
  const finalTotal = total - discount + shipping

  const handlePromoCode = () => {
    if (promoCode.toLowerCase() === 'jumia10') {
      setDiscount(total * 0.1)
    } else if (promoCode.toLowerCase() === 'welcome5') {
      setDiscount(total * 0.05)
    } else {
      setDiscount(0)
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
            <Link href="/">
              <Button className="bg-orange-500 hover:bg-orange-600">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link href="/">
            <Button variant="ghost" className="mr-4">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Continue Shopping
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">
            Shopping Cart ({itemCount} {itemCount === 1 ? 'item' : 'items'})
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm">
              {items.map((item) => (
                <div key={item.id} className="p-6 border-b border-gray-200 last:border-b-0">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="rounded-lg object-cover"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        {item.name}
                      </h3>
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-lg font-bold text-orange-600">
                          ₦{item.price.toLocaleString()}
                        </span>
                        {item.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">
                            ₦{item.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-green-600">In Stock</p>
                    </div>

                    <div className="flex items-center space-x-3">
                      {/* Quantity controls */}
                      <div className="flex items-center border rounded-lg">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="h-8 w-8 p-0"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="px-3 py-1 text-sm font-medium">
                          {item.quantity}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="h-8 w-8 p-0"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>

                      {/* Remove button */}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-800">
                        ₦{(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>
              
              {/* Promo Code */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Promo Code
                </label>
                <div className="flex space-x-2">
                  <Input
                    type="text"
                    placeholder="Enter code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    variant="outline"
                    onClick={handlePromoCode}
                    className="px-4"
                  >
                    Apply
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Try: JUMIA10 or WELCOME5
                </p>
              </div>

              {/* Price breakdown */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal ({itemCount} items)</span>
                  <span className="font-medium">₦{total.toLocaleString()}</span>
                </div>
                
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-₦{discount.toLocaleString()}</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? 'Free' : `₦${shipping.toLocaleString()}`}
                  </span>
                </div>
                
                {total < 15000 && (
                  <p className="text-xs text-orange-600">
                    Add ₦{(15000 - total).toLocaleString()} more for free shipping
                  </p>
                )}
                
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-orange-600">₦{finalTotal.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Checkout button */}
              <Link href="/checkout">
                <Button className="w-full bg-orange-500 hover:bg-orange-600 py-3 text-lg font-semibold">
                  Proceed to Checkout
                </Button>
              </Link>

              {/* Security badges */}
              <div className="mt-4 text-center">
                <p className="text-xs text-gray-500 mb-2">Secure Checkout</p>
                <div className="flex justify-center space-x-2">
                  <div className="bg-gray-100 px-2 py-1 rounded text-xs">SSL</div>
                  <div className="bg-gray-100 px-2 py-1 rounded text-xs">256-bit</div>
                  <div className="bg-gray-100 px-2 py-1 rounded text-xs">Encrypted</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
