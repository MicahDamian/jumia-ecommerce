"use client"

import { useState, useEffect, useRef } from 'react'
import { Search, TrendingUp, Clock, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface SearchSuggestionsProps {
  onSearch?: (query: string) => void
}

export default function SearchSuggestions({ onSearch }: SearchSuggestionsProps) {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)

  const popularSearches = [
    'iPhone 14 Pro',
    'Samsung Galaxy',
    'Nike Air Max',
    'MacBook Pro',
    'AirPods',
    'PlayStation 5',
    'Smart Watch',
    'Bluetooth Headphones'
  ]

  const productSuggestions = [
    'Samsung Galaxy A54 5G',
    'iPhone 14 Pro Max',
    'Nike Air Max 270',
    'HP Pavilion Laptop',
    'Sony WH-1000XM4 Headphones',
    'Apple Watch Series 8',
    'Dell XPS 13',
    'Canon EOS R6',
    'JBL Flip 6 Speaker',
    'Anker PowerCore 20000'
  ]

  useEffect(() => {
    const saved = localStorage.getItem('jumia-recent-searches')
    if (saved) {
      setRecentSearches(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    if (query.length > 0) {
      const filtered = productSuggestions.filter(item =>
        item.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 6)
      setSuggestions(filtered)
      setShowSuggestions(true)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
    setSelectedIndex(-1)
  }, [query])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node) &&
          inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) return

    // Add to recent searches
    const updatedRecent = [searchQuery, ...recentSearches.filter(s => s !== searchQuery)].slice(0, 5)
    setRecentSearches(updatedRecent)
    localStorage.setItem('jumia-recent-searches', JSON.stringify(updatedRecent))

    setQuery('')
    setShowSuggestions(false)
    onSearch?.(searchQuery)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions) return

    const totalItems = suggestions.length + (query.length === 0 ? recentSearches.length + popularSearches.length : 0)

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex(prev => (prev + 1) % totalItems)
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex(prev => prev <= 0 ? totalItems - 1 : prev - 1)
        break
      case 'Enter':
        e.preventDefault()
        if (selectedIndex >= 0) {
          let selectedItem = ''
          if (query.length > 0) {
            selectedItem = suggestions[selectedIndex] || query
          } else {
            if (selectedIndex < recentSearches.length) {
              selectedItem = recentSearches[selectedIndex]
            } else {
              selectedItem = popularSearches[selectedIndex - recentSearches.length]
            }
          }
          handleSearch(selectedItem)
        } else {
          handleSearch(query)
        }
        break
      case 'Escape':
        setShowSuggestions(false)
        setSelectedIndex(-1)
        break
    }
  }

  const clearRecentSearches = () => {
    setRecentSearches([])
    localStorage.removeItem('jumia-recent-searches')
  }

  return (
    <div className="relative w-full max-w-2xl">
      <div className="relative">
        <Input
          ref={inputRef}
          type="text"
          placeholder="Search products, brands and categories..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowSuggestions(true)}
          className="w-full pl-4 pr-12 py-3 border-2 border-orange-500 rounded-l-md focus:outline-none focus:border-orange-600"
        />
        <Button 
          className="absolute right-0 top-0 h-full px-6 bg-orange-500 hover:bg-orange-600 rounded-l-none"
          onClick={() => handleSearch(query)}
        >
          <Search className="h-5 w-5" />
        </Button>
      </div>

      {showSuggestions && (
        <div
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-b-lg shadow-lg z-50 max-h-96 overflow-y-auto"
        >
          {query.length > 0 ? (
            // Search suggestions
            <div>
              {suggestions.length > 0 && (
                <div className="p-2">
                  <div className="text-xs font-semibold text-gray-500 px-3 py-2 flex items-center">
                    <Search className="h-3 w-3 mr-2" />
                    Products
                  </div>
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={suggestion}
                      className={`w-full text-left px-3 py-2 hover:bg-gray-50 rounded transition-colors ${
                        selectedIndex === index ? 'bg-orange-50 text-orange-600' : ''
                      }`}
                      onClick={() => handleSearch(suggestion)}
                    >
                      <div className="flex items-center">
                        <Search className="h-4 w-4 mr-3 text-gray-400" />
                        <span>{suggestion}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
              
              {query.length > 0 && (
                <div className="border-t p-2">
                  <button
                    className={`w-full text-left px-3 py-2 hover:bg-gray-50 rounded transition-colors ${
                      selectedIndex === suggestions.length ? 'bg-orange-50 text-orange-600' : ''
                    }`}
                    onClick={() => handleSearch(query)}
                  >
                    <div className="flex items-center">
                      <Search className="h-4 w-4 mr-3 text-gray-400" />
                      <span>Search for "<strong>{query}</strong>"</span>
                    </div>
                  </button>
                </div>
              )}
            </div>
          ) : (
            // Recent and popular searches
            <div>
              {recentSearches.length > 0 && (
                <div className="p-2">
                  <div className="flex items-center justify-between px-3 py-2">
                    <div className="text-xs font-semibold text-gray-500 flex items-center">
                      <Clock className="h-3 w-3 mr-2" />
                      Recent Searches
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearRecentSearches}
                      className="text-xs text-gray-500 hover:text-gray-700 h-auto p-1"
                    >
                      <X className="h-3 w-3 mr-1" />
                      Clear
                    </Button>
                  </div>
                  {recentSearches.map((search, index) => (
                    <button
                      key={search}
                      className={`w-full text-left px-3 py-2 hover:bg-gray-50 rounded transition-colors ${
                        selectedIndex === index ? 'bg-orange-50 text-orange-600' : ''
                      }`}
                      onClick={() => handleSearch(search)}
                    >
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-3 text-gray-400" />
                        <span>{search}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              <div className="p-2 border-t">
                <div className="text-xs font-semibold text-gray-500 px-3 py-2 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-2" />
                  Popular Searches
                </div>
                {popularSearches.map((search, index) => (
                  <button
                    key={search}
                    className={`w-full text-left px-3 py-2 hover:bg-gray-50 rounded transition-colors ${
                      selectedIndex === recentSearches.length + index ? 'bg-orange-50 text-orange-600' : ''
                    }`}
                    onClick={() => handleSearch(search)}
                  >
                    <div className="flex items-center">
                      <TrendingUp className="h-4 w-4 mr-3 text-gray-400" />
                      <span>{search}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
