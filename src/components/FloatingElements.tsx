import { Globe } from "lucide-react";
import { Facebook, Instagram } from "./BrandIcons";
import { motion } from "framer-motion";

export default function FloatingElements() {
  return (
    <>
      {/* Social sidebar — left center (desktop only) */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2 }}
        className="hidden md:flex fixed left-4 top-1/2 -translate-y-1/2 z-40 flex-col gap-3"
      >
        {[
          {
            Icon: Facebook,
            href: "https://www.facebook.com/profile.php?id=100081296978443&locale=pt_PT#",
            color: "hover:bg-[#1877F2]",
            label: "Facebook",
          },
          {
            Icon: Instagram,
            href: "https://www.instagram.com/remaxsoniasilva/",
            color: "hover:bg-gradient-to-br hover:from-fuchsia-500 hover:to-amber-500",
            label: "Instagram",
          },
          {
            Icon: Globe,
            href: "https://remax.pt/pt/agente/sonia-silva/122031171",
            color: "hover:bg-[#0057A8]",
            label: "RE/MAX",
          },
        ].map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noreferrer"
            aria-label={s.label}
            title={s.label}
            className={`w-11 h-11 rounded-full bg-white shadow-lg flex items-center justify-center text-slate-600 hover:text-white transition-all hover:-translate-x-1 ${s.color}`}
          >
            <s.Icon className="w-4 h-4" />
          </a>
        ))}
      </motion.div>
    </>
  );
}
