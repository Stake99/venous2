'use client';

import { motion, useScroll, useTransform } from 'framer-motion';

export default function ParallaxBackground() {
  const { scrollY } = useScroll();
  const bgSlow = useTransform(scrollY, [0, 4000], [0, -200]);
  const bgMid  = useTransform(scrollY, [0, 4000], [0, -500]);
  const bgFast = useTransform(scrollY, [0, 4000], [0, -900]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <motion.div className="absolute inset-0" style={{ y: bgSlow }}>
        <div className="absolute top-[15%] -left-32 w-[700px] h-[700px] bg-gold/10 rounded-full filter blur-[160px]" />
        <div className="absolute top-[55%] -right-32 w-[600px] h-[600px] bg-gold/10 rounded-full filter blur-[140px]" />
      </motion.div>
      <motion.div className="absolute inset-0" style={{ y: bgMid }}>
        <div className="absolute top-[35%] right-1/4 w-[400px] h-[400px] bg-gold-bright/[0.08] rounded-full filter blur-[120px]" />
        <div className="absolute top-[75%] left-1/4 w-[500px] h-[500px] bg-gold/[0.08] rounded-full filter blur-[130px]" />
      </motion.div>
      <motion.div className="absolute inset-0" style={{ y: bgFast }}>
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-gold-bright/[0.06] rounded-full filter blur-[100px]" />
        <div className="absolute top-[90%] right-1/3 w-[350px] h-[350px] bg-gold-bright/[0.08] rounded-full filter blur-[110px]" />
      </motion.div>
    </div>
  );
}
