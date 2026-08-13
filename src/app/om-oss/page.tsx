import React from 'react';
import FrontendLayout from '@/components/FrontendLayout';

export default function OmOssPage() {
  return (
    <FrontendLayout>
      <main style={{ padding: '150px 20px', minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem', fontFamily: "'Inter', sans-serif" }}>Om oss</h1>
        <p style={{ fontSize: '1.2rem', color: '#64748b', maxWidth: '600px', textAlign: 'center' }}>
          Denna sida håller på att uppdateras till vårt nya system. Läs mer om Nordxrelining snart.
        </p>
      </main>
    </FrontendLayout>
  );
}
