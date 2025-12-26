"use client";
import React from "react";
import { ProductCard } from "./ui/product-card";
import { motion } from "framer-motion";
import { CometCard } from "./ui/comet-card";

interface ProductImage {
  id: number;
  productId: number;
  imageUrl: string;
  altText: string | null;
  displayOrder: number | null;
  isPrimary: boolean | null;
  createdAt: Date | null;
}

interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  discount: number | null;
  shortDescription: string | null;
  detailDescription: string | null;
  isFeatured: boolean | null;
  createdAt: Date | null;
  updatedAt: Date | null;
  images: ProductImage[];
}

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-400 text-lg">No products available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {products.map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <CometCard key={product.id}>

          <ProductCard
            id={product.id}
            name={product.name}
            category={product.category}
            price={product.price}
            discount={product.discount}
            shortDescription={product.shortDescription}
            images={product.images}
          />
          </CometCard>
        </motion.div>
      ))}
    </div>
  );
}
