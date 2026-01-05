"use client";

import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { 
  Upload, Download, FileText, Layers, 
  Check, Trash2, Plus 
} from 'lucide-react';

export default function MergePdf() {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  // Handle selecting multiple files at once
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files;
    if (selected && selected.length > 0) {
      // Append new files to the existing list
      setFiles(prev => [...prev, ...Array.from(selected)]);
      setDownloadUrl(null); // Reset download if they add more files
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
    setDownloadUrl(null);
  };

  const mergePdfs = async () => {
    if (files.length < 2) {
      alert("Please select at least 2 PDF files to merge.");
      return;
    }
    
    setIsProcessing(true);
    try {
      // 1. Create a new empty PDF
      const mergedPdf = await PDFDocument.create();

      // 2. Loop through each uploaded file
      for (const file of files) {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        
        // 3. Copy all pages from the source PDF
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        
        // 4. Add pages to the new PDF
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      // 5. Save the merged PDF - FIX: Explicitly wrap in Uint8Array
      const pdfBytes = await mergedPdf.save();
      const mergedPdfBytes = new Uint8Array(pdfBytes);
      
      const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      setDownloadUrl(url);
    } catch (error) {
      console.error("Merge failed", error);
      alert("Failed to merge PDFs. One of the files might be corrupted or password protected.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-20">
      
      {/* Header - Purple Theme for "Merge" */}
      <div className="bg-white border-b border-slate-200 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 text-slate-900">
            Merge <span className="text-purple-600">PDF</span> Files
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            Combine multiple PDFs into one document securely. Fast, free, and private.
          </p>
          
          <div className="flex justify-center items-center gap-6 text-sm font-semibold">
            <div className="flex items-center gap-2 text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-100">
              <Layers size={18} /> <span>Batch Processing</span>
            </div>
            <div className="flex items-center gap-2 text-green-700 bg-green-50 px-3 py-1 rounded-full border border-green-100">
              <Check size={18} /> <span>100% Client-Side</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tool Card */}
      <div className="max-w-3xl mx-auto px-6 -mt-10">
        <div className="bg-white border border-slate-200 shadow-2xl rounded-3xl p-6 md:p-12">
          
          {/* Empty State */}
          {files.length === 0 && (
            <div className="text-center py-16 border-2 border-dashed border-slate-300 rounded-2xl hover:border-purple-500 hover:bg-purple-50/30 transition-all group cursor-pointer relative">
              <label className="cursor-pointer block h-full w-full">
                <div className="bg-purple-600 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-purple-200 group-hover:scale-105 transition-transform">
                  <Upload className="text-white" size={40} />
                </div>
                <span className="text-3xl font-bold text-slate-800 block mb-2">Select PDFs</span>
                <span className="text-slate-500 text-lg">Drop multiple files here to combine them</span>
                <input type="file" className="hidden" accept=".pdf" multiple onChange={handleUpload} />
              </label>
            </div>
          )}

          {/* File List State */}
          {files.length > 0 && (
            <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
              <div className="flex justify-between items-center mb-4">
                 <h3 className="font-bold text-slate-700">Files to Merge ({files.length})</h3>
                 <label className="cursor-pointer text-sm font-bold text-purple-600 hover:bg-purple-50 px-3 py-1 rounded-lg transition-colors flex items-center gap-1">
                    <Plus size={16} /> Add More
                    <input type="file" className="hidden" accept=".pdf" multiple onChange={handleUpload} />
                 </label>
              </div>

              {/* Scrollable List of Files */}
              <div className="bg-slate-50 rounded-xl border border-slate-200 max-h-[300px] overflow-y-auto">
                {files.map((file, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 border-b border-slate-100 last:border-0 bg-white">
                    <div className="flex items-center gap-3 overflow-hidden">
                       <div className="bg-red-50 text-red-500 p-2 rounded-lg">
                          <FileText size={20} />
                       </div>
                       <span className="text-sm font-medium truncate max-w-[200px]">{file.name}</span>
                       <span className="text-xs text-slate-400">({(file.size/1024/1024).toFixed(2)} MB)</span>
                    </div>
                    <button onClick={() => removeFile(idx)} className="text-slate-400 hover:text-red-500 p-2">
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              {!downloadUrl ? (
                <button 
                  onClick={mergePdfs} 
                  disabled={isProcessing || files.length < 2}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-5 rounded-2xl shadow-lg flex justify-center items-center gap-2 text-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? <Layers className="animate-spin" /> : "Merge Files Now"}
                </button>
              ) : (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 pt-4">
                  <div className="p-4 bg-green-50 border border-green-100 rounded-xl text-center">
                    <p className="text-green-800 font-bold flex items-center justify-center gap-2">
                      <Check size={18} /> Merge Successful!
                    </p>
                  </div>
                  <a 
                    href={downloadUrl} 
                    download="FileZen-Merged.pdf"
                    className="w-full bg-slate-900 hover:bg-black text-white font-bold py-5 rounded-2xl shadow-xl flex justify-center items-center gap-2 text-xl transition-all"
                  >
                    <Download size={24} /> Download Merged PDF
                  </a>
                  <button onClick={() => {setFiles([]); setDownloadUrl(null);}} className="w-full text-slate-500 font-medium hover:underline">
                    Start Over
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* SEO Section */}
      <section className="max-w-4xl mx-auto px-6 mt-20 mb-20 space-y-12">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">How to combine PDF files?</h2>
          <p className="text-slate-600 leading-relaxed">
            Our <strong>Merge PDF</strong> tool allows you to combine multiple documents into one single file directly in your browser. Unlike other tools, we don't upload your contracts or legal documents to a server. Everything stays private on your device.
          </p>
        </div>
      </section>
    </main>
  );
}