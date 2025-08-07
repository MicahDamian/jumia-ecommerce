export interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  rating: number
  reviews: number
  images: string[]
  description: string
  features: string[]
  specifications: { [key: string]: string }
  category: string
  brand: string
  inStock: boolean
  stockCount: number
  discount?: number
  badge?: string
}

export const products: Product[] = [
  {
    id: 1,
    name: "Samsung Galaxy A54 5G",
    price: 129000,
    originalPrice: 185000,
    rating: 4.5,
    reviews: 234,
    images: [
      "/images/samsung-phone.png",
      "/images/samsung-phone.png",
      "/images/samsung-phone.png"
    ],
    description: "Experience the power of 5G with the Samsung Galaxy A54. Featuring a stunning 6.4-inch Super AMOLED display, triple camera system, and all-day battery life.",
    features: [
      "6.4-inch Super AMOLED Display",
      "50MP Triple Camera System",
      "5000mAh Battery with Fast Charging",
      "5G Connectivity",
      "128GB Storage + 6GB RAM",
      "IP67 Water Resistance"
    ],
    specifications: {
      "Display": "6.4-inch Super AMOLED, 2340 x 1080",
      "Processor": "Exynos 1380",
      "RAM": "6GB",
      "Storage": "128GB",
      "Camera": "50MP + 12MP + 5MP",
      "Battery": "5000mAh",
      "OS": "Android 13"
    },
    category: "Phones & Tablets",
    brand: "Samsung",
    inStock: true,
    stockCount: 45,
    discount: 30
  },
  {
    id: 2,
    name: "Nike Air Max 270",
    price: 31500,
    originalPrice: 45000,
    rating: 4.8,
    reviews: 156,
    images: [
      "/images/nike-shoes.png",
      "/images/nike-shoes.png", 
      "/images/nike-shoes.png"
    ],
    description: "Step into comfort with the Nike Air Max 270. Featuring Nike's largest heel Air unit yet for incredible all-day comfort and style.",
    features: [
      "Max Air unit in heel for comfort",
      "Breathable mesh upper",
      "Rubber outsole for traction",
      "Lightweight design",
      "Available in multiple colors",
      "Iconic Nike styling"
    ],
    specifications: {
      "Upper": "Mesh and synthetic materials",
      "Midsole": "Foam with Max Air unit",
      "Outsole": "Rubber",
      "Weight": "Approximately 300g",
      "Sizes": "US 6-13",
      "Colors": "Multiple options available"
    },
    category: "Fashion",
    brand: "Nike",
    inStock: true,
    stockCount: 78,
    discount: 30
  },
  {
    id: 3,
    name: "HP Pavilion Laptop",
    price: 224000,
    originalPrice: 320000,
    rating: 4.3,
    reviews: 89,
    images: [
      "/images/hp-laptop.png",
      "/images/hp-laptop.png",
      "/images/hp-laptop.png"
    ],
    description: "Power through your day with the HP Pavilion laptop. Perfect for work, study, and entertainment with reliable performance and sleek design.",
    features: [
      "Intel Core i5 Processor",
      "8GB RAM + 512GB SSD",
      "15.6-inch Full HD Display",
      "Intel Iris Xe Graphics",
      "Windows 11 Home",
      "Long-lasting battery life"
    ],
    specifications: {
      "Processor": "Intel Core i5-1135G7",
      "RAM": "8GB DDR4",
      "Storage": "512GB SSD",
      "Display": "15.6-inch Full HD (1920x1080)",
      "Graphics": "Intel Iris Xe",
      "OS": "Windows 11 Home",
      "Battery": "Up to 8 hours"
    },
    category: "Electronics",
    brand: "HP",
    inStock: true,
    stockCount: 23,
    discount: 30
  }
]

export const getProductById = (id: number): Product | undefined => {
  return products.find(product => product.id === id)
}

export const getRelatedProducts = (productId: number, category: string): Product[] => {
  return products
    .filter(product => product.id !== productId && product.category === category)
    .slice(0, 4)
}
