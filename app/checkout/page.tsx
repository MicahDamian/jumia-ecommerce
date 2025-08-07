"use client"

import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { ArrowLeft, CreditCard, Truck, Shield, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Checkbox } from '@/components/ui/checkbox'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function CheckoutPage() {
  const { items, total, itemCount, clearCart } = useCart()
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)
  const { user, addOrder } = useAuth()

  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: ''
  })

  const [paymentMethod, setPaymentMethod] = useState('card')
  const [cardInfo, setCardInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  })

  const shipping = total > 15000 ? 0 : 2000
  const finalTotal = total + shipping

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setCurrentStep(2)
  }

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    // Add order to user's history
    if (user) {
      addOrder({
        items: items.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image
        })),
        total: finalTotal,
        status: 'processing',
        shippingAddress: shippingInfo,
        paymentMethod: paymentMethod
      })
    }
    
    setCurrentStep(3)
    setIsProcessing(false)
    
    // Clear cart after successful order
    setTimeout(() => {
      clearCart()
      router.push('/')
    }, 5000)
  }

  if (items.length === 0 && currentStep !== 3) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">No items to checkout</h2>
          <Link href="/">
            <Button className="bg-orange-500 hover:bg-orange-600">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link href="/cart">
            <Button variant="ghost" className="mr-4">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Cart
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">Checkout</h1>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-8">
            {[
              { step: 1, title: 'Shipping', icon: Truck },
              { step: 2, title: 'Payment', icon: CreditCard },
              { step: 3, title: 'Confirmation', icon: CheckCircle }
            ].map(({ step, title, icon: Icon }) => (
              <div key={step} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  currentStep >= step ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {currentStep > step ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <Icon className="h-5 w-5" />
                  )}
                </div>
                <span className={`ml-2 font-medium ${
                  currentStep >= step ? 'text-orange-600' : 'text-gray-600'
                }`}>
                  {title}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step 1: Shipping Information */}
            {currentStep === 1 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6">Shipping Information</h2>
                <form onSubmit={handleShippingSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        required
                        value={shippingInfo.firstName}
                        onChange={(e) => setShippingInfo({...shippingInfo, firstName: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        required
                        value={shippingInfo.lastName}
                        onChange={(e) => setShippingInfo({...shippingInfo, lastName: e.target.value})}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={shippingInfo.email}
                      onChange={(e) => setShippingInfo({...shippingInfo, email: e.target.value})}
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      required
                      value={shippingInfo.phone}
                      onChange={(e) => setShippingInfo({...shippingInfo, phone: e.target.value})}
                    />
                  </div>

                  <div>
                    <Label htmlFor="address">Street Address *</Label>
                    <Input
                      id="address"
                      required
                      value={shippingInfo.address}
                      onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        required
                        value={shippingInfo.city}
                        onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State *</Label>
                      <Input
                        id="state"
                        required
                        value={shippingInfo.state}
                        onChange={(e) => setShippingInfo({...shippingInfo, state: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="zipCode">ZIP Code</Label>
                      <Input
                        id="zipCode"
                        value={shippingInfo.zipCode}
                        onChange={(e) => setShippingInfo({...shippingInfo, zipCode: e.target.value})}
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 py-3">
                    Continue to Payment
                  </Button>
                </form>
              </div>
            )}

            {/* Step 2: Payment Information */}
            {currentStep === 2 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6">Payment Information</h2>
                
                {/* Payment Methods */}
                <div className="mb-6">
                  <Label className="text-base font-medium mb-4 block">Payment Method</Label>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="flex items-center space-x-2 p-4 border rounded-lg">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex items-center cursor-pointer">
                        <CreditCard className="h-5 w-5 mr-2" />
                        Credit/Debit Card
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-4 border rounded-lg">
                      <RadioGroupItem value="bank" id="bank" />
                      <Label htmlFor="bank" className="cursor-pointer">Bank Transfer</Label>
                    </div>
                    <div className="flex items-center space-x-2 p-4 border rounded-lg">
                      <RadioGroupItem value="wallet" id="wallet" />
                      <Label htmlFor="wallet" className="cursor-pointer">Mobile Wallet</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Card Details */}
                {paymentMethod === 'card' && (
                  <form onSubmit={handlePaymentSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="cardName">Cardholder Name *</Label>
                      <Input
                        id="cardName"
                        required
                        value={cardInfo.cardName}
                        onChange={(e) => setCardInfo({...cardInfo, cardName: e.target.value})}
                      />
                    </div>

                    <div>
                      <Label htmlFor="cardNumber">Card Number *</Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        required
                        value={cardInfo.cardNumber}
                        onChange={(e) => setCardInfo({...cardInfo, cardNumber: e.target.value})}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiryDate">Expiry Date *</Label>
                        <Input
                          id="expiryDate"
                          placeholder="MM/YY"
                          required
                          value={cardInfo.expiryDate}
                          onChange={(e) => setCardInfo({...cardInfo, expiryDate: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV *</Label>
                        <Input
                          id="cvv"
                          placeholder="123"
                          required
                          value={cardInfo.cvv}
                          onChange={(e) => setCardInfo({...cardInfo, cvv: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox id="saveCard" />
                      <Label htmlFor="saveCard" className="text-sm">
                        Save this card for future purchases
                      </Label>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-orange-500 hover:bg-orange-600 py-3"
                      disabled={isProcessing}
                    >
                      {isProcessing ? 'Processing...' : `Pay ₦${finalTotal.toLocaleString()}`}
                    </Button>
                  </form>
                )}

                {/* Other payment methods */}
                {paymentMethod !== 'card' && (
                  <div className="text-center py-8">
                    <p className="text-gray-600 mb-4">
                      {paymentMethod === 'bank' ? 'Bank transfer instructions will be provided after order confirmation.' : 'Mobile wallet payment will be processed securely.'}
                    </p>
                    <Button 
                      onClick={() => handlePaymentSubmit({ preventDefault: () => {} } as React.FormEvent)}
                      className="bg-orange-500 hover:bg-orange-600 py-3 px-8"
                      disabled={isProcessing}
                    >
                      {isProcessing ? 'Processing...' : 'Complete Order'}
                    </Button>
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Order Confirmation */}
            {currentStep === 3 && (
              <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Confirmed!</h2>
                <p className="text-gray-600 mb-6">
                  Thank you for your purchase. Your order has been successfully placed and will be processed shortly.
                </p>
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <p className="text-sm text-gray-600">Order Number</p>
                  <p className="text-lg font-bold text-gray-800">#JM{Date.now().toString().slice(-8)}</p>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  You will receive an email confirmation shortly. You'll be redirected to the homepage in a few seconds.
                </p>
                <Link href="/">
                  <Button className="bg-orange-500 hover:bg-orange-600">
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          {currentStep < 3 && (
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Order Summary</h3>
                
                {/* Items */}
                <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-800 truncate">
                          {item.name}
                        </p>
                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-medium text-gray-800">
                        ₦{(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal ({itemCount} items)</span>
                    <span>₦{total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span>{shipping === 0 ? 'Free' : `₦${shipping.toLocaleString()}`}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t pt-2">
                    <span>Total</span>
                    <span className="text-orange-600">₦{finalTotal.toLocaleString()}</span>
                  </div>
                </div>

                {/* Security */}
                <div className="mt-4 pt-4 border-t">
                  <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                    <Shield className="h-4 w-4" />
                    <span>Secure SSL Encrypted Checkout</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
