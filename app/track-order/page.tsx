"use client"

import { useState } from 'react'
import { Search, Package, Truck, CheckCircle, Clock, MapPin, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function TrackOrderPage() {
  const [trackingNumber, setTrackingNumber] = useState('')
  const [orderData, setOrderData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  // Mock tracking data
  const mockTrackingData = {
    'TRK12345678': {
      orderNumber: 'JM2024001234',
      status: 'in_transit',
      estimatedDelivery: '2024-01-25',
      trackingSteps: [
        {
          status: 'order_placed',
          title: 'Order Placed',
          description: 'Your order has been successfully placed',
          timestamp: '2024-01-20 10:30 AM',
          completed: true
        },
        {
          status: 'processing',
          title: 'Order Processing',
          description: 'Your order is being prepared for shipment',
          timestamp: '2024-01-20 2:15 PM',
          completed: true
        },
        {
          status: 'shipped',
          title: 'Order Shipped',
          description: 'Your order has been shipped from our warehouse',
          timestamp: '2024-01-21 9:00 AM',
          completed: true
        },
        {
          status: 'in_transit',
          title: 'In Transit',
          description: 'Your package is on its way to the delivery location',
          timestamp: '2024-01-22 11:45 AM',
          completed: true,
          current: true
        },
        {
          status: 'out_for_delivery',
          title: 'Out for Delivery',
          description: 'Your package is out for delivery',
          timestamp: '',
          completed: false
        },
        {
          status: 'delivered',
          title: 'Delivered',
          description: 'Your package has been delivered',
          timestamp: '',
          completed: false
        }
      ],
      items: [
        {
          name: 'Samsung Galaxy A54 5G',
          quantity: 1,
          price: 129000,
          image: '/placeholder.svg?height=80&width=80&text=Phone'
        },
        {
          name: 'Wireless Bluetooth Headphones',
          quantity: 1,
          price: 25000,
          image: '/placeholder.svg?height=80&width=80&text=Headphones'
        }
      ],
      shippingAddress: {
        name: 'John Doe',
        address: '123 Main Street, Victoria Island',
        city: 'Lagos',
        phone: '+234 801 234 5678'
      },
      carrier: 'Jumia Express',
      carrierPhone: '0700-600-0000'
    }
  }

  const handleTrackOrder = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setOrderData(null)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))

    const data = mockTrackingData[trackingNumber as keyof typeof mockTrackingData]
    
    if (data) {
      setOrderData(data)
    } else {
      setError('Tracking number not found. Please check your tracking number and try again.')
    }
    
    setIsLoading(false)
  }

  const getStatusIcon = (status: string, completed: boolean, current: boolean) => {
    if (current) return <Clock className="h-5 w-5 text-blue-500" />
    if (completed) return <CheckCircle className="h-5 w-5 text-green-500" />
    return <div className="h-5 w-5 rounded-full border-2 border-gray-300" />
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'order_placed': return 'bg-blue-100 text-blue-800'
      case 'processing': return 'bg-yellow-100 text-yellow-800'
      case 'shipped': return 'bg-purple-100 text-purple-800'
      case 'in_transit': return 'bg-orange-100 text-orange-800'
      case 'out_for_delivery': return 'bg-green-100 text-green-800'
      case 'delivered': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Track Your Order</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Enter your tracking number to get real-time updates on your order status and delivery progress.
          </p>
        </div>

        {/* Tracking Form */}
        <div className="max-w-2xl mx-auto mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Search className="h-5 w-5 mr-2 text-orange-500" />
                Track Your Package
              </CardTitle>
              <CardDescription>
                Enter your tracking number to see the current status of your order
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleTrackOrder} className="space-y-4">
                <div>
                  <Label htmlFor="tracking">Tracking Number</Label>
                  <Input
                    id="tracking"
                    type="text"
                    placeholder="Enter your tracking number (e.g., TRK12345678)"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-orange-500 hover:bg-orange-600"
                  disabled={isLoading}
                >
                  {isLoading ? 'Tracking...' : 'Track Order'}
                </Button>
              </form>

              {error && (
                <Alert className="mt-4 border-red-200 bg-red-50">
                  <AlertDescription className="text-red-800">{error}</AlertDescription>
                </Alert>
              )}

              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800 font-medium mb-2">Demo Tracking Number:</p>
                <p className="text-sm text-blue-700">Try: <code className="bg-blue-100 px-2 py-1 rounded">TRK12345678</code></p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tracking Results */}
        {orderData && (
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Order Summary */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Order #{orderData.orderNumber}</CardTitle>
                    <CardDescription>Tracking Number: {trackingNumber}</CardDescription>
                  </div>
                  <Badge className={getStatusColor(orderData.status)}>
                    {orderData.status.replace('_', ' ').toUpperCase()}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex items-center space-x-3">
                    <Truck className="h-5 w-5 text-orange-500" />
                    <div>
                      <p className="font-medium">Carrier</p>
                      <p className="text-sm text-gray-600">{orderData.carrier}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="font-medium">Estimated Delivery</p>
                      <p className="text-sm text-gray-600">{orderData.estimatedDelivery}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="font-medium">Carrier Contact</p>
                      <p className="text-sm text-gray-600">{orderData.carrierPhone}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Tracking Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle>Tracking Timeline</CardTitle>
                  <CardDescription>Follow your package journey</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {orderData.trackingSteps.map((step: any, index: number) => (
                      <div key={index} className="flex items-start space-x-4">
                        <div className="flex-shrink-0 mt-1">
                          {getStatusIcon(step.status, step.completed, step.current)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className={`font-medium ${step.current ? 'text-blue-600' : step.completed ? 'text-green-600' : 'text-gray-600'}`}>
                              {step.title}
                            </h3>
                            {step.timestamp && (
                              <span className="text-sm text-gray-500">{step.timestamp}</span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{step.description}</p>
                          {step.current && (
                            <Badge className="mt-2 bg-blue-100 text-blue-800">Current Status</Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Order Details */}
              <div className="space-y-6">
                {/* Items */}
                <Card>
                  <CardHeader>
                    <CardTitle>Order Items</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {orderData.items.map((item: any, index: number) => (
                        <div key={index} className="flex items-center space-x-4">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-800">{item.name}</h4>
                            <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">₦{item.price.toLocaleString()}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Shipping Address */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <MapPin className="h-5 w-5 mr-2 text-orange-500" />
                      Delivery Address
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="font-medium">{orderData.shippingAddress.name}</p>
                      <p className="text-gray-600">{orderData.shippingAddress.address}</p>
                      <p className="text-gray-600">{orderData.shippingAddress.city}</p>
                      <p className="text-gray-600">{orderData.shippingAddress.phone}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}

        {/* Help Section */}
        <div className="max-w-4xl mx-auto mt-16">
          <Card className="bg-orange-50 border-orange-200">
            <CardHeader>
              <CardTitle className="text-center">Need Help with Your Order?</CardTitle>
              <CardDescription className="text-center">
                Our customer support team is here to assist you
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div>
                  <Phone className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                  <h3 className="font-medium mb-1">Call Us</h3>
                  <p className="text-sm text-gray-600">0700-600-0000</p>
                </div>
                <div>
                  <Package className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                  <h3 className="font-medium mb-1">Live Chat</h3>
                  <p className="text-sm text-gray-600">Available 24/7</p>
                </div>
                <div>
                  <Search className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                  <h3 className="font-medium mb-1">Help Center</h3>
                  <p className="text-sm text-gray-600">Find answers to FAQs</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  )
}
