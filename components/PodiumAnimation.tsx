"use client";

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

export default function PodiumAnimation() {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch('/animations/podium.json')
      .then(res => res.json())
      .then(data => setAnimationData(data));
  }, []);

  if (!animationData) return null;

  return (
    <div className="podium-container text-center mb-8">
      <div className="w-48 h-48 mx-auto">
        <Lottie animationData={animationData} loop={true} />
      </div>
    </div>
  );
}