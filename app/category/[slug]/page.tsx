"use client"

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Star, Heart, Filter, Grid, List } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'
import Link from 'next/link'
import Image from 'next/image'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

// Mock category data
const categoryData = {
  'phones-tablets': {
    name: 'Phones & Tablets',
    description: 'Latest smartphones, tablets, and mobile accessories',
    products: [
      {
        id: 1,
        name: "Samsung Galaxy A54 5G",
        price: 129000,
        originalPrice: 185000,
        rating: 4.5,
        reviews: 234,
        image: "/images/samsung-phone.png",
        brand: "Samsung",
        inStock: true,
        category: "Phones & Tablets"
      },
      {
        id: 11,
        name: "iPhone 14 Pro",
        price: 520000,
        originalPrice: 650000,
        rating: 4.8,
        reviews: 445,
        image: "/images/samsung-phone.png",
        brand: "Apple",
        inStock: true,
        category: "Phones & Tablets"
      },
      {
        id: 12,
        name: "iPad Air 5th Gen",
        price: 280000,
        originalPrice: 350000,
        rating: 4.7,
        reviews: 189,
        image: "/images/samsung-phone.png",
        brand: "Apple",
        inStock: true,
        category: "Phones & Tablets"
      }
    ]
  },
  'electronics': {
    name: 'Electronics',
    description: 'Computers, laptops, gaming gear, and electronic accessories',
    products: [
      {
        id: 3,
        name: "HP Pavilion Laptop",
        price: 224000,
        originalPrice: 320000,
        rating: 4.3,
        reviews: 89,
        image: "/images/hp-laptop.png",
        brand: "HP",
        inStock: true,
        category: "Electronics"
      },
      {
        id: 4,
        name: "Wireless Bluetooth Headphones",
        price: 25000,
        originalPrice: 35000,
        rating: 4.6,
        reviews: 128,
        image: "/images/headphones.png",
        brand: "Sony",
        inStock: true,
        category: "Electronics"
      },
      {
        id: 5,
        name: "Gaming Mechanical Keyboard",
        price: 18000,
        originalPrice: 25000,
        rating: 4.4,
        reviews: 89,
        image: "/images/keyboard.png",
        brand: "Razer",
        inStock: true,
        category: "Electronics"
      }
    ]
  },
  'fashion': {
    name: 'Fashion',
    description: 'Clothing, shoes, accessories for men and women',
    products: [
      {
        id: 2,
        name: "Nike Air Max 270",
        price: 31500,
        originalPrice: 45000,
        rating: 4.8,
        reviews: 156,
        image: "/images/nike-shoes.png",
        brand: "Nike",
        inStock: true,
        category: "Fashion"
      },
      {
        id: 13,
        name: "Adidas Ultraboost 22",
        price: 42000,
        originalPrice: 55000,
        rating: 4.6,
        reviews: 203,
        image: "/images/nike-shoes.png",
        brand: "Adidas",
        inStock: true,
        category: "Fashion"
      }
    ]
  }
}

export default function CategoryPage() {
  const params = useParams()
  const slug = params.slug as string
  const [sortBy, setSortBy] = useState('popularity')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [priceRange, setPriceRange] = useState([0, 1000000])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)

  const { addItem } = useCart()
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist()

  const category = categoryData[slug as keyof typeof categoryData]

  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Category not found</h1>
          <Link href="/">
            <Button className="bg-orange-500 hover:bg-orange-600">Back to Home</Button>
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  const brands = [...new Set(category.products.map(p => p.brand))]

  const filteredProducts = category.products
    .filter(product => 
      product.price >= priceRange[0] && 
      product.price <= priceRange[1] &&
      (selectedBrands.length === 0 || selectedBrands.includes(product.brand))
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low': return a.price - b.price
        case 'price-high': return b.price - a.price
        case 'rating': return b.rating - a.rating
        case 'newest': return b.id - a.id
        default: return b.reviews - a.reviews // popularity
      }
    })

  const handleAddToCart = (product: any) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      rating: product.rating,
      reviews: product.reviews,
      quantity: 1
    })
  }

  const handleWishlistToggle = (product: any) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        rating: product.rating,
        reviews: product.reviews,
        category: product.category,
        brand: product.brand,
        inStock: product.inStock
      })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-orange-600">Home</Link>
            <span>/</span>
            <span className="text-gray-800">{category.name}</span>
          </div>
        </nav>

        {/* Category Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{category.name}</h1>
          <p className="text-gray-600 mb-4">{category.description}</p>
          <p className="text-sm text-gray-500">{filteredProducts.length} products found</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-64">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-800">Filters</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  className="lg:hidden"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="h-4 w-4" />
                </Button>
              </div>

              <div className={`space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                {/* Price Range */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">Price Range</Label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={1000000}
                    step={10000}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>₦{priceRange[0].toLocaleString()}</span>
                    <span>₦{priceRange[1].toLocaleString()}</span>
                  </div>
                </div>

                {/* Brands */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">Brands</Label>
                  <div className="space-y-2">
                    {brands.map(brand => (
                      <div key={brand} className="flex items-center space-x-2">
                        <Checkbox
                          id={brand}
                          checked={selectedBrands.includes(brand)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedBrands([...selectedBrands, brand])
                            } else {
                              setSelectedBrands(selectedBrands.filter(b => b !== brand))
                            }
                          }}
                        />
                        <Label htmlFor={brand} className="text-sm cursor-pointer">
                          {brand}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Clear Filters */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setPriceRange([0, 1000000])
                    setSelectedBrands([])
                  }}
                  className="w-full"
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          </div>

          {/* Products */}
          <div className="flex-1">
            {/* Sort and View Controls */}
            <div className="flex items-center justify-between mb-6 bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-center space-x-4">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popularity">Most Popular</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="newest">Newest First</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Products Grid/List */}
            <div className={viewMode === 'grid' 
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-4'
            }>
              {filteredProducts.map((product) => (
                <div key={product.id} className={`bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow group ${
                  viewMode === 'list' ? 'flex' : ''
                }`}>
                  <Link href={`/product/${product.id}`} className={viewMode === 'list' ? 'flex-shrink-0' : ''}>
                    <div className={`relative ${viewMode === 'list' ? 'w-48 h-32' : 'h-48'}`}>
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className={`absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity ${
                          isInWishlist(product.id) ? 'bg-red-50 text-red-500' : 'bg-white/80 hover:bg-white'
                        }`}
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          handleWishlistToggle(product)
                        }}
                      >
                        <Heart className={`h-4 w-4 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                      </Button>
                    </div>
                  </Link>
                  
                  <div className="p-4 flex-1">
                    <Link href={`/product/${product.id}`}>
                      <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 hover:text-orange-600">
                        {product.name}
                      </h3>
                    </Link>
                    
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

                    <div className="flex items-center space-x-2 mb-4">
                      <span className="text-lg font-bold text-orange-600">
                        ₦{product.price.toLocaleString()}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          ₦{product.originalPrice.toLocaleString()}
                        </span>
                      )}
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

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No products found</h3>
                <p className="text-gray-600">Try adjusting your filters or search criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
