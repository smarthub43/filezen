import React from 'react';
import { Coffee, Shield, Heart } from 'lucide-react';

export default function DonatePage() {
  return (
    <main className="min-h-screen bg-white font-sans flex items-center justify-center">
      
      <div className="max-w-3xl mx-auto px-6 py-12 text-center">
        
        {/* Hero Icon */}
        <div className="inline-block p-4 rounded-full bg-pink-50 mb-6 animate-in zoom-in duration-500">
          <Heart className="text-pink-600 fill-pink-600" size={48} />
        </div>

        {/* Headline */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">
          Support FileZen
        </h1>
        
        {/* Short Pitch */}
        <p className="text-lg text-slate-500 mb-10 max-w-xl mx-auto leading-relaxed">
          We are an independent team building <span className="text-slate-800 font-semibold">privacy-focused tools</span>. We don't sell your data, so we rely on people like you to keep the tools running.
        </p>

        {/* Action Box - High Visibility */}
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 md:p-10 shadow-sm relative overflow-hidden">
          
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Make a Contribution</h2>
          <p className="text-slate-500 mb-8 text-sm">
             Every donation, big or small, goes directly to development.
          </p>
          
          <a 
            href="https://buymeacoffee.com" 
            target="_blank" 
            className="inline-flex items-center gap-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-lg py-4 px-12 rounded-full transition-all transform hover:scale-105 shadow-xl hover:shadow-2xl"
          >
            <Coffee size={24} className="text-yellow-400" />
            Donate any amount
          </a>

          <div className="mt-8 flex justify-center items-center gap-6 text-xs text-slate-400 font-medium">
             <span className="flex items-center gap-1"><Shield size={12} /> Secure Payment</span>
             <span>•</span>
             <span>Buy me a coffee</span>
          </div>
        </div>
        
        {/* Footer Note */}
        <p className="mt-12 text-slate-400 text-sm">
          Can't donate today? No problem. <a href="/" className="text-blue-600 hover:underline">Go back to tools</a>.
        </p>

      </div>
    </main>
  );
}