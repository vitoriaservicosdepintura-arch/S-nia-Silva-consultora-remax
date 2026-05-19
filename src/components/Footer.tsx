import { Globe, Phone, Mail, MapPin } from "lucide-react";
import { Facebook, Instagram } from "./BrandIcons";

export default function Footer() {
  return (
    <footer className="bg-[#0A2540] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#009FE3] to-[#0057A8] flex items-center justify-center font-bold">
              S
            </span>
            <div>
              <p className="font-display text-lg font-semibold">Sónia Silva</p>
              <p className="text-[10px] tracking-[0.2em] text-white/50 uppercase">Consultoria Imobiliária</p>
            </div>
          </div>
          <div className="mt-6 flex items-center gap-4">
            <img src="/images/LOGO2-sem-fundo.png" alt="Equipa Logo" className="h-12 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity" />
            <div className="h-10 w-px bg-white/10" />
            <p className="text-[10px] text-white/50 leading-tight uppercase tracking-wider">
              Equipa Júlio Fernandes <br /> e Sónia Silva
            </p>
          </div>
          <p className="mt-4 text-white/70 max-w-md text-sm leading-relaxed">
            Consultora imobiliária na RE/MAX Dinâmica Daire. Confiança que abre portas para o seu
            futuro no mercado imobiliário em Portugal.
          </p>
          <div className="flex gap-3 mt-6">
            {[
              { Icon: Facebook, href: "https://www.facebook.com/profile.php?id=100081296978443&locale=pt_PT#" },
              { Icon: Instagram, href: "https://www.instagram.com/remaxsoniasilva/" },
              { Icon: Globe, href: "https://remax.pt/pt/agente/sonia-silva/122031171" },
            ].map((s, i) => (
              <a
                key={i}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-gradient-to-br hover:from-[#009FE3] hover:to-[#0057A8] flex items-center justify-center transition-all"
              >
                <s.Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Navegação</h4>
          <ul className="space-y-2 text-white/70 text-sm">
            <li><a href="#home" className="hover:text-[#9BD8FF]">Home</a></li>
            <li><a href="#sobre" className="hover:text-[#9BD8FF]">Sobre Mim</a></li>
            <li><a href="#servicos" className="hover:text-[#9BD8FF]">Serviços</a></li>
            <li><a href="#lead" className="hover:text-[#9BD8FF]">Consultoria Grátis</a></li>
            <li><a href="#contactos" className="hover:text-[#9BD8FF]">Contactos</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Contactos</h4>
          <ul className="space-y-3 text-white/70 text-sm">
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#9BD8FF]" />
              <a href="tel:+351913536291" className="hover:text-white transition-colors">+351 913 536 291</a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#9BD8FF]" />
              <a href="mailto:sonia.silva@remax.pt" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">sonia.silva@remax.pt</a>
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#9BD8FF]" /> Portugal
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 mt-12 pt-6 border-t border-white/10 text-center text-xs text-white/50">
        © {new Date().getFullYear()} Sónia Silva · Equipa Júlio Fernandes e Sónia Silva · RE/MAX Dinâmica Daire.
      </div>
    </footer>
  );
}
