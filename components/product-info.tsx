"use client";

import React from "react";
import { motion } from "framer-motion";

interface ProductInfoProps {
  name: string;
  category: string;
  sku: string | null;
  shortDescription: string | null;
  detailDescription: string | null;
}

export function ProductInfo({
  name,
  category,
  sku,
  shortDescription,
  detailDescription,
}: ProductInfoProps) {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-[#06b6d4] text-sm font-semibold uppercase tracking-widest mb-2">
          {category}
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-2 leading-tight">
          {name}
        </h1>
        <div className="flex items-center gap-4 text-muted-foreground text-sm">
          <span>SKU: <span className="text-foreground font-medium">{sku || "NK-NEW-001"}</span></span>
          <span className="w-1 h-1 bg-border rounded-full" />
          <span className="text-[#06b6d4]">In Stock</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="space-y-4"
      >
        {shortDescription && (
          <p className="text-lg text-muted-foreground leading-relaxed italic">
            "{shortDescription}"
          </p>
        )}
        
        <div className="h-px bg-gradient-to-r from-border to-transparent w-full" />
        
        <div className="space-y-4">
          <h3 className="text-foreground font-semibold flex items-center gap-2">
            Product Details
          </h3>
          <div className="text-muted-foreground leading-relaxed text-sm whitespace-pre-line">
            {detailDescription || "Experience the timeless elegance of Nakshatra Boutique. This premium piece is crafted with meticulous attention to detail, ensuring both comfort and style. Perfect for special occasions and everyday luxury."}
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="grid grid-cols-2 gap-4 pt-4"
      >
        <div className="p-3 rounded-xl bg-secondary/50 border border-border">
          <p className="text-xs text-muted-foreground uppercase font-bold mb-1">Material</p>
          <p className="text-foreground text-sm">Premium Silk/Cotton</p>
        </div>
        <div className="p-3 rounded-xl bg-secondary/50 border border-border">
          <p className="text-xs text-muted-foreground uppercase font-bold mb-1">Care</p>
          <p className="text-foreground text-sm">Dry Clean Recommended</p>
        </div>
      </motion.div>
    </div>
  );
}
