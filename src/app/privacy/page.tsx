import React from 'react';

export default function PrivacyPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-20 bg-white text-slate-800">
      <h1 className="text-4xl font-extrabold mb-8">Privacy Policy</h1>
      <p className="text-slate-500 mb-8">Last Updated: January 2026</p>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold">1. The Short Version</h2>
        <p className="leading-relaxed">
          FileZen is built differently. Unlike other converters, <strong>we do not upload your files to any server.</strong> All file processing happens locally in your web browser. This means your images/files never leave your device. We cannot see, store, or share your files because they never touch our systems.
        </p>

        <h2 className="text-2xl font-bold">2. Data Collection</h2>
        <p className="leading-relaxed">
          We do not collect personal data (like names, emails, or IP addresses) because we have no user accounts and no database. You are completely anonymous.
        </p>

        <h2 className="text-2xl font-bold">3. Cookies & Third-Party Services</h2>
        <p className="leading-relaxed">
          FileZen itself does not use cookies. However, we use third-party services that may use cookies:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-slate-600">
          <li><strong>Google Analytics:</strong> To understand how many people use our site (anonymous data).</li>
          <li><strong>Google AdSense:</strong> To display advertisements. Google uses cookies to show ads based on your previous visits to this website or other websites.</li>
        </ul>

        <h2 className="text-2xl font-bold">4. Your Rights</h2>
        <p className="leading-relaxed">
          Since we do not store your data, there is nothing for us to delete or export. You are in total control of your files at all times.
        </p>
      </section>
    </main>
  );
}