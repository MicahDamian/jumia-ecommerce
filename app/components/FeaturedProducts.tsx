"use client";

import { Star, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "../context/CartContext";
import Link from "next/link";
import { useWishlist } from "../context/WishlistContext";

const featuredProducts = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    price: 25000,
    originalPrice: 35000,
    rating: 4.6,
    reviews: 128,
    image: "/images/headphones.png",
    badge: "Best Seller",
    category: "Electronics",
    brand: "Sony",
    inStock: true,
  },
  {
    id: 2,
    name: "Smart Watch Series 7",
    price: 85000,
    originalPrice: null,
    rating: 4.8,
    reviews: 256,
    image: "/images/smartwatch.png",
    badge: "New",
    category: "Electronics",
    brand: "Apple",
    inStock: true,
  },
  {
    id: 3,
    name: "Gaming Mechanical Keyboard",
    price: 18000,
    originalPrice: 25000,
    rating: 4.4,
    reviews: 89,
    image: "/images/keyboard.png",
    badge: null,
    category: "Electronics",
    brand: "Razer",
    inStock: true,
  },
  {
    id: 4,
    name: "4K Webcam for Streaming",
    price: 32000,
    originalPrice: null,
    rating: 4.7,
    reviews: 167,
    image: "/images/webcam.png",
    badge: "Popular",
    category: "Electronics",
    brand: "Logitech",
    inStock: true,
  },
  {
    id: 5,
    name: "Portable Power Bank 20000mAh",
    price: 12000,
    originalPrice: 18000,
    rating: 4.5,
    reviews: 203,
    image: "/images/powerbank.png",
    badge: null,
    category: "Electronics",
    brand: "Anker",
    inStock: true,
  },
  {
    id: 6,
    name: "Wireless Charging Pad",
    price: 8000,
    originalPrice: null,
    rating: 4.3,
    reviews: 94,
    image: "/images/charging-pad.png",
    badge: "Eco-Friendly",
    category: "Electronics",
    brand: "Samsung",
    inStock: true,
  },
  {
    id: 7,
    name: "Bluetooth Speaker Waterproof",
    price: 15000,
    originalPrice: 22000,
    rating: 4.6,
    reviews: 145,
    image: "/images/speaker.png",
    badge: null,
    category: "Electronics",
    brand: "JBL",
    inStock: true,
  },
  {
    id: 8,
    name: "USB-C Hub Multi-Port",
    price: 9500,
    originalPrice: null,
    rating: 4.4,
    reviews: 76,
    image: "/images/usb-hub.png",
    badge: "Trending",
    category: "Electronics",
    brand: "Anker",
    inStock: true,
  },
];

export default function FeaturedProducts() {
  const { addItem } = useCart();
  const {
    addItem: addToWishlist,
    removeItem: removeFromWishlist,
    isInWishlist,
  } = useWishlist();

  const handleAddToCart = (product: (typeof featuredProducts)[0]) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      ...(product.originalPrice !== null && {
        originalPrice: product.originalPrice,
      }),
      image: product.image,
      rating: product.rating,
      reviews: product.reviews,
    });
  };

  const handleWishlistToggle = (
    product: (typeof featuredProducts)[0],
    e: React.MouseEvent
  ) => {
    e.preventDefault();
    e.stopPropagation();

    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        ...(product.originalPrice !== null && {
          originalPrice: product.originalPrice,
        }),
        image: product.image,
        rating: product.rating,
        reviews: product.reviews,
        category: product.category,
        brand: product.brand,
        inStock: product.inStock,
      });
    }
  };

  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Featured Products
          </h2>
          <Button
            variant="outline"
            className="text-orange-600 border-orange-600 hover:bg-orange-50"
          >
            View All Products
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <Link href={`/product/${product.id}`} key={product.id}>
              <div className="bg-white rounded-lg border hover:shadow-lg transition-shadow group cursor-pointer">
                <div className="relative">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-t-lg group-hover:scale-105 transition-transform"
                  />
                  {product.badge && (
                    <div className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 rounded text-xs font-bold">
                      {product.badge}
                    </div>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity ${
                      isInWishlist(product.id)
                        ? "bg-red-50 text-red-500"
                        : "bg-white/80 hover:bg-white"
                    }`}
                    onClick={(e) => handleWishlistToggle(product, e)}
                  >
                    <Heart
                      className={`h-4 w-4 ${
                        isInWishlist(product.id) ? "fill-current" : ""
                      }`}
                    />
                  </Button>
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 h-12">
                    {product.name}
                  </h3>

                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 ml-2">
                      ({product.reviews})
                    </span>
                  </div>

                  <div className="flex items-center space-x-2 mb-4">
                    <span className="text-lg font-bold text-gray-800">
                      ₦{product.price.toLocaleString()}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        ₦{product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>

                  <Button
                    className="w-full bg-orange-500 hover:bg-orange-600 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleAddToCart(product);
                    }}
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
