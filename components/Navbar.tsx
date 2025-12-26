"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, User, ChevronDown, ShoppingCart, Heart } from "lucide-react";
import {
  Navbar as ResizableNavbar,
  NavBody,
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
} from "@/components/ui/resizable-navbar";
import { MenuItem, ProductItem } from "@/components/ui/navbar-menu";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useStore } from "@/context/store-context";
import { CartModal } from "@/components/cart-modal";

const navItems = [
  { name: "Home", link: "/" },
  { name: "Products", link: "/products" },
  { name: "About Us", link: "/about" },
  { name: "Contact", link: "/contact" },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [active, setActive] = useState<string | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const { cart, wishlist } = useStore();

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleMobileItemClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <ResizableNavbar className="top-1">
        {/* Desktop Navbar */}
        <NavBody className="bg-background/80 backdrop-blur-md border border-border">
          {/* Logo */}
          <Link
            href="/"
            className="relative z-20 flex items-center space-x-2 px-2 py-1"
          >
            <Image
              src="/images/logo.jpg"
              alt="Nakshatra Boutique Logo"
              width={40}
              height={40}
              className="rounded-full object-cover ring-2 ring-border"
            />
            <span className="font-semibold text-lg text-foreground">
              Nakshatra B&C
            </span>
          </Link>

          {/* Center - Navigation Items */}
          <div 
            className="absolute inset-x-0 hidden flex-1 flex-row items-center justify-center space-x-1 lg:flex"
            onMouseLeave={() => setActive(null)}
          >
             <Link href="/" className="text-sm px-4 py-2 rounded-full font-medium text-muted-foreground transition-all hover:bg-secondary hover:text-foreground">Home</Link>
             
             <MenuItem className="px-4 py-2 rounded-full text-muted-foreground hover:bg-secondary hover:text-foreground transition-all" setActive={setActive} active={active} item="Products">
                <div className="grid grid-cols-2 gap-10 p-4 text-sm bg-background border border-border rounded-xl w-[600px] shadow-2xl">
                  <ProductItem
                    title="Sarees"
                    href="/products?category=Sarees"
                    src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=140&q=80"
                    description="Elegant traditional sarees for every occasion."
                  />
                  <ProductItem
                    title="Kurtis"
                    href="/products?category=Kurtis"
                    src="https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=140&q=80"
                    description="Trendy and comfortable kurtis."
                  />
                  <ProductItem
                    title="Suits"
                    href="/products?category=Suits"
                    src="https://images.unsplash.com/photo-1605296867304-46d5465a13f6?w=140&q=80"
                    description="Classic salwar suits and sets."
                  />
                  <ProductItem
                    title="Lehengas"
                    href="/products?category=Lehengas"
                    src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=140&q=80"
                    description="Beautiful lehengas for weddings and parties."
                  />
                </div>
             </MenuItem>
             
             <Link href="/about" className="text-sm px-4 py-2 rounded-full font-medium text-muted-foreground transition-all hover:bg-secondary hover:text-foreground">About Us</Link>
             <Link href="/contact" className="text-sm px-4 py-2 rounded-full font-medium text-muted-foreground transition-all hover:bg-secondary hover:text-foreground">Contact</Link>
          </div>

          {/* Right - Profile & Cart */}
          <div className="relative z-20 ml-auto flex items-center gap-x-3">
              {/* Enhanced Search Bar */}
              <div className="relative flex items-center">
                {searchQuery && (
                  <div 
                    className="fixed inset-0 z-[1] bg-black/5 backdrop-blur-sm transition-all duration-300"
                    onClick={() => setSearchQuery("")}
                  />
                )}

                <div className="group relative z-[20] flex items-center p-2">
                  <Search className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors z-10 cursor-pointer" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={async (e) => {
                      const query = e.target.value;
                      setSearchQuery(query);
                      if (query.length > 1) {
                        const { searchProducts } = await import('@/app/actions/product-actions');
                        const results = await searchProducts(query);
                        setSearchResults(results);
                      } else {
                        setSearchResults([]);
                      }
                    }}
                    className={cn(
                      "absolute right-0 h-10 w-10 cursor-pointer rounded-full border border-transparent bg-transparent pl-10 pr-4 text-sm text-foreground placeholder-transparent transition-all duration-300 focus:w-80 focus:cursor-text focus:border-border focus:bg-background focus:shadow-xl focus:placeholder-muted-foreground group-hover:w-80 group-hover:cursor-text group-hover:border-border group-hover:bg-background group-hover:shadow-xl group-hover:placeholder-muted-foreground",
                      searchQuery && "w-80 cursor-text border-border bg-background shadow-xl placeholder-muted-foreground"
                    )}
                  />
                  
                  {/* Search Results Dropdown */}
                  {searchQuery && (searchResults.length > 0 || searchQuery.length > 1) && (
                     <div className="absolute top-full right-0 mt-4 w-96 overflow-hidden rounded-2xl border border-border bg-background shadow-2xl ring-1 ring-black/5">
                       {searchResults.length > 0 ? (
                         <div className="py-2">
                           <h3 className="px-4 py-2 text-xs font-semibold uppercase text-muted-foreground tracking-wider">Products</h3>
                           {searchResults.map((product) => (
                             <Link 
                               key={product.id} 
                               href={`/products/${product.id}`}
                               className="flex items-start gap-4 px-4 py-3 transition-colors hover:bg-secondary"
                             >
                               <div className="h-12 w-12 shrink-0 overflow-hidden rounded-md bg-secondary border border-border">
                                 {product.images && product.images[0] ? (
                                   <img src={product.images[0].imageUrl} alt={product.name} className="h-full w-full object-cover" />
                                 ) : (
                                   <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">No Img</div>
                                 )}
                               </div>
                               <div className="flex-1 overflow-hidden">
                                 <h4 className="truncate font-medium text-foreground">{product.name}</h4>
                                 <p className="truncate text-xs text-muted-foreground">{product.shortDescription}</p>
                               </div>
                             </Link>
                           ))}
                         </div>
                       ) : (
                         <div className="p-8 text-center">
                           <Search className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                           <p className="text-sm text-muted-foreground">No products found for "<span className="text-foreground">{searchQuery}</span>"</p>
                         </div>
                       )}
                     </div>
                  )}
                </div>
              </div>

            {/* Wishlist Icon */}
            <Link 
              href="/wishlist" 
              className="p-2.5 rounded-full hover:bg-secondary text-muted-foreground hover:text-foreground transition-all relative"
            >
              <Heart className={cn("h-5 w-5", wishlist.length > 0 && "text-red-500")} fill={wishlist.length > 0 ? "currentColor" : "none" } />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full border border-background">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart Icon */}
            <button 
              onClick={() => setCartOpen(true)}
              className="p-2.5 rounded-full hover:bg-secondary text-muted-foreground hover:text-foreground transition-all relative"
            >
              <ShoppingCart className="h-5 w-5" />
              {cart.length > 0 && (
                <span className="absolute top-1 right-1 bg-[#06b6d4] text-white text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full border border-background">
                  {cart.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center space-x-2 rounded-full border border-border bg-secondary/50 px-4 py-2 text-sm font-medium text-foreground transition-all hover:bg-secondary"
            >
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Profile</span>
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform text-muted-foreground",
                  profileDropdownOpen && "rotate-180 text-foreground"
                )}
              />
            </button>

            {/* Profile Dropdown Menu */}
            {profileDropdownOpen && (
              <div className="absolute right-0 top-full mt-6 w-56 rounded-xl border border-border bg-background shadow-2xl ring-1 ring-black/5 overflow-hidden">
                <div className="py-1">
                  <Link
                    href="/profile"
                    className="block px-4 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                    onClick={() => setProfileDropdownOpen(false)}
                  >
                    My Profile
                  </Link>
                  <Link
                    href="/orders"
                    className="block px-4 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                    onClick={() => setProfileDropdownOpen(false)}
                  >
                    My Orders
                  </Link>
                  <div className="my-1 border-t border-border"></div>
                  <Link
                    href="/admin"
                    className="block px-4 py-2.5 text-sm font-semibold text-purple-600 transition-colors hover:bg-purple-50"
                    onClick={() => setProfileDropdownOpen(false)}
                  >
                    Admin Dashboard
                  </Link>
                  <div className="my-1 border-t border-border"></div>
                  <button
                    className="block w-full px-4 py-2.5 text-left text-sm text-red-600 transition-colors hover:bg-red-50"
                    onClick={() => {
                      setProfileDropdownOpen(false);
                    }}
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </NavBody>

        {/* Mobile Navbar */}
        <MobileNav className="bg-background/95 backdrop-blur-md border-b border-border">
          <MobileNavHeader>
            <Link
              href="/"
              className="relative z-20 flex items-center space-x-2 px-2 py-1"
            >
              <Image
                src="/images/logo.jpg"
                alt="Nakshatra Boutique Logo"
                width={32}
                height={32}
                className="rounded-full object-cover ring-1 ring-border"
              />
              <span className="font-semibold text-foreground">
                Nakshatra
              </span>
            </Link>

            <div className="flex items-center gap-2">
               {/* Mobile Cart Icon */}
              <button 
                onClick={() => setCartOpen(true)}
                className="p-2 text-muted-foreground relative"
              >
                <ShoppingCart className="h-5 w-5" />
                {cart.length > 0 && (
                  <span className="absolute top-0 right-0 bg-[#06b6d4] text-white text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full">
                    {cart.length}
                  </span>
                )}
              </button>
              <MobileNavToggle
                isOpen={mobileMenuOpen}
                onClick={handleMobileMenuToggle}
              />
            </div>
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={mobileMenuOpen}
            onClose={() => setMobileMenuOpen(false)}
            className="bg-background border-b border-border"
          >
            {/* Mobile Search */}
            <div className="relative w-full mb-4">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-border bg-secondary/50 py-2.5 pl-10 pr-4 text-sm text-foreground focus:border-foreground/20 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 gap-1">
              {navItems.map((item, idx) => (
                <Link
                  key={idx}
                  href={item.link}
                  onClick={handleMobileItemClick}
                  className="block w-full rounded-lg px-3 py-2 text-base font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/wishlist"
                onClick={handleMobileItemClick}
                className="block w-full rounded-lg px-3 py-2 text-base font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                Wishlist ({wishlist.length})
              </Link>
            </div>

            <div className="my-4 w-full border-t border-border"></div>

            <div className="space-y-1">
              <Link
                href="/profile"
                onClick={handleMobileItemClick}
                className="block w-full rounded-lg px-3 py-2 text-base font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                My Profile
              </Link>
              <Link
                href="/orders"
                onClick={handleMobileItemClick}
                className="block w-full rounded-lg px-3 py-2 text-base font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                My Orders
              </Link>
              <Link
                href="/admin"
                onClick={handleMobileItemClick}
                className="block w-full rounded-lg px-3 py-2 text-base font-semibold text-purple-600 transition-colors hover:bg-purple-50"
              >
                Admin Dashboard
              </Link>
              <button
                onClick={handleMobileItemClick}
                className="block w-full rounded-lg px-3 py-2 text-left text-base font-medium text-red-600 transition-colors hover:bg-red-50"
              >
                Logout
              </button>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </ResizableNavbar>

      <CartModal isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
