import { Truck, Clock, MapPin, Package, Shield, DollarSign } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function ShippingPage() {
  const shippingOptions = [
    {
      name: 'Standard Delivery',
      price: 'Free on orders ₦15,000+',
      time: '3-7 business days',
      description: 'Our most popular shipping option with reliable delivery times.',
      icon: Truck
    },
    {
      name: 'Express Delivery',
      price: '₦2,000 - ₦5,000',
      time: '1-3 business days',
      description: 'Faster delivery for urgent orders in major cities.',
      icon: Clock
    },
    {
      name: 'Same Day Delivery',
      price: '₦3,000 - ₦8,000',
      time: 'Within 24 hours',
      description: 'Available in Lagos and Abuja for orders placed before 2 PM.',
      icon: Package
    }
  ]

  const deliveryZones = [
    {
      zone: 'Zone 1 - Lagos & Abuja',
      cities: ['Lagos', 'Abuja'],
      standardTime: '1-3 days',
      expressTime: 'Same day - 1 day',
      cost: 'Free on ₦15,000+'
    },
    {
      zone: 'Zone 2 - Major Cities',
      cities: ['Port Harcourt', 'Kano', 'Ibadan', 'Kaduna', 'Jos', 'Enugu'],
      standardTime: '2-5 days',
      expressTime: '1-3 days',
      cost: 'Free on ₦15,000+'
    },
    {
      zone: 'Zone 3 - Other Cities',
      cities: ['Benin', 'Ilorin', 'Owerri', 'Calabar', 'Uyo', 'Warri'],
      standardTime: '3-7 days',
      expressTime: '2-5 days',
      cost: 'Free on ₦20,000+'
    },
    {
      zone: 'Zone 4 - Remote Areas',
      cities: ['Other locations'],
      standardTime: '5-10 days',
      expressTime: '3-7 days',
      cost: 'Free on ₦25,000+'
    }
  ]

  const shippingPolicies = [
    {
      title: 'Order Processing',
      description: 'Orders are processed within 1-2 business days. Orders placed on weekends or holidays will be processed the next business day.',
      icon: Clock
    },
    {
      title: 'Delivery Confirmation',
      description: 'You will receive SMS and email notifications when your order is shipped and when it\'s out for delivery.',
      icon: Package
    },
    {
      title: 'Safe Delivery',
      description: 'Our delivery partners ensure safe handling of your packages. Items are delivered to your specified address.',
      icon: Shield
    },
    {
      title: 'Delivery Fees',
      description: 'Shipping is free on qualifying orders. Additional fees may apply for express or same-day delivery.',
      icon: DollarSign
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Shipping Information</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Learn about our delivery options, shipping zones, and policies to help you choose 
            the best shipping method for your orders.
          </p>
        </div>

        {/* Shipping Options */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Delivery Options</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {shippingOptions.map((option, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <option.icon className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                  <CardTitle className="text-xl">{option.name}</CardTitle>
                  <div className="space-y-2">
                    <Badge className="bg-orange-500">{option.price}</Badge>
                    <Badge variant="outline">{option.time}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-gray-600">
                    {option.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Delivery Zones */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Delivery Zones & Timeline</h2>
          <div className="space-y-4">
            {deliveryZones.map((zone, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">{zone.zone}</CardTitle>
                    <Badge className="bg-green-100 text-green-800">{zone.cost}</Badge>
                  </div>
                  <CardDescription>
                    <strong>Cities:</strong> {zone.cities.join(', ')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3">
                      <Truck className="h-5 w-5 text-orange-500" />
                      <div>
                        <p className="font-medium">Standard Delivery</p>
                        <p className="text-sm text-gray-600">{zone.standardTime}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock className="h-5 w-5 text-blue-500" />
                      <div>
                        <p className="font-medium">Express Delivery</p>
                        <p className="text-sm text-gray-600">{zone.expressTime}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Shipping Policies */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Shipping Policies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {shippingPolicies.map((policy, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <policy.icon className="h-8 w-8 text-orange-500" />
                    <CardTitle className="text-xl">{policy.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {policy.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Important Notes */}
        <Card className="bg-orange-50 border-orange-200">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Important Shipping Notes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">📦 Package Handling</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• All packages are carefully packed and sealed</li>
                  <li>• Fragile items receive extra protection</li>
                  <li>• Multiple items may be shipped separately</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">📱 Delivery Updates</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• SMS notifications for shipping updates</li>
                  <li>• Email confirmations with tracking info</li>
                  <li>• Real-time tracking through your account</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">🏠 Delivery Requirements</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Someone must be present to receive packages</li>
                  <li>• Valid ID may be required for verification</li>
                  <li>• Accurate address details are essential</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">⏰ Delivery Hours</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Monday - Friday: 8:00 AM - 6:00 PM</li>
                  <li>• Saturday: 9:00 AM - 4:00 PM</li>
                  <li>• Sunday: Limited delivery in major cities</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  )
}
