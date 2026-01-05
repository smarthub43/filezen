"use client";

import React, { useState } from 'react';
import Script from 'next/script';
import { PDFDocument } from 'pdf-lib';
import { 
  Upload, Download, FileText, ShieldCheck, 
  Check, Zap, Loader2 
} from 'lucide-react';

export default function PdfCompressor() {
  const [file, setFile] = useState<File | null>(null);
  const [origSize, setOrigSize] = useState<string>("");
  const [compressedSize, setCompressedSize] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [isLibraryLoaded, setIsLibraryLoaded] = useState(false);
  
  // Compression Settings
  const COMPRESSION_QUALITY = 0.6; 
  const SCALE = 1.5; 

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected && selected.type === "application/pdf") {
      setFile(selected);
      setOrigSize((selected.size / 1024 / 1024).toFixed(2) + " MB");
      setDownloadUrl(null);
      setCompressedSize("");
      setProgress(0);
    } else {
      alert("Please select a valid PDF file.");
    }
  };

  const compressPdf = async () => {
    if (!file || !isLibraryLoaded) {
        if(!isLibraryLoaded) alert("Engine loading... please wait 2 seconds.");
        return;
    }
    
    setIsProcessing(true);
    setDownloadUrl(null);

    try {
      const pdfJS = (window as any).pdfjsLib;
      const arrayBuffer = await file.arrayBuffer();
      
      const srcPdf = await pdfJS.getDocument(arrayBuffer).promise;
      const totalPages = srcPdf.numPages;

      const newPdfDoc = await PDFDocument.create();

      for (let i = 1; i <= totalPages; i++) {
        const page = await srcPdf.getPage(i);
        const viewport = page.getViewport({ scale: SCALE });
        
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        // FIX: 'as any' silences the strict type checker here
        const renderContext = {
            canvasContext: context,
            viewport: viewport
        } as any;

        await page.render(renderContext).promise;
        
        const imgDataUrl = canvas.toDataURL('image/jpeg', COMPRESSION_QUALITY);
        const imgBytes = await fetch(imgDataUrl).then(res => res.arrayBuffer());

        const jpgImage = await newPdfDoc.embedJpg(imgBytes);
        const newPage = newPdfDoc.addPage([viewport.width, viewport.height]);
        newPage.drawImage(jpgImage, {
            x: 0,
            y: 0,
            width: viewport.width,
            height: viewport.height,
        });

        setProgress(Math.round((i / totalPages) * 100));
      }

      // FIX: 'as any' silences the red line on Blob
      const pdfBytes = await newPdfDoc.save();
      const blob = new Blob([pdfBytes as any], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      setDownloadUrl(url);
      setCompressedSize((blob.size / 1024 / 1024).toFixed(2) + " MB");

    } catch (error) {
      console.error("PDF Compression failed", error);
      alert("Could not compress this PDF. It might be corrupt or password protected.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-20">
      
      <Script 
        src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js" 
        strategy="lazyOnload"
        onLoad={() => {
            (window as any).pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;
            setIsLibraryLoaded(true);
        }}
      />

      <div className="bg-white border-b border-slate-200 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 text-slate-900">
            Secure <span className="text-red-600">PDF</span> Compressor
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            Drastically reduce file size. We re-distill your documents locally to save space.
          </p>
          
          <div className="flex justify-center items-center gap-6 text-sm font-semibold">
            <div className="flex items-center gap-2 text-green-700 bg-green-50 px-3 py-1 rounded-full border border-green-100">
              <ShieldCheck size={18} /> <span>100% Private</span>
            </div>
            <div className="flex items-center gap-2 text-red-700 bg-red-50 px-3 py-1 rounded-full border border-red-100">
              <Zap size={18} /> <span>Strong Compression</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 -mt-10">
        <div className="bg-white border border-slate-200 shadow-2xl rounded-3xl p-6 md:p-12">
          
          {!file ? (
            <div className="text-center py-16 border-2 border-dashed border-slate-300 rounded-2xl hover:border-red-500 hover:bg-red-50/30 transition-all group cursor-pointer relative">
              <label className="cursor-pointer block h-full w-full">
                <div className="bg-red-600 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-red-200 group-hover:scale-105 transition-transform">
                  <Upload className="text-white" size={40} />
                </div>
                <span className="text-3xl font-bold text-slate-800 block mb-2">Upload PDF</span>
                <span className="text-slate-500 text-lg">Safely optimize your documents</span>
                <input type="file" className="hidden" accept=".pdf" onChange={handleUpload} />
              </label>
            </div>
          ) : (
            <div className="space-y-8 animate-in fade-in zoom-in-95 duration-300">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="bg-white p-3 rounded-lg shadow-sm border border-slate-100">
                    <FileText className="text-red-500" size={24} />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800 truncate max-w-[200px] md:max-w-xs">{file.name}</p>
                    <p className="text-sm text-slate-500">{origSize}</p>
                  </div>
                </div>
                <button onClick={() => setFile(null)} className="text-sm font-medium text-red-600 hover:underline">Remove</button>
              </div>

              {!downloadUrl ? (
                <div className="space-y-4">
                    {isProcessing && (
                         <div className="w-full bg-slate-100 rounded-full h-4 overflow-hidden">
                            <div className="bg-red-600 h-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
                         </div>
                    )}
                    
                    <button 
                    onClick={compressPdf} 
                    disabled={isProcessing || !isLibraryLoaded}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-5 rounded-2xl shadow-lg flex justify-center items-center gap-2 text-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                    {isProcessing ? (
                        <><Loader2 className="animate-spin" /> Compressing {progress}%...</>
                    ) : (
                        !isLibraryLoaded ? <Loader2 className="animate-spin" /> : "Compress PDF Now"
                    )}
                    </button>
                    {!isLibraryLoaded && <p className="text-xs text-center text-slate-400">Loading compression engine...</p>}
                </div>
              ) : (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                  <div className="p-4 bg-green-50 border border-green-100 rounded-xl text-center">
                    <p className="text-green-800 font-bold flex items-center justify-center gap-2">
                      <Check size={18} /> Compression Success!
                    </p>
                    <p className="text-sm text-green-600 mt-1">New Size: <span className="font-bold">{compressedSize}</span> (was {origSize})</p>
                  </div>
                  <a 
                    href={downloadUrl} 
                    download={`FileZen-Compressed-${file.name}`}
                    className="w-full bg-slate-900 hover:bg-black text-white font-bold py-5 rounded-2xl shadow-xl flex justify-center items-center gap-2 text-xl transition-all"
                  >
                    <Download size={24} /> Download PDF
                  </a>
                  <button onClick={() => {setFile(null); setDownloadUrl(null);}} className="w-full text-slate-500 font-medium hover:underline">
                    Compress Another File
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      <section className="max-w-4xl mx-auto px-6 mt-24 mb-20 space-y-16">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Unmatched Data Privacy</h2>
            <p className="text-slate-600 leading-relaxed text-sm">
              FileZen processes your data locally using advanced browser technology. Your bank statements, contracts, and personal documents never touch our servers.
            </p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Smart Compression</h2>
            <p className="text-slate-600 leading-relaxed text-sm">
              Our algorithm re-encodes document pages into optimized image streams. This significantly reduces file size for email attachments while keeping content legible.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}