"use client";

import React, { useState } from 'react';
import imageCompression from 'browser-image-compression';
import { 
  Upload, Download, FileText, ShieldCheck, 
  RefreshCcw, Settings, ChevronDown, ChevronUp, Check 
} from 'lucide-react';

export default function UniversalConverter() {
  const [file, setFile] = useState<File | null>(null);
  const [origSize, setOrigSize] = useState<string>("");
  const [compressedSize, setCompressedSize] = useState<string>("");
  const [targetFormat, setTargetFormat] = useState<string>("webp");
  const [isProcessing, setIsProcessing] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  
  // Advanced Settings State
  const [showSettings, setShowSettings] = useState(false);
  const [quality, setQuality] = useState(80);
  const [resizeScale, setResizeScale] = useState(1); // 1 = 100%

  // Handle file selection
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
      // Logic: Lower quality = smaller maxSizeMB
      const maxMb = quality === 100 ? 10 : (quality / 20); 

      const options = {
        maxSizeMB: maxMb,
        maxWidthOrHeight: 1920 * resizeScale, // Scaling down if requested
        useWebWorker: true,
        fileType: `image/${targetFormat}`
      };

      const compressedFile = await imageCompression(file, options);
      const url = URL.createObjectURL(compressedFile);
      
      setDownloadUrl(url);
      setCompressedSize((compressedFile.size / 1024 / 1024).toFixed(2) + " MB");
    } catch (error) {
      console.error("Conversion failed", error);
      alert("Error converting file. Ensure it is a valid image.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      
      {/* 1. Header Section (Updated for FileZen) */}
      <div className="bg-white border-b border-slate-200 py-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-slate-900">
            FileZen Online Converter
          </h1>
          <p className="text-lg text-slate-500 mb-6">
            Convert your images and files in seconds. Free, secure, and unlimited.
          </p>
          
          {/* Feature Badges */}
          <div className="flex justify-center items-center gap-4 text-sm font-medium">
            <div className="flex items-center gap-1 text-green-700 bg-green-50 px-3 py-1 rounded-full border border-green-100">
              <ShieldCheck size={16} />
              <span>100% Private</span>
            </div>
            <div className="flex items-center gap-1 text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              <RefreshCcw size={16} />
              <span>Fast Conversion</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Tool Card */}
      <div className="max-w-3xl mx-auto px-6 -mt-8">
        <div className="bg-white border border-slate-200 shadow-xl shadow-slate-200/50 rounded-2xl p-6 md:p-10">
          
          {!file ? (
            /* Upload State (Updated with Format Hints) */
            <div className="text-center py-12 border-2 border-dashed border-slate-300 rounded-xl hover:border-blue-500 hover:bg-slate-50 transition-all group cursor-pointer relative">
              <label className="cursor-pointer block h-full w-full">
                <div className="bg-blue-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-200 group-hover:scale-110 transition-transform">
                  <Upload className="text-white" size={36} />
                </div>
                <span className="text-2xl font-bold text-slate-800 block mb-2">
                  Choose Files
                </span>
                <span className="text-slate-500 text-lg">
                  or drag & drop to choose format
                </span>
                
                {/* Visual Format Hints */}
                <div className="mt-6 flex justify-center gap-2 text-xs text-slate-400 font-mono uppercase tracking-wide opacity-60">
                  <span className="bg-slate-100 px-2 py-1 rounded border border-slate-200">PNG</span>
                  <span className="bg-slate-100 px-2 py-1 rounded border border-slate-200">JPG</span>
                  <span className="bg-slate-100 px-2 py-1 rounded border border-slate-200">WEBP</span>
                  <span className="bg-slate-100 px-2 py-1 rounded border border-slate-200">BMP</span>
                </div>
                
                <input type="file" className="hidden" accept="image/*" onChange={handleUpload} />
              </label>
            </div>
          ) : (
            /* Settings State */
            <div className="space-y-8 animate-in fade-in zoom-in-95 duration-300">
              {/* File Info */}
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
                <button onClick={() => setFile(null)} className="text-sm font-medium text-red-500 hover:text-red-700 hover:underline">
                  Change File
                </button>
              </div>

              {/* Conversion Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Convert to:</label>
                  <select 
                    value={targetFormat} 
                    onChange={(e) => setTargetFormat(e.target.value)}
                    className="w-full p-3 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
                  >
                    <option value="webp">WebP (Best for Web)</option>
                    <option value="png">PNG (Clear Background)</option>
                    <option value="jpeg">JPG (Standard)</option>
                    <option value="bmp">BMP (Raw)</option>
                  </select>
                </div>

                {/* Advanced Settings Toggle */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Settings:</label>
                  <button 
                    onClick={() => setShowSettings(!showSettings)}
                    className="w-full p-3 rounded-lg border border-slate-300 bg-white flex justify-between items-center hover:bg-slate-50 shadow-sm transition-colors"
                  >
                    <span className="text-slate-600">Advanced Options</span>
                    {showSettings ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                </div>
              </div>

              {/* Advanced Settings Panel */}
              {showSettings && (
                <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 space-y-6 animate-in slide-in-from-top-2">
                  
                  {/* Quality Slider */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm font-semibold text-slate-700">Image Quality</label>
                      <span className="text-sm font-bold text-blue-600">{quality}%</span>
                    </div>
                    <input 
                      type="range" 
                      min="10" 
                      max="100" 
                      value={quality} 
                      onChange={(e) => setQuality(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                    <p className="text-xs text-slate-500 mt-2">Lower quality = Smaller file size.</p>
                  </div>

                  {/* Resize Dropdown */}
                  <div>
                    <label className="text-sm font-semibold text-slate-700 block mb-2">Resize Output</label>
                    <select 
                      value={resizeScale}
                      onChange={(e) => setResizeScale(Number(e.target.value))}
                      className="w-full p-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                      <option value={1}>Keep Original Size</option>
                      <option value={0.75}>Reduce to 75%</option>
                      <option value={0.5}>Reduce to 50% (Half Size)</option>
                      <option value={0.25}>Reduce to 25% (Thumbnail)</option>
                    </select>
                  </div>

                  {/* Metadata Checkbox */}
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-blue-600 rounded flex items-center justify-center">
                      <Check size={14} className="text-white" />
                    </div>
                    <span className="text-sm text-slate-700 font-medium">Strip Metadata (EXIF) for Privacy</span>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              {!downloadUrl ? (
                <button 
                  onClick={convertFile}
                  disabled={isProcessing}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-200 transition-all flex justify-center items-center gap-2 text-lg disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isProcessing ? <RefreshCcw className="animate-spin" /> : "Convert Now"}
                </button>
              ) : (
                <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2">
                  <div className="p-4 bg-green-50 border border-green-100 rounded-lg text-center">
                    <p className="text-green-800 font-medium flex items-center justify-center gap-2">
                      <Check size={18} /> Success! File saved.
                    </p>
                    <p className="text-sm text-green-600 mt-1">New Size: <span className="font-bold">{compressedSize}</span> (was {origSize})</p>
                  </div>
                  <a 
                    href={downloadUrl} 
                    download={`converted-image.${targetFormat}`}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-xl shadow-lg transition-all flex justify-center items-center gap-2 text-lg"
                  >
                    <Download size={20} />
                    Download File
                  </a>
                  <button 
                    onClick={() => {setFile(null); setDownloadUrl(null);}} 
                    className="w-full text-slate-500 py-2 hover:underline text-sm font-medium"
                  >
                    Convert Another File
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 3. SEO Content Section */}
      <div className="max-w-3xl mx-auto px-6 mt-20 mb-20 space-y-12">
        
        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="p-4">
            <h3 className="font-bold text-slate-800 text-lg mb-2">Convert Any File</h3>
            <p className="text-slate-500 text-sm leading-relaxed">Supports JPG, PNG, WebP and BMP. More formats coming soon.</p>
          </div>
          <div className="p-4">
            <h3 className="font-bold text-slate-800 text-lg mb-2">Best Quality</h3>
            <p className="text-slate-500 text-sm leading-relaxed">Adjust compression levels to get the perfect balance of size and quality.</p>
          </div>
          <div className="p-4">
            <h3 className="font-bold text-slate-800 text-lg mb-2">Free & Secure</h3>
            <p className="text-slate-500 text-sm leading-relaxed">100% Client-side. No servers, no tracking, no waiting.</p>
          </div>
        </div>

        {/* How-to Guide */}
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">How to use FileZen Converter?</h2>
          <ol className="list-decimal pl-5 space-y-4 text-slate-600">
            <li>Click the <span className="font-bold text-slate-800">"Choose Files"</span> button and select the image you want to convert.</li>
            <li>Select your target format from the dropdown (e.g., WebP or JPG).</li>
            <li>(Optional) Open <span className="font-bold text-slate-800">"Advanced Options"</span> to adjust quality or resize the image.</li>
            <li>Click <span className="font-bold text-blue-600">"Convert Now"</span> to process the file instantly.</li>
            <li>Hit <span className="font-bold text-green-600">"Download"</span> to save your new file.</li>
          </ol>
        </div>

      </div>
    </main>
  );
}