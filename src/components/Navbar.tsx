"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Heart, Zap, Coffee } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Left: Brand Name */}
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-slate-900 p-2 rounded-lg text-white">
              <Zap size={24} fill="white" />
            </div>
            <span className="text-2xl font-bold text-slate-900 tracking-tight">
              File<span className="text-blue-600">Zen</span>
            </span>
          </Link>

          {/* Right: Support Message + Button */}
          <div className="flex items-center gap-3">
            
            {/* The Appeal Text (Hidden on mobile) */}
            <span className="hidden md:block text-xs font-medium text-slate-500 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200">
              Help us keep these tools online
            </span>

            {/* Donate Us Button */}
            <Link 
              href="/donate" 
              className="flex items-center gap-2 text-white bg-slate-900 hover:bg-slate-800 px-5 py-2.5 rounded-full font-bold text-sm transition-all shadow-md hover:shadow-lg hover:scale-105 active:scale-95"
            >
              <Heart size={16} className="text-pink-500 fill-pink-500" />
              <span>Donate Us</span>
            </Link>

            {/* Mobile Menu Toggle */}
            <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-slate-600 ml-2">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 p-4 absolute w-full shadow-xl">
          <Link href="/" className="block py-3 text-slate-600 font-medium border-b border-slate-50">
            Home
          </Link>
          <Link href="/about" className="block py-3 text-slate-600 font-medium border-b border-slate-50">
            About Us
          </Link>
          <Link href="/donate" className="block py-3 text-pink-600 font-bold flex items-center gap-2">
            <Heart size={16} fill="currentColor" />
            Donate Us
          </Link>
        </div>
      )}
    </nav>
  );
}