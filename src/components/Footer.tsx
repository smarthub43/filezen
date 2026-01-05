import React from 'react';
import Link from 'next/link';
// Added 'Unlock' to the imports for the new tool
import { ShieldCheck, Heart, FileDigit, Layers, Lock, Unlock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-5 gap-8 text-sm">
        
        {/* Column 1: Brand */}
        <div className="col-span-2 md:col-span-1 space-y-4">
          <div className="flex items-center gap-2 text-white font-bold text-xl">
            <span>FileZen</span>
          </div>
          <p className="text-slate-400 text-xs leading-relaxed">
            Secure, client-side file tools. Your files never leave your browser.
          </p>
          <div className="flex items-center gap-2 text-green-400 text-xs font-semibold bg-green-900/30 w-fit px-2 py-1 rounded">
            <ShieldCheck size={14} />
            <span>100% Private</span>
          </div>
        </div>

        {/* Column 2: Popular Conversions */}
        <div className="space-y-4">
          <h4 className="text-white font-bold uppercase tracking-wider text-xs">Popular</h4>
          <ul className="space-y-2 text-xs font-medium">
            <li><Link href="/convert/png-to-jpg" className="hover:text-white transition-colors">PNG to JPG</Link></li>
            <li><Link href="/convert/png-to-webp" className="hover:text-white transition-colors">PNG to WebP</Link></li>
            <li><Link href="/convert/jpg-to-png" className="hover:text-white transition-colors">JPG to PNG</Link></li>
            <li><Link href="/convert/jpg-to-webp" className="hover:text-white transition-colors">JPG to WebP</Link></li>
          </ul>
        </div>

        {/* Column 3: PDF TOOLS */}
        <div className="space-y-4">
          <h4 className="text-white font-bold uppercase tracking-wider text-xs">PDF Tools</h4>
          <ul className="space-y-2 text-xs font-medium">
            {/* 1. PDF Compressor (Red) */}
            <li>
              <Link href="/compress-pdf" className="text-red-400 hover:text-red-300 transition-colors flex items-center gap-2">
                <FileDigit size={12} />
                PDF Compressor
              </Link>
            </li>
            
            {/* 2. Merge PDF (Purple) */}
            <li>
              <Link href="/merge-pdf" className="text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-2">
                <Layers size={12} />
                Merge PDF
              </Link>
            </li>

            {/* 3. Protect PDF (Blue) */}
            <li>
              <Link href="/protect-pdf" className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-2">
                <Lock size={12} />
                Protect PDF
              </Link>
            </li>

            {/* 4. Unlock PDF (Amber - NEW) */}
            <li>
              <Link href="/unlock-pdf" className="text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-2">
                <Unlock size={12} />
                Unlock PDF
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 4: Resources */}
        <div className="space-y-4">
          <h4 className="text-white font-bold uppercase tracking-wider text-xs">Resources</h4>
          <ul className="space-y-2 text-xs">
            <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
          </ul>
        </div>

        {/* Column 5: Support */}
        <div className="space-y-4">
          <h4 className="text-white font-bold uppercase tracking-wider text-xs">Support</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <Link href="/donate" className="hover:text-white transition-colors flex items-center gap-2">
                Donate <Heart size={10} className="text-pink-500 fill-pink-500" />
              </Link>
            </li>
            <li><Link href="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
        <p>&copy; 2026 FileZen Tools. All rights reserved.</p>
      </div>
    </footer>
  );
}