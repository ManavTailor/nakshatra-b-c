"use client";

import React from "react";
import { useStore } from "@/context/store-context";
import { Heart, ShoppingCart, Trash2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, addToCart } = useStore();

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-background pt-32 pb-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-md mx-auto space-y-6">
            <div className="w-24 h-4 text-red-100 mb-8 flex justify-center mx-auto">
               <Heart className="h-20 w-20 text-red-500/20" fill="currentColor" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Your wishlist is empty</h1>
            <p className="text-muted-foreground">Save your favorite items here to keep an eye on them. Explore our curated collections!</p>
            <Link 
              href="/products" 
              className="inline-block px-8 py-4 bg-foreground text-background font-bold rounded-xl hover:opacity-90 transition-all"
            >
              Discover Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center gap-4 mb-10">
          <h1 className="text-4xl font-bold text-foreground">My Wishlist</h1>
          <span className="bg-secondary text-muted-foreground font-bold px-3 py-1 rounded-full text-sm">
            {wishlist.length} Items
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {wishlist.map((product) => {
             const numericPrice = parseFloat(product.price);
             const finalPrice = product.discount 
               ? (numericPrice * (1 - product.discount / 100)).toFixed(2)
               : numericPrice.toFixed(2);
             
             return (
               <motion.div 
                 layout
                 key={product.id}
                 className="group relative bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
               >
                 <Link href={`/products/${product.id}`} className="block relative aspect-[4/5] overflow-hidden bg-secondary">
                   <img 
                     src={product.images?.[0]?.imageUrl || "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&q=80"} 
                     alt={product.name}
                     className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                   />
                   <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-white text-sm font-medium flex items-center gap-2">
                        View Product <ArrowRight size={14} />
                      </p>
                   </div>
                 </Link>
                 
                 <div className="p-5 space-y-4">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-foreground text-lg group-hover:text-[#06b6d4] transition-colors">{product.name}</h3>
                        <button 
                          onClick={() => removeFromWishlist(product.id)}
                          className="p-1.5 rounded-full hover:bg-red-50 text-muted-foreground hover:text-red-500 transition-all"
                          title="Remove from wishlist"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <p className="text-xs text-muted-foreground uppercase tracking-widest">{product.category}</p>
                    </div>

                    <div className="flex items-center gap-3">
                       <span className="text-xl font-bold text-foreground">₹{finalPrice}</span>
                       {product.discount && (
                         <span className="text-sm text-muted-foreground line-through">₹{product.price}</span>
                       )}
                    </div>

                    <button 
                      onClick={() => {
                        addToCart(product, 1);
                        removeFromWishlist(product.id);
                      }}
                      className="w-full py-3 bg-foreground text-background font-bold rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-all active:scale-[0.98]"
                    >
                      <ShoppingCart size={18} />
                      Add to Cart
                    </button>
                 </div>
               </motion.div>
             );
          })}
        </div>
      </div>
    </div>
  );
}
