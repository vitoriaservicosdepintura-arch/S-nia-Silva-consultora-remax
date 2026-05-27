/**
 * WelcomeAvatar — Animated intro screen shown before the chat opens.
 * Features Sónia's half-body photo with CSS/Framer-Motion animations:
 *   • Entrance slide-up  
 *   • Waving hand (looped)  
 *   • Subtle body sway / breathing  
 *   • Floating particles  
 *   • Pulsing ring around the figure  
 *   • Speech bubble greeting  
 *   • "Falar comigo" CTA  
 */
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { MessageCircle, X, ChevronRight, Sparkles } from "lucide-react";

interface Props {
  onEnterChat: () => void;
  onClose: () => void;
}

// ── Floating particle ────────────────────────────────────────────────────────
function Particle({ x, y, delay, size }: { x: number; y: number; delay: number; size: number }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        background: "radial-gradient(circle, rgba(0,159,227,0.7) 0%, rgba(0,87,168,0.3) 100%)",
      }}
      animate={{
        y: [0, -18, 0],
        opacity: [0, 0.8, 0],
        scale: [0.6, 1.2, 0.6],
      }}
      transition={{
        duration: 2.8 + delay,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

// ── Waving hand SVG emoji overlay ────────────────────────────────────────────
function WavingHand() {
  return (
    <motion.div
      className="absolute -top-3 -right-2 z-20 select-none pointer-events-none"
      style={{ transformOrigin: "80% 90%" }}
      animate={{ rotate: [0, 26, -10, 26, -6, 0] }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        repeatDelay: 1.2,
        ease: "easeInOut",
      }}
    >
      <span className="text-[42px] drop-shadow-xl filter">👋</span>
    </motion.div>
  );
}

// ── Come here finger gesture ─────────────────────────────────────────────────
function ComeHere() {
  return (
    <motion.div
      className="absolute -bottom-1 -right-4 z-20 select-none pointer-events-none"
      animate={{ y: [0, 5, 0, 8, 0], scale: [1, 1.1, 1] }}
      transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 0.8, ease: "easeInOut" }}
    >
      <span className="text-[32px] drop-shadow-lg opacity-80">☟</span>
    </motion.div>
  );
}

// ── Sparkle dots ─────────────────────────────────────────────────────────────
function Sparkle({ cx, cy, delay }: { cx: number; cy: number; delay: number }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: cx, top: cy }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: [0, 1.2, 0], opacity: [0, 1, 0] }}
      transition={{ duration: 1.2, delay, repeat: Infinity, repeatDelay: 2.5 }}
    >
      <Sparkles className="w-3 h-3 text-[#009FE3]" />
    </motion.div>
  );
}

// ── Typewriter text ───────────────────────────────────────────────────────────
function Typewriter({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    const startT = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        setDisplayed(text.slice(0, i + 1));
        i++;
        if (i >= text.length) clearInterval(interval);
      }, 32);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(startT);
  }, [text, delay]);
  return (
    <span>
      {displayed}
      {displayed.length < text.length && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ repeat: Infinity, duration: 0.6 }}
          className="inline-block w-0.5 h-4 bg-[#0057A8] ml-0.5 align-middle"
        />
      )}
    </span>
  );
}

