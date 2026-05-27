import { motion } from "framer-motion";
import { CheckCircle2, Users, Award, Sparkles } from "lucide-react";
import { useAdmin } from "../context/AdminContext";

const reasons = [
  "Atendimento personalizado",
  "Consultoria especializada",
  "Experiência no mercado imobiliário",
  "Suporte completo durante todo o processo",
  "Compromisso com resultados",
];

const stats = [
  { Icon: Award, value: "Missão", label: "Realizar o seu sonho" },
  { Icon: CheckCircle2, value: "Ética", label: "Compromisso total" },
  { Icon: Users, value: "Confiança", label: "Relações duradouras" },
  { Icon: Sparkles, value: "Sucesso", label: "O seu novo capítulo" },
];

export default function SocialProof() {
  const { content } = useAdmin();
  return (
    <section id="sobre" className="relative py-24 bg-white overflow-hidden">
      {/* bg decoration */}
      <div className="absolute -top-20 right-1/4 w-[400px] h-[400px] rounded-full bg-[#EAF6FF] blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-2 gap-14 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EAF6FF] text-[#0057A8] text-xs font-semibold">
            VALORES & PROPÓSITO
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-[#0A2540] mt-4 leading-tight">
            Mais do que consultoria, <br />
            <span className="text-gradient">uma parceria para a vida.</span>
          </h2>
          <p className="mt-4 text-slate-600 text-lg max-w-lg">
            O sucesso de um investimento começa na clareza do propósito e na confiança de quem o guia.
          </p>

          <ul className="mt-8 space-y-3">
            {reasons.map((r, i) => (
              <motion.li
                key={r}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-[#F5F7FA] to-white border border-slate-100 hover:border-[#009FE3]/30 hover:shadow-md transition-all"
              >
                <CheckCircle2 className="w-5 h-5 text-[#009FE3] shrink-0" />
                <span className="text-slate-800 font-medium">{r}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Stats card */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="absolute -inset-4 bg-gradient-to-br from-[#009FE3]/15 to-[#0057A8]/10 rounded-[2.5rem] blur-2xl -z-10" />
          <div className="grid grid-cols-2 gap-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`rounded-3xl p-6 border shadow-lg ${i % 3 === 0
                  ? "bg-gradient-to-br from-[#009FE3] to-[#0057A8] text-white border-transparent"
                  : "bg-white text-slate-800 border-slate-100"
                  }`}
              >
                <s.Icon className={`w-7 h-7 ${i % 3 === 0 ? "text-white" : "text-[#009FE3]"}`} />
                <p className="mt-4 font-display text-2xl lg:text-3xl font-bold">{s.value}</p>
                <p className={`mt-1 text-sm ${i % 3 === 0 ? "text-white/80" : "text-slate-500"}`}>
                  {s.label}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Testimonial card -> Motivational Quote */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-6 rounded-3xl bg-gradient-to-br from-[#0A2540] to-[#0057A8] p-8 border border-white/10 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Sparkles className="w-20 h-20 text-white" />
            </div>

            <p className="relative z-10 text-white text-lg font-medium italic leading-relaxed">
              “Vender ou comprar uma casa não é apenas um negócio, é a construção de um novo capítulo. O meu propósito é garantir que cada passo dessa jornada seja seguro, transparente e repleto de conquistas.”
            </p>

            <div className="mt-6 flex items-center gap-4 relative z-10">
              <div className="w-12 h-12 rounded-full border-2 border-white/20 p-1">
                <div className="w-full h-full rounded-full bg-[#009FE3]" />
              </div>
              <div>
                <p className="text-sm font-bold text-white uppercase tracking-widest text-gradient bg-white">Sónia Silva</p>
                <p className="text-xs text-white/60">A vossa parceira de confiança</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {content.valuesContent?.images?.length > 0 && (
        <div className="mt-16 max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {content.valuesContent.images.map((img, i) => (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                key={`val-img-${i}`}
                className="rounded-3xl overflow-hidden aspect-[4/3] shadow-lg border border-slate-100 group"
              >
                <img src={img} className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-700" alt={`Valor ${i}`} />
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
