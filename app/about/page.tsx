import React from 'react';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8 text-neutral-900 dark:text-white text-center">About Nakshatra Boutique</h1>
      <div className="prose prose-lg dark:prose-invert mx-auto">
        <p className="text-xl text-neutral-600 dark:text-neutral-300 mb-6 text-center leading-relaxed">
          Welcome to Nakshatra Boutique, where tradition meets contemporary elegance. We are dedicated to bringing you the finest selection of Indian ethnic wear, carefully curated to celebrate the beauty of our heritage.
        </p>
        <div className="my-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="relative h-80 rounded-2xl overflow-hidden">
             <img src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80" alt="Boutique" className="object-cover w-full h-full" />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">Our Story</h2>
            <p className="text-neutral-600 dark:text-neutral-400 mb-4">
              Founded with a passion for textiles and design, Nakshatra Boutique has grown from a small home-based ambition into a beloved brand. We believe that every piece of clothing tells a story, and we want to help you tell yours.
            </p>
            <p className="text-neutral-600 dark:text-neutral-400">
              Our collection features handpicked sarees, designer blouses, and lehengas that reflect the finest craftsmanship. We work directly with weavers and artisans to ensure authenticity and quality in every thread.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
