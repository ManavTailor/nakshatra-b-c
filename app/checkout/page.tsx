"use client";

import React, { useState } from "react";
import { useStore } from "@/context/store-context";
import { CreditCard, Truck, ShieldCheck, ArrowLeft, CheckCircle2, ChevronRight } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

type Step = "details" | "payment" | "success";

export default function CheckoutPage() {
  const { cart, clearCart } = useStore();
  const [step, setStep] = useState<Step>("details");
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    phone: "",
  });
  const router = useRouter();

  const subtotal = cart.reduce((acc, item) => {
    const price = parseFloat(item.price);
    const finalPrice = item.discount 
      ? price * (1 - item.discount / 100)
      : price;
    return acc + finalPrice * item.quantity;
  }, 0);

  const shipping = subtotal > 1999 ? 0 : 99;
  const total = subtotal + shipping;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === "details") setStep("payment");
    else if (step === "payment") {
      setStep("success");
      clearCart();
    }
  };

  if (cart.length === 0 && step !== "success") {
    return (
      <div className="min-h-screen bg-background pt-32 pb-20 flex flex-col items-center justify-center container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
        <Link href="/products" className="px-6 py-3 bg-foreground text-background font-bold rounded-xl">
          Go to Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fcfcfc] dark:bg-background pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Checkout Section */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {step !== "success" ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="space-y-8"
                >
                  {/* Stepper */}
                  <div className="flex items-center gap-4 text-sm font-medium mb-10">
                    <span className={step === "details" ? "text-foreground" : "text-muted-foreground"}>Shipping Details</span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    <span className={step === "payment" ? "text-foreground" : "text-muted-foreground"}>Payment Method</span>
                  </div>

                  <form onSubmit={handleNextStep} className="space-y-8">
                    {step === "details" && (
                      <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-foreground">Contact Information</h2>
                        <input
                          required
                          type="email"
                          name="email"
                          placeholder="Email Address"
                          className="w-full p-4 rounded-xl border border-border bg-white focus:border-foreground outline-none transition-all"
                          value={formData.email}
                          onChange={handleInputChange}
                        />
                        
                        <h2 className="text-2xl font-bold text-foreground pt-4">Shipping Address</h2>
                        <div className="grid grid-cols-2 gap-4">
                          <input
                            required
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                            className="w-full p-4 rounded-xl border border-border bg-white focus:border-foreground outline-none transition-all"
                            value={formData.firstName}
                            onChange={handleInputChange}
                          />
                          <input
                            required
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            className="w-full p-4 rounded-xl border border-border bg-white focus:border-foreground outline-none transition-all"
                            value={formData.lastName}
                            onChange={handleInputChange}
                          />
                        </div>
                        <input
                          required
                          type="text"
                          name="address"
                          placeholder="Street Address"
                          className="w-full p-4 rounded-xl border border-border bg-white focus:border-foreground outline-none transition-all"
                          value={formData.address}
                          onChange={handleInputChange}
                        />
                        <div className="grid grid-cols-2 gap-4">
                          <input
                            required
                            type="text"
                            name="city"
                            placeholder="City"
                            className="w-full p-4 rounded-xl border border-border bg-white focus:border-foreground outline-none transition-all"
                            value={formData.city}
                            onChange={handleInputChange}
                          />
                          <input
                            required
                            type="text"
                            name="postalCode"
                            placeholder="Postal Code"
                            className="w-full p-4 rounded-xl border border-border bg-white focus:border-foreground outline-none transition-all"
                            value={formData.postalCode}
                            onChange={handleInputChange}
                          />
                        </div>
                        <input
                          required
                          type="tel"
                          name="phone"
                          placeholder="Phone Number"
                          className="w-full p-4 rounded-xl border border-border bg-white focus:border-foreground outline-none transition-all"
                          value={formData.phone}
                          onChange={handleInputChange}
                        />
                      </div>
                    )}

                    {step === "payment" && (
                      <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-foreground">Payment Method</h2>
                        <div className="space-y-4">
                           <div className="p-5 border-2 border-foreground bg-white rounded-2xl flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                <span className="p-2 bg-secondary rounded-lg"><CreditCard className="h-5 w-5" /></span>
                                <span className="font-bold">Credit / Debit Card</span>
                              </div>
                              <div className="h-5 w-5 rounded-full border-4 border-foreground" />
                           </div>
                           <div className="p-5 border border-border bg-white/50 rounded-2xl flex items-center justify-between opacity-60">
                              <div className="flex items-center gap-4">
                                <span className="p-2 bg-secondary rounded-lg"><Truck className="h-5 w-5" /></span>
                                <span className="font-bold">Cash on Delivery</span>
                              </div>
                              <div className="h-5 w-5 rounded-full border border-border" />
                           </div>
                        </div>

                        <div className="p-6 bg-secondary/50 rounded-2xl space-y-4">
                           <input placeholder="Card Number" className="w-full p-3 rounded-lg border border-border bg-white outline-none" />
                           <div className="grid grid-cols-2 gap-4">
                              <input placeholder="MM / YY" className="w-full p-3 rounded-lg border border-border bg-white outline-none" />
                              <input placeholder="CVV" className="w-full p-3 rounded-lg border border-border bg-white outline-none" />
                           </div>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-6">
                      <button 
                        type="button"
                        onClick={() => step === "payment" ? setStep("details") : router.back()}
                        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <ArrowLeft size={18} />
                        Back to {step === "details" ? "cart" : "details"}
                      </button>
                      <button 
                        type="submit"
                        className="px-10 py-4 bg-foreground text-background font-bold rounded-xl hover:opacity-90 transition-all shadow-xl"
                      >
                        {step === "details" ? "Continue to Payment" : "Finalize Order"}
                      </button>
                    </div>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white border border-border rounded-3xl p-12 text-center space-y-6 shadow-2xl"
                >
                  <div className="w-20 h-20 bg-green-100 flex items-center justify-center rounded-full mx-auto">
                    <CheckCircle2 className="h-10 w-10 text-green-600" />
                  </div>
                  <div className="space-y-2">
                    <h1 className="text-4xl font-bold text-foreground">Order Placed!</h1>
                    <p className="text-muted-foreground text-lg">Thank you for shopping with Nakshatra Boutique.</p>
                  </div>
                  <div className="bg-secondary/30 p-4 rounded-xl inline-block">
                    <span className="text-sm font-medium">Order ID: #NK-77249-BX</span>
                  </div>
                  <p className="text-sm text-muted-foreground pt-4">We've sent a confirmation email to <span className="text-foreground font-bold">{formData.email}</span> with your order details and tracking link.</p>
                  <Link 
                    href="/products" 
                    className="inline-block px-10 py-4 bg-foreground text-background font-bold rounded-xl hover:opacity-90 transition-all"
                  >
                    Keep Shopping
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Section: Order Summary */}
          {step !== "success" && (
            <div className="lg:col-span-5">
              <div className="bg-white border border-border rounded-2xl p-8 sticky top-32 shadow-sm space-y-8">
                <h3 className="text-xl font-bold flex items-center gap-2">
                   Order Summary <span className="bg-foreground text-background text-[10px] px-2 py-0.5 rounded-full">{cart.reduce((a,b) => a+b.quantity, 0)}</span>
                </h3>

                <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-4">
                       <div className="relative h-16 w-16 border border-border rounded-lg overflow-hidden shrink-0">
                          <img 
                            src={item.images?.[0]?.imageUrl} 
                            alt={item.name} 
                            className="h-full w-full object-cover"
                          />
                          <span className="absolute -top-1 -right-1 bg-foreground text-background text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full">
                            {item.quantity}
                          </span>
                       </div>
                       <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-sm text-foreground truncate">{item.name}</h4>
                          <p className="text-xs text-muted-foreground">{item.category}</p>
                       </div>
                       <div className="text-sm font-bold">
                         ₹{(parseFloat(item.price) * (item.discount ? (1 - item.discount / 100) : 1) * item.quantity).toFixed(2)}
                       </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 pt-6 border-t border-border">
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Subtotal</span>
                    <span className="text-foreground">₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Shipping</span>
                    <span className="text-foreground">{shipping === 0 ? "FREE" : `₹${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-foreground pt-4 border-t border-border mt-4">
                    <span>Total (Incl. Taxes)</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl">
                  <ShieldCheck className="h-5 w-5 text-green-600" />
                  <span className="text-xs text-green-800 font-medium">Safe & Secure checkout. Shop with complete confidence.</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
