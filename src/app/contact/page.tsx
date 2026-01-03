import React from 'react';
import { Mail, MessageSquare } from 'lucide-react';

export default function ContactPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-20 bg-slate-50 min-h-screen">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-slate-900">Contact Us</h1>
      
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-10 text-center">
          <Mail className="mx-auto text-blue-600 mb-4" size={48} />
          <h2 className="text-2xl font-bold mb-2">Have a question?</h2>
          <p className="text-slate-500 mb-8">
            Whether you found a bug or just want to say hi, we'd love to hear from you.
          </p>
          
          <a 
            href="mailto:support@filezen.com" 
            className="inline-block bg-slate-900 text-white font-bold py-3 px-8 rounded-full hover:bg-slate-800 transition-colors"
          >
            Email Support
          </a>
          <p className="mt-4 text-xs text-slate-400">Response time: ~24 hours</p>
        </div>
        
        <div className="bg-slate-50 p-6 border-t border-slate-200 text-center">
          <p className="text-sm text-slate-500 flex items-center justify-center gap-2">
            <MessageSquare size={16} />
            For business inquiries, please mention "Partnership" in subject.
          </p>
        </div>
      </div>
    </main>
  );
}