import React from 'react';
import { db } from '@/app/db';
import { products, productImages } from '@/app/db/schema';
import { count, desc } from 'drizzle-orm';
import { AddProductForm } from '@/components/admin/AddProductForm';

export default async function AdminDashboard() {
  // Fetch stats directly from the database
  const [productCount] = await db.select({ value: count() }).from(products);
  const recentProducts = await db.query.products.findMany({
    limit: 10,
    orderBy: [desc(products.createdAt)],
    with: {
      images: {
        limit: 1,
        orderBy: (images, { asc }) => [asc(images.displayOrder)],
      }
    }
  });

  return (
    <div className="container mx-auto px-4 py-8 text-white">
      <h1 className="text-3xl font-bold mb-8 text-neutral-800 dark:text-white">Admin Dashboard</h1>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white dark:bg-neutral-900 p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
          <h3 className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Total Products</h3>
          <p className="text-3xl font-bold mt-2 text-neutral-900 dark:text-white">{productCount.value}</p>
        </div>
        <div className="bg-white dark:bg-neutral-900 p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
          <h3 className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Total Orders</h3>
          <p className="text-3xl font-bold mt-2 text-neutral-900 dark:text-white">0</p>
          <span className="text-xs text-neutral-500">Coming soon</span>
        </div>
        <div className="bg-white dark:bg-neutral-900 p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
          <h3 className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Revenue</h3>
          <p className="text-3xl font-bold mt-2 text-neutral-900 dark:text-white">₹0.00</p>
          <span className="text-xs text-neutral-500">Coming soon</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Product Management */}
        <div className="lg:col-span-1">
          <AddProductForm />
        </div>

        {/* Right Column: Recent Products List */}
        <div className="lg:col-span-2">
           <div className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-sm overflow-hidden">

        <div className="p-6 border-b border-neutral-200 dark:border-neutral-800 flex justify-between items-center">
          <h2 className="text-xl font-bold text-neutral-800 dark:text-white">Recent Products</h2>
          <button className="text-sm font-medium text-purple-600 hover:text-purple-700 dark:text-purple-400">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50 dark:bg-neutral-800/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
              {recentProducts.map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 relative rounded overflow-hidden bg-neutral-100">
                        {product.images && product.images[0] ? (
                          <img className="h-full w-full object-cover" src={product.images[0].imageUrl} alt={product.name} />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center text-neutral-400">
                            No Img
                          </div>
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-neutral-900 dark:text-white">{product.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500 dark:text-neutral-400">
                    ₹{product.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                     <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                      Active
                    </span>
                  </td>
                </tr>
              ))}
              {recentProducts.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-neutral-500">
                    No products found. Add some products to see them here.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
        </div>
      </div>
    </div>
  );
}
