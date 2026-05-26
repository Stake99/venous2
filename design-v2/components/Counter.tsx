'use client';

import { useEffect, useRef } from 'react';
import { useInView, useMotionValue, animate } from 'framer-motion';

export default function Counter({
  to,
  suffix = '',
  duration = 1.6,
}: {
  to: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const value = useMotionValue(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(value, to, { duration, ease: [0.22, 1, 0.36, 1] });
    const unsub = value.on('change', (v) => {
      if (ref.current) {
        const n = Math.round(v).toLocaleString();
        ref.current.textContent = `${n}${suffix}`;
      }
    });
    return () => {
      controls.stop();
      unsub();
    };
  }, [inView, value, to, duration, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}
