"use client";

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import AdminLoginButton from './AdminLoginButton';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

export default function Header() {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch('/animations/fight.json')
      .then(res => res.json())
      .then(data => setAnimationData(data));
  }, []);

  return (
    <header className="relative bg-gradient-to-br from-primary via-secondary to-tertiary text-white py-16 overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-white rounded-full blur-3xl animate-float" />
        <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-yellow-300 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>
      
      {/* Bouton Admin en position absolue pour desktop */}
      <div className="absolute top-4 left-4 z-20 hidden md:block">
        <AdminLoginButton />
      </div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <h1 className="text-5xl md:text-7xl font-bold mb-4 animate-bounce-slow">
          🎲 Embrouille JDS 🎲
        </h1>
        
        {animationData && (
          <div className="w-48 h-48 mx-auto my-6">
            <Lottie animationData={animationData} loop={true} />
          </div>
        )}
        
        <p className="text-xl md:text-2xl animate-pulse-slow">
          Où l'amitié se brise à chaque partie !
        </p>
      </div>
    </header>
  );
}