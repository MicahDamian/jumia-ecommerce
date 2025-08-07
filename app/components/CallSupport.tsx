"use client"

import { useState } from 'react'
import { Phone, X, Clock, Users, Headphones } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function CallSupport() {
  const [isOpen, setIsOpen] = useState(false)

  const supportNumbers = [
    {
      number: '0700-600-0000',
      description: 'General Customer Support',
      hours: '24/7',
      waitTime: '2-5 minutes',
      status: 'available'
    },
    {
      number: '0809-900-5000',
      description: 'Technical Support',
      hours: 'Mon-Fri 8AM-6PM',
      waitTime: '3-7 minutes',
      status: 'available'
    },
    {
      number: '0701-234-5678',
      description: 'Order & Payment Issues',
      hours: '24/7',
      waitTime: '1-3 minutes',
      status: 'busy'
    }
  ]

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 bg-green-500 hover:bg-green-600 rounded-full w-14 h-14 shadow-lg z-50"
      >
        <Phone className="h-6 w-6" />
      </Button>
    )
  }

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <Card className="w-80 shadow-xl">
        <CardHeader className="bg-green-500 text-white p-4 rounded-t-lg">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center">
              <Phone className="h-5 w-5 mr-2" />
              Call Support
            </CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-green-600 h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <CardDescription className="text-green-100">
            Speak directly with our support team
          </CardDescription>
        </CardHeader>

        <CardContent className="p-4 space-y-4">
          {supportNumbers.map((support, index) => (
            <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-800">{support.description}</h3>
                <Badge className={
                  support.status === 'available' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }>
                  {support.status === 'available' ? 'Available' : 'Busy'}
                </Badge>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-green-500" />
                  <a 
                    href={`tel:${support.number}`}
                    className="text-lg font-bold text-green-600 hover:text-green-700"
                  >
                    {support.number}
                  </a>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>{support.hours}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-3 w-3" />
                    <span>Wait: {support.waitTime}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Headphones className="h-5 w-5 text-blue-500 mt-0.5" />
              <div>
                <h4 className="font-semibold text-blue-800 mb-1">Before you call:</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Have your order number ready</li>
                  <li>• Prepare your account details</li>
                  <li>• Note your specific issue</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-xs text-gray-500 mb-2">
              Prefer other contact methods?
            </p>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="flex-1">
                Live Chat
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                Email Us
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
