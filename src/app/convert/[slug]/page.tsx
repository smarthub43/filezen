"use client";

import React, { use } from 'react';
import UniversalConverter from '@/app/page'; // This pulls in your image tool

export default function DynamicConverterPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  
  // This turns "png-to-jpg" into "PNG to JPG" for the header
  const title = slug.split('-').map(word => word.toUpperCase()).join(' ');

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b py-12 text-center">
        <h1 className="text-3xl font-bold">{title} Converter</h1>
        <p className="text-slate-500">Fast and secure {title} conversion online.</p>
      </div>
      
      {/* This renders your image tool code on this page */}
      <UniversalConverter />
    </div>
  );
}