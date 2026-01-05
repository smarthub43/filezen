"use client";

import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { 
  Unlock, Key, Download, FileText, 
  ShieldCheck, Eye, EyeOff, Check, AlertCircle 
} from 'lucide-react';

export default function UnlockPdf() {
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      setDownloadUrl(null);
      setError(null);
    }
  };

const unlockPdf = async () => {
    if (!file || !password) {
      alert("Please upload a file and enter the password.");
      return;
    }

    setIsProcessing(true);
    setError(null);
    
    try {
      const arrayBuffer = await file.arrayBuffer();

      // FIX: Add "as any" to tell TypeScript the password option is valid
      const pdfDoc = await PDFDocument.load(arrayBuffer, { password: password } as any);

      // 2. Save it simply (This removes the encryption by default)
      const pdfBytes = await pdfDoc.save();
      
      // 3. Fix for TypeScript (Uint8Array wrapper)
      const cleanBytes = new Uint8Array(pdfBytes);

      // 4. Create Download Blob
      const blob = new Blob([cleanBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);

    } catch (err) {
      console.error("Unlock failed", err);
      setError("Incorrect password or corrupted file. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-20">
      
      {/* Header - Amber Theme for "Unlock" */}
      <div className="bg-white border-b border-slate-200 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 text-slate-900">
            Unlock <span className="text-amber-600">PDF</span>
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            Remove passwords from PDF files instantly. 100% client-side for maximum privacy.
          </p>
          
          <div className="flex justify-center items-center gap-6 text-sm font-semibold">
            <div className="flex items-center gap-2 text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-100">
              <Key size={18} /> <span>Instant Decryption</span>
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
            <div className="text-center py-12 border-2 border-dashed border-slate-300 rounded-2xl hover:border-amber-500 hover:bg-amber-50/30 transition-all group cursor-pointer relative">
              <label className="cursor-pointer block h-full w-full">
                <div className="bg-amber-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-amber-200 group-hover:scale-105 transition-transform">
                  <Unlock className="text-white" size={32} />
                </div>
                <span className="text-2xl font-bold text-slate-800 block mb-2">Select Locked PDF</span>
                <span className="text-slate-500">Upload the file you want to unlock</span>
                <input type="file" className="hidden" accept=".pdf" onChange={handleUpload} />
              </label>
            </div>
          ) : (
            <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
              
              {/* File Preview */}
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div className="flex items-center gap-3 overflow-hidden">
                   <div className="bg-slate-200 text-slate-500 p-2 rounded-lg">
                      <FileText size={24} />
                   </div>
                   <div className="text-left">
                     <p className="text-sm font-bold text-slate-700 truncate max-w-[200px]">{file.name}</p>
                     <p className="text-xs text-slate-400">{(file.size/1024/1024).toFixed(2)} MB</p>
                   </div>
                </div>
                <button onClick={() => {setFile(null); setDownloadUrl(null); setPassword(""); setError(null);}} className="text-sm text-red-500 hover:underline">
                  Change
                </button>
              </div>

              {/* Step 2: Enter Password */}
              {!downloadUrl && (
                <div className="space-y-4">
                  <label className="block text-left text-sm font-bold text-slate-700">Enter Current Password</label>
                  <div className="relative">
                    <input 
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password required to open file"
                      className="w-full p-4 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all font-mono"
                    />
                    <button 
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-4 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>

                  {error && (
                    <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg flex items-center gap-2">
                      <AlertCircle size={16} /> {error}
                    </div>
                  )}
                  
                  <button 
                    onClick={unlockPdf} 
                    disabled={isProcessing || !password}
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-4 rounded-xl shadow-lg flex justify-center items-center gap-2 text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                  >
                    {isProcessing ? <Unlock className="animate-spin" /> : "Unlock PDF Now"}
                  </button>
                </div>
              )}

              {/* Step 3: Download */}
              {downloadUrl && (
                <div className="space-y-4 pt-2">
                  <div className="p-4 bg-green-50 border border-green-100 rounded-xl text-center">
                    <p className="text-green-800 font-bold flex items-center justify-center gap-2">
                      <Check size={18} /> Password Removed!
                    </p>
                  </div>
                  <a 
                    href={downloadUrl} 
                    download={`Unlocked-${file.name}`}
                    className="w-full bg-slate-900 hover:bg-black text-white font-bold py-4 rounded-xl shadow-xl flex justify-center items-center gap-2 text-lg transition-all"
                  >
                    <Download size={24} /> Download Unlocked PDF
                  </a>
                  <button onClick={() => {setFile(null); setDownloadUrl(null); setPassword("");}} className="w-full text-slate-500 font-medium hover:underline">
                    Unlock Another File
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* SEO Section */}
      <section className="max-w-3xl mx-auto px-6 mt-20 mb-20">
        <div className="bg-amber-50 p-8 rounded-3xl border border-amber-100">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Is it safe to unlock PDF online?</h2>
          <p className="text-sm text-slate-600 leading-relaxed mb-4">
            Most online tools require you to upload your sensitive file to their server to remove the password. This is risky for bank statements or contracts.
          </p>
          <p className="text-sm text-slate-600 leading-relaxed">
            <strong>FileZen Unlock</strong> is different. We use your browser's processing power to decrypt the file locally. Your file and your password never leave your computer.
          </p>
        </div>
      </section>
    </main>
  );
}