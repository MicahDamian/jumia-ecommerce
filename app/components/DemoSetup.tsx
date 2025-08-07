"use client"

import { useEffect } from 'react'

export default function DemoSetup() {
  useEffect(() => {
    // Create demo user if it doesn't exist
    const users = JSON.parse(localStorage.getItem('jumia-users') || '[]')
    const demoUserExists = users.find((u: any) => u.email === 'demo@jumia.com')
    
    if (!demoUserExists) {
      const demoUser = {
        id: 'demo-user-1',
        firstName: 'Demo',
        lastName: 'User',
        email: 'demo@jumia.com',
        phone: '+234 800 123 4567',
        password: 'demo123',
        joinDate: new Date().toISOString(),
        address: {
          street: '123 Demo Street',
          city: 'Lagos',
          state: 'Lagos State',
          zipCode: '100001'
        }
      }
      
      users.push(demoUser)
      localStorage.setItem('jumia-users', JSON.stringify(users))
    }
  }, [])

  return null
}
