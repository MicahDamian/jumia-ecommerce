import { Users, Target, Award, Globe, Truck, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function AboutPage() {
  const stats = [
    { label: 'Active Customers', value: '10M+', icon: Users },
    { label: 'Products Listed', value: '500K+', icon: Target },
    { label: 'Years of Service', value: '12+', icon: Award },
    { label: 'Countries Served', value: '11', icon: Globe }
  ]

  const values = [
    {
      title: 'Customer First',
      description: 'We put our customers at the heart of everything we do, ensuring exceptional service and satisfaction.',
      icon: Users
    },
    {
      title: 'Quality Assurance',
      description: 'We maintain strict quality standards to ensure our customers receive only authentic, high-quality products.',
      icon: Shield
    },
    {
      title: 'Fast Delivery',
      description: 'Our efficient logistics network ensures quick and reliable delivery across Nigeria.',
      icon: Truck
    },
    {
      title: 'Innovation',
      description: 'We continuously innovate to provide the best online shopping experience in Africa.',
      icon: Target
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">About Jumia Nigeria</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Nigeria's leading online marketplace, connecting millions of customers with quality products 
            and exceptional service since 2012.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center">
              <CardContent className="p-6">
                <stat.icon className="h-8 w-8 text-orange-500 mx-auto mb-3" />
                <div className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Our Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Founded in 2012, Jumia Nigeria started with a simple mission: to make quality products 
                accessible to everyone across Nigeria through the power of technology and e-commerce.
              </p>
              <p>
                What began as a small online marketplace has grown into Nigeria's largest e-commerce platform, 
                serving millions of customers with over 500,000 products from thousands of sellers.
              </p>
              <p>
                Today, we continue to innovate and expand our services, from logistics and payments to 
                digital services, always keeping our customers' needs at the forefront of everything we do.
              </p>
            </div>
          </div>
          <div className="bg-orange-100 rounded-lg p-8 flex items-center justify-center">
            <img
              src="/placeholder.svg?height=300&width=400&text=Jumia+Story"
              alt="Jumia Story"
              className="rounded-lg"
            />
          </div>
        </div>

        {/* Our Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <value.icon className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Leadership Team */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Leadership Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Massimiliano Spalazzi', role: 'CEO', image: '/placeholder.svg?height=200&width=200&text=CEO' },
              { name: 'Juliet Anammah', role: 'Chairwoman', image: '/placeholder.svg?height=200&width=200&text=Chairwoman' },
              { name: 'Omolara Adagunodo', role: 'CFO', image: '/placeholder.svg?height=200&width=200&text=CFO' }
            ].map((leader, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <img
                    src={leader.image || "/placeholder.svg"}
                    alt={leader.name}
                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{leader.name}</h3>
                  <p className="text-orange-600 font-medium">{leader.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-orange-500 text-white rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Join the Jumia Family</h2>
          <p className="text-xl mb-6">
            Discover amazing products, great deals, and exceptional service.
          </p>
          <Button className="bg-white text-orange-500 hover:bg-gray-100 px-8 py-3 text-lg">
            Start Shopping Now
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  )
}