export default function WelcomeAvatar({ onEnterChat, onClose }: Props) {
  const [showCTA, setShowCTA] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    // Stagger entrance
    const t1 = setTimeout(() => setShowBubble(true), 700);
    const t2 = setTimeout(() => setShowCTA(true), 1400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  // Continuous body "breathing" sway
  useEffect(() => {
    controls.start({
      y: [0, -6, 0, -3, 0],
      rotate: [0, 0.6, 0, -0.4, 0],
      transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
    });
  }, [controls]);

  const particles = [
    { x: 8, y: 72, delay: 0, size: 6 },
    { x: 18, y: 40, delay: 0.6, size: 4 },
    { x: 82, y: 60, delay: 0.3, size: 7 },
    { x: 76, y: 30, delay: 1.1, size: 5 },
    { x: 50, y: 15, delay: 0.8, size: 4 },
    { x: 35, y: 82, delay: 1.5, size: 5 },
    { x: 90, y: 80, delay: 0.2, size: 4 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.85, y: 20 }}
      transition={{ type: "spring", stiffness: 280, damping: 26 }}
      className="relative w-[320px] sm:w-[340px] rounded-3xl overflow-hidden shadow-[0_32px_80px_-12px_rgba(0,87,168,0.45)] border border-white/40 flex flex-col"
      style={{
        background: "rgba(255,255,255,0.97)",
        backdropFilter: "blur(20px)",
        maxHeight: "calc(100vh - 2rem)",
        overflowY: "auto"
      }}
    >
      {/* ── Close button ──────────────────────────────────────────────────── */}
      <button
        onClick={onClose}
        className="absolute top-3 right-3 z-30 w-7 h-7 rounded-full bg-white/70 backdrop-blur hover:bg-red-50 hover:text-red-500 flex items-center justify-center text-slate-500 transition shadow-sm"
      >
        <X className="w-3.5 h-3.5" />
      </button>

      {/* ── Hero gradient background ────────────────────────────────────── */}
      <div className="relative h-[280px] sm:h-[280px] shrink-0 overflow-hidden"
        style={{ background: "linear-gradient(160deg, #0057A8 0%, #009FE3 55%, #EAF6FF 100%)" }}
      >
        {/* Geometric rings */}
        <motion.div
          className="absolute -top-16 -left-16 w-52 h-52 rounded-full border border-white/20"
          animate={{ rotate: 360 }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full border border-white/10"
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
        <div className="absolute top-6 left-6 w-32 h-32 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute bottom-10 right-4 w-28 h-28 rounded-full bg-[#009FE3]/30 blur-2xl" />

        {/* Dashed ring */}
        <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20 pointer-events-none" width="340" height="340" viewBox="0 0 340 340">
          <circle cx="170" cy="170" r="165" stroke="white" strokeWidth="1" strokeDasharray="6 9" />
        </svg>

        {/* Particles */}
        {particles.map((p, i) => (
          <Particle key={i} {...p} />
        ))}

        {/* Sparkles */}
        <Sparkle cx={52} cy={30} delay={0.5} />
        <Sparkle cx={260} cy={55} delay={1.2} />
        <Sparkle cx={30} cy={200} delay={2.0} />
        <Sparkle cx={290} cy={210} delay={0.8} />

        {/* ── Pulsing glow under figure ──────────────────────────────────── */}
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-52 h-24 rounded-full"
          style={{ background: "radial-gradient(ellipse, rgba(0,159,227,0.5) 0%, transparent 75%)" }}
          animate={{ scaleX: [1, 1.15, 1], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* ── Figure container ───────────────────────────────────────────── */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full flex justify-center items-end">
          <motion.div
            animate={controls}
            className="relative select-none"
            style={{ width: 240 }}
          >
            {/* Outer pulsing ring */}
            <motion.div
              className="absolute inset-x-0 bottom-0 mx-auto w-52 h-52 rounded-full border-2 border-white/30"
              animate={{ scale: [1, 1.06, 1], opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Inner glow ring */}
            <motion.div
              className="absolute inset-x-0 bottom-0 mx-auto w-44 h-44 rounded-full border border-white/20"
              animate={{ scale: [1, 1.12, 1], opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 2.4, delay: 0.6, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Waving hand emoji — positioned top-right of image */}
            <WavingHand />
            {/* Come-here gesture */}
            <ComeHere />

            {/* Sónia's image — COMPACT SCALE TO FIT ALL VIEWPORTS */}
            <motion.img
              src="/images/sonia.png"
              alt="Sónia Silva"
              draggable={false}
              className="relative z-10 w-full object-contain object-bottom"
              style={{
                height: 240,
                objectPosition: "50% 15%",
                filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.25))",
                maskImage: "linear-gradient(to bottom, black 85%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to bottom, black 85%, transparent 100%)",
              }}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            />

            {/* Shimmer highlight on figure */}
            <motion.div
              className="absolute inset-0 z-20 pointer-events-none"
              style={{
                background: "linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.08) 50%, transparent 70%)",
                backgroundSize: "200% 100%",
              }}
              animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
            />
          </motion.div>
        </div>

        {/* ── RE/MAX badge top-left ──────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-2xl px-3 py-2 border border-white/30"
        >
          <div className="w-12 h-12 flex items-center justify-center">
            <img src="/images/LOGO3-sem-fundo.png" alt="RE/MAX" className="w-full h-full object-contain filter drop-shadow-lg" />
          </div>
          <div>
            <p className="text-white text-[10px] font-bold leading-tight">Dinâmica</p>
            <p className="text-white/70 text-[9px]">Portugal</p>
          </div>
        </motion.div>

        {/* ── VERIFIED badge top right area ─────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, type: "spring" }}
          className="absolute top-4 right-10 z-20 bg-emerald-500 text-white text-[9px] font-bold px-2.5 py-1 rounded-full shadow-lg flex items-center gap-1"
        >
          <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
          Online agora
        </motion.div>
      </div>

      {/* ── Bottom card ──────────────────────────────────────────────────── */}
      <div className="relative bg-white px-5 pt-4 pb-5">
        {/* Dots decoration */}
        <svg className="absolute top-0 right-4 opacity-10" width="80" height="50">
          <defs>
            <pattern id="dotsW" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.2" fill="#009FE3" />
            </pattern>
          </defs>
          <rect width="80" height="50" fill="url(#dotsW)" />
        </svg>

        {/* Speech bubble */}
        <AnimatePresence>
          {showBubble && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className="relative mb-4"
            >
              <div className="bg-gradient-to-br from-[#EAF6FF] to-white border border-[#009FE3]/20 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
                <p className="text-sm font-bold text-[#0A2540] leading-snug">
                  <Typewriter text="Olá! 👋 Bem-vindo ao site da Sónia Silva!" delay={200} />
                </p>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Sou a sua assistente virtual. Estou aqui para ajudar a encontrar o <strong>imóvel ideal</strong> ou agendar uma consultoria gratuita! 🏡
                </p>
              </div>
              {/* Triangle pointer up-left */}
              <div className="absolute -top-2 left-5 w-0 h-0"
                style={{ borderLeft: "8px solid transparent", borderRight: "8px solid transparent", borderBottom: "8px solid #EAF6FF" }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Name + title */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-[#009FE3]/30 shrink-0">
            <img src="/images/sonia.png" alt="Sónia" className="w-full h-full object-cover" style={{ objectPosition: "50% 8%" }} />
          </div>
          <div>
            <p className="font-bold text-[#0A2540] text-sm">Sónia Silva</p>
            <p className="text-xs text-slate-500">Consultora Imobiliária · RE/MAX</p>
            <div className="flex items-center gap-1 mt-0.5">
              {[...Array(5)].map((_, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 + i * 0.08 }}
                  className="text-amber-400 text-[10px]"
                >★</motion.span>
              ))}
              <span className="text-[10px] text-slate-400 ml-1">5.0</span>
            </div>
          </div>
        </div>

        {/* CTA button */}
        <AnimatePresence>
          {showCTA && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-2"
            >
              <motion.button
                onClick={onEnterChat}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-gradient-to-r from-[#009FE3] to-[#0057A8] text-white font-semibold text-sm shadow-xl shadow-[#0057A8]/30 hover:shadow-2xl transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                Falar com a Assistente
                <ChevronRight className="w-4 h-4 ml-auto" />
              </motion.button>

              <p className="text-center text-[10px] text-slate-400">
                Responde em segundos · Assistente IA gratuita
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
