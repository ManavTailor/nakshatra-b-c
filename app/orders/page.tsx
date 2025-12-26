import React from 'react';

export default function OrdersPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-neutral-900 dark:text-white">My Orders</h1>
      
      <div className="space-y-6">
        {/* Placeholder for no orders */}
        <div className="bg-white dark:bg-neutral-900 rounded-xl p-12 text-center border border-neutral-200 dark:border-neutral-800">
          <div className="mx-auto h-16 w-16 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center mb-4">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
             </svg>
          </div>
          <h3 className="text-lg font-medium text-neutral-900 dark:text-white">No orders yet</h3>
          <p className="text-neutral-500 mt-1 mb-6">You haven't placed any orders yet. Start shopping to fill your wardrobe with elegance.</p>
          <a href="/products" className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-medium px-6 py-2 rounded-full transition-colors">
            Start Shopping
          </a>
        </div>
      </div>
    </div>
  );
}
