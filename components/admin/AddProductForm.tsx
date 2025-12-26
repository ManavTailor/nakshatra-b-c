'use client';

import React, { useState } from 'react';
import { createProduct } from '@/app/actions/product-actions';
import { Loader2 } from 'lucide-react';

export function AddProductForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    setMessage(null);
    
    const result = await createProduct(formData);
    
    if (result.success) {
      setMessage({ type: 'success', text: 'Product created successfully!' });
      // Reset form via DOM if needed or just let user add another
      const form = document.querySelector('form') as HTMLFormElement;
      if(form) form.reset();
    } else {
      setMessage({ type: 'error', text: typeof result.error === 'string' ? result.error : 'Failed to create product' });
    }
    
    setIsLoading(false);
  }

  return (
    <div className="bg-white dark:bg-neutral-900 p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-sm mb-8">
      <h2 className="text-xl font-bold text-neutral-800 dark:text-white mb-6">Add New Product</h2>
      
      {message && (
        <div className={`p-4 rounded-lg mb-6 ${message.type === 'success' ? 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300' : 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300'}`}>
          {message.text}
        </div>
      )}

      <form action={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Product Name</label>
            <input required name="name" type="text" className="w-full px-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:ring-2 focus:ring-purple-500 outline-none" placeholder="e.g. Silk Saree" />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Category</label>
            <select required name="category" className="w-full px-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:ring-2 focus:ring-purple-500 outline-none">
              <option value="Short Kurti">Short Kurti</option>
              <option value="Lehengas">Lehengas</option>
              <option value="Jeans">Jeans</option>
              <option value="Suits">Suits</option>
              <option value="Kurtis">Kurtis</option>
              <option value="Top">Top</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Price (₹)</label>
            <input required name="price" type="number" step="0.01" className="w-full px-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:ring-2 focus:ring-purple-500 outline-none" placeholder="0.00" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Discount (%)</label>
            <input name="discount" type="number" min="0" max="100" className="w-full px-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:ring-2 focus:ring-purple-500 outline-none" placeholder="0" />
          </div>
        </div>

        <div className="space-y-2">
           <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Image URL</label>
           <input required name="imageUrl" type="url" className="w-full px-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:ring-2 focus:ring-purple-500 outline-none" placeholder="https://example.com/image.jpg" />
           <p className="text-xs text-neutral-500">Provide a direct link to an image (Unsplash, etc.)</p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Short Description</label>
          <input required name="shortDescription" type="text" className="w-full px-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:ring-2 focus:ring-purple-500 outline-none" placeholder="Brief summary for cards" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Detailed Description</label>
          <textarea name="detailDescription" rows={3} className="w-full px-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:ring-2 focus:ring-purple-500 outline-none" placeholder="Full product details..."></textarea>
        </div>

        <div className="flex items-center space-x-2">
          <input type="checkbox" id="isFeatured" name="isFeatured" className="h-4 w-4 text-purple-600 rounded border-neutral-300 focus:ring-purple-500" />
          <label htmlFor="isFeatured" className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Mark as Featured Product</label>
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating Product...
            </>
          ) : (
            'Create Product'
          )}
        </button>
      </form>
    </div>
  );
}
