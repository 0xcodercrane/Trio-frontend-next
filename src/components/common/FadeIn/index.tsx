'use client';

import { useEffect, useState } from 'react';

export default function FadeIn() {
  const [fade, setFade] = useState(false);

  useEffect(() => {
    setTimeout(() => setFade(true), 50);
  }, []);

  return (
    <div
      className={`absolute top-0 z-50 h-full w-full bg-ob-black transition-opacity duration-700 ease-in-out repeat-infinite ${fade ? 'opacity-0' : 'opacity-33'}`}
    ></div>
  );
}
