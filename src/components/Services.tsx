import { motion } from "framer-motion";
import { Home, Building2, Key, ArrowUpRight } from "lucide-react";

const services = [
  {
    Icon: Home,
    title: "Compra de Imóveis",
    description:
      "Encontre o imóvel perfeito com acompanhamento profissional, do início ao fim do processo.",
    accent: "from-[#009FE3] to-[#0057A8]",
  },
  {
    Icon: Building2,
    title: "Investimentos",
    description:
      "Descubra oportunidades imobiliárias rentáveis em Portugal com análise de mercado especializada.",
    accent: "from-[#0057A8] to-[#003E7A]",
  },
  {
    Icon: Key,
    title: "Venda de Imóveis",
    description:
      "Venda com estratégia, valorização e máxima exposição na maior rede imobiliária do mundo.",
    accent: "from-[#009FE3] to-[#00C2FF]",
  },
];

export default function Services() {
  return (
    <section id="servicos" className="relative py-24 bg-gradient-to-b from-white to-[#F5F7FA]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EAF6FF] text-[#0057A8] text-xs font-semibold">
            SERVIÇOS
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-[#0A2540] mt-4">
            Como Posso <span className="text-gradient">Ajudar</span>
          </h2>
          <p className="text-slate-600 mt-4 text-lg">
            Soluções imobiliárias completas e personalizadas para cada cliente.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mt-14">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative rounded-3xl bg-white p-8 border border-slate-100 shadow-[0_6px_24px_-12px_rgba(0,87,168,0.15)] hover:shadow-[0_20px_50px_-20px_rgba(0,87,168,0.35)] transition-all overflow-hidden"
            >
              {/* gradient hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#EAF6FF] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${s.accent} flex items-center justify-center text-white shadow-lg shadow-[#0057A8]/20`}>
                  <s.Icon className="w-7 h-7" />
                </div>
                <h3 className="mt-6 font-display text-2xl font-bold text-[#0A2540]">
                  {s.title}
                </h3>
                <p className="mt-3 text-slate-600 leading-relaxed">{s.description}</p>

                <a
                  href="#lead"
                  className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-[#0057A8] group-hover:gap-2 transition-all"
                >
                  Saber mais
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>

              {/* corner decoration */}
              <div className="absolute -bottom-12 -right-12 w-32 h-32 rounded-full bg-gradient-to-br from-[#009FE3]/10 to-transparent" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
