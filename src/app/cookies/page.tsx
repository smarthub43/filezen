import React from 'react';

export default function CookiePage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-20 bg-white text-slate-800">
      <h1 className="text-4xl font-extrabold mb-8">Cookie Policy</h1>
      
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">1. What are cookies?</h2>
        <p className="leading-relaxed">
          Cookies are small text files stored on your device when you visit websites. They help websites remember your preferences.
        </p>

        <h2 className="text-2xl font-bold">2. How we use cookies</h2>
        <p className="leading-relaxed">
          FileZen does not use "functional" cookies (we don't have logins). However, our partners may use them:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-slate-600">
          <li><strong>Advertising:</strong> Third-party vendors, including Google, use cookies to serve ads based on your prior visits to our website.</li>
          <li><strong>Analytics:</strong> We use anonymous analytics to see which tools are most popular.</li>
        </ul>

        <h2 className="text-2xl font-bold">3. Managing Cookies</h2>
        <p className="leading-relaxed">
          You can disable cookies in your browser settings at any time. This will not affect the functionality of our file converter tools.
        </p>
      </section>
    </main>
  );
}