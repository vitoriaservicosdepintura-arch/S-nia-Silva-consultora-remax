import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  Globe,
  Phone,
  ArrowRight,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import { Facebook, Instagram } from "./BrandIcons";
import { useAdmin } from "../context/AdminContext";

const cards = [
  {
    Icon: Globe,
    title: "Site Oficial RE/MAX",
    sub: "remax.pt/sonia-silva",
    href: "https://remax.pt/pt/agente/sonia-silva/122031171",
  },
  {
    Icon: Facebook,
    title: "Facebook",
    sub: "Sónia Silva",
    href: "https://www.facebook.com/profile.php?id=100081296978443&locale=pt_PT#",
  },
  {
    Icon: Instagram,
    title: "Instagram",
    sub: "@remaxsoniasilva",
    href: "https://www.instagram.com/remaxsoniasilva/",
  },
  {
    Icon: Phone,
    title: "Telefone / WhatsApp",
    sub: "+351 913 536 291",
    href: "tel:+351913536291",
  },
];

export default function Hero() {
  const { content } = useAdmin();
  const { hero } = content;
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 15]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section
      id="home"
      ref={containerRef}
      style={{ perspective: "1200px" }}
      className="relative pt-32 lg:pt-40 pb-20 lg:pb-32 overflow-hidden bg-gradient-to-b from-[#EAF6FF] via-white to-white"
    >
      {/* Geometric background shapes - EXPANDED TO FILL SIDES */}
      <div className="absolute inset-0 -z-0 pointer-events-none">
        <div className="absolute top-0 -left-64 w-[800px] h-[800px] rounded-full bg-[#009FE3]/5 blur-[150px]" />
        <div className="absolute bottom-0 -right-64 w-[800px] h-[800px] rounded-full bg-[#0057A8]/5 blur-[150px]" />

        <div className="absolute -top-32 left-1/4 w-[480px] h-[480px] rounded-full bg-gradient-to-br from-[#009FE3]/10 to-transparent blur-3xl" />
        <div className="absolute top-1/4 right-[0px] w-[520px] h-[520px] rounded-full bg-gradient-to-br from-[#0057A8]/10 to-transparent blur-3xl shadow-inner" />
        <div className="absolute bottom-0 left-1/3 w-[300px] h-[300px] rounded-full bg-[#009FE3]/10 blur-3xl" />

        {/* Outlined rings */}
        <svg className="absolute top-24 left-10 floaty opacity-50" width="120" height="120" viewBox="0 0 120 120" fill="none">
          <circle cx="60" cy="60" r="58" stroke="#009FE3" strokeWidth="1" strokeDasharray="4 6" />
          <circle cx="60" cy="60" r="40" stroke="#0057A8" strokeWidth="1" />
        </svg>
        <svg className="absolute bottom-24 right-10 floaty-rev opacity-40" width="90" height="90" viewBox="0 0 90 90" fill="none">
          <circle cx="45" cy="45" r="43" stroke="#0057A8" strokeWidth="1" strokeDasharray="2 4" />
        </svg>

        {/* Dots grid */}
        <svg className="absolute top-1/3 left-1/4 opacity-30" width="120" height="120">
          <defs>
            <pattern id="dotsHero" x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.2" fill="#009FE3" />
            </pattern>
          </defs>
          <rect width="120" height="120" fill="url(#dotsHero)" />
        </svg>
      </div>

      <motion.div
        style={{ rotateX, scale, opacity, y }}
        className="relative max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-2 gap-16 lg:gap-32 items-center z-10"
      >
        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative z-10"
        >
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-semibold text-[#0057A8] shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#009FE3]" />
            RE/MAX Dinâmica · Portugal
          </motion.span>



          <h1 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0A2540] leading-[1.05]">
            {hero.title}
          </h1>
          <p className="mt-2 text-base sm:text-lg text-[#0057A8] font-semibold tracking-wide">
            {hero.subtitle}
          </p>

          <h2 className="mt-4 text-xl sm:text-2xl font-semibold text-slate-800 leading-snug max-w-xl">
            Confiança que abre portas para o{" "}
            <span className="text-gradient">seu futuro!</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
            {hero.description}
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="#lead"
              className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#009FE3] to-[#0057A8] text-white text-sm font-bold shadow-lg hover:shadow-[0_0_20px_rgba(0,159,227,0.6)] transition-all"
            >
              Agende a sua consultoria
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="https://wa.me/351913536291"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl glass border border-white/40 text-[#0057A8] text-sm font-bold hover:bg-white/40 hover:shadow-[0_0_15px_rgba(0,159,227,0.4)] transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </motion.a>
          </div>


          <div className="mt-6 grid grid-cols-2 gap-3 max-w-xl">
            {cards.map((c, i) => (
              <motion.a
                key={c.title}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.08 }}
                whileHover={{ y: -3 }}
                className="group flex items-center gap-3 p-3.5 rounded-2xl bg-white/80 backdrop-blur border border-slate-100 shadow-sm hover:shadow-lg hover:border-[#009FE3]/30 transition-all"
              >
                <span className="w-10 h-10 shrink-0 rounded-xl bg-gradient-to-br from-[#EAF6FF] to-white border border-[#009FE3]/20 flex items-center justify-center text-[#0057A8] group-hover:from-[#009FE3] group-hover:to-[#0057A8] group-hover:text-white transition-all">
                  <c.Icon className="w-4 h-4" />
                </span>
                <div className="min-w-0">
                  <p className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold truncate">
                    {c.title}
                  </p>
                  <p className="text-xs text-slate-700 truncate">{c.sub}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* RIGHT - Image Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative flex items-center justify-center min-h-[500px] lg:min-h-[700px]"
        >
          {/* Sovereign Stage - Multi-layered Luxury Circle - SCALED FOR BETTER FIT */}
          <div className="relative z-10 w-full max-w-[580px] aspect-square flex items-center justify-center">

            {/* Outer Soft Glow */}
            <div className="absolute w-[110%] h-[110%] rounded-full bg-[#009FE3]/5 blur-[100px] animate-pulse" />

            {/* The Main Stage - Deep Gradient with Metallic Rim */}
            <div className="absolute w-full h-full rounded-full p-[2px] bg-gradient-to-tr from-white/20 via-[#009FE3]/30 to-white/10 shadow-2xl">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-[#009FE3] via-[#0057A8] to-[#0A2540] relative overflow-hidden flex items-center justify-center">
                {/* Internal Decorative Glass Ring */}
                <div className="absolute inset-10 rounded-full border border-white/10 z-10" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.15)_0%,transparent_60%)] z-10" />

                {/* Main Portrait - NATURAL SIZE FOR MAXIMUM SHARPNESS */}
                <motion.img
                  initial={{ y: 80, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  src={hero.portraitUrl}
                  alt="Sónia Silva - Consultora Imobiliária"
                  className="relative z-0 max-w-[95%] h-auto object-contain drop-shadow-2xl translate-y-10"
                />
              </div>
            </div>
          </div>

          {/* Large Floating Logo only */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="absolute left-[-20px] sm:left-[-80px] top-16 z-30"
          >
            <img
              src={content.options?.mainLogoUrl || "/images/LOGO2-sem-fundo.png"}
              alt="RE/MAX Dinâmica Logo"
              className="w-44 sm:w-64 h-auto object-contain floaty drop-shadow-2xl"
            />
          </motion.div>

          {/* Floating RE/MAX Balloon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, type: "spring" }}
            className="absolute -right-8 sm:-right-20 top-1/4 z-30"
          >
            <img
              src={content.options?.secondaryLogoUrl || "/images/LOGO3-sem-fundo.png"}
              alt="RE/MAX Balloon"
              className="w-32 sm:w-52 h-auto floaty-rev drop-shadow-2xl"
            />
          </motion.div>

          {/* Floating bottom card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="absolute bottom-4 sm:bottom-10 right-0 sm:right-4 z-20 glass rounded-2xl px-4 py-3 shadow-xl"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 flex items-center justify-center">
                <span className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">Disponível agora</p>
                <p className="text-[10px] text-slate-500">Responde em minutos</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
