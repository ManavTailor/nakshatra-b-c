import React from 'react';
import { db } from '@/app/db';
import { products } from '@/app/db/schema';

export default async function ProductsPage() {
  const allProducts = await db.query.products.findMany({
    with: {
      images: {
        limit: 1,
        orderBy: (images, { asc }) => [asc(images.displayOrder)],
      }
    }
  });

  console.log('allll', allProducts)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-neutral-800 dark:text-white">Our Collection</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {allProducts.map((product) => (
          <div key={product.id} className="group relative bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-md transition-shadow">
            <div className="aspect-[4/5] overflow-hidden bg-neutral-100 relative">
              {product.images && product.images[0] ? (
                <img 
                  src={product.images[0].imageUrl} 
                  alt={product.name}
                  className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-neutral-400">No Image</div>
              )}
              {product?.discount! > 0 ? (
                <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                  {product.discount}% OFF
                </div>
              ) : null}
            </div>
            <div className="p-4">
              <h3 className="text-base font-semibold text-neutral-900 dark:text-white mb-1">{product.name}</h3>
              <p className="text-sm text-neutral-500 mb-2">{product.category}</p>
              <div className="flex items-center justify-between">
                <p className="text-lg font-bold text-nautral-900 dark:text-white">₹{product.price}</p>
                <button className="text-sm font-medium text-purple-600 hover:text-purple-700">Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
