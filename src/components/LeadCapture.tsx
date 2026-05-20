import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useRef } from "react";
import { User, Phone, Mail, Target, Send, CheckCircle2, Award } from "lucide-react";

export default function LeadCapture() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 0.4], [100, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.4], [0.95, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ nome: "", telefone: "", email: "", objetivo: "Comprar" });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4500);
    setForm({ nome: "", telefone: "", email: "", objetivo: "Comprar" });
  };

  return (
    <section
      id="lead"
      ref={containerRef}
      className="relative py-12 lg:py-20 overflow-visible z-20 shadow-[0_-20px_50px_rgba(0,0,0,0.1)] -mt-6 lg:-mt-10 rounded-t-[3rem] sm:rounded-t-[4rem]"
    >
      <motion.div style={{ y, scale, opacity }}>
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#0057A8] via-[#0057A8] to-[#003E7A]" />
        {/* Decorative shapes */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-[#009FE3]/20 blur-3xl -z-10" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-white/10 blur-3xl -z-10" />
        <svg className="absolute top-10 right-10 opacity-20 -z-10" width="200" height="200" viewBox="0 0 200 200" fill="none">
          <circle cx="100" cy="100" r="98" stroke="white" strokeWidth="1" strokeDasharray="4 6" />
          <circle cx="100" cy="100" r="60" stroke="white" strokeWidth="1" />
        </svg>

        <div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-2 gap-16 lg:gap-24 items-center min-h-[700px]">
          {/* Left Content - Centralized */}
          <div className="relative flex flex-col justify-center items-center lg:items-center text-center">


            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative z-10 w-full flex flex-col items-center"
            >
              {/* Animated Image Container - Synchronized with form height */}
              {/* Animated Image Container - Perfectly matched to form size */}
              <div className="group relative p-1.5 rounded-[2.5rem] bg-white/10 backdrop-blur-sm overflow-hidden shadow-2xl w-full max-w-[480px] h-[640px]">
                {/* Blue Spin Effect (Animated Border) */}
                <div className="absolute inset-[-100%] bg-[conic-gradient(transparent,transparent,transparent,#009FE3)] animate-[spin_4s_linear_infinite] opacity-100" />

                <div className="relative bg-transparent rounded-[2.3rem] p-0.5 border-4 border-white shadow-[0_0_50px_rgba(255,255,255,0.25)] h-full">
                  <img
                    src="/images/FOTO2-SEM-FUNDO-EDITADO1.png"
                    alt="Sónia Silva"
                    className="w-full h-full object-cover object-top rounded-[2rem] drop-shadow-2xl"
                  />
                </div>

                {/* Extra Sparkle Glow */}
                <div className="absolute inset-0 rounded-[2.5rem] shadow-[inset_0_0_80px_rgba(255,255,255,0.2)] pointer-events-none" />
              </div>

              <div className="text-white mt-10 w-full flex flex-col items-center">
                <span className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/10 border border-white/20 text-sm font-semibold backdrop-blur-md">
                  <Award className="w-4 h-4" /> Atendimento de Elite · Equipa Fernandes & Sónia Silva
                </span>
              </div>
            </motion.div>
          </div>

          {/* Form */}
          <motion.form
            onSubmit={onSubmit}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative rounded-3xl bg-white/95 backdrop-blur-xl p-6 sm:p-8 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.4)] border border-white/40"
          >
            <div className="absolute -top-4 -right-4 bg-gradient-to-br from-[#009FE3] to-[#0057A8] text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg">
              CONSULTORIA ESPECIALIZADA
            </div>

            <h3 className="font-display text-2xl font-bold text-[#0A2540]">
              Comece agora a sua jornada
            </h3>
            <p className="text-sm text-slate-500 mt-1">Os seus dados estão protegidos.</p>

            <div className="grid sm:grid-cols-2 gap-4 mt-6">
              <Field
                icon={User}
                label="Nome"
                type="text"
                required
                value={form.nome}
                onChange={(v) => setForm({ ...form, nome: v })}
                placeholder="O seu nome"
              />
              <Field
                icon={Phone}
                label="Telefone"
                type="tel"
                required
                value={form.telefone}
                onChange={(v) => setForm({ ...form, telefone: v })}
                placeholder="+351 ..."
              />
              <div className="sm:col-span-2">
                <Field
                  icon={Mail}
                  label="Email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(v) => setForm({ ...form, email: v })}
                  placeholder="email@exemplo.pt"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider flex items-center gap-2">
                  <Target className="w-3.5 h-3.5 text-[#009FE3]" /> Objetivo do imóvel
                </label>
                <select
                  value={form.objetivo}
                  onChange={(e) => setForm({ ...form, objetivo: e.target.value })}
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-slate-800 focus:border-[#009FE3] focus:ring-4 focus:ring-[#009FE3]/15 outline-none transition"
                >
                  <option>Comprar imóvel para habitação</option>
                  <option>Vender imóvel</option>
                  <option>Investimento imobiliário</option>
                  <option>Arrendamento</option>
                  <option>Outro</option>
                </select>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="mt-6 w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-gradient-to-r from-[#009FE3] to-[#0057A8] text-white font-semibold shadow-lg shadow-[#0057A8]/30 hover:shadow-xl transition-all"
            >
              {submitted ? (
                <>
                  <CheckCircle2 className="w-5 h-5" /> Pedido enviado com sucesso!
                </>
              ) : (
                <>
                  Quero Falar com a Consultora <Send className="w-4 h-4" />
                </>
              )}
            </motion.button>

            <p className="text-[11px] text-slate-400 text-center mt-4">
              Ao enviar, aceita ser contactada por Sónia Silva. Sem spam.
            </p>
          </motion.form>
        </div>
      </motion.div>
    </section>
  );
}

function Field({
  icon: Icon,
  label,
  type,
  value,
  onChange,
  placeholder,
  required,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider flex items-center gap-2">
        <Icon className="w-3.5 h-3.5 text-[#009FE3]" /> {label}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-slate-800 placeholder:text-slate-400 focus:border-[#009FE3] focus:ring-4 focus:ring-[#009FE3]/15 outline-none transition"
      />
    </div>
  );
}
