import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <h1 className="text-4xl font-bold mb-12 text-center text-neutral-900 dark:text-white">Contact Us</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-8">
            Have a question about our products or need assistance with an order? We're here to help! Reach out to us through any of the following channels.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full text-purple-600 dark:text-purple-400">
                <Phone className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-medium text-lg">Phone</h3>
                <p className="text-neutral-600 dark:text-neutral-400">+91 98765 43210</p>
                <p className="text-sm text-neutral-500">Mon-Sat, 10am - 8pm</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
               <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full text-purple-600 dark:text-purple-400">
                <Mail className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-medium text-lg">Email</h3>
                <p className="text-neutral-600 dark:text-neutral-400">hello@nakshatranboutique.com</p>
                <p className="text-sm text-neutral-500">We'll respond within 24 hours</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
               <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full text-purple-600 dark:text-purple-400">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-medium text-lg">Visit Us</h3>
                <p className="text-neutral-600 dark:text-neutral-400">
                  123 Fashion Street, Silk Market,<br />
                  Mumbai, Maharashtra - 400001
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-neutral-900 p-8 rounded-2xl shadow-sm border border-neutral-200 dark:border-neutral-800">
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Name</label>
              <input type="text" id="name" className="w-full px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:ring-2 focus:ring-purple-500 outline-none" placeholder="Your Name" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Email</label>
              <input type="email" id="email" className="w-full px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:ring-2 focus:ring-purple-500 outline-none" placeholder="your@email.com" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Message</label>
              <textarea id="message" rows={4} className="w-full px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:ring-2 focus:ring-purple-500 outline-none" placeholder="How can we help you?"></textarea>
            </div>
            <button type="button" className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition-colors">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
