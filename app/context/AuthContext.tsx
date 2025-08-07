"use client"

import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react'

export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  address?: {
    street: string
    city: string
    state: string
    zipCode: string
  }
  joinDate: string
}

export interface Order {
  id: string
  userId: string
  items: Array<{
    id: number
    name: string
    price: number
    quantity: number
    image: string
  }>
  total: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  orderDate: string
  shippingAddress: {
    firstName: string
    lastName: string
    email: string
    phone: string
    address: string
    city: string
    state: string
    zipCode: string
  }
  paymentMethod: string
  trackingNumber?: string
}

interface AuthState {
  user: User | null
  orders: Order[]
  isLoading: boolean
}

type AuthAction =
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'ADD_ORDER'; payload: Order }
  | { type: 'SET_ORDERS'; payload: Order[] }
  | { type: 'UPDATE_USER'; payload: Partial<User> }

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload }
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload }
    case 'ADD_ORDER':
      return { ...state, orders: [action.payload, ...state.orders] }
    case 'SET_ORDERS':
      return { ...state, orders: action.payload }
    case 'UPDATE_USER':
      return { 
        ...state, 
        user: state.user ? { ...state.user, ...action.payload } : null 
      }
    default:
      return state
  }
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>
  register: (userData: Omit<User, 'id' | 'joinDate'> & { password: string }) => Promise<boolean>
  logout: () => void
  updateProfile: (userData: Partial<User>) => void
  addOrder: (order: Omit<Order, 'id' | 'userId' | 'orderDate'>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    orders: [],
    isLoading: true
  })

  // Load user and orders from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('jumia-user')
    const savedOrders = localStorage.getItem('jumia-orders')
    
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser)
        dispatch({ type: 'SET_USER', payload: user })
      } catch (error) {
        console.error('Error loading user from localStorage:', error)
      }
    }

    if (savedOrders) {
      try {
        const orders = JSON.parse(savedOrders)
        dispatch({ type: 'SET_ORDERS', payload: orders })
      } catch (error) {
        console.error('Error loading orders from localStorage:', error)
      }
    }

    dispatch({ type: 'SET_LOADING', payload: false })
  }, [])

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (state.user) {
      localStorage.setItem('jumia-user', JSON.stringify(state.user))
    } else {
      localStorage.removeItem('jumia-user')
    }
  }, [state.user])

  // Save orders to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('jumia-orders', JSON.stringify(state.orders))
  }, [state.orders])

  const login = async (email: string, password: string): Promise<boolean> => {
    dispatch({ type: 'SET_LOADING', payload: true })
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Check if user exists in localStorage (simple demo auth)
    const users = JSON.parse(localStorage.getItem('jumia-users') || '[]')
    const user = users.find((u: any) => u.email === email && u.password === password)
    
    if (user) {
      const { password: _, ...userWithoutPassword } = user
      dispatch({ type: 'SET_USER', payload: userWithoutPassword })
      dispatch({ type: 'SET_LOADING', payload: false })
      return true
    }
    
    dispatch({ type: 'SET_LOADING', payload: false })
    return false
  }

  const register = async (userData: Omit<User, 'id' | 'joinDate'> & { password: string }): Promise<boolean> => {
    dispatch({ type: 'SET_LOADING', payload: true })
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Check if user already exists
    const users = JSON.parse(localStorage.getItem('jumia-users') || '[]')
    const existingUser = users.find((u: any) => u.email === userData.email)
    
    if (existingUser) {
      dispatch({ type: 'SET_LOADING', payload: false })
      return false
    }
    
    // Create new user
    const newUser = {
      ...userData,
      id: Date.now().toString(),
      joinDate: new Date().toISOString()
    }
    
    // Save to users list
    users.push(newUser)
    localStorage.setItem('jumia-users', JSON.stringify(users))
    
    // Set as current user (without password)
    const { password: _, ...userWithoutPassword } = newUser
    dispatch({ type: 'SET_USER', payload: userWithoutPassword })
    dispatch({ type: 'SET_LOADING', payload: false })
    return true
  }

  const logout = () => {
    dispatch({ type: 'SET_USER', payload: null })
    dispatch({ type: 'SET_ORDERS', payload: [] })
  }

  const updateProfile = (userData: Partial<User>) => {
    dispatch({ type: 'UPDATE_USER', payload: userData })
  }

  const addOrder = (orderData: Omit<Order, 'id' | 'userId' | 'orderDate'>) => {
    if (!state.user) return
    
    const newOrder: Order = {
      ...orderData,
      id: `JM${Date.now()}`,
      userId: state.user.id,
      orderDate: new Date().toISOString(),
      trackingNumber: `TRK${Date.now().toString().slice(-8)}`
    }
    
    dispatch({ type: 'ADD_ORDER', payload: newOrder })
  }

  return (
    <AuthContext.Provider value={{
      ...state,
      login,
      register,
      logout,
      updateProfile,
      addOrder
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
