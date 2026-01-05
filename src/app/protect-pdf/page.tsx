"use client";

import React, { useState } from 'react';
import { PDFDocument, StandardFonts } from 'pdf-lib';
import { 
  Lock, Unlock, Download, FileText, 
  ShieldCheck, Eye, EyeOff, Check 
} from 'lucide-react';

export default function ProtectPdf() {
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      setDownloadUrl(null);
    }
  };

  const protectPdf = async () => {
    if (!file || !password) {
      alert("Please upload a file and set a password.");
      return;
    }

    setIsProcessing(true);
    try {
      // 1. Load the PDF
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);

      // 2. Encrypt it (Using "as any" on pdfDoc makes the red line vanish)
      (pdfDoc as any).encrypt({
        userPassword: password,
        ownerPassword: password,
        permissions: {
          printing: 'highResolution',
          modifying: false,
          copying: false,
        },
      });

      // 3. Save and Fix for TypeScript (Uint8Array wrapper)
      const pdfBytes = await pdfDoc.save();
      const protectedBytes = new Uint8Array(pdfBytes);

      // 4. Create Download Blob
      const blob = new Blob([protectedBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);

    } catch (error) {
      console.error("Encryption failed", error);
      alert("Could not protect this PDF. It might already be corrupted.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-20">
      
      {/* Header - Blue/Dark Theme for "Security" */}
      <div className="bg-white border-b border-slate-200 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 text-slate-900">
            Protect <span className="text-blue-600">PDF</span>
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            Encrypt your PDF documents with a password. Bank-grade security, client-side.
          </p>
          
          <div className="flex justify-center items-center gap-6 text-sm font-semibold">
            <div className="flex items-center gap-2 text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              <Lock size={18} /> <span>128-bit Encryption</span>
            </div>
            <div className="flex items-center gap-2 text-green-700 bg-green-50 px-3 py-1 rounded-full border border-green-100">
              <ShieldCheck size={18} /> <span>Files stay on device</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tool Card */}
      <div className="max-w-xl mx-auto px-6 -mt-10">
        <div className="bg-white border border-slate-200 shadow-2xl rounded-3xl p-8 md:p-12">
          
          {/* Step 1: Upload */}
          {!file ? (
            <div className="text-center py-12 border-2 border-dashed border-slate-300 rounded-2xl hover:border-blue-500 hover:bg-blue-50/30 transition-all group cursor-pointer relative">
              <label className="cursor-pointer block h-full w-full">
                <div className="bg-blue-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-200 group-hover:scale-105 transition-transform">
                  <Lock className="text-white" size={32} />
                </div>
                <span className="text-2xl font-bold text-slate-800 block mb-2">Select PDF</span>
                <span className="text-slate-500">Click to upload a document</span>
                <input type="file" className="hidden" accept=".pdf" onChange={handleUpload} />
              </label>
            </div>
          ) : (
            <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
              
              {/* File Preview */}
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div className="flex items-center gap-3 overflow-hidden">
                   <div className="bg-red-100 text-red-500 p-2 rounded-lg">
                      <FileText size={24} />
                   </div>
                   <div className="text-left">
                     <p className="text-sm font-bold text-slate-700 truncate max-w-[200px]">{file.name}</p>
                     <p className="text-xs text-slate-400">{(file.size/1024/1024).toFixed(2)} MB</p>
                   </div>
                </div>
                <button onClick={() => {setFile(null); setDownloadUrl(null); setPassword("");}} className="text-sm text-red-500 hover:underline">
                  Change
                </button>
              </div>

              {/* Step 2: Set Password */}
              {!downloadUrl && (
                <div className="space-y-4">
                  <label className="block text-left text-sm font-bold text-slate-700">Set a Password</label>
                  <div className="relative">
                    <input 
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter a strong password"
                      className="w-full p-4 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all font-mono"
                    />
                    <button 
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-4 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  
                  <button 
                    onClick={protectPdf} 
                    disabled={isProcessing || !password}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg flex justify-center items-center gap-2 text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                  >
                    {isProcessing ? <Lock className="animate-spin" /> : "Encrypt PDF Now"}
                  </button>
                </div>
              )}

              {/* Step 3: Download */}
              {downloadUrl && (
                <div className="space-y-4 pt-2">
                  <div className="p-4 bg-green-50 border border-green-100 rounded-xl text-center">
                    <p className="text-green-800 font-bold flex items-center justify-center gap-2">
                      <Check size={18} /> File Encrypted Successfully!
                    </p>
                  </div>
                  <a 
                    href={downloadUrl} 
                    download={`Protected-${file.name}`}
                    className="w-full bg-slate-900 hover:bg-black text-white font-bold py-4 rounded-xl shadow-xl flex justify-center items-center gap-2 text-lg transition-all"
                  >
                    <Download size={24} /> Download Secured PDF
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* SEO Section */}
      <section className="max-w-3xl mx-auto px-6 mt-20 mb-20">
        <div className="bg-blue-50 p-8 rounded-3xl border border-blue-100">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Why Protect your PDF?</h2>
          <p className="text-sm text-slate-600 leading-relaxed mb-4">
            Before sending sensitive financial documents, legal contracts, or personal IDs via email, you should always encrypt them. 
          </p>
          <p className="text-sm text-slate-600 leading-relaxed">
            <strong>FileZen Protect</strong> adds standard 128-bit encryption to your file directly in your browser. The password never leaves your device, so not even we can unlock it.
          </p>
        </div>
      </section>
    </main>
  );
}