"use client"

import { useState } from 'react'
import { AlertTriangle, Upload, Send, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function ReportProductPage() {
  const [formData, setFormData] = useState({
    productUrl: '',
    reportType: '',
    customerName: '',
    customerEmail: '',
    orderNumber: '',
    description: '',
    evidence: null as File | null
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const reportTypes = [
    {
      id: 'counterfeit',
      label: 'Counterfeit Product',
      description: 'The product received is fake or not authentic'
    },
    {
      id: 'damaged',
      label: 'Damaged Product',
      description: 'The product arrived damaged or defective'
    },
    {
      id: 'wrong_item',
      label: 'Wrong Item',
      description: 'Received a different product than ordered'
    },
    {
      id: 'missing_parts',
      label: 'Missing Parts/Accessories',
      description: 'Product is missing essential parts or accessories'
    },
    {
      id: 'quality_issue',
      label: 'Quality Issue',
      description: 'Product quality does not match description'
    },
    {
      id: 'safety_concern',
      label: 'Safety Concern',
      description: 'Product poses potential safety risks'
    },
    {
      id: 'misleading_info',
      label: 'Misleading Information',
      description: 'Product description or images are misleading'
    },
    {
      id: 'other',
      label: 'Other',
      description: 'Other issues not listed above'
    }
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setFormData({
      ...formData,
      evidence: file
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setSubmitted(true)
    setIsSubmitting(false)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Report Submitted Successfully</h1>
            <p className="text-xl text-gray-600 mb-8">
              Thank you for reporting this issue. We take product quality seriously and will investigate your report within 24-48 hours.
            </p>
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
              <h3 className="font-semibold text-green-800 mb-2">What happens next?</h3>
              <ul className="text-sm text-green-700 space-y-1 text-left">
                <li>• Our quality assurance team will review your report</li>
                <li>• We may contact you for additional information</li>
                <li>• If verified, we'll take appropriate action against the seller</li>
                <li>• You'll receive updates via email on the investigation status</li>
              </ul>
            </div>
            <div className="space-x-4">
              <Button 
                onClick={() => window.location.href = '/'}
                className="bg-orange-500 hover:bg-orange-600"
              >
                Continue Shopping
              </Button>
              <Button 
                variant="outline"
                onClick={() => {
                  setSubmitted(false)
                  setFormData({
                    productUrl: '',
                    reportType: '',
                    customerName: '',
                    customerEmail: '',
                    orderNumber: '',
                    description: '',
                    evidence: null
                  })
                }}
              >
                Report Another Product
              </Button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Report a Product</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Help us maintain quality standards by reporting products that don't meet expectations. 
            Your feedback helps protect other customers and improve our marketplace.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Report Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <AlertTriangle className="h-5 w-5 mr-2 text-orange-500" />
                    Product Report Form
                  </CardTitle>
                  <CardDescription>
                    Please provide detailed information about the issue you encountered
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Product Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-800">Product Information</h3>
                      
                      <div>
                        <Label htmlFor="productUrl">Product URL or Name *</Label>
                        <Input
                          id="productUrl"
                          name="productUrl"
                          required
                          value={formData.productUrl}
                          onChange={handleInputChange}
                          placeholder="Paste the product URL or enter product name"
                        />
                      </div>

                      <div>
                        <Label htmlFor="orderNumber">Order Number (if applicable)</Label>
                        <Input
                          id="orderNumber"
                          name="orderNumber"
                          value={formData.orderNumber}
                          onChange={handleInputChange}
                          placeholder="Enter your order number"
                        />
                      </div>
                    </div>

                    {/* Report Type */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-800">Type of Issue *</h3>
                      <RadioGroup 
                        value={formData.reportType} 
                        onValueChange={(value) => setFormData({...formData, reportType: value})}
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {reportTypes.map((type) => (
                            <div key={type.id} className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                              <RadioGroupItem value={type.id} id={type.id} className="mt-1" />
                              <div className="flex-1">
                                <Label htmlFor={type.id} className="font-medium cursor-pointer">
                                  {type.label}
                                </Label>
                                <p className="text-sm text-gray-600 mt-1">{type.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </RadioGroup>
                    </div>

                    {/* Customer Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-800">Your Information</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="customerName">Full Name *</Label>
                          <Input
                            id="customerName"
                            name="customerName"
                            required
                            value={formData.customerName}
                            onChange={handleInputChange}
                            placeholder="Enter your full name"
                          />
                        </div>
                        <div>
                          <Label htmlFor="customerEmail">Email Address *</Label>
                          <Input
                            id="customerEmail"
                            name="customerEmail"
                            type="email"
                            required
                            value={formData.customerEmail}
                            onChange={handleInputChange}
                            placeholder="Enter your email address"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <Label htmlFor="description">Detailed Description *</Label>
                      <Textarea
                        id="description"
                        name="description"
                        required
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Please provide a detailed description of the issue, including what you expected vs. what you received..."
                        rows={6}
                      />
                    </div>

                    {/* Evidence Upload */}
                    <div>
                      <Label htmlFor="evidence">Upload Evidence (Photos/Documents)</Label>
                      <div className="mt-2">
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-orange-500 transition-colors">
                          <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-600 mb-2">
                            Click to upload or drag and drop
                          </p>
                          <p className="text-xs text-gray-500">
                            PNG, JPG, PDF up to 10MB
                          </p>
                          <input
                            id="evidence"
                            name="evidence"
                            type="file"
                            accept="image/*,.pdf"
                            onChange={handleFileChange}
                            className="hidden"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            className="mt-2"
                            onClick={() => document.getElementById('evidence')?.click()}
                          >
                            Choose File
                          </Button>
                        </div>
                        {formData.evidence && (
                          <p className="text-sm text-green-600 mt-2">
                            File selected: {formData.evidence.name}
                          </p>
                        )}
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-orange-500 hover:bg-orange-600"
                      disabled={isSubmitting || !formData.reportType}
                    >
                      {isSubmitting ? (
                        <>
                          <Send className="h-4 w-4 mr-2 animate-spin" />
                          Submitting Report...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Submit Report
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Information Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Guidelines */}
              <Card>
                <CardHeader>
                  <CardTitle>Reporting Guidelines</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">📝 Be Specific</h4>
                    <p className="text-sm text-gray-600">
                      Provide detailed information about the issue to help us investigate effectively.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">📸 Include Evidence</h4>
                    <p className="text-sm text-gray-600">
                      Photos or documents help us verify your report and take appropriate action.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">⏱️ Response Time</h4>
                    <p className="text-sm text-gray-600">
                      We typically respond to reports within 24-48 hours.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">🔒 Confidentiality</h4>
                    <p className="text-sm text-gray-600">
                      Your report is confidential and will only be used for investigation purposes.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Info */}
              <Card className="bg-orange-50 border-orange-200">
                <CardHeader>
                  <CardTitle>Need Immediate Help?</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-gray-800">Customer Support</h4>
                      <p className="text-sm text-gray-600">0700-600-0000</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Email</h4>
                      <p className="text-sm text-gray-600">support@jumia.com.ng</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Live Chat</h4>
                      <p className="text-sm text-gray-600">Available 24/7</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Warning */}
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Important:</strong> False reports may result in account restrictions. 
                  Please ensure your report is accurate and truthful.
                </AlertDescription>
              </Alert>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
