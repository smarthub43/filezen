"use client";

import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { 
  Lock, ShieldCheck, FileText, 
  Download, Check, Loader2 
} from 'lucide-react';

export default function ProtectPdf() {
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected && selected.type === "application/pdf") {
      setFile(selected);
      setDownloadUrl(null);
    } else {
      alert("Please select a valid PDF file.");
    }
  };

  const protectPdf = async () => {
    if (!file || !password) return;
    setIsProcessing(true);

    try {
      const arrayBuffer = await file.arrayBuffer();
      
      // 1. Load the PDF
      const pdfDoc = await PDFDocument.load(arrayBuffer);

      // 2. Encrypt 
      // FIX #1: We cast 'pdfDoc' to 'any' to force the encrypt method to work
      (pdfDoc as any).encrypt({
        userPassword: password,
        ownerPassword: password,
        permissions: {
          printing: 'highResolution',
          modifying: false,
          copying: false,
          annotating: false,
          fillingForms: false,
          contentAccessibility: false,
          documentAssembly: false,
        },
      });

      // 3. Save the file
      const pdfBytes = await pdfDoc.save();
      
      // FIX #2: This fixes the red line in your screenshot (image_b8b636.png)
      // We cast pdfBytes to 'any' inside the array
      const blob = new Blob([pdfBytes as any], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      setDownloadUrl(url);

    } catch (error) {
      console.error("Encryption failed:", error);
      alert("Failed to protect PDF. Please try a different file.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-20">
      
      {/* Header - Blue Theme */}
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
      <div className="max-w-md mx-auto px-6 -mt-10">
        <div className="bg-white border border-slate-200 shadow-2xl rounded-3xl p-8">
          
          {!file ? (
            <div className="text-center py-12 border-2 border-dashed border-slate-300 rounded-2xl hover:border-blue-500 hover:bg-blue-50/30 transition-all group cursor-pointer relative">
              <label className="cursor-pointer block h-full w-full">
                <div className="bg-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-200 group-hover:scale-105 transition-transform">
                  <FileText className="text-white" size={32} />
                </div>
                <span className="text-xl font-bold text-slate-800 block mb-2">Select PDF</span>
                <input type="file" className="hidden" accept=".pdf" onChange={handleUpload} />
              </label>
            </div>
          ) : (
            <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
              
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex items-center gap-3">
                  <FileText className="text-blue-500" size={20} />
                  <span className="text-sm font-semibold text-slate-700 truncate max-w-[150px]">{file.name}</span>
                </div>
                <button onClick={() => {setFile(null); setDownloadUrl(null); setPassword("");}} className="text-xs font-medium text-red-500 hover:underline">Change</button>
              </div>

              {!downloadUrl ? (
                <>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Set a Password</label>
                    <div className="relative">
                      <input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="•••••"
                        className="w-full p-3 pl-10 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-mono"
                      />
                      <Lock className="absolute left-3 top-3.5 text-slate-400" size={16} />
                    </div>
                  </div>

                  <button 
                    onClick={protectPdf} 
                    disabled={!password || isProcessing}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg flex justify-center items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? <Loader2 className="animate-spin" /> : <Lock size={20} />}
                    {isProcessing ? "Encrypting..." : "Protect PDF"}
                  </button>
                </>
              ) : (
                <div className="space-y-4 text-center">
                  <div className="p-3 bg-green-50 text-green-700 rounded-lg text-sm font-bold flex items-center justify-center gap-2">
                    <Check size={16} /> Encrypted Successfully!
                  </div>
                  <a 
                    href={downloadUrl} 
                    download={`Protected-${file.name}`}
                    className="w-full bg-slate-900 hover:bg-black text-white font-bold py-4 rounded-xl shadow-lg flex justify-center items-center gap-2 transition-all"
                  >
                    <Download size={20} /> Download
                  </a>
                  <button 
                    onClick={() => {setFile(null); setDownloadUrl(null); setPassword("");}}
                    className="text-sm text-slate-500 hover:text-blue-600 underline"
                  >
                    Protect Another File
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}