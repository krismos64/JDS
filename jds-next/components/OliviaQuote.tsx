"use client";

import { useState, useEffect } from 'react';
import { oliviaQuotes } from '@/lib/data';

export default function OliviaQuote() {
  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote(prev => (prev + 1) % oliviaQuotes.length);
    }, 3000); // Change toutes les 3 secondes

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-2xl mb-8">
      👶 Olivia sera présente !
      <span className="block mt-2 italic text-lg animate-fadeIn" key={currentQuote}>
        "{oliviaQuotes[currentQuote]}"
      </span>
    </div>
  );
}