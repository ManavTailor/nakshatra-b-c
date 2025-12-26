"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { FocusCards } from "./focus-card";
import Link from "next/link";

interface ProductImage {
  id: number;
  imageUrl: string;
  altText: string | null;
  displayOrder: number | null;
  isPrimary: boolean | null;
}

interface ProductCardProps {
  id: number;
  name: string;
  category: string;
  price: string;
  discount: number | null;
  shortDescription: string | null;
  images: ProductImage[];
}

export function ProductCard({
  id,
  name,
  category,
  price,
  discount,
  shortDescription,
  images,
}: ProductCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const primaryImage = images.find((img) => img.isPrimary) || images[0];
  const displayImage = images[currentImageIndex] || primaryImage;

  const finalPrice = discount
    ? (parseFloat(price) * (1 - discount / 100)).toFixed(2)
    : price;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group relative overflow-hidden rounded-2xl bg-card border border-border hover:border-[#06b6d4]/50 transition-all duration-300 shadow-sm hover:shadow-xl"
    >
   
      {/* Discount Badge */}
      {discount ? discount > 0 && (
        <div className="absolute top-4 right-4 z-10 bg-gradient-to-r from-[#06b6d4] to-[#0891b2] text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
          {discount}% OFF
        </div>
      ) : null}

      {/* Image Section */}
      <div className="relative h-80 overflow-hidden bg-secondary/50">
        <motion.img
          key={displayImage?.imageUrl}
          src={displayImage?.imageUrl || "/placeholder-product.jpg"}
          alt={displayImage?.altText || name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Subtle Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-40" />

        {/* Image Navigation Dots */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  index === currentImageIndex
                    ? "bg-[#06b6d4] w-6"
                    : "bg-white/50 hover:bg-white/80"
                )}
                aria-label={`View image ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-6 space-y-3">
        {/* Category */}
        <div className="text-[#06b6d4] text-sm font-bold uppercase tracking-wider">
          {category}
        </div>

        {/* Product Name */}
        <h3 className="text-xl font-bold text-foreground group-hover:text-[#06b6d4] transition-colors duration-300">
          {name}
        </h3>

        {/* Description */}
        {shortDescription && (
          <p className="text-muted-foreground text-sm line-clamp-2">
            {shortDescription}
          </p>
        )}

        {/* Price Section */}
        <div className="flex items-baseline gap-3 pt-2">
          <span className="text-2xl font-bold text-foreground">
            ₹{finalPrice}
          </span>
          {discount && discount > 0 && (
            <span className="text-lg text-muted-foreground line-through">
              ₹{price}
            </span>
          )}
        </div>

        {/* View Details Button */}
        <Link href={`/products/${id}`} className="block">
          <button className="w-full mt-4 px-6 py-4 bg-foreground text-background font-bold rounded-xl hover:opacity-90 transition-all active:scale-[0.98] shadow-lg">
            View Details
          </button>
        </Link>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-[#06b6d4]/10 to-transparent" />
      </div>
    </motion.div>
  );
}
