import { motion } from "framer-motion";
import { MessageCircle, Globe, ArrowRight } from "lucide-react";

export default function FinalCTA() {
  return (
    <section id="contactos" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#0057A8] via-[#0066BD] to-[#009FE3]" />

      {/* shapes */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-white/10 blur-3xl -z-10" />
      <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full bg-[#9BD8FF]/20 blur-3xl -z-10" />
      <svg className="absolute top-10 right-1/4 opacity-20 -z-10" width="240" height="240" viewBox="0 0 240 240" fill="none">
        <circle cx="120" cy="120" r="118" stroke="white" strokeWidth="1" strokeDasharray="6 8" />
        <circle cx="120" cy="120" r="80" stroke="white" strokeWidth="1" />
        <circle cx="120" cy="120" r="40" stroke="white" strokeWidth="1" strokeDasharray="3 4" />
      </svg>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative max-w-4xl mx-auto px-5 sm:px-8 text-center text-white"
      >
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 border border-white/20 text-xs font-semibold backdrop-blur-md">
          ✨ Vamos conversar
        </span>
        <h2 className="font-display text-4xl sm:text-6xl font-bold mt-6 leading-tight">
          Pronta para encontrar o<br />
          <span className="text-[#9BD8FF]">imóvel ideal?</span>
        </h2>
        <p className="mt-5 text-white/85 text-lg max-w-2xl mx-auto">
          Entre em contacto agora mesmo e receba atendimento personalizado da consultora imobiliária
          de confiança em Portugal.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <motion.a
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            href="https://wa.me/351913536291"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-[#25D366] text-white font-semibold shadow-xl shadow-emerald-900/30 hover:shadow-2xl transition-all"
          >
            <MessageCircle className="w-5 h-5" />
            Falar no WhatsApp
            <ArrowRight className="w-4 h-4" />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            href="https://remax.pt/pt/agente/sonia-silva/122031171"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white text-[#0057A8] font-semibold shadow-xl hover:shadow-2xl transition-all"
          >
            <Globe className="w-5 h-5" />
            Visitar Site Oficial
          </motion.a>
        </div>

        <p className="mt-8 text-sm text-white/70">
          +351 913 536 291 · disponível todos os dias
        </p>
      </motion.div>
    </section>
  );
}
