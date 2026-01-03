import React from 'react';

export default function TermsPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-20 bg-white text-slate-800">
      <h1 className="text-4xl font-extrabold mb-8">Terms of Service</h1>
      
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">1. Acceptance of Terms</h2>
        <p className="leading-relaxed">
          By accessing and using FileZen, you accept and agree to be bound by the terms and provision of this agreement.
        </p>

        <h2 className="text-2xl font-bold">2. Use of Service</h2>
        <p className="leading-relaxed">
          FileZen provides client-side file conversion tools. You agree to use this service only for lawful purposes. You represent that you own the copyright to any files you process using our tools.
        </p>

        <h2 className="text-2xl font-bold">3. Disclaimer of Warranties</h2>
        <p className="leading-relaxed">
          The service is provided on an "AS IS" and "AS AVAILABLE" basis. FileZen makes no representations or warranties of any kind, express or implied, regarding the use or the results of this web tool in terms of its correctness, accuracy, reliability, or otherwise.
        </p>

        <h2 className="text-2xl font-bold">4. Limitation of Liability</h2>
        <p className="leading-relaxed">
          FileZen shall not be liable for any damages whatsoever, including but not limited to direct, indirect, special, consequential, or incidental damages arising out of the use of the service.
        </p>
      </section>
    </main>
  );
}