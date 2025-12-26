import React from 'react';

export default function ProfilePage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-neutral-900 dark:text-white">My Profile</h1>
      <div className="bg-white dark:bg-neutral-900 rounded-xl p-8 border border-neutral-200 dark:border-neutral-800">
        <div className="flex items-center space-x-6 mb-8">
          <div className="h-24 w-24 rounded-full bg-purple-100 flex items-center justify-center text-3xl font-bold text-purple-600">
            NB
          </div>
          <div>
            <h2 className="text-2xl font-semibold">User Name</h2>
            <p className="text-neutral-500">user@example.com</p>
            <p className="text-sm text-green-600 mt-1 font-medium">Verified Customer</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
             <div className="space-y-4">
               <div>
                 <label className="block text-sm text-neutral-500">Full Name</label>
                 <p className="font-medium">User Name</p>
               </div>
               <div>
                 <label className="block text-sm text-neutral-500">Phone</label>
                 <p className="font-medium">+91 00000 00000</p>
               </div>
               <div>
                  <button className="text-sm text-purple-600 hover:underline">Edit Information</button>
               </div>
             </div>
          </div>
          <div>
             <h3 className="text-lg font-semibold mb-4">Default Address</h3>
             <div className="bg-neutral-50 dark:bg-neutral-800/50 p-4 rounded-lg">
               <p className="font-medium">Home</p>
               <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                 123, Street Name, Area Locality,<br/>
                 City, State - 123456
               </p>
               <button className="text-sm text-purple-600 hover:underline mt-2">Change Address</button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
