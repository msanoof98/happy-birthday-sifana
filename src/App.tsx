import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useReducedMotion,
} from "framer-motion";

/* ═══════════════════════════════════════════════════════════════
   EASING & ANIMATION CONSTANTS (Natural deceleration)
   ═══════════════════════════════════════════════════════════════ */

const EASE_OUT_QUART = [0.25, 1, 0.5, 1] as const;

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

function GoldButterfly({ className = "" }: { className?: string }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.svg
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      animate={
        shouldReduceMotion
          ? {}
          : {
              scale: [1, 1.06, 1],
              opacity: [0.85, 1, 0.85],
            }
      }
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
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
   LIGHTBOX MODAL FOR HIGH-RES PHOTO VIEWING
   ═══════════════════════════════════════════════════════════════ */

interface LightboxState {
  src: string;
  alt: string;
  caption: string;
}

/* ═══════════════════════════════════════════════════════════════
   TOP NAVIGATION BAR (EDITORIAL BRANDING)
   ═══════════════════════════════════════════════════════════════ */

function EditorialNav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#EADFD4]/70 px-6 sm:px-12 py-3.5">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Monogram */}
        <div className="flex items-center gap-2.5">
          <GoldKnotIcon className="w-6 h-6 text-[#B89358]" />
          <span className="font-serif italic text-base sm:text-lg text-[#1C1917] tracking-wider font-medium">
            Sanoof & Sifana
          </span>
        </div>

        {/* Timeline Indicator */}
        <div className="hidden sm:flex items-center gap-2.5 font-sans text-xs tracking-[0.25em] uppercase text-[#881337] bg-[#FAF3EA] px-4 py-1.5 rounded-full border border-[#E8DCCF]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#881337] animate-pulse" />
          <span>July 13, 2026 • 52 Days As Husband & Wife</span>
        </div>

        {/* Occasion */}
        <div className="font-sans text-[11px] sm:text-xs tracking-[0.2em] uppercase text-[#786C5E] font-medium">
          September 3 • Sifana’s Birthday
        </div>
      </div>
    </nav>
  );
}

/* ═══════════════════════════════════════════════════════════════
   HERO SECTION: BOLD, ASYMMETRICAL EDITORIAL LAYOUT
   Directly inspired by knotsandcraft.webflow.io hero
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

        {/* Right Column: Sifana's Radiant Portrait (Arched luxury container) */}
        <motion.div
          className="lg:col-span-5 relative"
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.95, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.3, delay: 0.5, ease: EASE_OUT_QUART }}
        >
          <div
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
          </div>
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
   DELIGHT STATS: 51 DAYS OF SACRED UNION
   Acknowledges the exact 2-month timeline intimately
   ═══════════════════════════════════════════════════════════════ */

function SacredUnionTimeline() {
  const stats = [
    { label: "Our Nikkah", val: "July 13", sub: "The Day We Began" },
    { label: "Days as Husband & Wife", val: "52", sub: "And Every Single Tomorrow" },
    { label: "My Promise to You", val: "Steadfast", sub: "Choosing You Every Morning" },
    { label: "My Prayers For Us", val: "Sakinah", sub: "Peace, Love & Barakah" },
  ];

  return (
    <section className="py-12 px-6 sm:px-12 max-w-5xl mx-auto border-y border-[#EADFD4]/80">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {stats.map((s, i) => (
          <div key={i} className="p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-[#E8DCCF]/60">
            <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-[#786C5E] font-semibold block mb-1">
              {s.label}
            </span>
            <span className="font-display text-2xl sm:text-3xl text-[#881337] font-medium block">
              {s.val}
            </span>
            <span className="font-serif italic text-xs text-[#5C4F44] block mt-1">
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
   Two-column editorial spread with photo on steps
   ═══════════════════════════════════════════════════════════════ */

function ChapterOneApology({ onPhotoClick }: { onPhotoClick: (item: LightboxState) => void }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="py-24 px-6 sm:px-12 max-w-6xl mx-auto">
      <SectionDivider label="Chapter I" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Photo of them stepping down together */}
        <motion.div
          className="lg:col-span-5"
          initial={shouldReduceMotion ? false : { opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 1.1, ease: EASE_OUT_QUART }}
        >
          <div
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
          </div>
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
            Your birthday feels especially important to me because this is your first birthday after our nikkah, and I wish I could make it as beautiful and special as you deserve.
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
   Reflective spread pairing the grief words with the macro hands photo
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

          {/* Right: Macro Photo of Clasped Hands & Henna */}
          <motion.div
            className="lg:col-span-5"
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.2, ease: EASE_OUT_QUART }}
          >
            <div
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
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CHAPTER III: MY BUTTERFLY IN THE GARDEN
   Asymmetric editorial spread celebrating Sifana
   ═══════════════════════════════════════════════════════════════ */

function ChapterThreeButterfly({ onPhotoClick }: { onPhotoClick: (item: LightboxState) => void }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="py-24 px-6 sm:px-12 max-w-6xl mx-auto">
      <SectionDivider label="Chapter III" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left: Sifana in the Garden Photo */}
        <motion.div
          className="lg:col-span-5 order-2 lg:order-1"
          initial={shouldReduceMotion ? false : { opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 1.1, ease: EASE_OUT_QUART }}
        >
          <div
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
          </div>
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
            <GoldButterfly className="w-12 h-12 flex-shrink-0" />
            <div>
              <h3 className="font-display text-fluid-h3 text-[#881337] font-normal tracking-tight">
                Happy birthday, My butterfly.
              </h3>
              <span className="font-sans text-xs tracking-[0.2em] uppercase text-[#786C5E]">
                With every piece of my heart
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
   Wide portrait of the couple together (fixed top crop) with blessing
   ═══════════════════════════════════════════════════════════════ */

function ChapterFourBlessing({ onPhotoClick }: { onPhotoClick: (item: LightboxState) => void }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="py-28 px-6 sm:px-12 bg-gradient-to-b from-[#FAF8F5] via-[#F2ECE4] to-[#FAF8F5]">
      <div className="max-w-5xl mx-auto text-center space-y-12">
        <SectionDivider label="Chapter IV" />

        {/* Big Portrait of Sanoof & Sifana Together */}
        <motion.div
          className="max-w-3xl mx-auto editorial-frame shadow-2xl relative group cursor-pointer"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.2, ease: EASE_OUT_QUART }}
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
   CHAPTER V: "FOR ALL OUR TOMORROWS"
   Interactive keepsake with 3 promises and tap-to-send love note
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

      {/* Closing Signature */}
      <div className="text-center mt-16 pt-10 border-t border-[#B89358]/25 space-y-2">
        <GoldButterfly className="w-12 h-12 mx-auto mb-4" />
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
  React.useEffect(() => {
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

  React.useEffect(() => {
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
  const [activeLightbox, setActiveLightbox] = useState<LightboxState | null>(null);

  return (
    <div className="min-h-screen relative font-serif text-[#1C1917] bg-[#FAF8F5] selection:bg-[#881337]/15">
      <EditorialNav />
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
