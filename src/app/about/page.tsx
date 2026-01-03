import React from 'react';
import { ShieldCheck, Zap, Globe } from 'lucide-react';

export default function AboutPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-20 bg-slate-50 text-slate-800">
      
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-slate-900">
          About FileZen
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          We are building the web's first 100% offline file converter. No clouds, no servers, no data leaks.
        </p>
      </div>

      {/* Mission Grid */}
      <div className="grid md:grid-cols-3 gap-8 mb-20">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
          <ShieldCheck className="text-green-600 mb-4" size={40} />
          <h3 className="text-xl font-bold mb-2">Privacy First</h3>
          <p className="text-slate-500">Unlike other tools, we don't copy your files to a server. Everything happens on your device.</p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
          <Zap className="text-blue-600 mb-4" size={40} />
          <h3 className="text-xl font-bold mb-2">Lightning Fast</h3>
          <p className="text-slate-500">Because there is no "uploading" or "downloading" time, conversions happen instantly.</p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
          <Globe className="text-purple-600 mb-4" size={40} />
          <h3 className="text-xl font-bold mb-2">Free Forever</h3>
          <p className="text-slate-500">We believe basic file tools should be free and accessible to everyone, everywhere.</p>
        </div>
      </div>

      {/* Story Section */}
      <div className="bg-white p-10 rounded-3xl border border-slate-200">
        <h2 className="text-2xl font-bold mb-4">Why we built this?</h2>
        <p className="leading-relaxed text-slate-600 mb-4">
          In 2026, it seems like every website wants your data. You upload a PDF to compress it, and suddenly that file is stored on a server halfway across the world.
        </p>
        <p className="leading-relaxed text-slate-600">
          We decided to change that. By using advanced <strong>WebAssembly (WASM)</strong> technology, FileZen runs professional-grade conversion software directly in your web browser. It is safer, faster, and more ethical.
        </p>
      </div>
    </main>
  );
}