"use client";

import React, { useState } from 'react';
import Script from 'next/script';
import { 
  FileImage, Upload, Download, Image as ImageIcon, 
  Check, Settings, Loader2 
} from 'lucide-react';

export default function PdfToImage() {
  const [file, setFile] = useState<File | null>(null);
  const [images, setImages] = useState<{url: string, ext: string}[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedFormat, setSelectedFormat] = useState('image/jpeg');
  const [isLibraryLoaded, setIsLibraryLoaded] = useState(false);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      setImages([]);
      setProgress(0);
    }
  };

  const convertToImages = async () => {
    if (!file || !isLibraryLoaded) {
        if(!isLibraryLoaded) alert("Please wait a moment for the converter to load...");
        return;
    }
    
    setIsProcessing(true);
    setImages([]);

    try {
      // Access the library from the global window object (loaded via CDN)
      const pdfJS = (window as any).pdfjsLib;
      
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfJS.getDocument(arrayBuffer).promise;
      const totalPages = pdf.numPages;
      const newImages: {url: string, ext: string}[] = [];

      for (let i = 1; i <= totalPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 2.0 }); // High quality
        
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        if (context) {
          const renderContext = {
             canvasContext: context,
             viewport: viewport
          } as any;

          await page.render(renderContext).promise;
          
          const imgUrl = canvas.toDataURL(selectedFormat, 0.9); 
          const ext = selectedFormat.split('/')[1].replace('jpeg', 'jpg');
          
          newImages.push({ url: imgUrl, ext: ext });
        }

        setProgress(Math.round((i / totalPages) * 100));
      }

      setImages(newImages);

    } catch (error) {
      console.error("Conversion failed", error);
      alert("Could not convert PDF. It might be password protected.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-20">
      
      {/* THIS IS THE MAGIC FIX: Load library from CDN instead of building it */}
      <Script 
        src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js" 
        strategy="lazyOnload"
        onLoad={() => {
            console.log("PDF Library Loaded");
            (window as any).pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;
            setIsLibraryLoaded(true);
        }}
      />

      {/* Header */}
      <div className="bg-white border-b border-slate-200 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 text-slate-900">
            PDF to <span className="text-indigo-600">Image</span>
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            Convert PDF pages to JPG, PNG, or WebP. High resolution and instant download.
          </p>
          
          <div className="flex justify-center items-center gap-6 text-sm font-semibold">
            <div className="flex items-center gap-2 text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
              <ImageIcon size={18} /> <span>Multi-Format</span>
            </div>
            <div className="flex items-center gap-2 text-green-700 bg-green-50 px-3 py-1 rounded-full border border-green-100">
              <Check size={18} /> <span>100% Client-Side</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tool Card */}
      <div className="max-w-4xl mx-auto px-6 -mt-10">
        <div className="bg-white border border-slate-200 shadow-2xl rounded-3xl p-8 md:p-12">
          
          {/* Step 1: Upload */}
          {!file && (
            <div className="text-center py-12 border-2 border-dashed border-slate-300 rounded-2xl hover:border-indigo-500 hover:bg-indigo-50/30 transition-all group cursor-pointer relative">
              <label className="cursor-pointer block h-full w-full">
                <div className="bg-indigo-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-indigo-200 group-hover:scale-105 transition-transform">
                  <Upload className="text-white" size={32} />
                </div>
                <span className="text-2xl font-bold text-slate-800 block mb-2">Select PDF</span>
                <span className="text-slate-500">We will extract every page as an image</span>
                <input type="file" className="hidden" accept=".pdf" onChange={handleUpload} />
              </label>
            </div>
          )}

          {/* Step 2: Settings & Convert */}
          {file && images.length === 0 && (
            <div className="space-y-8 animate-in fade-in zoom-in-95 duration-300 text-center">
              
              <div className="flex items-center justify-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200 inline-block mx-auto">
                 <div className="bg-indigo-100 text-indigo-600 p-2 rounded-lg">
                    <FileImage size={24} />
                 </div>
                 <div className="text-left">
                   <p className="text-sm font-bold text-slate-700">{file.name}</p>
                   <p className="text-xs text-slate-400">{(file.size/1024/1024).toFixed(2)} MB</p>
                 </div>
                 <button onClick={() => setFile(null)} className="text-slate-400 hover:text-red-500 ml-4">Change</button>
              </div>

              {!isProcessing && (
                <div className="max-w-xs mx-auto text-left">
                  <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                    <Settings size={16} /> Output Format
                  </label>
                  <select 
                    value={selectedFormat}
                    onChange={(e) => setSelectedFormat(e.target.value)}
                    className="w-full p-3 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none font-medium text-slate-700"
                  >
                    <option value="image/jpeg">JPG - Best for Photos (Small)</option>
                    <option value="image/png">PNG - Best for Text (Crisp)</option>
                    <option value="image/webp">WebP - Best for Web (Modern)</option>
                  </select>
                </div>
              )}

              {isProcessing ? (
                 <div className="max-w-md mx-auto space-y-3">
                    <div className="w-full bg-slate-100 rounded-full h-4 overflow-hidden">
                       <div className="bg-indigo-600 h-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
                    </div>
                    <p className="text-sm text-slate-500 font-medium flex items-center justify-center gap-2">
                       <Loader2 className="animate-spin" size={14} /> Processing Page {Math.ceil((progress/100) * 10)}...
                    </p>
                 </div>
              ) : (
                <button 
                  onClick={convertToImages} 
                  disabled={!isLibraryLoaded}
                  className="w-full max-w-xs mx-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl shadow-lg flex justify-center items-center gap-2 text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {!isLibraryLoaded ? <Loader2 className="animate-spin" /> : `Convert to ${selectedFormat.split('/')[1].toUpperCase()}`}
                </button>
              )}
            </div>
          )}

          {/* Results Grid */}
          {images.length > 0 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
               <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                  <h3 className="text-xl font-bold text-slate-800">
                    Converted Pages ({images.length})
                  </h3>
                  <button onClick={() => {setFile(null); setImages([]);}} className="text-sm text-indigo-600 font-bold hover:underline">
                    Start Over
                  </button>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {images.map((img, idx) => (
                   <div key={idx} className="group relative bg-slate-50 p-2 rounded-xl border border-slate-200 hover:shadow-xl transition-all">
                      <div className="aspect-[3/4] overflow-hidden rounded-lg bg-white mb-3 relative border border-slate-100">
                         <img src={img.url} alt={`Page ${idx + 1}`} className="object-contain w-full h-full" />
                      </div>
                      <div className="flex items-center justify-between px-2 pb-1">
                         <span className="text-xs font-bold text-slate-400">Page {idx + 1}</span>
                         <a 
                           href={img.url} 
                           download={`${file?.name.replace('.pdf', '')}-Page-${idx+1}.${img.ext}`}
                           className="text-xs bg-slate-900 text-white px-3 py-2 rounded-lg hover:bg-black transition-colors flex items-center gap-1 font-bold"
                         >
                           <Download size={12} /> Save {img.ext.toUpperCase()}
                         </a>
                      </div>
                   </div>
                 ))}
               </div>
            </div>
          )}
        </div>
      </div>

      <section className="max-w-3xl mx-auto px-6 mt-20 mb-20">
        <div className="bg-indigo-50 p-8 rounded-3xl border border-indigo-100">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Export PDF to JPG, PNG, or WebP</h2>
          <p className="text-sm text-slate-600 leading-relaxed mb-4">
            FileZen gives you full control. Choose <strong>JPG</strong> for smaller file sizes, <strong>PNG</strong> if your PDF contains text or charts that need to stay sharp, or <strong>WebP</strong> for the best balance of quality and speed.
          </p>
          <p className="text-sm text-slate-600 leading-relaxed">
            Everything is processed in your browser using high-fidelity rendering.
          </p>
        </div>
      </section>
    </main>
  );
}