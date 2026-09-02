import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useMotionValue,
  useTransform,
  useReducedMotion,
} from "framer-motion";

/* ═══════════════════════════════════════════════════════════════
   EASING & ANIMATION CONSTANTS (Natural deceleration)
   ═══════════════════════════════════════════════════════════════ */

const EASE_OUT_QUART = [0.25, 1, 0.5, 1] as const;

/* ═══════════════════════════════════════════════════════════════
   STARTER & LOADER SCREEN: THE QUIET INVITATION
   ═══════════════════════════════════════════════════════════════ */

function StarterScreen({ onOpen }: { onOpen: () => void }) {
  const [isOpening, setIsOpening] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const t = setTimeout(() => setIsLoaded(true), 500);
    return () => clearTimeout(t);
  }, []);

  const handleOpenClick = () => {
    setIsOpening(true);
    setTimeout(() => {
      onOpen();
    }, 700);
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-[#FAF8F5] flex items-center justify-center p-6 select-none overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04, filter: "blur(6px)" }}
      transition={{ duration: 0.85, ease: EASE_OUT_QUART }}
    >
      {/* Background ambient glow */}
      <div className="absolute w-[600px] h-[600px] bg-[#F2DFD0]/50 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        className="relative max-w-lg w-full bg-[#FAF8F5]/90 backdrop-blur-md border border-[#EADFD4] rounded-3xl p-8 sm:p-12 text-center shadow-[0_24px_50px_-12px_rgba(136,19,55,0.08)] space-y-7"
        initial={{ opacity: 0, y: 20, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, ease: EASE_OUT_QUART }}
      >
        {/* Sacred Bismillah */}
        <p className="font-serif italic text-sm text-[#881337] tracking-widest">
          بسم الله الرحمن الرحيم
        </p>

        {/* Monogram Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full border border-[#B89358]/50 bg-white/80 shadow-sm mx-auto">
            <GoldKnotIcon className="w-8 h-8 text-[#B89358]" />
          </div>
          <p className="font-sans text-[11px] tracking-[0.3em] uppercase text-[#786C5E] font-semibold">
            A Bespoke Keepsake • For My Wife
          </p>
          <h1 className="font-display text-3xl sm:text-4xl text-[#1C1917] font-normal leading-tight">
            For Sifana
          </h1>
          <p className="font-serif italic text-sm text-[#881337]">
            On your first birthday since our Nikkah • September 3, 2026
          </p>
        </div>

        <div className="w-20 h-px bg-[#B89358]/40 mx-auto" />

        {/* Wax Seal / Tap to Open Button */}
        <div className="space-y-4 pt-1">
          <motion.button
            onClick={handleOpenClick}
            disabled={!isLoaded || isOpening}
            className="group relative inline-flex flex-col items-center cursor-pointer p-3 focus:outline-none"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Tap wax seal to open letter and start romantic melody"
          >
            {/* Glowing Wax Seal Aura */}
            <div className="relative">
              {/* Subtle expanding beacon ring */}
              <motion.div
                className="absolute inset-0 rounded-full bg-[#881337]/20 -z-10"
                animate={
                  shouldReduceMotion
                    ? {}
                    : {
                        scale: [1, 1.45, 1.6],
                        opacity: [0.6, 0.2, 0],
                      }
                }
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
              />

              <motion.div
                className="w-16 h-16 rounded-full bg-[#881337] flex items-center justify-center text-white shadow-[0_8px_24px_rgba(136,19,55,0.35)] group-hover:shadow-[0_12px_28px_rgba(136,19,55,0.5)] transition-shadow border-2 border-[#B89358]/60"
                animate={
                  isOpening
                    ? { scale: [1, 1.35, 0], opacity: [1, 0.8, 0] }
                    : shouldReduceMotion
                    ? {}
                    : { scale: [1, 1.05, 1] }
                }
                transition={{
                  duration: isOpening ? 0.55 : 3,
                  repeat: isOpening ? 0 : Infinity,
                  ease: "easeInOut",
                }}
              >
                <span className="font-serif text-xl text-[#F6EDE2]">❦</span>
              </motion.div>
            </div>

            <span className="font-sans text-xs tracking-[0.25em] uppercase text-[#1C1917] font-semibold mt-4 group-hover:text-[#881337] transition-colors">
              {isOpening ? "Opening with Love..." : "Tap seal to open with love ❦"}
            </span>
          </motion.button>

          {/* Music Notification */}
          <div className="flex items-center justify-center gap-1.5 text-[11px] font-serif italic text-[#786C5E]">
            <span>♫</span>
            <span>Turn sound on • Romantic piano begins on opening</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   LIVE TIME HOOK: COUNTING EVERY SECOND SINCE NIKKAH
   ═══════════════════════════════════════════════════════════════ */

function useLiveMarriageDuration() {
  const nikkahTime = useRef(new Date("2026-07-13T10:00:00+05:30").getTime());
  const [duration, setDuration] = useState({
    days: 52,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const update = () => {
      const now = Date.now();
      const diff = Math.max(0, now - nikkahTime.current);
      const days = Math.max(52, Math.floor(diff / (1000 * 60 * 60 * 24)));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      setDuration({ days, hours, minutes, seconds });
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return duration;
}

/* ═══════════════════════════════════════════════════════════════
   TACTILE 3D PAPER TILT CARD
   ═══════════════════════════════════════════════════════════════ */

function TiltFrame({
  children,
  className = "",
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const shouldReduceMotion = useReducedMotion();

  const mouseXSpring = useSpring(x, { stiffness: 140, damping: 22 });
  const mouseYSpring = useSpring(y, { stiffness: 140, damping: 22 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / rect.width - 0.5);
    y.set(mouseY / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{
        perspective: 1000,
        rotateX: shouldReduceMotion ? 0 : rotateX,
        rotateY: shouldReduceMotion ? 0 : rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   BESPOKE GOLD MOTIFS & DIVIDERS
   ═══════════════════════════════════════════════════════════════ */

function GoldKnotIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx="20" cy="20" r="18" stroke="#B89358" strokeWidth="0.75" strokeDasharray="3 3" />
      <path
        d="M14 20 C14 15, 20 15, 20 20 C20 25, 26 25, 26 20 C26 15, 20 15, 20 20 C20 25, 14 25, 14 20Z"
        stroke="#B89358"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function InteractiveButterfly({
  className = "",
  showWhisper = false,
}: {
  className?: string;
  showWhisper?: boolean;
}) {
  const [isFluttering, setIsFluttering] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const handleFlutter = () => {
    setIsFluttering(true);
    setTimeout(() => setIsFluttering(false), 1400);
  };

  return (
    <div className="relative inline-block group">
      <motion.svg
        viewBox="0 0 60 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${className} cursor-pointer`}
        aria-label="Gold butterfly - tap to flutter"
        role="button"
        tabIndex={0}
        onClick={handleFlutter}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") handleFlutter();
        }}
        animate={
          isFluttering
            ? {
                scale: [1, 1.25, 0.95, 1.15, 1],
                rotate: [0, -12, 12, -6, 0],
              }
            : shouldReduceMotion
              ? {}
              : {
                  scale: [1, 1.05, 1],
                  opacity: [0.85, 1, 0.85],
                }
        }
        transition={{ duration: isFluttering ? 0.9 : 4, repeat: isFluttering ? 0 : Infinity, ease: "easeInOut" }}
      >
        <path
          d="M30 30 C22 12, 4 10, 7 26 C9 35, 20 36, 30 30Z"
          fill="#881337"
          fillOpacity="0.08"
          stroke="#B89358"
          strokeWidth="0.9"
        />
        <path
          d="M30 30 C38 12, 56 10, 53 26 C51 35, 40 36, 30 30Z"
          fill="#881337"
          fillOpacity="0.08"
          stroke="#B89358"
          strokeWidth="0.9"
        />
        <path
          d="M30 30 C22 36, 6 44, 12 34 C15 30, 24 30, 30 30Z"
          fill="#1C1917"
          fillOpacity="0.05"
          stroke="#B89358"
          strokeWidth="0.75"
        />
        <path
          d="M30 30 C38 36, 54 44, 48 34 C45 30, 36 30, 30 30Z"
          fill="#1C1917"
          fillOpacity="0.05"
          stroke="#B89358"
          strokeWidth="0.75"
        />
        <line x1="30" y1="22" x2="30" y2="38" stroke="#881337" strokeWidth="1.2" strokeLinecap="round" />
      </motion.svg>

      {/* Whispering Tooltip */}
      {showWhisper && (
        <AnimatePresence>
          {isFluttering && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.9 }}
              animate={{ opacity: 1, y: -2, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.9 }}
              className="absolute left-1/2 -translate-x-1/2 -top-10 whitespace-nowrap bg-[#881337] text-white text-[11px] font-sans px-3 py-1 rounded-full shadow-lg pointer-events-none z-30"
            >
              My steadfast love, today and always ❦
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}

function SectionDivider({ label }: { label?: string }) {
  return (
    <div className="py-14 flex items-center justify-center gap-4 max-w-xl mx-auto px-6">
      <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#B89358]/40" />
      {label ? (
        <span className="font-sans text-[11px] tracking-[0.3em] uppercase text-[#B89358] font-semibold">
          {label}
        </span>
      ) : (
        <span className="text-[#B89358] text-xs">❦</span>
      )}
      <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#B89358]/40" />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SUBTLE BOTANICAL & FLORAL BACKGROUND ANIMATION
   ═══════════════════════════════════════════════════════════════ */

interface PetalConfig {
  id: number;
  left: string;
  size: number;
  duration: number;
  delay: number;
  type: "rose" | "goldLeaf" | "blossom";
  drift: number;
}

const PETALS_CONFIG: PetalConfig[] = [
  { id: 1, left: "5%", size: 20, duration: 22, delay: 0, type: "rose", drift: 24 },
  { id: 2, left: "14%", size: 16, duration: 28, delay: 6, type: "goldLeaf", drift: -20 },
  { id: 3, left: "25%", size: 24, duration: 20, delay: 11, type: "blossom", drift: 18 },
  { id: 4, left: "36%", size: 18, duration: 25, delay: 3, type: "rose", drift: -22 },
  { id: 5, left: "47%", size: 22, duration: 23, delay: 14, type: "goldLeaf", drift: 26 },
  { id: 6, left: "58%", size: 15, duration: 27, delay: 8, type: "blossom", drift: -16 },
  { id: 7, left: "69%", size: 22, duration: 21, delay: 1, type: "rose", drift: 22 },
  { id: 8, left: "80%", size: 17, duration: 26, delay: 16, type: "goldLeaf", drift: -24 },
  { id: 9, left: "91%", size: 25, duration: 19, delay: 5, type: "rose", drift: 15 },
  { id: 10, left: "10%", size: 21, duration: 24, delay: 18, type: "blossom", drift: 20 },
  { id: 11, left: "53%", size: 16, duration: 30, delay: 10, type: "rose", drift: -18 },
  { id: 12, left: "86%", size: 19, duration: 22, delay: 13, type: "blossom", drift: 25 },
];

function BotanicalBackground() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* SVG Defs for Petal Gradients & Foliage */}
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          {/* Rose Petal Gradient - Richer, soft blush & velvet rose */}
          <linearGradient id="rosePetalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#881337" stopOpacity="0.52" />
            <stop offset="50%" stopColor="#B83A5A" stopOpacity="0.38" />
            <stop offset="100%" stopColor="#EAA8B6" stopOpacity="0.25" />
          </linearGradient>

          {/* Antique Gold Leaf Gradient */}
          <linearGradient id="goldLeafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#9C7738" stopOpacity="0.55" />
            <stop offset="60%" stopColor="#C9A464" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#F5E4C2" stopOpacity="0.25" />
          </linearGradient>

          {/* Blossom White/Gold Gradient */}
          <radialGradient id="blossomGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#B89358" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#F5ECE0" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#C0657B" stopOpacity="0.25" />
          </radialGradient>
        </defs>
      </svg>

      {/* Background Floral Medallion Watermark in Center */}
      <div className="absolute top-32 left-1/2 -translate-x-1/2 w-[700px] h-[700px] pointer-events-none opacity-[0.06] text-[#881337]">
        <svg viewBox="0 0 200 200" fill="none" className="w-full h-full animate-spin-slow">
          <circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="0.75" strokeDasharray="4 6" />
          <circle cx="100" cy="100" r="75" stroke="currentColor" strokeWidth="0.5" />
          {/* 8 Floral Petals radiating from center */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <g key={deg} transform={`rotate(${deg} 100 100)`}>
              <path d="M 100 35 C 92 60, 92 80, 100 95 C 108 80, 108 60, 100 35 Z" fill="currentColor" />
            </g>
          ))}
        </svg>
      </div>

      {/* 1. Subtle Etched Botanical Vines (Corner & Margin Accents) */}
      <div className="absolute top-0 left-0 w-64 h-96 opacity-30 sm:opacity-40 text-[#B89358]">
        <motion.svg
          viewBox="0 0 200 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          animate={shouldReduceMotion ? {} : { rotate: [-0.8, 0.8, -0.8] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "top left" }}
        >
          {/* Cascading botanical bough */}
          <path
            d="M 10 -20 Q 40 80, 20 160 T 60 260"
            stroke="currentColor"
            strokeWidth="0.8"
            strokeDasharray="2 3"
          />
          {/* Leaves along vine */}
          <path d="M 22 50 C 45 40, 55 60, 25 70 C 20 60, 21 52, 22 50 Z" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="0.6" />
          <path d="M 33 110 C 60 100, 70 125, 36 130 C 30 120, 31 112, 33 110 Z" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeWidth="0.6" />
          <path d="M 18 175 C -10 165, -15 190, 16 195 Z" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="0.6" />
          <path d="M 38 220 C 65 210, 70 235, 42 240 Z" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeWidth="0.6" />
          {/* Small floral buds */}
          <circle cx="56" cy="55" r="3" fill="#881337" fillOpacity="0.25" />
          <circle cx="68" cy="115" r="3.5" fill="#881337" fillOpacity="0.22" />
        </motion.svg>
      </div>

      <div className="absolute top-1/4 right-0 w-56 h-80 opacity-25 sm:opacity-35 text-[#B89358]">
        <motion.svg
          viewBox="0 0 180 260"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          animate={shouldReduceMotion ? {} : { rotate: [0.6, -0.6, 0.6] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "top right" }}
        >
          <path
            d="M 190 20 Q 130 90, 150 160 T 110 240"
            stroke="currentColor"
            strokeWidth="0.8"
            strokeDasharray="3 3"
          />
          <path d="M 160 65 C 130 55, 120 78, 155 82 Z" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeWidth="0.6" />
          <path d="M 142 125 C 110 115, 105 140, 140 144 Z" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeWidth="0.6" />
          <path d="M 132 195 C 100 185, 95 210, 130 214 Z" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeWidth="0.6" />
          <circle cx="124" cy="70" r="3" fill="#881337" fillOpacity="0.2" />
          <circle cx="102" cy="130" r="3.5" fill="#881337" fillOpacity="0.18" />
        </motion.svg>
      </div>

      {/* 2. Floating Gentle Petals & Leaves */}
      {!shouldReduceMotion &&
        PETALS_CONFIG.map((p) => (
          <motion.div
            key={p.id}
            className="absolute -top-12"
            style={{
              left: p.left,
              width: p.size,
              height: p.size,
            }}
            animate={{
              y: ["-40px", "115vh"],
              x: [0, p.drift, -p.drift * 0.7, p.drift * 0.5, 0],
              rotate: [0, 140, 260, 360],
              rotateY: [0, 180, 360],
              scale: [0.9, 1.08, 0.92, 1],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "linear",
            }}
          >
            {p.type === "rose" && (
              <svg viewBox="0 0 24 24" className="w-full h-full drop-shadow-sm">
                <path
                  d="M12 2 C6 7, 2 13, 4 19 C6 24, 18 24, 20 19 C22 13, 18 7, 12 2 Z"
                  fill="url(#rosePetalGrad)"
                />
              </svg>
            )}

            {p.type === "goldLeaf" && (
              <svg viewBox="0 0 24 24" className="w-full h-full drop-shadow-sm">
                <path
                  d="M12 2 C6 7, 4 16, 12 22 C20 16, 18 7, 12 2 Z"
                  fill="url(#goldLeafGrad)"
                />
                <line x1="12" y1="4" x2="12" y2="20" stroke="#B89358" strokeWidth="0.6" strokeOpacity="0.4" />
              </svg>
            )}

            {p.type === "blossom" && (
              <svg viewBox="0 0 24 24" className="w-full h-full drop-shadow-sm">
                {/* 4-petal delicate flower */}
                <circle cx="12" cy="12" r="2.5" fill="#B89358" fillOpacity="0.4" />
                <path d="M12 2 C10 6, 10 8, 12 9 C14 8, 14 6, 12 2 Z" fill="url(#blossomGrad)" />
                <path d="M12 22 C10 18, 10 16, 12 15 C14 16, 14 18, 12 22 Z" fill="url(#blossomGrad)" />
                <path d="M2 12 C6 10, 8 10, 9 12 C8 14, 6 14, 2 12 Z" fill="url(#blossomGrad)" />
                <path d="M22 12 C18 10, 16 10, 15 12 C16 14, 18 14, 22 12 Z" fill="url(#blossomGrad)" />
              </svg>
            )}
          </motion.div>
        ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   LIGHTBOX MODAL FOR HIGH-RES PHOTO VIEWING
   ═══════════════════════════════════════════════════════════════ */

interface LightboxState {
  src: string;
  alt: string;
  caption: string;
}

/* ═══════════════════════════════════════════════════════════════
   TOP NAVIGATION BAR (EDITORIAL BRANDING & AUDIO TOGGLE)
   ═══════════════════════════════════════════════════════════════ */

function EditorialNav({
  isPlayingAudio,
  onToggleAudio,
}: {
  isPlayingAudio: boolean;
  onToggleAudio: () => void;
}) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#EADFD4]/70 px-4 sm:px-12 py-3.5">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-2">
        {/* Monogram */}
        <div className="flex items-center gap-2.5">
          <GoldKnotIcon className="w-6 h-6 text-[#B89358]" />
          <span className="font-serif italic text-base sm:text-lg text-[#1C1917] tracking-wider font-medium">
            Sanoof & Sifana
          </span>
        </div>

        {/* Timeline Indicator */}
        <div className="hidden lg:flex items-center gap-2.5 font-sans text-xs tracking-[0.25em] uppercase text-[#881337] bg-[#FAF3EA] px-4 py-1.5 rounded-full border border-[#E8DCCF]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#881337] animate-pulse" />
          <span>July 13, 2026 • 52 Days As Husband & Wife</span>
        </div>

        {/* Right Action: Romantic Audio Toggle & Date */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleAudio}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full border transition-all text-xs font-sans tracking-wider cursor-pointer ${
              isPlayingAudio
                ? "bg-[#881337] text-white border-[#881337] shadow-sm"
                : "bg-white/80 hover:bg-[#FAF3EA] text-[#881337] border-[#B89358]/50"
            }`}
            aria-label={isPlayingAudio ? "Pause romantic music" : "Play romantic music"}
          >
            <span className="text-xs">{isPlayingAudio ? "⏸" : "♫"}</span>
            <span className="text-[11px] font-medium hidden sm:inline">
              {isPlayingAudio ? "Music Playing" : "Play Music"}
            </span>
            {isPlayingAudio && (
              <span className="flex items-center gap-0.5 h-2.5">
                <span className="w-0.5 h-2 bg-white animate-pulse" />
                <span className="w-0.5 h-3 bg-white animate-pulse delay-75" />
                <span className="w-0.5 h-1.5 bg-white animate-pulse delay-150" />
              </span>
            )}
          </button>

          <span className="font-sans text-[11px] sm:text-xs tracking-[0.2em] uppercase text-[#786C5E] font-medium hidden sm:inline">
            September 3 • Sifana’s Birthday
          </span>
        </div>
      </div>
    </nav>
  );
}

/* ═══════════════════════════════════════════════════════════════
   HERO SECTION: BOLD, ASYMMETRICAL EDITORIAL LAYOUT
   ═══════════════════════════════════════════════════════════════ */

function EditorialHero({ onPhotoClick }: { onPhotoClick: (item: LightboxState) => void }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <header className="min-h-screen pt-28 pb-16 px-6 sm:px-12 flex flex-col justify-center relative overflow-hidden bg-gradient-to-b from-[#FAF8F5] via-[#F6F1EA] to-[#FAF8F5]">
      {/* Background radial glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-gradient-to-b from-[#F2DFD0]/45 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Giant Editorial Typography */}
        <div className="lg:col-span-7 text-left space-y-6">
          {/* Bismillah Header */}
          <motion.p
            className="font-serif italic text-base sm:text-lg text-[#881337]/80 tracking-widest"
            initial={shouldReduceMotion ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE_OUT_QUART }}
          >
            بسم الله الرحمن الرحيم
          </motion.p>

          <motion.p
            className="font-sans text-fluid-eyebrow tracking-[0.35em] uppercase text-[#786C5E] font-semibold block"
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            A Birthday Keepsake • Muhammed Sanoof to Sifana
          </motion.p>

          {/* Giant Fashion Serif Headline */}
          <motion.h1
            className="font-display text-fluid-mega text-[#1C1917] font-normal leading-[0.88] tracking-tight"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.35, ease: EASE_OUT_QUART }}
          >
            Sifana.
          </motion.h1>

          <motion.div
            className="w-20 h-0.5 bg-[#B89358]"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          />

          {/* Subhead */}
          <motion.p
            className="font-serif italic text-fluid-lead text-[#881337] max-w-xl leading-relaxed font-normal"
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.1, delay: 0.55 }}
          >
            Your first birthday since our Nikkah on July 13th. Written with total vulnerability, genuine remorse, and unwavering love from my heart to yours.
          </motion.p>

          {/* Pill Highlights */}
          <motion.div
            className="flex flex-wrap items-center gap-3 pt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            <span className="font-sans text-[11px] tracking-[0.2em] uppercase bg-white border border-[#E8DCCF] text-[#1C1917] px-4 py-2 rounded-full shadow-sm font-medium">
              Nikkah: July 13, 2026
            </span>
            <span className="font-sans text-[11px] tracking-[0.2em] uppercase bg-[#881337] text-white px-4 py-2 rounded-full shadow-sm font-medium">
              Day 52 of Our Marriage
            </span>
          </motion.div>
        </div>

        {/* Right Column: Sifana's Radiant Portrait with 3D Tilt */}
        <motion.div
          className="lg:col-span-5 relative"
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.95, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.3, delay: 0.5, ease: EASE_OUT_QUART }}
        >
          <TiltFrame
            className="editorial-frame rounded-t-[10rem] rounded-b-3xl cursor-pointer group relative shadow-2xl"
            onClick={() =>
              onPhotoClick({
                src: "/photos/sifana-portrait.jpg",
                alt: "Sifana smiling in her wedding dress",
                caption: "July 13, 2026 — Sifana on our Nikkah day, radiant in every way.",
              })
            }
          >
            <img
              src="/photos/sifana-portrait.jpg"
              alt="Sifana smiling in her wedding dress"
              loading="eager"
              decoding="async"
              className="w-full aspect-[4/5] object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
            />

            {/* Tap Hint */}
            <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] font-sans tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">
              Tap to view
            </div>

            {/* Bottom Inscription */}
            <div className="absolute bottom-4 left-4 right-4 bg-[#FAF8F5]/92 backdrop-blur-md border border-white/70 p-4 rounded-2xl text-center shadow-lg">
              <span className="font-serif italic text-sm text-[#1C1917] block">
                “July 13, 2026 — The day you became my wife.”
              </span>
              <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-[#881337] mt-1 inline-block font-semibold">
                My Beautiful Wife
              </span>
            </div>
          </TiltFrame>
        </motion.div>
      </div>

      {/* Scroll down prompt */}
      <motion.div
        className="text-center pt-12 flex flex-col items-center gap-1.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 1 }}
      >
        <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#786C5E] font-medium">
          Read with an open heart
        </span>
        <span className="text-[#B89358] text-xs animate-bounce">↓</span>
      </motion.div>
    </header>
  );
}

/* ═══════════════════════════════════════════════════════════════
   LIVE SACRED TICKER (DAY 52 & COUNTING EVERY SECOND)
   ═══════════════════════════════════════════════════════════════ */

function SacredUnionTimeline() {
  const duration = useLiveMarriageDuration();
  const shouldReduceMotion = useReducedMotion();

  const timeUnits = [
    { label: "Days", val: duration.days, sub: "Since July 13, 2026" },
    { label: "Hours", val: String(duration.hours).padStart(2, "0"), sub: "Of Sacred Vows" },
    { label: "Minutes", val: String(duration.minutes).padStart(2, "0"), sub: "Choosing You" },
    { label: "Seconds", val: String(duration.seconds).padStart(2, "0"), sub: "And Every Tomorrow" },
  ];

  return (
    <section className="py-12 px-6 sm:px-12 max-w-5xl mx-auto border-y border-[#EADFD4]/80">
      <div className="text-center mb-6 space-y-1">
        <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#881337] font-semibold block">
          52 Days of Sacred Marriage
        </span>
        <p className="font-serif italic text-sm sm:text-base text-[#5C4F44]">
          Counting every single second as husband and wife — since July 13, 2026 until eternity.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
        {timeUnits.map((s, i) => (
          <div
            key={i}
            className="p-5 bg-white/70 backdrop-blur-sm rounded-2xl border border-[#E8DCCF]/70 shadow-sm"
          >
            <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-[#786C5E] font-semibold block mb-1">
              {s.label}
            </span>
            <motion.span
              key={s.label === "Seconds" ? s.val : undefined}
              initial={s.label === "Seconds" && !shouldReduceMotion ? { opacity: 0.6, y: -2 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, ease: EASE_OUT_QUART }}
              className="font-display text-3xl sm:text-4xl text-[#881337] font-normal block font-variant-numeric tabular-nums"
            >
              {s.val}
            </motion.span>
            <span className="font-serif italic text-xs text-[#786C5E] block mt-1">
              {s.sub}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CHAPTER I: THE APOLOGY & THE STEPPING INTO OUR LIFE
   ═══════════════════════════════════════════════════════════════ */

function ChapterOneApology({ onPhotoClick }: { onPhotoClick: (item: LightboxState) => void }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="py-24 px-6 sm:px-12 max-w-6xl mx-auto">
      <SectionDivider label="Chapter I" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Photo of them stepping down together with 3D tilt */}
        <motion.div
          className="lg:col-span-5"
          initial={shouldReduceMotion ? false : { opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 1.1, ease: EASE_OUT_QUART }}
        >
          <TiltFrame
            className="editorial-frame relative group cursor-pointer shadow-xl"
            onClick={() =>
              onPhotoClick({
                src: "/photos/together-steps.jpg",
                alt: "Sanoof and Sifana walking down steps together",
                caption: "July 13, 2026 — Holding your hand as we walked into our marriage.",
              })
            }
          >
            <img
              src="/photos/together-steps.jpg"
              alt="Sanoof and Sifana walking down steps together"
              loading="lazy"
              decoding="async"
              className="w-full aspect-[4/5] object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-5 left-5 right-5 text-white">
              <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-[#FAF8F5]/80 block mb-1">
                July 13, 2026
              </span>
              <p className="font-serif italic text-base leading-snug">
                Holding your hand on the day we began our life together.
              </p>
            </div>
            <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md text-white px-2.5 py-1 rounded-full text-[9px] font-sans tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">
              Tap to expand
            </div>
          </TiltFrame>
        </motion.div>

        {/* Right Column: The Words of Apology */}
        <motion.div
          className="lg:col-span-7 space-y-6"
          initial={shouldReduceMotion ? false : { opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 1.1, ease: EASE_OUT_QUART }}
        >
          <span className="font-sans text-fluid-eyebrow tracking-[0.3em] uppercase text-[#881337] font-semibold block">
            52 Days as Husband & Wife
          </span>

          <h2 className="font-display text-fluid-h2 text-[#1C1917] font-normal leading-tight">
            Happy birthday, my love.
          </h2>

          <div className="w-16 h-0.5 bg-[#B89358]" />

          <p className="font-serif text-fluid-body text-[#3E3834] leading-relaxed">
            Your birthday feels especially important to me because this is your first birthday after our nikkah, and I want to make it as beautiful, peaceful, and special as you deserve.
          </p>

          <div className="p-6 bg-[#FAF3EA] border-l-4 border-[#881337] rounded-r-2xl shadow-sm">
            <p className="font-serif italic text-fluid-lead text-[#881337] font-medium leading-snug">
              “But before anything else, I want to say I’m sorry.”
            </p>
          </div>

          <p className="font-serif text-fluid-body text-[#3E3834] leading-relaxed">
            I’m sorry for the way I’ve been lately. I’m sorry for being distant, for not giving you the attention and affection you deserve, for the times I’ve been quiet when you needed me, and for making you feel like I’ve lost interest in you or that my feelings for you have changed.
          </p>

          <p className="font-serif text-fluid-body text-[#3E3834] leading-relaxed">
            I know that my actions can speak much louder than what I have in my heart, and lately, my actions haven’t shown you the love I still have for you. For that, I’m genuinely sorry.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CHAPTER II: THE GRIEF & CLASPED HENNA HANDS
   ═══════════════════════════════════════════════════════════════ */

function ChapterTwoGrief({ onPhotoClick }: { onPhotoClick: (item: LightboxState) => void }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="py-28 px-6 sm:px-12 bg-[#F5EFE6] relative overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <SectionDivider label="Chapter II" />

        {/* Central Standout Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="font-sans text-fluid-eyebrow tracking-[0.3em] uppercase text-[#786C5E] font-medium">
            Carrying the Unspoken Weight
          </span>
          <h2 className="font-display text-fluid-h2 text-[#1C1917] font-normal leading-tight">
            Understanding My Silence
          </h2>
          <p className="font-serif italic text-fluid-lead text-[#881337]">
            The truth of what has been happening inside me since I lost Umma.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Text */}
          <motion.div
            className="lg:col-span-7 space-y-6"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.1, ease: EASE_OUT_QUART }}
          >
            <p className="font-serif text-fluid-body text-[#292524] leading-relaxed">
              Since I lost Umma, I’ve been struggling to understand myself. The grief has consumed so much of me that sometimes I don’t have the energy to be the person I used to be. I’ve become quiet, distant, easily irritated and emotionally numb. And unfortunately, you’ve had to experience that side of me even though you don’t deserve it.
            </p>

            {/* Sacred Standout Pull-Quote */}
            <div className="my-8 py-6 border-y border-[#B89358]/35 space-y-3">
              <h3 className="font-display text-fluid-h3 text-[#881337] leading-snug font-normal">
                “But please don’t ever mistake my silence or my distance for a lack of love.”
              </h3>
              <p className="font-serif italic text-fluid-lead text-[#1C1917] font-medium">
                I haven’t stopped loving you. I haven’t lost interest in you. My feelings for you haven’t changed.
              </p>
            </div>

            <p className="font-serif text-fluid-body text-[#292524] leading-relaxed">
              I’m just hurting, and sometimes I don’t know how to carry that pain and still be the husband I want to be for you. I know that doesn’t make the hurt I’ve caused you disappear, and I’m not using my grief as an excuse. I just want you to understand what has been happening inside me.
            </p>

            <p className="font-serif text-fluid-body text-[#292524] leading-relaxed">
              Losing Umma on July 14th, the very next day after our nikkah, shattered my heart in ways I still cannot explain. And I’m so deeply sorry that instead of being able to give you the joyful beginning and attention you deserved as a new bride, you’ve had to see me struggling, distant, and hurting like this.
            </p>
          </motion.div>

          {/* Right: Macro Photo of Clasped Hands & Henna with 3D Tilt */}
          <motion.div
            className="lg:col-span-5"
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.2, ease: EASE_OUT_QUART }}
          >
            <TiltFrame
              className="editorial-frame relative group cursor-pointer shadow-xl"
              onClick={() =>
                onPhotoClick({
                  src: "/photos/hands-nikkah.jpg",
                  alt: "Sanoof holding Sifana's henna-adorned hand with wedding ring",
                  caption: "July 13, 2026 — Bound together before Allah. Even in my quietest days, my heart has remained tied to yours.",
                })
              }
            >
              <img
                src="/photos/hands-nikkah.jpg"
                alt="Sanoof holding Sifana's henna-adorned hand with wedding ring"
                loading="lazy"
                decoding="async"
                className="w-full aspect-[4/5] object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="p-4 bg-[#FAF8F5]/95 text-center border-t border-[#E8DCCF]">
                <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-[#881337] block font-semibold mb-1">
                  Sacred Vows
                </span>
                <span className="font-serif italic text-xs text-[#5C4F44]">
                  In every silence, my heart has remained tied to yours.
                </span>
              </div>
              <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md text-white px-2.5 py-1 rounded-full text-[9px] font-sans tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                Tap to expand
              </div>
            </TiltFrame>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CHAPTER III: MY BUTTERFLY IN THE GARDEN (WITH WHISPER DELIGHT)
   ═══════════════════════════════════════════════════════════════ */

function ChapterThreeButterfly({ onPhotoClick }: { onPhotoClick: (item: LightboxState) => void }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="py-24 px-6 sm:px-12 max-w-6xl mx-auto">
      <SectionDivider label="Chapter III" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left: Sifana in the Garden Photo with 3D Tilt */}
        <motion.div
          className="lg:col-span-5 order-2 lg:order-1"
          initial={shouldReduceMotion ? false : { opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 1.1, ease: EASE_OUT_QUART }}
        >
          <TiltFrame
            className="editorial-frame relative group cursor-pointer shadow-xl"
            onClick={() =>
              onPhotoClick({
                src: "/photos/sifana-garden.jpg",
                alt: "Sifana smiling gracefully in the garden",
                caption: "Sifana — My butterfly, radiant, patient, and full of grace.",
              })
            }
          >
            <img
              src="/photos/sifana-garden.jpg"
              alt="Sifana smiling gracefully in the garden"
              loading="lazy"
              decoding="async"
              className="w-full aspect-[3/4] object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute bottom-5 left-5 right-5 bg-white/92 backdrop-blur-md p-4 rounded-xl text-center shadow-md">
              <span className="font-serif italic text-fluid-body text-[#1C1917] block">
                “Radiant, patient, and full of grace.”
              </span>
              <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-[#B89358] font-semibold mt-1 block">
                My Butterfly
              </span>
            </div>
            <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md text-white px-2.5 py-1 rounded-full text-[9px] font-sans tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">
              Tap to expand
            </div>
          </TiltFrame>
        </motion.div>

        {/* Right: The Words of Reassurance & Devotion */}
        <motion.div
          className="lg:col-span-7 order-1 lg:order-2 space-y-6"
          initial={shouldReduceMotion ? false : { opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 1.1, ease: EASE_OUT_QUART }}
        >
          <span className="font-sans text-fluid-eyebrow tracking-[0.3em] uppercase text-[#881337] font-semibold block">
            Enduring Devotion
          </span>

          <h2 className="font-display text-fluid-h2 text-[#1C1917] font-normal leading-tight">
            I Still Choose You.
          </h2>

          <div className="w-16 h-0.5 bg-[#B89358]" />

          <p className="font-serif text-fluid-body text-[#3E3834] leading-relaxed">
            Thank you for being patient with me, even when I haven’t made it easy.
          </p>

          <div className="p-8 bg-white border border-[#E8DCCF] rounded-2xl shadow-sm space-y-4">
            <p className="font-display text-fluid-lead text-[#881337] leading-relaxed font-normal">
              “I want you to know that I still choose you. I still want you. I still want a life with you. And I still look at you as the person I want beside me through everything life brings.”
            </p>
            <p className="font-serif italic text-fluid-body text-[#5C4F44]">
              Today is your day, and I don’t want my sadness to take that away from you.
            </p>
          </div>

          <div className="pt-4 flex items-center gap-4">
            <InteractiveButterfly className="w-14 h-14 flex-shrink-0" showWhisper={true} />
            <div>
              <h3 className="font-display text-fluid-h3 text-[#881337] font-normal tracking-tight">
                Happy birthday, My butterfly.
              </h3>
              <span className="font-sans text-xs tracking-[0.2em] uppercase text-[#786C5E]">
                Tap the butterfly • With every piece of my heart
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CHAPTER IV: JULY 13TH, 2026 & OUR SACRED DU'A
   ═══════════════════════════════════════════════════════════════ */

function ChapterFourBlessing({ onPhotoClick }: { onPhotoClick: (item: LightboxState) => void }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="py-28 px-6 sm:px-12 bg-gradient-to-b from-[#FAF8F5] via-[#F2ECE4] to-[#FAF8F5]">
      <div className="max-w-5xl mx-auto text-center space-y-12">
        <SectionDivider label="Chapter IV" />

        {/* Big Portrait of Sanoof & Sifana Together with 3D Tilt */}
        <motion.div
          className="max-w-3xl mx-auto"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.2, ease: EASE_OUT_QUART }}
        >
          <TiltFrame
            className="editorial-frame shadow-2xl relative group cursor-pointer"
            onClick={() =>
              onPhotoClick({
                src: "/photos/together-portrait.jpg",
                alt: "Sanoof and Sifana standing together peacefully on their Nikkah day",
                caption: "July 13, 2026 — Muhammed Sanoof & Sifana. May Allah bless our marriage with love, understanding and sakinah.",
              })
            }
          >
            <img
              src="/photos/together-portrait.jpg"
              alt="Sanoof and Sifana standing together peacefully on their Nikkah day"
              loading="lazy"
              decoding="async"
              className="w-full aspect-[4/5] sm:aspect-[16/11] object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 right-6 text-white text-center">
              <span className="font-sans text-[11px] tracking-[0.3em] uppercase text-[#F5EFE6]/90 block mb-1">
                July 13, 2026 • Muhammed Sanoof & Sifana
              </span>
              <p className="font-serif italic text-lg sm:text-xl">
                “Bless our marriage with love, understanding and sakinah.”
              </p>
            </div>
            <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md text-white px-2.5 py-1 rounded-full text-[9px] font-sans tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">
              Tap to expand
            </div>
          </TiltFrame>
        </motion.div>

        {/* Du'a and Vow */}
        <motion.div
          className="max-w-3xl mx-auto editorial-card p-8 sm:p-14 space-y-8"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 1.1, ease: EASE_OUT_QUART }}
        >
          <span className="font-sans text-fluid-eyebrow tracking-[0.3em] uppercase text-[#881337] font-semibold block">
            A Du’a for My Wife
          </span>

          <p className="font-serif text-fluid-lead text-[#1C1917] leading-relaxed font-normal">
            May Allah bless you with a long life filled with happiness, peace, good health, barakah and everything your heart wishes for. May He protect you, keep you smiling, and bless our marriage with love, understanding and sakinah.
          </p>

          <div className="w-24 h-px bg-[#B89358]/50 mx-auto" />

          <p className="font-serif italic text-fluid-body text-[#5C4F44]">
            I’m sorry for the ways I’ve hurt you. I’m sorry for making you question my love.
          </p>

          <h3 className="font-display text-fluid-h2 text-[#881337] font-normal tracking-tight">
            And most importantly, I love you. I always have, and I still do.
          </h3>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   DELIGHT: "MAKE A BIRTHDAY WISH" CANDLE RITUAL
   ═══════════════════════════════════════════════════════════════ */

function BirthdayCandleRitual() {
  const [wishSealed, setWishSealed] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const handleMakeWish = () => {
    setWishSealed(true);
  };

  return (
    <div className="my-16 p-8 sm:p-12 bg-white/75 border border-[#EADFD4] rounded-3xl text-center space-y-5 shadow-sm relative overflow-hidden">
      {/* Background warm shimmer */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FAF3EA]/50 to-transparent pointer-events-none" />

      <div className="relative z-10 space-y-4">
        <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#881337] font-semibold block">
          A Sacred Birthday Ritual • September 3, 2026
        </span>
        <h3 className="font-display text-fluid-h3 text-[#1C1917] font-normal">
          Make a Wish, My Butterfly
        </h3>

        {!wishSealed ? (
          <>
            <p className="font-serif italic text-fluid-body text-[#5C4F44] max-w-md mx-auto leading-relaxed">
              Close your eyes, make a silent wish for our marriage and our future, then tap the flame to seal your prayer with Allah.
            </p>

            {/* Photorealistic Luxury Candle with Flickering Flame & Melted Wax */}
            <div className="pt-4 flex justify-center">
              <button
                onClick={handleMakeWish}
                className="group flex flex-col items-center cursor-pointer p-4 rounded-3xl hover:bg-[#FAF3EA]/60 transition-all focus:outline-none focus:ring-2 focus:ring-[#B89358]/40"
                aria-label="Tap flame to seal your birthday wish"
              >
                {/* SVG Realistic Candle */}
                <div className="relative w-36 h-48 flex items-center justify-center select-none">
                  {/* Ambient Light Bloom from Flame */}
                  <motion.div
                    className="absolute top-2 w-28 h-28 rounded-full bg-gradient-to-t from-[#FFA000]/25 via-[#FFE082]/35 to-transparent blur-xl pointer-events-none"
                    animate={
                      shouldReduceMotion
                        ? {}
                        : {
                            scale: [1, 1.15, 0.95, 1.1, 1],
                            opacity: [0.65, 0.95, 0.7, 0.9, 0.65],
                          }
                    }
                    transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                  />

                  <svg
                    viewBox="0 0 140 180"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full filter drop-shadow-md"
                  >
                    <defs>
                      {/* Wax Cylinder 3D Shading Gradient */}
                      <linearGradient id="waxCylinderGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#C4B4A0" />
                        <stop offset="14%" stopColor="#EDE4D8" />
                        <stop offset="38%" stopColor="#FFFDFB" />
                        <stop offset="70%" stopColor="#E8DDCE" />
                        <stop offset="90%" stopColor="#D9CBB9" />
                        <stop offset="100%" stopColor="#B3A18C" />
                      </linearGradient>

                      {/* Melted Wax Rim Ellipse Gradient */}
                      <radialGradient id="moltenWaxPool" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#FFF3D6" />
                        <stop offset="45%" stopColor="#F5E8D3" />
                        <stop offset="85%" stopColor="#DECDB8" />
                        <stop offset="100%" stopColor="#BAA790" />
                      </radialGradient>

                      {/* Brass Holder Gradient */}
                      <linearGradient id="brassHolderGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#876831" />
                        <stop offset="25%" stopColor="#D8BA7A" />
                        <stop offset="45%" stopColor="#FCE4AA" />
                        <stop offset="70%" stopColor="#BA974D" />
                        <stop offset="100%" stopColor="#6E5121" />
                      </linearGradient>

                      {/* Flame Outer Gradient */}
                      <linearGradient id="flameOuterGrad" x1="50%" y1="100%" x2="50%" y2="0%">
                        <stop offset="0%" stopColor="#E64A19" />
                        <stop offset="28%" stopColor="#FF9100" />
                        <stop offset="70%" stopColor="#FFD54F" />
                        <stop offset="95%" stopColor="#FFFDE7" />
                        <stop offset="100%" stopColor="#FFFFFF" />
                      </linearGradient>

                      {/* Flame Inner Core Gradient */}
                      <linearGradient id="flameCoreGrad" x1="50%" y1="100%" x2="50%" y2="0%">
                        <stop offset="0%" stopColor="#FF6D00" />
                        <stop offset="35%" stopColor="#FFD600" />
                        <stop offset="75%" stopColor="#FFFDE7" />
                        <stop offset="100%" stopColor="#FFFFFF" />
                      </linearGradient>

                      {/* Blue Base Flame Gradient */}
                      <radialGradient id="flameBlueBase" cx="50%" cy="80%" r="60%">
                        <stop offset="0%" stopColor="#2979FF" stopOpacity="0.85" />
                        <stop offset="60%" stopColor="#00B0FF" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#00E5FF" stopOpacity="0" />
                      </radialGradient>
                    </defs>

                    {/* 1. Cast Shadow on Table/Card */}
                    <ellipse cx="70" cy="166" rx="42" ry="7" fill="#1C1917" fillOpacity="0.12" />

                    {/* 2. Antique Brass Saucer / Holder Base */}
                    <ellipse cx="70" cy="160" rx="38" ry="6.5" fill="url(#brassHolderGrad)" />
                    <ellipse cx="70" cy="159" rx="34" ry="5" fill="#5C4217" />
                    <ellipse cx="70" cy="158" rx="33" ry="4.5" fill="url(#brassHolderGrad)" />

                    {/* 3. Candle Pillar Body with 3D Cylindrical Shading */}
                    <path
                      d="M 45 92 
                         C 45 88, 48 87, 70 87 
                         C 92 87, 95 88, 95 92 
                         L 95 155 
                         C 95 159, 90 162, 70 162 
                         C 50 162, 45 159, 45 155 
                         Z"
                      fill="url(#waxCylinderGrad)"
                    />

                    {/* 4. Organic Wax Drip running down left side */}
                    <path
                      d="M 45 94 
                         C 43 98, 43 112, 46 114 
                         C 47.5 115, 49 113, 48 108 
                         C 47 103, 46 96, 45 94 Z"
                      fill="#FFFDFB"
                      fillOpacity="0.9"
                    />

                    {/* 5. Melted Wax Rim Pool (Top Concave Depression) */}
                    <ellipse cx="70" cy="91" rx="25" ry="6" fill="url(#moltenWaxPool)" stroke="#BFAFA0" strokeWidth="0.6" />
                    {/* Inner hot liquid wax sheen */}
                    <ellipse cx="70" cy="91.5" rx="19" ry="4" fill="#FFE8B2" fillOpacity="0.65" />

                    {/* 6. Braided Charcoal Wick */}
                    {/* Lower wick in wax */}
                    <path
                      d="M 70 93 Q 69.5 83 71.5 76"
                      stroke="#211E1B"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                    />
                    {/* Glowing Ember Tip at Wick Peak */}
                    <circle cx="71.5" cy="76" r="1.6" fill="#FF3D00" />
                    <circle cx="71.5" cy="76" r="3.2" fill="#FF6D00" fillOpacity="0.5" />

                    {/* 7. Realistic Flickering Flame Group */}
                    <g transform="translate(0, 0)">
                      <motion.g
                        style={{ transformOrigin: "71.5px 76px" }}
                        animate={
                          shouldReduceMotion
                            ? {}
                            : {
                                scaleY: [1, 1.12, 0.94, 1.08, 1],
                                scaleX: [1, 0.93, 1.06, 0.95, 1],
                                rotate: [-1.8, 2.2, -1.2, 1.6, 0],
                                skewX: [-2, 1.8, -1, 1.5, 0],
                              }
                        }
                        transition={{
                          duration: 1.8,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        {/* Outer Licking Flame Teardrop */}
                        <path
                          d="M 71.5 35 
                             C 64 50, 57 63, 62 73 
                             C 65 78, 78 78, 81 73 
                             C 86 63, 79 50, 71.5 35 Z"
                          fill="url(#flameOuterGrad)"
                        />

                        {/* Inner High-Heat Core Teardrop */}
                        <path
                          d="M 71.5 44 
                             C 66 54, 62 64, 65 72 
                             C 67 76, 76 76, 78 72 
                             C 81 64, 77 54, 71.5 44 Z"
                          fill="url(#flameCoreGrad)"
                        />

                        {/* White-Hot Center Nucleus */}
                        <path
                          d="M 71.5 52 
                             C 68 59, 66 66, 68 71 
                             C 69 74, 74 74, 75 71 
                             C 77 66, 75 59, 71.5 52 Z"
                          fill="#FFFFFF"
                          fillOpacity="0.95"
                        />

                        {/* Rich Blue Base Flame (Oxygen Zone) */}
                        <ellipse cx="71.5" cy="74.5" rx="6.5" ry="3.5" fill="url(#flameBlueBase)" />
                      </motion.g>
                    </g>
                  </svg>
                </div>

                <div className="flex flex-col items-center mt-2 space-y-0.5">
                  <span className="font-sans text-[11px] tracking-[0.25em] uppercase text-[#881337] font-semibold group-hover:text-[#6a0e2a] transition-colors">
                    Tap to Seal Wish
                  </span>
                  <span className="font-serif italic text-xs text-[#786C5E]">
                    Blow out the flame with love
                  </span>
                </div>
              </button>
            </div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE_OUT_QUART }}
            className="p-8 bg-[#FAF3EA]/90 rounded-2xl border border-[#B89358]/35 space-y-4 max-w-lg mx-auto shadow-sm"
          >
            <div className="space-y-1">
              <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-[#881337] font-semibold block">
                Your Wish is Sealed ❦
              </span>
              <span className="font-serif italic text-sm text-[#786C5E] block">
                بسم الله الرحمن الرحيم
              </span>
            </div>

            <p className="font-display text-fluid-lead text-[#1C1917] font-normal leading-relaxed">
              “May Allah answer every silent prayer of your heart, preserve the light in your eyes, and fill our marriage with everlasting love, understanding, and sakinah. Ameen.”
            </p>

            <div className="pt-2 border-t border-[#B89358]/20">
              <button
                onClick={() => setWishSealed(false)}
                className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#786C5E] hover:text-[#881337] underline underline-offset-4 cursor-pointer transition-colors"
              >
                Make Another Wish
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CHAPTER V: "FOR ALL OUR TOMORROWS"
   ═══════════════════════════════════════════════════════════════ */

interface PromiseItem {
  number: string;
  title: string;
  text: string;
}

const promises: PromiseItem[] = [
  {
    number: "I",
    title: "The Promise of Presence",
    text: "I promise to be truly here with you. To put away my silence, to listen when you speak, and to make sure in every small action and word that you know you are cherished, admired, and prioritized.",
  },
  {
    number: "II",
    title: "The Promise of Shared Healing",
    text: "I promise to let you in. When grief or hardship weighs heavily, I will share it with you rather than retreat into emotional numbness. Our marriage will be our sanctuary and safe haven, never our distance.",
  },
  {
    number: "III",
    title: "The Promise of Sakinah",
    text: "I promise to choose you every morning, to pray for you every night, and to treat our union as the sacred gift it is. Through joy and sorrow, ease and hardship, I will stand beside you as your steadfast husband.",
  },
];

function ForAllOurTomorrows() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const shouldReduceMotion = useReducedMotion();

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-24 px-6 sm:px-12 max-w-3xl mx-auto">
      <SectionDivider label="Chapter V" />

      <div className="text-center mb-14 space-y-3">
        <span className="font-sans text-fluid-eyebrow tracking-[0.3em] uppercase text-[#881337] font-semibold block">
          For All Our Tomorrows
        </span>
        <h2 className="font-display text-fluid-h2 text-[#1C1917] font-normal">
          Three Promises for Our Marriage
        </h2>
        <p className="font-serif italic text-fluid-body text-[#5C4F44]">
          Tap each seal to unfold a lifelong promise from my heart to yours.
        </p>
      </div>

      <div className="space-y-4">
        {promises.map((p, idx) => {
          const isOpen = openIndex === idx;

          return (
            <motion.div
              key={idx}
              role="button"
              tabIndex={0}
              aria-expanded={isOpen}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#B89358]/50 ${
                isOpen
                  ? "bg-white border-[#B89358] shadow-[0_12px_28px_-6px_rgba(184,147,88,0.18)]"
                  : "bg-[#FAF8F5] border-[#EADFD4] hover:border-[#B89358]/50"
              }`}
              onClick={() => toggle(idx)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  toggle(idx);
                }
              }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <div className="p-6 sm:p-7 flex items-center justify-between gap-4 select-none">
                <div className="flex items-center gap-4">
                  <span
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-serif text-sm font-semibold transition-colors duration-300 ${
                      isOpen
                        ? "bg-[#881337] text-white shadow-sm"
                        : "border border-[#B89358]/60 text-[#881337]"
                    }`}
                  >
                    {p.number}
                  </span>
                  <h3 className="font-display text-fluid-lead font-medium text-[#1C1917]">
                    {p.title}
                  </h3>
                </div>
                <motion.span
                  className="text-xs text-[#B89358] font-serif"
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.35, ease: EASE_OUT_QUART }}
                >
                  ▼
                </motion.span>
              </div>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                      duration: shouldReduceMotion ? 0.05 : 0.45,
                      ease: EASE_OUT_QUART,
                    }}
                  >
                    <div className="px-6 sm:px-7 pb-7 pt-1 border-t border-[#B89358]/15 text-[#3E3834] font-serif text-fluid-body leading-relaxed">
                      {p.text}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Birthday Wish Candle Ritual */}
      <BirthdayCandleRitual />

      {/* Closing Signature */}
      <div className="text-center mt-16 pt-10 border-t border-[#B89358]/25 space-y-2">
        <InteractiveButterfly className="w-12 h-12 mx-auto mb-4" showWhisper={true} />
        <p className="font-serif italic text-fluid-body text-[#1C1917]">
          Forever yours, with all my love, apology, and devotion,
        </p>
        <p className="font-display text-fluid-h3 text-[#881337] font-normal">
          Muhammed Sanoof
        </p>
        <p className="font-sans text-[11px] tracking-[0.25em] uppercase text-[#786C5E] pt-2 font-medium">
          July 13, 2026 — To Eternity
        </p>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   LIGHTBOX DIALOG
   ═══════════════════════════════════════════════════════════════ */

function LightboxModal({
  lightbox,
  onClose,
}: {
  lightbox: LightboxState | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!lightbox) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightbox, onClose]);

  if (!lightbox) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="relative max-w-2xl w-full bg-[#FAF8F5] rounded-2xl overflow-hidden shadow-2xl border border-white/20"
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.92, opacity: 0 }}
          transition={{ duration: 0.3, ease: EASE_OUT_QUART }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-11 h-11 rounded-full bg-black/60 text-white flex items-center justify-center text-sm hover:bg-black/80 transition-colors cursor-pointer"
            aria-label="Close photo"
          >
            ✕
          </button>
          <img
            src={lightbox.src}
            alt={lightbox.alt}
            className="w-full max-h-[72vh] object-contain bg-[#1C1917]"
          />
          <div className="p-5 text-center bg-[#FAF8F5]">
            <p className="font-serif italic text-fluid-body text-[#1C1917]">
              {lightbox.caption}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SCROLL PROGRESS & SCROLL TO TOP
   ═══════════════════════════════════════════════════════════════ */

function ScrollCompanion() {
  const { scrollYProgress } = useScroll();
  const [showTop, setShowTop] = useState(false);

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 28,
    restDelta: 0.001,
  });

  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      setShowTop(v > 0.25);
    });
  }, [scrollYProgress]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2.5px] z-50 origin-left pointer-events-none"
        style={{
          scaleX,
          background: "linear-gradient(90deg, #881337 0%, #B89358 60%, #1C1917 100%)",
        }}
        aria-hidden="true"
      />

      <AnimatePresence>
        {showTop && (
          <motion.button
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-[#FAF8F5]/90 border border-[#B89358]/50 text-[#881337] flex items-center justify-center shadow-lg backdrop-blur-md cursor-pointer hover:bg-white hover:scale-105 transition-all"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            aria-label="Scroll back to top"
          >
            <span className="font-serif text-sm font-semibold">▲</span>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN APPLICATION
   ═══════════════════════════════════════════════════════════════ */

export default function App() {
  const [isOpened, setIsOpened] = useState(false);
  const [activeLightbox, setActiveLightbox] = useState<LightboxState | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleOpen = () => {
    setIsOpened(true);
    if (audioRef.current) {
      audioRef.current.volume = 0;
      audioRef.current
        .play()
        .then(() => {
          setIsPlayingAudio(true);
          // Soft volume fade-in over 2 seconds
          let vol = 0;
          const interval = setInterval(() => {
            if (!audioRef.current) return;
            vol = Math.min(0.42, vol + 0.04);
            audioRef.current.volume = vol;
            if (vol >= 0.42) clearInterval(interval);
          }, 120);
        })
        .catch(() => {
          // Autoplay policy fallback
        });
    }
  };

  const handleToggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlayingAudio) {
      audioRef.current.pause();
      setIsPlayingAudio(false);
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsPlayingAudio(true);
        })
        .catch(() => {});
    }
  };

  return (
    <div className="min-h-screen relative font-serif text-[#1C1917] bg-[#FAF8F5] selection:bg-[#881337]/15">
      {/* Background Audio Element with Pixabay Romantic Track */}
      <audio
        ref={audioRef}
        src="/audio/romantic.mp3"
        loop
        preload="auto"
      />

      {/* Subtle Botanical & Floral Background Animations */}
      <BotanicalBackground />

      <AnimatePresence>
        {!isOpened && <StarterScreen onOpen={handleOpen} />}
      </AnimatePresence>

      <EditorialNav
        isPlayingAudio={isPlayingAudio}
        onToggleAudio={handleToggleAudio}
      />
      <ScrollCompanion />

      <main className="relative z-10">
        <EditorialHero onPhotoClick={setActiveLightbox} />
        <SacredUnionTimeline />
        <ChapterOneApology onPhotoClick={setActiveLightbox} />
        <ChapterTwoGrief onPhotoClick={setActiveLightbox} />
        <ChapterThreeButterfly onPhotoClick={setActiveLightbox} />
        <ChapterFourBlessing onPhotoClick={setActiveLightbox} />
        <ForAllOurTomorrows />
      </main>

      <LightboxModal
        lightbox={activeLightbox}
        onClose={() => setActiveLightbox(null)}
      />
    </div>
  );
}
