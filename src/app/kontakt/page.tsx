import React from 'react';
import FrontendLayout from '@/components/FrontendLayout';

export default function KontaktPage() {
  return (
    <FrontendLayout>
      <main style={{ padding: '150px 20px', minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem', fontFamily: "'Inter', sans-serif" }}>Kontakt</h1>
        <p style={{ fontSize: '1.2rem', color: '#64748b', maxWidth: '600px', textAlign: 'center' }}>
          Kontakta oss gärna via telefon: 070-318 51 10 eller e-post: info@nordxrelining.se
        </p>
      </main>
    </FrontendLayout>
  );
}
