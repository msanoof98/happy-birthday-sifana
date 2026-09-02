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
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full border border-[#B89358]/50 bg-white/80 shadow-sm mx-auto p-2">
            <BotanicalRose className="w-full h-full" />
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
    setTimeout(() => setIsFluttering(false), 1600);
  };

  return (
    <div className="relative inline-block group select-none">
      <motion.div
        animate={
          isFluttering
            ? {
                scale: [1, 1.28, 0.92, 1.15, 1],
                y: [0, -14, -4, -10, 0],
                rotate: [0, -14, 14, -6, 0],
              }
            : shouldReduceMotion
            ? {}
            : {
                y: [-3, 3, -3],
                rotate: [-2, 2, -2],
              }
        }
        transition={{
          duration: isFluttering ? 1.2 : 4.5,
          repeat: isFluttering ? 0 : Infinity,
          ease: "easeInOut",
        }}
        className="cursor-pointer p-1.5 focus:outline-none"
        role="button"
        tabIndex={0}
        onClick={handleFlutter}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") handleFlutter();
        }}
        aria-label="Gold butterfly - tap to flutter and whisper"
      >
        <svg
          viewBox="0 0 60 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`${className} filter drop-shadow-sm`}
        >
          {/* Upper Left Wing */}
          <motion.path
            d="M30 30 C22 12, 4 10, 7 26 C9 35, 20 36, 30 30Z"
            fill="#881337"
            fillOpacity="0.1"
            stroke="#B89358"
            strokeWidth="0.9"
            animate={isFluttering ? { rotateY: [0, 55, -20, 45, 0] } : {}}
            transition={{ duration: 0.5, repeat: isFluttering ? 2 : 0 }}
            style={{ transformOrigin: "30px 30px" }}
          />
          {/* Upper Right Wing */}
          <motion.path
            d="M30 30 C38 12, 56 10, 53 26 C51 35, 40 36, 30 30Z"
            fill="#881337"
            fillOpacity="0.1"
            stroke="#B89358"
            strokeWidth="0.9"
            animate={isFluttering ? { rotateY: [0, -55, 20, -45, 0] } : {}}
            transition={{ duration: 0.5, repeat: isFluttering ? 2 : 0 }}
            style={{ transformOrigin: "30px 30px" }}
          />
          {/* Lower Left Wing */}
          <path
            d="M30 30 C22 36, 6 44, 12 34 C15 30, 24 30, 30 30Z"
            fill="#1C1917"
            fillOpacity="0.06"
            stroke="#B89358"
            strokeWidth="0.75"
          />
          {/* Lower Right Wing */}
          <path
            d="M30 30 C38 36, 54 44, 48 34 C45 30, 36 30, 30 30Z"
            fill="#1C1917"
            fillOpacity="0.06"
            stroke="#B89358"
            strokeWidth="0.75"
          />
          {/* Slender Body */}
          <line x1="30" y1="20" x2="30" y2="40" stroke="#881337" strokeWidth="1.3" strokeLinecap="round" />
          {/* Antennae */}
          <path d="M 30 20 Q 26 15 24 16" stroke="#B89358" strokeWidth="0.75" strokeLinecap="round" />
          <path d="M 30 20 Q 34 15 36 16" stroke="#B89358" strokeWidth="0.75" strokeLinecap="round" />
        </svg>
      </motion.div>

      {/* Whispering Tooltip */}
      {showWhisper && (
        <AnimatePresence>
          {isFluttering && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: -4, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.9 }}
              transition={{ duration: 0.35, ease: EASE_OUT_QUART }}
              className="absolute left-1/2 -translate-x-1/2 -top-12 whitespace-nowrap bg-[#FAF8F5]/95 backdrop-blur-md border border-[#B89358]/50 text-[#881337] text-xs font-serif italic px-3.5 py-1.5 rounded-full shadow-lg pointer-events-none z-30"
            >
              “You are my peace, today and always ❦”
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}

