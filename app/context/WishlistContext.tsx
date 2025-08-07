"use client"

import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react'

export interface WishlistItem {
  id: number
  name: string
  price: number
  originalPrice?: number
  image: string
  rating: number
  reviews: number
  category: string
  brand: string
  inStock: boolean
}

interface WishlistState {
  items: WishlistItem[]
  itemCount: number
}

type WishlistAction =
  | { type: 'ADD_ITEM'; payload: WishlistItem }
  | { type: 'REMOVE_ITEM'; payload: number }
  | { type: 'CLEAR_WISHLIST' }
  | { type: 'LOAD_WISHLIST'; payload: WishlistItem[] }

const wishlistReducer = (state: WishlistState, action: WishlistAction): WishlistState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.id === action.payload.id)
      
      if (existingItem) {
        return state // Item already in wishlist
      }

      const newItems = [...state.items, action.payload]
      return {
        ...state,
        items: newItems,
        itemCount: newItems.length
      }
    }

    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(item => item.id !== action.payload)
      return {
        ...state,
        items: newItems,
        itemCount: newItems.length
      }
    }

    case 'CLEAR_WISHLIST':
      return {
        items: [],
        itemCount: 0
      }

    case 'LOAD_WISHLIST': {
      return {
        items: action.payload,
        itemCount: action.payload.length
      }
    }

    default:
      return state
  }
}

interface WishlistContextType extends WishlistState {
  addItem: (item: WishlistItem) => void
  removeItem: (id: number) => void
  clearWishlist: () => void
  isInWishlist: (id: number) => boolean
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(wishlistReducer, {
    items: [],
    itemCount: 0
  })

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem('jumia-wishlist')
    if (savedWishlist) {
      try {
        const wishlistItems = JSON.parse(savedWishlist)
        dispatch({ type: 'LOAD_WISHLIST', payload: wishlistItems })
      } catch (error) {
        console.error('Error loading wishlist from localStorage:', error)
      }
    }
  }, [])

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('jumia-wishlist', JSON.stringify(state.items))
  }, [state.items])

  const addItem = (item: WishlistItem) => {
    dispatch({ type: 'ADD_ITEM', payload: item })
  }

  const removeItem = (id: number) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id })
  }

  const clearWishlist = () => {
    dispatch({ type: 'CLEAR_WISHLIST' })
  }

  const isInWishlist = (id: number) => {
    return state.items.some(item => item.id === id)
  }

  return (
    <WishlistContext.Provider value={{
      ...state,
      addItem,
      removeItem,
      clearWishlist,
      isInWishlist
    }}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider')
  }
  return context
}
