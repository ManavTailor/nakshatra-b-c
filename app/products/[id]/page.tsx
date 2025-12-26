"use client";

import React, { use } from "react";
import { getProductById } from "@/app/actions/product-actions";
import { ZoomableImage } from "@/components/ui/zoomable-image";
import { ProductInfo } from "@/components/product-info";
import { PurchaseSection } from "@/components/purchase-section";
import { motion } from "framer-motion";

// Helper to handle both Promise and direct value (matching use() signature expectations)
function useProductData(id: string) {
  const [productData, setProductData] = React.useState<any>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetch() {
      const result = await getProductById(parseInt(id));
      if (result.success && result.product) {
        setProductData(result.product);
      }
      setIsLoading(false);
    }
    fetch();
  }, [id]);

  return { productData, isLoading };
}

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { productData, isLoading } = useProductData(id);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#06b6d4] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Use productData if available, otherwise show not found
  const data = productData;

  if (!data) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white p-4">
        <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
        <p className="text-neutral-400 mb-8">The product you are looking for does not exist or has been removed.</p>
        <a href="/products" className="px-6 py-3 bg-white text-black font-bold rounded-lg">
          Back to Products
        </a>
      </div>
    );
  }

  const currentImage = data.images?.[0]?.imageUrl || "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1200&q=80";

  return (
    <div className="min-h-screen bg-background pt-24 pb-20">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12"
        >
          {/* Left Column: Image Viewer */}
          <div className="lg:col-span-5 xl:col-span-4">
            <ZoomableImage 
              src={currentImage} 
              alt={data.name} 
            />
            {/* Gallery Thumbnails (Placeholder for now) */}
            <div className="grid grid-cols-4 gap-4 mt-6">
              {data.images?.map((img: any, i: number) => (
                <div key={i} className="aspect-square rounded-lg border border-white/10 overflow-hidden cursor-pointer hover:border-[#06b6d4] transition-all">
                  <img src={img.imageUrl} alt={data.name} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Middle Column: Info */}
          <div className="lg:col-span-4 xl:col-span-5 lg:pl-4 xl:pl-8">
            <ProductInfo 
              name={data.name}
              category={data.category}
              sku={data.sku}
              shortDescription={data.shortDescription}
              detailDescription={data.detailDescription}
            />
          </div>

          {/* Right Column: Actions */}
          <div className="lg:col-span-3">
            <PurchaseSection product={data} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
