import Header from './components/Header'
import Hero from './components/Hero'
import Categories from './components/Categories'
import FlashSales from './components/FlashSales'
import FeaturedProducts from './components/FeaturedProducts'
import Footer from './components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Hero />
      <Categories />
      <FlashSales />
      <FeaturedProducts />
      <Footer />
    </div>
  )
}
