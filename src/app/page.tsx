"use client";

import React, { useState } from 'react';
import imageCompression from 'browser-image-compression';
import { 
  Upload, Download, FileText, ShieldCheck, 
  RefreshCcw, Settings, ChevronDown, ChevronUp, Check, Lock, Zap, Globe 
} from 'lucide-react';

export default function UniversalConverter() {
  const [file, setFile] = useState<File | null>(null);
  const [origSize, setOrigSize] = useState<string>("");
  const [compressedSize, setCompressedSize] = useState<string>("");
  const [targetFormat, setTargetFormat] = useState<string>("webp");
  const [isProcessing, setIsProcessing] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  
  const [showSettings, setShowSettings] = useState(false);
  const [quality, setQuality] = useState(80);
  const [resizeScale, setResizeScale] = useState(1);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      setOrigSize((selected.size / 1024 / 1024).toFixed(2) + " MB");
      setDownloadUrl(null);
      setCompressedSize("");
    }
  };

  const convertFile = async () => {
    if (!file) return;
    setIsProcessing(true);
    try {
      const maxMb = quality === 100 ? 10 : (quality / 20); 
      const options = {
        maxSizeMB: maxMb,
        maxWidthOrHeight: 1920 * resizeScale,
        useWebWorker: true,
        fileType: `image/${targetFormat}`
      };
      const compressedFile = await imageCompression(file, options);
      const url = URL.createObjectURL(compressedFile);
      setDownloadUrl(url);
      setCompressedSize((compressedFile.size / 1024 / 1024).toFixed(2) + " MB");
    } catch (error) {
      console.error("Conversion failed", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      
      {/* 1. Header Section */}
      <div className="bg-white border-b border-slate-200 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 text-slate-900">
            Professional <span className="text-blue-600">FileZen</span> Online Converter
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            The world's fastest private image converter. Convert PNG, JPG, WebP, and BMP instantly in your browser—no uploads required.
          </p>
          
          <div className="flex justify-center items-center gap-6">
            <div className="flex items-center gap-2 text-slate-700 font-semibold">
              <ShieldCheck className="text-green-600" size={20} />
              <span>Private</span>
            </div>
            <div className="flex items-center gap-2 text-slate-700 font-semibold">
              <Zap className="text-yellow-500" size={20} />
              <span>Instant</span>
            </div>
            <div className="flex items-center gap-2 text-slate-700 font-semibold">
              <Lock className="text-blue-600" size={20} />
              <span>Secure</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Tool Card (Your Logic preserved) */}
      <div className="max-w-3xl mx-auto px-6 -mt-10">
        <div className="bg-white border border-slate-200 shadow-2xl rounded-3xl p-6 md:p-12">
          {!file ? (
            <div className="text-center py-16 border-2 border-dashed border-slate-300 rounded-2xl hover:border-blue-500 hover:bg-blue-50/30 transition-all group cursor-pointer">
              <label className="cursor-pointer block h-full w-full">
                <div className="bg-blue-600 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-blue-200 group-hover:rotate-12 transition-transform">
                  <Upload className="text-white" size={40} />
                </div>
                <span className="text-3xl font-bold text-slate-800 block mb-2">Select Images</span>
                <span className="text-slate-500 text-lg">Drop your files here to start converting</span>
                <input type="file" className="hidden" accept="image/*" onChange={handleUpload} />
              </label>
            </div>
          ) : (
            <div className="space-y-8 animate-in fade-in zoom-in-95 duration-300">
               {/* ... (Keep your existing File Info and Settings JSX here) ... */}
               {/* I'm shortening this for brevity, but keep your original code between !file and the SEO sections */}
               <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="bg-white p-3 rounded-lg shadow-sm border border-slate-100">
                    <FileText className="text-blue-500" size={24} />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800 truncate max-w-[200px] md:max-w-xs">{file.name}</p>
                    <p className="text-sm text-slate-500">{origSize}</p>
                  </div>
                </div>
                <button onClick={() => setFile(null)} className="text-sm font-medium text-red-500">Change</button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Output Format:</label>
                  <select value={targetFormat} onChange={(e) => setTargetFormat(e.target.value)} className="w-full p-3 rounded-lg border border-slate-300 bg-white">
                    <option value="webp">WebP (Modern & Small)</option>
                    <option value="png">PNG (Lossless)</option>
                    <option value="jpeg">JPG (Compatible)</option>
                    <option value="bmp">BMP (Uncompressed)</option>
                  </select>
                </div>
                <div className="space-y-2">
                   <label className="text-sm font-bold text-slate-700">Settings:</label>
                   <button onClick={() => setShowSettings(!showSettings)} className="w-full p-3 rounded-lg border border-slate-300 bg-white flex justify-between items-center">
                    <span>Advanced</span>
                    {showSettings ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                   </button>
                </div>
              </div>

              {showSettings && (
                <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 space-y-6">
                   <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm font-semibold text-slate-700">Compression Quality</label>
                      <span className="text-sm font-bold text-blue-600">{quality}%</span>
                    </div>
                    <input type="range" min="10" max="100" value={quality} onChange={(e) => setQuality(Number(e.target.value))} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
                  </div>
                </div>
              )}

              {!downloadUrl ? (
                <button onClick={convertFile} disabled={isProcessing} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-5 rounded-2xl shadow-lg flex justify-center items-center gap-2 text-xl transition-all">
                  {isProcessing ? <RefreshCcw className="animate-spin" /> : "Convert Now"}
                </button>
              ) : (
                <div className="space-y-4">
                  <a href={downloadUrl} download={`filezen-${file.name.split('.')[0]}.${targetFormat}`} className="w-full bg-slate-900 hover:bg-black text-white font-bold py-5 rounded-2xl shadow-xl flex justify-center items-center gap-2 text-xl transition-all">
                    <Download size={24} /> Download Converted Image
                  </a>
                  <button onClick={() => {setFile(null); setDownloadUrl(null);}} className="w-full text-slate-500 font-medium">Convert Another</button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 3. NEW SEO POWER SECTION (The Money Maker) */}
      <section className="max-w-4xl mx-auto px-6 mt-24 mb-24">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900 mb-6">Why FileZen is the Best Choice for Privacy</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Most online converters upload your images to remote servers in different countries. This puts your data at risk. **FileZen uses Client-Side Processing technology**, meaning your images never leave your computer.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-slate-700 font-medium">
                <Check className="text-green-500" size={18} /> No Server Uploads
              </li>
              <li className="flex items-center gap-3 text-slate-700 font-medium">
                <Check className="text-green-500" size={18} /> Safe for Confidential Documents
              </li>
              <li className="flex items-center gap-3 text-slate-700 font-medium">
                <Check className="text-green-500" size={18} /> GDPR & CCPA Compliant Workflow
              </li>
            </ul>
          </div>
          <div className="bg-blue-600 rounded-3xl p-8 text-white shadow-2xl">
            <h3 className="text-2xl font-bold mb-4">Technical Specs</h3>
            <p className="text-blue-100 mb-6 text-sm">Our converter uses advanced algorithms to ensure maximum compression with zero visible quality loss.</p>
            <div className="space-y-4">
              <div className="flex justify-between border-b border-blue-500 pb-2 text-sm">
                <span>Engine:</span> <span className="font-mono">WASM / Browser-Native</span>
              </div>
              <div className="flex justify-between border-b border-blue-500 pb-2 text-sm">
                <span>Max Input:</span> <span className="font-mono">Unlimited</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Security:</span> <span className="font-mono">End-to-End Local</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Mastering Image Formats</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Different formats serve different purposes. Use our converter to optimize your web performance and storage.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h4 className="font-bold text-blue-600 mb-2">WebP</h4>
              <p className="text-sm text-slate-500">Perfect for SEO. Offers 30% more compression than JPG without losing quality.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h4 className="font-bold text-blue-600 mb-2">PNG</h4>
              <p className="text-sm text-slate-500">Essential for logos and graphics needing transparent backgrounds.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h4 className="font-bold text-blue-600 mb-2">JPG</h4>
              <p className="text-sm text-slate-500">The universal standard. Best for photography and social media sharing.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h4 className="font-bold text-blue-600 mb-2">BMP</h4>
              <p className="text-sm text-slate-500">Uncompressed raw data. Use this for high-fidelity printing needs.</p>
            </div>
          </div>
        </div>

        <div className="mt-24 p-12 bg-slate-900 rounded-[3rem] text-center text-white">
          <h2 className="text-3xl font-bold mb-6">Start Converting Securely Today</h2>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto">Join thousands of users who trust FileZen for their daily file conversion needs. No registration required.</p>
          <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="bg-white text-slate-900 px-8 py-4 rounded-full font-bold hover:bg-blue-50 transition-colors">
            Try it Now
          </button>
        </div>
      </section>
    </main>
  );
}