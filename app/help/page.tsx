"use client"

import { useState } from 'react'
import { Search, ChevronDown, ChevronRight, MessageCircle, Phone, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function HelpCenterPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { id: 'all', name: 'All Topics', icon: '📚' },
    { id: 'orders', name: 'Orders & Payment', icon: '🛒' },
    { id: 'shipping', name: 'Shipping & Delivery', icon: '🚚' },
    { id: 'returns', name: 'Returns & Refunds', icon: '↩️' },
    { id: 'account', name: 'Account & Profile', icon: '👤' },
    { id: 'technical', name: 'Technical Issues', icon: '⚙️' },
    { id: 'sellers', name: 'Selling on Jumia', icon: '🏪' }
  ]

  const faqs = [
    {
      id: 1,
      category: 'orders',
      question: 'How do I place an order?',
      answer: 'To place an order: 1) Browse products and add items to your cart, 2) Click on the cart icon and review your items, 3) Click "Proceed to Checkout", 4) Enter your shipping information, 5) Choose your payment method and complete the purchase.'
    },
    {
      id: 2,
      category: 'orders',
      question: 'What payment methods do you accept?',
      answer: 'We accept various payment methods including: Credit/Debit cards (Visa, Mastercard), Bank transfers, Mobile wallets (Paystack, Flutterwave), and Cash on delivery (where available).'
    },
    {
      id: 3,
      category: 'shipping',
      question: 'How long does delivery take?',
      answer: 'Delivery times vary by location: Lagos & Abuja: 1-3 business days, Other major cities: 2-5 business days, Remote areas: 3-7 business days. Express delivery options are available for faster shipping.'
    },
    {
      id: 4,
      category: 'shipping',
      question: 'How can I track my order?',
      answer: 'You can track your order by: 1) Logging into your account and going to "My Orders", 2) Using the tracking number sent to your email, 3) Calling our customer service with your order number.'
    },
    {
      id: 5,
      category: 'returns',
      question: 'What is your return policy?',
      answer: 'We offer a 7-day return policy for most items. Items must be in original condition with tags attached. To initiate a return, go to "My Orders" and click "Return Item" or contact customer service.'
    },
    {
      id: 6,
      category: 'returns',
      question: 'How do I get a refund?',
      answer: 'Refunds are processed within 5-10 business days after we receive your returned item. The refund will be credited to your original payment method or Jumia wallet, depending on your preference.'
    },
    {
      id: 7,
      category: 'account',
      question: 'How do I create an account?',
      answer: 'Click "Sign Up" at the top of any page, enter your email, phone number, and create a password. You can also sign up using your Google or Facebook account for faster registration.'
    },
    {
      id: 8,
      category: 'account',
      question: 'I forgot my password. What should I do?',
      answer: 'Click "Forgot Password" on the login page, enter your email address, and we\'ll send you a password reset link. Follow the instructions in the email to create a new password.'
    },
    {
      id: 9,
      category: 'technical',
      question: 'The website is not loading properly. What should I do?',
      answer: 'Try these steps: 1) Clear your browser cache and cookies, 2) Try a different browser, 3) Check your internet connection, 4) Disable browser extensions temporarily. If the issue persists, contact our technical support.'
    },
    {
      id: 10,
      category: 'sellers',
      question: 'How can I become a seller on Jumia?',
      answer: 'To become a seller: 1) Visit our Seller Center, 2) Click "Start Selling", 3) Complete the registration form, 4) Provide required business documents, 5) Wait for approval (usually 2-5 business days).'
    }
  ]

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Help Center</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Find answers to frequently asked questions and get the help you need.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search for help articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 py-3 text-lg"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Categories Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Browse by Category</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-1">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors flex items-center space-x-3 ${
                        selectedCategory === category.id ? 'bg-orange-50 border-r-2 border-orange-500 text-orange-600' : 'text-gray-700'
                      }`}
                    >
                      <span className="text-lg">{category.icon}</span>
                      <span className="font-medium">{category.name}</span>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Contact Support */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Still Need Help?</CardTitle>
                <CardDescription>
                  Contact our support team for personalized assistance
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-orange-500 hover:bg-orange-600">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Live Chat
                </Button>
                <Button variant="outline" className="w-full">
                  <Phone className="h-4 w-4 mr-2" />
                  Call Support
                </Button>
                <Button variant="outline" className="w-full">
                  <Mail className="h-4 w-4 mr-2" />
                  Email Us
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* FAQ Content */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {selectedCategory === 'all' ? 'Frequently Asked Questions' : 
                 categories.find(cat => cat.id === selectedCategory)?.name}
              </h2>
              <p className="text-gray-600">
                {filteredFAQs.length} article{filteredFAQs.length !== 1 ? 's' : ''} found
              </p>
            </div>

            {filteredFAQs.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">No articles found</h3>
                  <p className="text-gray-600">Try adjusting your search terms or browse different categories.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {filteredFAQs.map((faq) => (
                  <Card key={faq.id}>
                    <Collapsible>
                      <CollapsibleTrigger className="w-full">
                        <CardHeader className="hover:bg-gray-50 transition-colors">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-left text-lg">{faq.question}</CardTitle>
                            <ChevronDown className="h-5 w-5 text-gray-400" />
                          </div>
                        </CardHeader>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <CardContent className="pt-0">
                          <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                        </CardContent>
                      </CollapsibleContent>
                    </Collapsible>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Popular Articles */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Popular Help Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'How to Track Your Order',
                description: 'Learn different ways to track your order status and delivery progress.',
                icon: '📦'
              },
              {
                title: 'Return & Refund Process',
                description: 'Step-by-step guide on how to return items and get refunds.',
                icon: '↩️'
              },
              {
                title: 'Payment Methods Guide',
                description: 'Complete guide to all available payment options and how to use them.',
                icon: '💳'
              }
            ].map((article, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="text-3xl mb-2">{article.icon}</div>
                  <CardTitle className="text-xl">{article.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {article.description}
                  </CardDescription>
                  <div className="mt-4 flex items-center text-orange-600 font-medium">
                    Read More <ChevronRight className="h-4 w-4 ml-1" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
