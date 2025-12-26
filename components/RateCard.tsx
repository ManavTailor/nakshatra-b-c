// components/RateCard.tsx
import React from "react";

// Data from your uploaded image
const rates = [
  { service: "Normal Blouse", price: 300 },
  { service: "Padded Blouse", price: 500 },
  { service: "Aliacut", price: 800 },
  { service: "Madhubala", price: 800 },
  { service: "Lehenga Choli", price: 2000 },
  { service: "Gown", price: 1500 },
  { service: "Salwar Suit", price: "On Request" },
];

export function RateCard() {
  return (
    <div className="w-full max-w-md mx-auto p-1 bg-gradient-to-br from-red-800 via-yellow-500 to-red-900 rounded-xl shadow-2xl">
      <div className="bg-cream-100 bg-[#FFF8E7] rounded-lg p-8 h-full relative overflow-hidden">
        {/* Watermark/Background Pattern could go here */}
        
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-red-900 tracking-wider">NAKSHATRA</h2>
          <p className="text-sm font-semibold tracking-[0.2em] text-black">BOUTIQUE & COLLECTION</p>
        </div>

        <div className="space-y-4">
          {rates.map((item, idx) => (
            <div key={idx} className="flex justify-between items-center border-b border-red-200 pb-2">
              <span className="font-serif text-lg text-gray-800">{item.service}</span>
              <span className="font-bold text-red-900">
                 {typeof item.price === 'number' ? `₹${item.price}/-` : item.price}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center text-xs text-gray-500 italic">
          * Starting rates effective from Jan 1st. Prices vary by customization.
        </div>
      </div>
    </div>
  );
}