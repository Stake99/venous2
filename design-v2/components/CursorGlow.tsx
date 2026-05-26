'use client';

import { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CursorGlow() {
  const x = useMotionValue(-9999);
  const y = useMotionValue(-9999);
  const sx = useSpring(x, { stiffness: 80, damping: 25, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 80, damping: 25, mass: 0.6 });

  useEffect(() => {
    // Hide on touch devices to avoid stuck blob
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    const handler = (e: MouseEvent) => {
      x.set(e.clientX - 320);
      y.set(e.clientY - 320);
    };
    window.addEventListener('mousemove', handler, { passive: true });
    return () => window.removeEventListener('mousemove', handler);
  }, [x, y]);

  return (
    <motion.div
      aria-hidden
      style={{ x: sx, y: sy }}
      className="pointer-events-none fixed top-0 left-0 w-[40rem] h-[40rem] holo-bg opacity-40 blur-3xl rounded-full z-0"
    />
  );
}
