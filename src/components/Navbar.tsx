import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, CalendarCheck } from "lucide-react";
import { useAdmin } from "../context/AdminContext";

const menu = [
  { label: "Home", href: "#home" },
  { label: "Sobre Mim", href: "#sobre" },
  { label: "Serviços", href: "#servicos" },
  { label: "Investimentos", href: "#investimentos" },
  { label: "Contactos", href: "#contactos" },
];

export default function Navbar() {
  const { content } = useAdmin();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled
          ? "bg-white/80 backdrop-blur-xl shadow-[0_6px_30px_rgba(0,87,168,0.08)]"
          : "bg-transparent"
        }`}
    >
      <nav className="max-w-7xl mx-auto px-5 sm:px-8 h-[72px] flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2 group">
          {content?.options?.mainLogoUrl ? (
            <img src={content.options.mainLogoUrl} alt="Logo Sónia Silva" className="h-10 object-contain hover:scale-105 transition-transform" />
          ) : (
            <span className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-[#009FE3] to-[#0057A8] flex items-center justify-center text-white font-bold shadow-lg shadow-brand-500/30">
              S
              <span className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-white border-2 border-[#009FE3]" />
            </span>
          )}
          <div className="leading-tight">
            <p className="font-display text-lg text-[#0057A8] font-semibold">Sónia Silva</p>
            <p className="text-[10px] tracking-[0.2em] text-slate-500 uppercase">Consultoria Imobiliária</p>
          </div>
        </a>

        <ul className="hidden lg:flex items-center gap-1">
          {menu.map((m) => (
            <li key={m.label}>
              <a
                href={m.href}
                className="relative px-4 py-2 text-sm text-slate-700 hover:text-[#0057A8] transition-colors font-medium group"
              >
                {m.label}
                <span className="absolute left-4 right-4 -bottom-0.5 h-0.5 bg-gradient-to-r from-[#009FE3] to-[#0057A8] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href="#lead"
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#009FE3] to-[#0057A8] text-white text-sm font-semibold shadow-lg shadow-[#0057A8]/25 hover:shadow-xl hover:shadow-[#0057A8]/40 hover:-translate-y-0.5 transition-all"
          >
            <CalendarCheck className="w-4 h-4" />
            Agendar Consultoria
          </a>
          <button
            aria-label="Menu"
            onClick={() => setOpen(!open)}
            className="lg:hidden w-10 h-10 rounded-full bg-white shadow flex items-center justify-center text-[#0057A8]"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-slate-100 overflow-hidden"
          >
            <ul className="px-6 py-4 flex flex-col">
              {menu.map((m) => (
                <li key={m.label}>
                  <a
                    onClick={() => setOpen(false)}
                    href={m.href}
                    className="block py-3 text-slate-700 font-medium border-b border-slate-100"
                  >
                    {m.label}
                  </a>
                </li>
              ))}
              <a
                onClick={() => setOpen(false)}
                href="#lead"
                className="mt-4 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-[#009FE3] to-[#0057A8] text-white font-semibold"
              >
                <CalendarCheck className="w-4 h-4" />
                Agendar Consultoria
              </a>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
