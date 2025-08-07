"use client"

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const banners = [
  {
    id: 1,
    title: "Flash Sales",
    subtitle: "Up to 70% Off",
    description: "Limited time offers on electronics, fashion & more",
    image: "/placeholder.svg?height=400&width=800&text=Flash+Sales+Banner",
    cta: "Shop Now"
  },
  {
    id: 2,
    title: "New Arrivals",
    subtitle: "Latest Fashion Trends",
    description: "Discover the newest styles for men and women",
    image: "/placeholder.svg?height=400&width=800&text=Fashion+Banner",
    cta: "Explore"
  },
  {
    id: 3,
    title: "Electronics Deal",
    subtitle: "Smartphones & Gadgets",
    description: "Best prices on phones, laptops and accessories",
    image: "/placeholder.svg?height=400&width=800&text=Electronics+Banner",
    cta: "View Deals"
  }
]

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length)
  }

  return (
    <section className="relative bg-gradient-to-r from-orange-400 to-orange-600 overflow-hidden">
      <div className="container mx-auto px-4 py-8">
        <div className="relative h-96 rounded-lg overflow-hidden">
          {banners.map((banner, index) => (
            <div
              key={banner.id}
              className={`absolute inset-0 transition-opacity duration-500 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="flex items-center h-full bg-gradient-to-r from-orange-500 to-orange-700 text-white">
                <div className="flex-1 p-8">
                  <h2 className="text-4xl md:text-6xl font-bold mb-4">{banner.title}</h2>
                  <h3 className="text-2xl md:text-3xl font-semibold mb-4">{banner.subtitle}</h3>
                  <p className="text-lg mb-6 max-w-md">{banner.description}</p>
                  <Button className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold">
                    {banner.cta}
                  </Button>
                </div>
                <div className="hidden md:block flex-1">
                  <img
                    src={banner.image || "/placeholder.svg"}
                    alt={banner.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              </div>
            </div>
          ))}

          {/* Navigation arrows */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white"
            onClick={nextSlide}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          {/* Dots indicator */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {banners.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide ? 'bg-white' : 'bg-white/50'
                }`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
