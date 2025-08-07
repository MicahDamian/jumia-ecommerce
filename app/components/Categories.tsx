import { Smartphone, Laptop, Shirt, Home, Car, Baby } from 'lucide-react'
import Link from 'next/link'

const categories = [
  { name: 'Phones & Tablets', icon: Smartphone, color: 'bg-blue-100 text-blue-600', slug: 'phones-tablets' },
  { name: 'Electronics', icon: Laptop, color: 'bg-purple-100 text-purple-600', slug: 'electronics' },
  { name: 'Fashion', icon: Shirt, color: 'bg-pink-100 text-pink-600', slug: 'fashion' },
  { name: 'Home & Garden', icon: Home, color: 'bg-green-100 text-green-600', slug: 'home-garden' },
  { name: 'Automotive', icon: Car, color: 'bg-red-100 text-red-600', slug: 'automotive' },
  { name: 'Baby Products', icon: Baby, color: 'bg-yellow-100 text-yellow-600', slug: 'baby-products' },
]

export default function Categories() {
  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6 text-center">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link key={category.name} href={`/category/${category.slug}`}>
              <div className="flex flex-col items-center p-6 rounded-lg border hover:shadow-lg transition-shadow cursor-pointer group">
                <div className={`p-4 rounded-full ${category.color} group-hover:scale-110 transition-transform`}>
                  <category.icon className="h-8 w-8" />
                </div>
                <h3 className="mt-4 text-sm font-medium text-center text-gray-800">
                  {category.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
