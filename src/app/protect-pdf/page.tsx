"use client";

import React, { useState } from "react";
import {
  Lock,
  FileText,
  Download,
  Check,
  Loader2,
} from "lucide-react";

/**
 * qpdf-wasm must be loaded dynamically in Next.js
 * DO NOT import it at the top level
 */
let qpdfInitialized = false;
let qpdfEncrypt: any;
let qpdfInit: any;

export default function ProtectPdfPage() {
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
      // Initialize qpdf WASM once
      if (!qpdfInitialized) {
        const qpdf = await import("qpdf-wasm");
        qpdfInit = qpdf.init;
        qpdfEncrypt = qpdf.encrypt;

        await qpdfInit();
        qpdfInitialized = true;
      }

      const inputBytes = new Uint8Array(await file.arrayBuffer());

      // REAL PDF encryption (AES-256)
      const encryptedPdf = await qpdfEncrypt({
        data: inputBytes,
        userPassword: password,
        ownerPassword: password,
        keyLength: 256,
      });

      const blob = new Blob([encryptedPdf], {
        type: "application/pdf",
      });

      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);

    } catch (error) {
      console.error("PDF encryption failed:", error);
      alert("PDF encryption failed in this browser.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md space-y-6">

        <h1 className="text-2xl font-bold text-center">
          Protect PDF
        </h1>

        {!file ? (
          <label className="border-2 border-dashed rounded-xl p-8 text-center cursor-pointer block">
            <FileText className="mx-auto mb-3" />
            <p className="font-semibold">Select PDF</p>
            <input
              type="file"
              accept=".pdf"
              hidden
              onChange={handleUpload}
            />
          </label>
        ) : !downloadUrl ? (
          <>
            <div className="text-sm font-semibold truncate">
              {file.name}
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-3 text-slate-400" size={16} />
              <input
                type="password"
                placeholder="Set password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 p-3 border rounded-xl"
              />
            </div>

            <button
              onClick={protectPdf}
              disabled={!password || isProcessing}
              className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl flex justify-center items-center gap-2 disabled:opacity-50"
            >
              {isProcessing ? (
                <Loader2 className="animate-spin" />
              ) : (
                <Lock size={18} />
              )}
              {isProcessing ? "Encrypting..." : "Protect PDF"}
            </button>
          </>
        ) : (
          <>
            <div className="bg-green-50 text-green-700 p-3 rounded-lg flex items-center gap-2 justify-center font-bold">
              <Check size={16} /> Encrypted Successfully
            </div>

            <a
              href={downloadUrl}
              download={`Protected-${file.name}`}
              className="w-full bg-slate-900 text-white font-bold py-3 rounded-xl flex justify-center items-center gap-2"
            >
              <Download size={18} /> Download
            </a>

            <button
              onClick={() => {
                setFile(null);
                setPassword("");
                setDownloadUrl(null);
              }}
              className="text-sm text-slate-500 underline"
            >
              Protect another file
            </button>
          </>
        )}
      </div>
    </main>
  );
}
