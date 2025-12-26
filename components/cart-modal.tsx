"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, X, Plus, Minus, Trash2, ArrowRight } from "lucide-react";
import { useStore } from "@/context/store-context";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function CartModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { cart, removeFromCart, updateQuantity } = useStore();
  const router = useRouter();

  const subtotal = cart.reduce((acc, item) => {
    const price = parseFloat(item.price);
    const finalPrice = item.discount 
      ? price * (1 - item.discount / 100)
      : price;
    return acc + finalPrice * item.quantity;
  }, 0);

  const handleCheckout = () => {
    onClose();
    router.push("/checkout");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          />
          
          {/* Modal Sidebar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-background shadow-2xl z-50 flex flex-col"
          >
            <div className="p-6 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-[#06b6d4]" />
                <h2 className="text-xl font-bold text-foreground">Shopping Cart</h2>
                <span className="bg-secondary text-muted-foreground text-xs font-bold px-2 py-0.5 rounded-full">
                  {cart.length}
                </span>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-secondary rounded-full transition-colors text-muted-foreground hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-16 h-16 bg-secondary flex items-center justify-center rounded-full">
                    <ShoppingBag className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Your cart is empty</h3>
                    <p className="text-sm text-muted-foreground">Looks like you haven't added anything yet.</p>
                  </div>
                  <button 
                    onClick={onClose}
                    className="px-6 py-2 bg-foreground text-background font-bold rounded-lg hover:opacity-90 transition-all"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="h-24 w-24 rounded-xl border border-border overflow-hidden shrink-0">
                        <img 
                          src={item.images?.[0]?.imageUrl || "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&q=80"} 
                          alt={item.name} 
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-between py-1">
                        <div>
                          <div className="flex justify-between items-start">
                            <h4 className="font-semibold text-foreground line-clamp-1">{item.name}</h4>
                            <button 
                              onClick={() => removeFromCart(item.id)}
                              className="text-muted-foreground hover:text-red-500 transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                          <p className="text-sm text-muted-foreground">{item.category}</p>
                        </div>
                        <div className="flex justify-between items-end">
                          <div className="flex items-center border border-border rounded-lg bg-secondary">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1.5 hover:text-[#06b6d4] transition-colors"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="w-8 text-center text-xs font-bold text-foreground">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1.5 hover:text-[#06b6d4] transition-colors"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <div className="text-right">
                             <span className="font-bold text-foreground">₹{(parseFloat(item.price) * (item.discount ? (1 - item.discount / 100) : 1)).toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 border-t border-border bg-secondary/30 space-y-4">
                <div className="flex justify-between items-center text-foreground">
                  <span className="font-medium text-muted-foreground">Subtotal</span>
                  <span className="text-xl font-bold">₹{subtotal.toFixed(2)}</span>
                </div>
                <p className="text-xs text-muted-foreground">Shipping and taxes calculated at checkout.</p>
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    href="/cart"
                    onClick={onClose}
                    className="flex items-center justify-center font-bold py-3 px-4 rounded-xl border border-border text-foreground hover:bg-secondary transition-all"
                  >
                    View Cart
                  </Link>
                  <button
                    onClick={handleCheckout}
                    className="flex items-center justify-center gap-2 bg-foreground text-background font-bold py-3 px-4 rounded-xl hover:opacity-90 transition-all"
                  >
                    Checkout <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
