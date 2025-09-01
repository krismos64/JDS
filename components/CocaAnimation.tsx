"use client";

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

export default function CocaAnimation() {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch('/animations/coca.json')
      .then(res => res.json())
      .then(data => setAnimationData(data));
  }, []);

  if (!animationData) return null;

  return (
    <div className="coca-animation-container text-center">
      <div className="w-32 h-32 mx-auto mb-4">
        <Lottie animationData={animationData} loop={true} />
      </div>
      <p className="text-xl font-semibold text-white animate-wiggle">
        "On boit du coca comme des oufs !"
      </p>
    </div>
  );
}