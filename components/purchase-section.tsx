"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Minus, Plus, ShoppingCart, Heart, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useStore, Product } from "@/context/store-context";
import { useRouter } from "next/navigation";

interface PurchaseSectionProps {
  product: Product;
}

export function PurchaseSection({ product }: PurchaseSectionProps) {
  const { price, discount } = product;
  const [quantity, setQuantity] = useState(1);
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useStore();
  const router = useRouter();

  const numericPrice = parseFloat(price);
  const finalPrice = discount 
    ? (numericPrice * (1 - discount / 100)).toFixed(2)
    : numericPrice.toFixed(2);

  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    router.push("/checkout");
  };

  const toggleWishlist = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="bg-card backdrop-blur-md border border-border rounded-2xl p-6 sticky top-24 space-y-8">
      {/* Pricing */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <span className="text-4xl font-bold text-foreground">₹{finalPrice}</span>
          {discount && discount > 0 && (
            <span className="bg-[#06b6d4]/10 text-[#06b6d4] text-xs font-bold px-2 py-1 rounded-full">
              {discount}% OFF
            </span>
          )}
        </div>
        {discount && discount > 0 && (
          <div className="text-muted-foreground line-through text-lg">
            MRP ₹{price}
          </div>
        )}
        <p className="text-muted-foreground text-xs">Inclusive of all taxes</p>
      </div>

      {/* Quantity */}
      <div className="space-y-4">
        <label className="text-foreground font-medium text-sm">Quantity</label>
        <div className="flex items-center gap-4">
          <div className="flex items-center border border-border rounded-lg bg-secondary">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-3 hover:text-[#06b6d4] transition-colors"
            >
              <Minus size={16} />
            </button>
            <span className="w-10 text-center font-bold text-foreground">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="p-3 hover:text-[#06b6d4] transition-colors"
            >
              <Plus size={16} />
            </button>
          </div>
          <button 
            onClick={toggleWishlist}
            className={cn(
              "p-3 rounded-lg border border-border transition-all",
              isWishlisted ? "bg-red-50 border-red-200 text-red-500" : "hover:border-[#06b6d4]/50 hover:bg-[#06b6d4]/5 text-muted-foreground"
            )}
          >
            <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} />
          </button>
          <button className="p-3 rounded-lg border border-border hover:border-foreground/20 transition-all text-muted-foreground">
            <Share2 size={20} />
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleAddToCart}
          className="w-full bg-gradient-to-r from-[#06b6d4] to-[#0891b2] text-white font-bold py-4 rounded-xl shadow-lg shadow-[#06b6d4]/20 hover:shadow-[#06b6d4]/40 transition-all flex items-center justify-center gap-2"
        >
          <ShoppingCart size={20} />
          Add to Cart
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleBuyNow}
          className="w-full bg-foreground text-background font-bold py-4 rounded-xl hover:opacity-90 transition-all"
        >
          Buy It Now
        </motion.button>
      </div>

      {/* Trust Badges */}
      <div className="grid grid-cols-1 gap-3 pt-4 border-t border-border">
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
          Free shipping on orders above ₹1999
        </div>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
          7-day easy return & exchange
        </div>
      </div>
    </div>
  );
}