function BotanicalRose({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" fill="none" className={className} aria-hidden="true">
      <defs>
        <radialGradient id="roseAccentGrad" cx="42%" cy="40%" r="58%">
          <stop offset="0%" stopColor="#A81D45" />
          <stop offset="45%" stopColor="#881337" />
          <stop offset="85%" stopColor="#55081E" />
          <stop offset="100%" stopColor="#360211" />
        </radialGradient>
        <linearGradient id="roseAccentStem" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C49B5B" />
          <stop offset="100%" stopColor="#7E6032" />
        </linearGradient>
      </defs>
      {/* Curved Stem */}
      <path d="M 30 32 Q 28 44 32 55" stroke="url(#roseAccentStem)" strokeWidth="1.6" strokeLinecap="round" />
      {/* Delicate Antique Gold Leaves */}
      <path d="M 29 40 Q 18 36 17 44 Q 25 46 29 42" fill="#B89358" fillOpacity="0.55" stroke="#876831" strokeWidth="0.8" />
      <path d="M 31 45 Q 42 41 43 49 Q 36 51 31 47" fill="#B89358" fillOpacity="0.55" stroke="#876831" strokeWidth="0.8" />
      {/* Rose Calyx */}
      <path d="M 22 29 Q 30 34 38 29 Q 30 31 22 29 Z" fill="#55081E" />
      {/* Rose Bloom Petals */}
      <ellipse cx="30" cy="21" rx="14" ry="12" fill="url(#roseAccentGrad)" />
      {/* Petal Highlights & Creases */}
      <path d="M 19 18 C 18 11, 38 10, 39 18 C 40 25, 32 29, 23 28" stroke="#ECA0B2" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M 23 23 C 24 28, 36 28, 36 20 C 36 14, 26 14, 25 19" stroke="#F6C5D0" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M 27 19 C 28 16, 33 16, 33 20 C 33 22, 29 23, 28 21" stroke="#FFF0F3" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  );
}

function SectionDivider({ label }: { label?: string }) {
  return (
    <div className="py-14 flex items-center justify-center gap-4 max-w-xl mx-auto px-6 select-none">
      <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#B89358]/40" />
      <div className="flex items-center gap-2.5">
        <BotanicalRose className="w-6 h-6 text-[#881337]" />
        {label && (
          <span className="font-sans text-[11px] tracking-[0.3em] uppercase text-[#B89358] font-semibold">
            {label}
          </span>
        )}
      </div>
      <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#B89358]/40" />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SUBTLE FALLING ROSES & PETALS ANIMATION (PURE CLEAN BACKGROUND)
   ═══════════════════════════════════════════════════════════════ */

interface PetalConfig {
  id: number;
  left: string;
  size: number;
  duration: number;
  delay: number;
  type: "rose" | "fullRose" | "goldLeaf";
  drift: number;
}

const PETALS_CONFIG: PetalConfig[] = [
  { id: 1, left: "4%", size: 24, duration: 20, delay: 0, type: "rose", drift: 22 },
  { id: 2, left: "12%", size: 28, duration: 26, delay: 5, type: "fullRose", drift: -18 },
  { id: 3, left: "22%", size: 18, duration: 22, delay: 11, type: "goldLeaf", drift: 20 },
  { id: 4, left: "32%", size: 26, duration: 24, delay: 2, type: "fullRose", drift: -24 },
  { id: 5, left: "42%", size: 22, duration: 19, delay: 8, type: "rose", drift: 18 },
  { id: 6, left: "52%", size: 30, duration: 27, delay: 14, type: "fullRose", drift: -16 },
  { id: 7, left: "62%", size: 24, duration: 21, delay: 3, type: "rose", drift: 25 },
  { id: 8, left: "72%", size: 27, duration: 25, delay: 16, type: "fullRose", drift: -22 },
  { id: 9, left: "82%", size: 22, duration: 23, delay: 7, type: "rose", drift: 19 },
  { id: 10, left: "92%", size: 29, duration: 22, delay: 12, type: "fullRose", drift: -15 },
  { id: 11, left: "18%", size: 25, duration: 28, delay: 9, type: "rose", drift: 20 },
  { id: 12, left: "87%", size: 20, duration: 21, delay: 1, type: "goldLeaf", drift: -20 },
  { id: 13, left: "47%", size: 25, duration: 24, delay: 18, type: "rose", drift: 24 },
  { id: 14, left: "68%", size: 19, duration: 29, delay: 13, type: "goldLeaf", drift: -18 },
];

function BotanicalBackground() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* SVG Defs for Rose Gradients */}
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          {/* Rose Petal Gradient */}
          <linearGradient id="rosePetalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#881337" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#BA3458" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#EFA4B5" stopOpacity="0.3" />
          </linearGradient>

          {/* Full Blooming Velvet Rose Gradient */}
          <radialGradient id="fullRoseBloomGrad" cx="45%" cy="45%" r="55%">
            <stop offset="0%" stopColor="#A81D45" stopOpacity="0.9" />
            <stop offset="45%" stopColor="#881337" stopOpacity="0.85" />
            <stop offset="85%" stopColor="#55081E" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#360211" stopOpacity="0.75" />
          </radialGradient>

          {/* Antique Gold Leaf Gradient */}
          <linearGradient id="goldLeafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#9C7738" stopOpacity="0.55" />
            <stop offset="60%" stopColor="#C9A464" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#F5E4C2" stopOpacity="0.25" />
          </linearGradient>
        </defs>
      </svg>

      {/* Floating Gentle Velvet Roses & Petals */}
      {!shouldReduceMotion &&
        PETALS_CONFIG.map((p) => (
          <motion.div
            key={p.id}
            className="absolute -top-14"
            style={{
              left: p.left,
              width: p.size,
              height: p.size,
            }}
            animate={{
              y: ["-50px", "115vh"],
              x: [0, p.drift, -p.drift * 0.7, p.drift * 0.5, 0],
              rotate: [0, 140, 260, 360],
              rotateY: [0, 180, 360],
              scale: [0.92, 1.06, 0.94, 1],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "linear",
            }}
          >
            {p.type === "fullRose" && (
              <svg viewBox="0 0 32 32" className="w-full h-full drop-shadow-sm">
                {/* Outer cupped rose petals */}
                <path
                  d="M 16 3 C 23 3, 29 8, 29 16 C 29 23, 23 29, 16 29 C 9 29, 3 23, 3 16 C 3 8, 9 3, 16 3 Z"
                  fill="url(#fullRoseBloomGrad)"
                />
                {/* Spiral layered petal highlights */}
                <path
                  d="M 9 14 C 9 8, 23 6, 24 14 C 25 21, 16 25, 11 23"
                  stroke="#ECA0B2"
                  strokeWidth="1"
                  strokeLinecap="round"
                  fill="none"
                  strokeOpacity="0.9"
                />
                <path
                  d="M 13 18 C 14 23, 22 22, 22 17 C 22 12, 15 12, 14 16"
                  stroke="#F6C5D0"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  fill="none"
                  strokeOpacity="0.95"
                />
                <circle cx="17" cy="16" r="2.2" fill="#FFF0F3" fillOpacity="0.9" />
                {/* Antique gold calyx touch */}
                <path
                  d="M 16 29 Q 15 31 13 31 Q 16 30 17 31"
                  stroke="#B89358"
                  strokeWidth="0.8"
                  strokeLinecap="round"
                  strokeOpacity="0.7"
                />
              </svg>
            )}

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
    <nav className="fixed top-0 left-0 right-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-lg border-b border-[#EADFD4]/70 px-4 sm:px-12 py-3.5">
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
          <span>July 13, 2026 • Husband & Wife</span>
        </div>

        {/* Right Action: Romantic Audio Toggle & Date */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleAudio}
            className={`flex items-center gap-2 px-4 py-2 min-h-[44px] rounded-full border transition-all duration-300 text-xs font-sans tracking-wider cursor-pointer shadow-sm hover:scale-[1.02] active:scale-[0.98] ${
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
              <span className="flex items-center gap-0.5 h-3">
                <motion.span className="w-0.5 bg-white rounded-full inline-block" animate={{ height: ["6px", "12px", "6px"] }} transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }} />
                <motion.span className="w-0.5 bg-white rounded-full inline-block" animate={{ height: ["12px", "4px", "12px"] }} transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut", delay: 0.15 }} />
                <motion.span className="w-0.5 bg-white rounded-full inline-block" animate={{ height: ["4px", "11px", "4px"] }} transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut", delay: 0.3 }} />
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

          {/* Milestone Badge Ribbon */}
          <motion.div
            className="pt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            <div className="inline-flex items-center gap-2.5 font-sans text-[11px] tracking-[0.22em] uppercase bg-white/90 border border-[#E8DCCF] text-[#1C1917] px-4 sm:px-5 py-2.5 rounded-full shadow-sm font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#881337]/80" />
              <span>Nikkah: July 13, 2026 • Day 52 as Husband & Wife</span>
            </div>
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
        <motion.span
          className="text-[#B89358] text-xs inline-block"
          animate={shouldReduceMotion ? false : { y: [0, 5, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        >
          ↓
        </motion.span>
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

  return (
    <section className="py-16 px-6 sm:px-12 max-w-2xl mx-auto text-center">
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1, ease: EASE_OUT_QUART }}
        className="space-y-5"
      >
        <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#881337] font-semibold block">
          Our Sacred Journey
        </span>

        <p className="font-display text-fluid-h3 text-[#1C1917] font-normal leading-snug">
          <span className="text-[#881337] tabular-nums font-semibold">{duration.days}</span> days,{" "}
          <span className="text-[#881337] tabular-nums font-semibold">{String(duration.hours).padStart(2, "0")}</span> hours,{" "}
          <span className="text-[#881337] tabular-nums font-semibold">{String(duration.minutes).padStart(2, "0")}</span> minutes, and{" "}
          <motion.span
            key={duration.seconds}
            initial={!shouldReduceMotion ? { opacity: 0.4 } : false}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="text-[#881337] tabular-nums font-semibold"
          >
            {String(duration.seconds).padStart(2, "0")}
          </motion.span>{" "}
          seconds since our hands met before Allah.
        </p>

        <p className="font-serif italic text-fluid-body text-[#5C4F44]">
          And counting every second choosing you.
        </p>

        <div className="w-16 h-px bg-[#B89358]/40 mx-auto" />
      </motion.div>
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
            The Apology
          </span>

          <h2 className="font-display text-fluid-h2 text-[#1C1917] font-normal leading-tight">
            Happy birthday, my love.
          </h2>

          <div className="w-16 h-0.5 bg-[#B89358]" />

          <p className="font-serif text-fluid-body text-[#3E3834] leading-relaxed">
            Your birthday feels especially important to me because this is your first birthday after our nikkah, and I want to make it as beautiful, peaceful, and special as you deserve.
          </p>

          {/* Bespoke Editorial Apology Card */}
          <div className="p-7 bg-gradient-to-br from-[#FAF3EA] to-[#F5ECE0] rounded-2xl border border-[#B89358]/35 shadow-sm text-center relative overflow-hidden">
            <span className="font-serif text-3xl text-[#B89358]/60 block leading-none select-none mb-1">“</span>
            <p className="font-serif italic text-fluid-lead text-[#881337] font-normal leading-relaxed -mt-2">
              Before anything else, I want to say I’m sorry.
            </p>
            <span className="font-serif text-3xl text-[#B89358]/60 block leading-none select-none mt-1">”</span>
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
    <section className="py-36 px-6 sm:px-12 bg-[#F5EFE6] relative overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <SectionDivider label="Chapter II" />

        {/* Central Standout Header */}
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
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
    <section className="py-36 px-6 sm:px-12 bg-gradient-to-b from-[#FAF8F5] via-[#F2ECE4] to-[#FAF8F5]">
      <div className="max-w-5xl mx-auto text-center space-y-12">
        <SectionDivider label="Chapter IV" />

        {/* Big Portrait of Sanoof & Sifana Together with 3D Tilt */}
        <motion.div
          className="max-w-4xl mx-auto"
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
                caption: "Muhammed Sanoof & Sifana. May Allah bless our marriage with love, understanding and sakinah.",
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
                Muhammed Sanoof & Sifana
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
  const [isBlowingOut, setIsBlowingOut] = useState(false);
  const [wishSealed, setWishSealed] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const handleMakeWish = () => {
    if (isBlowingOut || wishSealed) return;
    setIsBlowingOut(true);
    setTimeout(() => {
      setWishSealed(true);
      setIsBlowingOut(false);
    }, 1100);
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
                disabled={isBlowingOut}
                className="group flex flex-col items-center cursor-pointer p-4 rounded-3xl hover:bg-[#FAF3EA]/60 transition-all focus:outline-none focus:ring-2 focus:ring-[#B89358]/40 select-none"
                aria-label="Tap flame to seal your birthday wish"
              >
                {/* SVG Realistic Candle */}
                <div className="relative w-36 h-48 flex items-center justify-center select-none">
                  {/* Ambient Light Bloom from Flame */}
                  <motion.div
                    className="absolute top-2 w-28 h-28 rounded-full bg-gradient-to-t from-[#FFA000]/25 via-[#FFE082]/35 to-transparent blur-xl pointer-events-none"
                    animate={
                      shouldReduceMotion || isBlowingOut
                        ? { opacity: isBlowingOut ? 0 : 0.4 }
                        : {
                            scale: [1, 1.15, 0.95, 1.1, 1],
                            opacity: [0.65, 0.95, 0.7, 0.9, 0.65],
                          }
                    }
                    transition={{ duration: isBlowingOut ? 0.3 : 1.6, repeat: isBlowingOut ? 0 : Infinity, ease: "easeInOut" }}
                  />

                  {/* Golden Sparkles on Wish Blowout */}
                  {isBlowingOut && !shouldReduceMotion && (
                    <motion.div
                      className="absolute top-8 pointer-events-none flex items-center justify-center text-[#B89358] text-xl"
                      initial={{ opacity: 0, scale: 0.5, y: 0 }}
                      animate={{ opacity: [0, 1, 0], scale: [0.5, 1.6], y: -25 }}
                      transition={{ duration: 0.9, ease: EASE_OUT_QUART }}
                    >
                      ✨
                    </motion.div>
                  )}

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
                    <motion.circle
                      cx="71.5"
                      cy="76"
                      r="3.2"
                      fill="#FF6D00"
                      animate={isBlowingOut ? { scale: [1, 1.8, 1.2], opacity: [0.5, 1, 0.3] } : {}}
                      transition={{ duration: 0.9 }}
                      fillOpacity="0.5"
                    />

                    {/* Smoke Wisp Rising when flame is blown out */}
                    {isBlowingOut && !shouldReduceMotion && (
                      <motion.g
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 0.85, 0.45, 0], y: [0, -32], x: [0, 5, -4, 6] }}
                        transition={{ duration: 1.1, ease: "easeOut" }}
                      >
                        <path
                          d="M 71.5 74 C 67 63, 76 54, 69 44 C 64 34, 73 24, 68 14"
                          stroke="#C4B4A0"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          fill="none"
                          strokeDasharray="2 3"
                        />
                      </motion.g>
                    )}

                    {/* 7. Realistic Flickering Flame Group */}
                    {!isBlowingOut && (
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
                    )}
                  </svg>
                </div>

                <div className="flex flex-col items-center mt-2 space-y-0.5">
                  <span className="font-sans text-[11px] tracking-[0.25em] uppercase text-[#881337] font-semibold group-hover:text-[#6a0e2a] transition-colors">
                    {isBlowingOut ? "Sealing wish with Allah..." : "Tap to Seal Wish"}
                  </span>
                  <span className="font-serif italic text-xs text-[#786C5E]">
                    {isBlowingOut ? "Releasing prayers to the heavens ❦" : "Blow out the flame with love"}
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
  const shouldReduceMotion = useReducedMotion();

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
          Lifelong vows written from my heart to yours.
        </p>
      </div>

      <div className="space-y-16">
        {/* Promise I — Open, full-width pull-quote style */}
        <motion.div
          className="text-center space-y-4 max-w-xl mx-auto"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8, ease: EASE_OUT_QUART }}
        >
          <span className="font-serif text-5xl text-[#B89358]/40 select-none leading-none block">“</span>
          <h3 className="font-display text-fluid-h3 text-[#1C1917] font-normal leading-snug -mt-4">
            {promises[0].title}
          </h3>
          <p className="font-serif text-fluid-lead text-[#3E3834] leading-relaxed">
            {promises[0].text}
          </p>
          <span className="font-serif text-5xl text-[#B89358]/40 select-none leading-none block">”</span>
        </motion.div>

        {/* Promise II — Left-aligned, warm inset background */}
        <motion.div
          className="bg-gradient-to-br from-[#FAF3EA] to-[#F5ECE0] rounded-2xl p-8 sm:p-10 border border-[#B89358]/30 max-w-2xl"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE_OUT_QUART }}
        >
          <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#881337] font-semibold block mb-3">
            II
          </span>
          <h3 className="font-display text-fluid-lead font-medium text-[#1C1917] tracking-tight mb-3">
            {promises[1].title}
          </h3>
          <p className="font-serif text-fluid-body text-[#3E3834] leading-relaxed">
            {promises[1].text}
          </p>
        </motion.div>

        {/* Promise III — Centered, most visual weight, the culminating vow */}
        <motion.div
          className="text-center max-w-xl mx-auto py-10 border-y border-[#B89358]/30 space-y-4"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE_OUT_QUART }}
        >
          <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#B89358] font-semibold block">
            III • The Final Vow
          </span>
          <h3 className="font-display text-fluid-h2 text-[#881337] font-normal leading-tight">
            {promises[2].title}
          </h3>
          <p className="font-serif text-fluid-lead text-[#1C1917] leading-relaxed">
            {promises[2].text}
          </p>
        </motion.div>
      </div>

      {/* Birthday Wish Candle Ritual */}
      <BirthdayCandleRitual />

      {/* Closing Signature — Semantic Footer with Generous Breathing Room */}
      <footer className="text-center mt-24 pt-14 border-t border-[#B89358]/25 space-y-3 pb-8">
        <div className="flex items-center justify-center gap-3 mb-6">
          <BotanicalRose className="w-10 h-10" />
          <InteractiveButterfly className="w-11 h-11" showWhisper={true} />
        </div>
        <p className="font-serif italic text-fluid-body text-[#1C1917]">
          Forever yours, with all my love, apology, and devotion,
        </p>
        <p className="font-display text-fluid-h3 text-[#881337] font-normal">
          Muhammed Sanoof
        </p>
        <p className="font-sans text-[11px] tracking-[0.25em] uppercase text-[#786C5E] pt-4 font-medium">
          July 13, 2026 — To Eternity
        </p>
      </footer>
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
            <BotanicalRose className="w-5 h-5 text-[#881337]" />
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
