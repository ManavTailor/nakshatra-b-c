"use client";

import React from "react";
import { useStore } from "@/context/store-context";
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, Heart } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, addToWishlist, isInWishlist } = useStore();

  const subtotal = cart.reduce((acc, item) => {
    const price = parseFloat(item.price);
    const finalPrice = item.discount 
      ? price * (1 - item.discount / 100)
      : price;
    return acc + finalPrice * item.quantity;
  }, 0);

  const shipping = subtotal > 1999 ? 0 : 99;
  const tax = subtotal * 0.12; // 12% GST
  const total = subtotal + shipping + tax;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-background pt-32 pb-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-md mx-auto space-y-6">
            <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mx-auto">
              <ShoppingBag className="h-12 w-12 text-muted-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Your cart is empty</h1>
            <p className="text-muted-foreground">Looks like you haven't added anything to your cart yet. Explore our beautiful collection!</p>
            <Link 
              href="/products" 
              className="inline-block px-8 py-4 bg-foreground text-background font-bold rounded-xl hover:opacity-90 transition-all"
            >
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center gap-4 mb-10">
          <h1 className="text-4xl font-bold text-foreground">Shopping Cart</h1>
          <span className="bg-secondary text-muted-foreground font-bold px-3 py-1 rounded-full text-sm">
            {cart.length} Items
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Cart Items List */}
          <div className="lg:col-span-8 space-y-6">
            {cart.map((item) => {
               const price = parseFloat(item.price);
               const finalPrice = item.discount 
                 ? price * (1 - item.discount / 100)
                 : price;
               
               return (
                <motion.div 
                  layout
                  key={item.id} 
                  className="flex flex-col sm:flex-row gap-6 p-6 bg-card border border-border rounded-2xl group transition-all hover:border-foreground/10"
                >
                  <div className="w-full sm:w-32 h-32 rounded-xl overflow-hidden border border-border shrink-0">
                    <img 
                      src={item.images?.[0]?.imageUrl || "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&q=80"} 
                      alt={item.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-1">
                        <Link href={`/products/${item.id}`} className="text-xl font-bold text-foreground hover:text-[#06b6d4] transition-colors">{item.name}</Link>
                        <span className="font-bold text-xl text-foreground">₹{(finalPrice * item.quantity).toFixed(2)}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">{item.category}</p>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center border border-border rounded-lg bg-secondary">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-2 hover:text-[#06b6d4] transition-colors"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="w-12 text-center font-bold text-foreground">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-2 hover:text-[#06b6d4] transition-colors"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        <div className="text-xs text-muted-foreground">₹{finalPrice.toFixed(2)} / item</div>
                      </div>

                      <div className="flex items-center gap-4">
                        <button 
                          onClick={() => addToWishlist(item)}
                          className={cn (
                            "flex items-center gap-2 text-sm font-medium transition-colors",
                            isInWishlist(item.id) ? "text-red-500" : "text-muted-foreground hover:text-foreground"
                          )}
                        >
                          <Heart size={16} fill={isInWishlist(item.id) ? "currentColor" : "none"} />
                          <span>{isInWishlist(item.id) ? "Wishlisted" : "Save for later"}</span>
                        </button>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={16} />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
               );
            })}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-4">
            <div className="bg-card border border-border rounded-2xl p-8 sticky top-32 space-y-6">
              <h2 className="text-2xl font-bold text-foreground">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? "FREE" : `₹${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Estimated Tax (12% GST)</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
                <div className="h-px bg-border pt-4" />
                <div className="flex justify-between text-xl font-bold text-foreground">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>

              {shipping > 0 && (
                <div className="p-3 bg-secondary/50 rounded-lg text-xs text-muted-foreground">
                  Add ₹{(1999 - subtotal).toFixed(2)} more for <span className="text-green-600 font-bold">FREE SHIPPING</span>
                </div>
              )}

              <Link 
                href="/checkout"
                className="w-full bg-foreground text-background font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-lg"
              >
                Proceed to Checkout <ArrowRight size={20} />
              </Link>
              
              <p className="text-center text-xs text-muted-foreground">
                By proceeding to checkout, you agree to our <br />
                <Link href="/terms" className="underline hover:text-foreground">Terms of Service</Link> and <Link href="/privacy" className="underline hover:text-foreground">Privacy Policy</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
