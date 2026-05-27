import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Minimize2,
  Maximize2,
  Send,
  Mic,
  MicOff,
  ChevronDown,
  Sparkles,
  ExternalLink,
  Volume2,
  VolumeX,
  Globe,
  ArrowLeft,
} from "lucide-react";
import { findAnswer, AGENT_PROFILE } from "../data/assistantKnowledge";
import WelcomeAvatar from "./WelcomeAvatar";
import { pickBestVoice, loadVoices, cleanForTTS } from "../utils/ptVoice";
import { useAdmin } from "../context/AdminContext";
import { askGroq, translateChat } from "../utils/groqClient";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Message {
  id: string;
  from: "user" | "assistant";
  text: string;
  time: string;
  quickReplies?: string[];
}

// ─── Multilingual Config ──────────────────────────────────────────────────────
const LANGUAGES = [
  { id: "pt-PT", label: "Português", flag: "🇵🇹" },
  { id: "pt-BR", label: "Brasil", flag: "🇧🇷" },
  { id: "es-ES", label: "Español", flag: "🇪🇸" },
  { id: "en-GB", label: "English", flag: "🇬🇧" },
];

type Phase = "idle" | "welcome" | "lead_form" | "chat";

// ─── Helpers ──────────────────────────────────────────────────────────────────
function now() {
  return new Date().toLocaleTimeString("pt-PT", { hour: "2-digit", minute: "2-digit" });
}
function uid() {
  return Math.random().toString(36).slice(2);
}

// Sanitize AI output — convert [![img](imgUrl) label](linkUrl) → [label](linkUrl)
function sanitizeAIText(text: string): string {
  return text
    // Convert image-in-link: [![alt](imgUrl) label](linkUrl) → [label](linkUrl)
    .replace(/\[!\[[^\]]*\]\([^)]+\)\s*([^\]]*)\]\(([^)]+)\)/g, (_match, label, url) => {
      const cleanLabel = label.trim() || "Ver link";
      return `[${cleanLabel}](${url})`;
    })
    // Also handle plain [![alt](imgUrl)](linkUrl) with no extra label → [Ver no WhatsApp](linkUrl)
    .replace(/\[!\[[^\]]*\]\([^)]+\)\]\(([^)]+)\)/g, (_match, url) => {
      return `[Confirmar no WhatsApp da Sónia](${url})`;
    });
}

// parse **bold**, [link](url), and ![alt](url) markdown → JSX
function parseText(text: string, lead?: { name: string; email: string; phone: string }, profile?: { intent: string }) {
  const sanitized = sanitizeAIText(text);
  const lines = sanitized.split("\n");
  return lines.map((line, li) => {
    // Regex splits the string and keeps the matched patterns in the array
    const parts = line.split(/(\*\*[^*]+\*\*|!\[[^\]]*\]\([^)]+\)|\[[^\]]+\]\([^)]+\))/g);
    return (
      <span key={li}>
        {parts.map((p, i) => {
          if (!p) return null;

          if (p.startsWith("**") && p.endsWith("**")) {
            return (
              <strong key={i} className="font-semibold text-[#0057A8]">
                {p.slice(2, -2)}
              </strong>
            );
          }

          // Image check: ![alt](url)
          if (p.startsWith("![") && p.match(/!\[([^\]]*)\]\(([^)]+)\)/)) {
            const m = p.match(/!\[([^\]]*)\]\(([^)]+)\)/)!;
            return (
              <img
                key={i}
                src={m[2]}
                alt={m[1]}
                className="w-full h-auto rounded-xl mt-3 mb-3 shadow-sm border border-slate-100 object-cover max-h-64"
              />
            );
          }

          // Link check: [text](url)
          if (p.startsWith("[") && p.match(/\[([^\]]+)\]\(([^)]+)\)/)) {
            const m = p.match(/\[([^\]]+)\]\(([^)]+)\)/)!;
            const label = m[1];
            let url = m[2];
            const isWhatsApp = url.includes("wa.me");

            if (isWhatsApp && lead) {
              // Append lead info to WhatsApp text
              let leadDetails = `\n\n[Detalhes do Lead]\nNome: ${lead.name}\nTelemóvel: ${lead.phone}\nEmail: ${lead.email}`;
              if (profile?.intent && profile.intent !== "unknown") {
                leadDetails += `\nCategoria/Interesse: ${profile.intent.toUpperCase()}`;
              }
              const currentTextMatch = url.match(/text=([^&]*)/);
              if (currentTextMatch) {
                const currentText = decodeURIComponent(currentTextMatch[1]);
                url = url.replace(/text=[^&]*/, `text=${encodeURIComponent(currentText + leadDetails)}`);
              } else {
                url += `?text=${encodeURIComponent("Olá Sónia!" + leadDetails)}`;
              }
            }

            if (isWhatsApp) {
              return (
                <a
                  key={i}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 mt-3 px-4 py-2.5 rounded-xl font-semibold text-sm text-white shadow-md transition-all hover:scale-105 active:scale-95"
                  style={{ background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)" }}
                >
                  <svg viewBox="0 0 32 32" width="18" height="18" fill="white" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.01 2C8.27 2 2 8.27 2 16.01c0 2.47.65 4.87 1.88 6.99L2 30l7.18-1.87A13.94 13.94 0 0 0 16.01 30C23.73 30 30 23.73 30 16.01 30 8.27 23.73 2 16.01 2zm6.93 19.67c-.29.81-1.69 1.55-2.31 1.64-.59.09-1.33.12-2.14-.14-.49-.16-1.12-.38-1.92-.74-3.38-1.46-5.58-4.85-5.75-5.07-.17-.22-1.35-1.8-1.35-3.43 0-1.63.86-2.43 1.16-2.76.3-.33.65-.41.87-.41l.63.01c.2 0 .47-.08.74.56.29.67.97 2.36 1.05 2.53.09.17.14.38.03.6-.11.22-.17.35-.33.54l-.49.57c-.16.18-.34.38-.14.75.19.36.86 1.42 1.84 2.3 1.26 1.13 2.33 1.48 2.66 1.65.33.17.52.14.71-.08.19-.23.82-.96 1.04-1.29.22-.33.44-.27.74-.16.31.11 1.96.93 2.3 1.1.33.17.55.25.63.39.09.14.09.81-.19 1.62z" />
                  </svg>
                  {label.replace(/\[.*?\]/g, "").trim()}
                </a>
              );
            }

            return (
              <a
                key={i}
                href={url}
                target="_blank"
                rel="noreferrer"
                className="underline text-[#009FE3] hover:text-[#0057A8]"
              >
                {label}
              </a>
            );
          }

          return <span key={i} dangerouslySetInnerHTML={{ __html: p.replace(/\n/g, '<br/>') }} />;
        })}
        {li < lines.length - 1 && <br />}
      </span>
    );
  });
}

// ─── AvatarFace (circle crop) ─────────────────────────────────────────────────
function AvatarFace({ talking, listening }: { talking: boolean; listening: boolean }) {
  return (
    <div className="relative w-full h-full rounded-full overflow-hidden">
      <img
        src="/images/sonia.png"
        alt="Sónia Silva"
        className="w-full h-full object-cover"
        style={{ objectPosition: "50% 10%" }}
      />
      <AnimatePresence>
        {talking && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "radial-gradient(ellipse at 50% 110%, rgba(0,159,227,0.18) 0%, transparent 70%)",
            }}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {listening && (
          <motion.div
            initial={{ scale: 1, opacity: 0.8 }}
            animate={{ scale: [1, 1.1, 1], opacity: [0.8, 0.4, 0.8] }}
            transition={{ repeat: Infinity, duration: 1.2 }}
            className="absolute inset-0 rounded-full border-2 border-[#009FE3]"
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Typing dots ──────────────────────────────────────────────────────────────
function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-2 h-2 rounded-full bg-[#009FE3]"
          animate={{ y: [0, -5, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 0.9, delay: i * 0.18 }}
        />
      ))}
    </div>
  );
}

// ─── Sound wave ───────────────────────────────────────────────────────────────
function SoundWave({ active }: { active: boolean }) {
  if (!active) return null;
  return (
    <div className="flex items-end gap-0.5 h-4">
      {[1, 3, 2, 4, 1, 3, 2].map((h, i) => (
        <motion.span
          key={i}
          className="w-1 rounded-full bg-[#009FE3]"
          animate={{ height: [h * 3, h * 6, h * 2, h * 5, h * 3] }}
          transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.07, ease: "easeInOut" }}
          style={{ height: 4 }}
        />
      ))}
    </div>
  );
}

export default function VirtualAssistant() {
  const { content } = useAdmin();
  const { knowledgeBase, properties } = content;
  const [phase, setPhase] = useState<Phase>("idle");
  const [minimized, setMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [talking, setTalking] = useState(false);
  const [listening, setListening] = useState(false);
  const [muted, setMuted] = useState(false);
  const [hasGreeted, setHasGreeted] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [currentLang, setCurrentLang] = useState("pt-PT");
  const [showLangMenu, setShowLangMenu] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const speechRef = useRef<SpeechRecognition | null>(null);
  const voiceRef = useRef<SpeechSynthesisVoice | null>(null);
  const [voiceReady, setVoiceReady] = useState(false);
  const [voiceName, setVoiceName] = useState<string>("");
  const [voiceGender, setVoiceGender] = useState<"female" | "male">("female");
  const [leadInfo, setLeadInfo] = useState({ name: "", email: "", phone: "" });
  const [profile, setProfile] = useState({
    intent: "unknown",
    area: "",
    urgency: "medium",
    score: 0
  });

  // ── Lead Intelligence ──────────────────────────────────────────────────────
  const analyzeLead = (text: string) => {
    const txt = text.toLowerCase();
    setProfile(prev => {
      let intent = prev.intent;
      let score = prev.score;

      if (txt.includes("comprar") || txt.includes("procuro")) { intent = "buyer"; score += 20; }
      if (txt.includes("vender") || txt.includes("avaliar")) { intent = "seller"; score += 25; }
      if (txt.includes("investir") || txt.includes("rendimento")) { intent = "investor"; score += 30; }

      if (txt.includes("rápido") || txt.includes("urgente")) score += 15;

      return { ...prev, intent, score };
    });
  };

  // ── Preload best voice on mount / lang change ───────────────────────
  useEffect(() => {
    loadVoices().then((voices) => {
      const best = pickBestVoice(voices, currentLang, voiceGender);
      if (best) {
        voiceRef.current = best;
        setVoiceName(best.name);
        setVoiceReady(true);
      }
    });
  }, [currentLang, voiceGender]);

  // ── Translate chat on language change ───────────────────────────────────
  useEffect(() => {
    // Force reset the voice cache so the assistant finds the new language
    voiceRef.current = null;
    setVoiceReady(false);

    if (messages.length > 0) {
      setTyping(true);
      translateChat(messages, currentLang).then(translated => {
        setMessages(translated);
        setTyping(false);
      });
    }
  }, [currentLang]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Show speech bubble above button after delay ───────────────────────────
  useEffect(() => {
    const t = setTimeout(() => setShowBubble(true), 4000);
    return () => clearTimeout(t);
  }, []);



  // ── Scroll to bottom ──────────────────────────────────────────────────────
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  // ── Focus input when in chat ──────────────────────────────────────────────
  useEffect(() => {
    if (phase === "chat" && !minimized) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [phase, minimized]);

  // ── Multilingual Speech Synthesis ──────────────────────────────────────────
  const speak = useCallback(
    (text: string) => {
      if (muted || typeof window === "undefined" || !window.speechSynthesis) return;

      const synth = window.speechSynthesis;
      synth.cancel();

      const clean = cleanForTTS(text);
      if (!clean.trim()) return;

      const utt = new SpeechSynthesisUtterance(clean);
      utt.lang = currentLang;

      const chosenVoice =
        voiceRef.current ??
        pickBestVoice(synth.getVoices(), currentLang, voiceGender);

      if (chosenVoice) {
        utt.voice = chosenVoice;
        if (!voiceRef.current) {
          voiceRef.current = chosenVoice;
          setVoiceName(chosenVoice.name);
          setVoiceReady(true);
        }
      }

      // ── Naturalness settings ──────────────────────────────────────────────
      // Slower rate = more natural / warm female tone
      utt.rate = 0.92;   // Measured, warm pace
      utt.pitch = 1.05;   // Natural feminine tone
      utt.volume = 0.95;

      // ── Events ────────────────────────────────────────────────────────────
      utt.onstart = () => setTalking(true);
      utt.onend = () => setTalking(false);
      utt.onerror = () => setTalking(false);

      // Chrome bug: long utterances get cut off — split at sentence boundaries
      if (clean.length > 200) {
        const sentences = clean.match(/[^.!?]+[.!?]*/g) ?? [clean];
        let idx = 0;
        const speakNext = () => {
          if (idx >= sentences.length || muted) { setTalking(false); return; }
          const chunk = new SpeechSynthesisUtterance(sentences[idx].trim());
          chunk.lang = currentLang;
          chunk.rate = utt.rate;
          chunk.pitch = utt.pitch;
          chunk.volume = utt.volume;
          if (chosenVoice) chunk.voice = chosenVoice;
          if (idx === 0) chunk.onstart = () => setTalking(true);
          chunk.onend = () => { idx++; speakNext(); };
          chunk.onerror = () => { idx++; speakNext(); };
          synth.speak(chunk);
        };
        speakNext();
        return;
      }

      synth.speak(utt);
    },
    [muted, currentLang, voiceGender] // eslint-disable-line react-hooks/exhaustive-deps
  );

  // ── Push assistant message ─────────────────────────────────────────────────
  const pushAssistantMessage = useCallback(
    (text: string, quickReplies?: string[]) => {
      setTyping(true);
      const delay = Math.min(800 + text.length * 8, 2200);
      setTimeout(() => {
        setTyping(false);
        setMessages((prev) => [
          ...prev,
          { id: uid(), from: "assistant", text, time: now(), quickReplies },
        ]);
        speak(text);
      }, delay);
    },
    [speak]
  );

  // ── Greet on entering welcome phase (opening assistant) ───────────────────
  useEffect(() => {
    if (phase === "welcome") {
      setTimeout(() => {
        speak("Olá! 👋 Bem-vindo ao site da Sónia Silva! Sou a sua assistente virtual. Estou aqui para ajudar a encontrar o imóvel ideal ou agendar uma consultoria gratuita! 🏡");
      }, 300);
    }
  }, [phase, speak]);

  // ── Greet on entering lead form ───────────────────────────────────────────
  useEffect(() => {
    if (phase === "lead_form") {
      setTimeout(() => {
        speak("Para iniciarmos uma boa conversa, por favor colocar as suas informações abaixo.");
      }, 300);
    }
  }, [phase, speak]);

  // ── Greet on entering chat phase ──────────────────────────────────────────
  useEffect(() => {
    if (phase === "chat" && !hasGreeted) {
      setHasGreeted(true);
      setTimeout(() => {
        const firstName = leadInfo.name ? leadInfo.name.split(' ')[0] : "";
        const welcomeText = firstName
          ? `Muito bem-vindo(a), **${firstName}**! É um prazer falar consigo. 😊\n\nComo é que eu posso ajudar hoje?`
          : `Muito bem-vindo(a)! É um prazer falar consigo. 😊\n\nComo posso ajudar hoje?`;

        pushAssistantMessage(welcomeText, ["Comprar imóvel", "Vender imóvel", "Investir", "Falar no WhatsApp"]);
      }, 350);
    }
  }, [phase, hasGreeted, leadInfo.name, pushAssistantMessage]);

  // ── Handle user send ──────────────────────────────────────────────────────
  const handleSend = useCallback(
    async (text: string) => {
      if (!text.trim()) return;

      const newMsg = { id: uid(), from: "user", text: text.trim(), time: now() } as Message;
      setMessages((prev) => [...prev, newMsg]);
      setInput("");
      setTyping(true);

      // Analyze intent & profiling
      analyzeLead(text);

      // Build chat history for Groq
      const historyContext = messages.map(m => ({
        role: m.from === "user" ? "user" : "assistant",
        content: m.text
      }));

      try {
        // Obter resposta inteligente da Groq
        const answer = await askGroq(text, knowledgeBase, properties, historyContext, currentLang, leadInfo);

        setTyping(false);
        setMessages((prev) => [
          ...prev,
          { id: uid(), from: "assistant", text: answer, time: now() },
        ]);
        speak(answer);
      } catch (e) {
        // Fallback para KBs locais se a API der erro
        const qa = findAnswer(text, knowledgeBase);
        setTyping(false);
        setMessages((prev) => [
          ...prev,
          { id: uid(), from: "assistant", text: qa.answer, time: now(), quickReplies: qa.quickReplies },
        ]);
        speak(qa.answer);
      }
    },
    [messages, knowledgeBase, properties, speak, analyzeLead, currentLang]
  );

  // ── Quick reply router ────────────────────────────────────────────────────
  const handleQuickReply = useCallback(
    (qr: string) => {
      if (
        qr === "Abrir WhatsApp agora" ||
        qr === "Falar no WhatsApp" ||
        qr === "Falar com a Sónia"
      ) {
        let text = "Olá Sónia! Vim pelo Assistente Virtual do site e gostaria de falar consigo.";
        if (leadInfo.name) {
          text += `\n\n[Detalhes do Lead]`;
          text += `\nNome: ${leadInfo.name}`;
          text += `\nTelemóvel: ${leadInfo.phone}`;
          text += `\nEmail: ${leadInfo.email}`;
          if (profile.intent && profile.intent !== "unknown") {
            text += `\nCategoria/Interesse: ${profile.intent.toUpperCase()}`;
          }
        }
        const waUrl = `https://wa.me/${AGENT_PROFILE.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(text)}`;
        window.open(waUrl, "_blank");
        pushAssistantMessage(
          `A abrir o WhatsApp da Sónia... 📱\nSe não abrir automaticamente, contacte: **${AGENT_PROFILE.phone}**`,
          ["Ir para o formulário", "Fechar"]
        );
        return;
      }
      if (qr === "Ir para o formulário") {
        document.getElementById("lead")?.scrollIntoView({ behavior: "smooth" });
        setPhase("idle");
        return;
      }
      if (qr === "Ver site RE/MAX" || qr === "Ver site oficial") {
        window.open(AGENT_PROFILE.officialSite, "_blank");
        return;
      }
      if (qr === "Ligar agora") {
        window.location.href = `tel:${AGENT_PROFILE.phone}`;
        return;
      }
      if (qr === "Fechar") {
        setPhase("idle");
        return;
      }
      handleSend(qr);
    },
    [handleSend, pushAssistantMessage, leadInfo, profile]
  );

  // ── Mic toggle ────────────────────────────────────────────────────────────
  const toggleMic = useCallback(() => {
    const SR =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) {
      pushAssistantMessage(
        "O reconhecimento de voz não está disponível neste browser. Por favor use o campo de texto. 😊"
      );
      return;
    }
    if (listening) {
      speechRef.current?.stop();
      setListening(false);
      return;
    }
    const sr: SpeechRecognition = new SR();
    speechRef.current = sr;
    sr.lang = "pt-PT";
    sr.continuous = false;
    sr.interimResults = false;
    sr.onstart = () => setListening(true);
    sr.onresult = (e: SpeechRecognitionEvent) => {
      const transcript = e.results[0][0].transcript;
      setListening(false);
      handleSend(transcript);
    };
    sr.onerror = () => setListening(false);
    sr.onend = () => setListening(false);
    sr.start();
  }, [listening, handleSend, pushAssistantMessage]);

  // ── Mute toggle ───────────────────────────────────────────────────────────
  const toggleMute = () => {
    setMuted((m) => {
      const newlyMuted = !m;
      // se ficou mute, para imediatamente
      if (newlyMuted && window.speechSynthesis) window.speechSynthesis.cancel();
      return newlyMuted;
    });
    setTalking(false);
  };

  // ── Close everything ──────────────────────────────────────────────────────
  const handleClose = () => {
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    setTalking(false);

    // Mensagem de encerramento
    speak("Obrigada pelo seu contacto. Estarei aqui caso precise de mais alguma coisa. Até breve!");

    setPhase("idle");
  };

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <>
      {/* ══════════════════════════════════════════════════════════════════ */}
      {/*  IDLE — Floating avatar launcher button                           */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {phase === "idle" && (
          <motion.div
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3"
          >
            {/* Speech bubble pop-up */}
            <AnimatePresence>
              {showBubble && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.82, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.82, y: 10 }}
                  className="relative bg-white rounded-2xl rounded-br-sm px-4 py-3 shadow-2xl border border-slate-100 max-w-[210px]"
                >
                  <button
                    onClick={() => setShowBubble(false)}
                    className="absolute -top-2 -right-2 w-5 h-5 bg-slate-400 rounded-full text-white text-[10px] flex items-center justify-center hover:bg-slate-600"
                  >
                    ×
                  </button>
                  <p className="text-xs font-semibold text-slate-800 leading-snug">
                    Olá! 👋 como Posso ajudar ?
                  </p>
                  <div className="mt-1.5 flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="text-[10px] text-slate-500">Online agora</span>
                  </div>
                  <div
                    className="absolute -bottom-2 right-5 w-0 h-0"
                    style={{
                      borderLeft: "8px solid transparent",
                      borderRight: "8px solid transparent",
                      borderTop: "8px solid white",
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Avatar circle button */}
            <motion.button
              onClick={() => { setPhase("welcome"); setShowBubble(false); }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.93 }}
              className="relative w-[78px] h-[78px] rounded-full cursor-pointer focus:outline-none"
              aria-label="Abrir assistente virtual"
            >
              {/* Pulse rings */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-[#009FE3]/60"
                animate={{ scale: [1, 1.28, 1], opacity: [0.9, 0, 0.9] }}
                transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute inset-0 rounded-full border border-[#009FE3]/30"
                animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0, 0.6] }}
                transition={{ repeat: Infinity, duration: 2.2, delay: 0.5, ease: "easeInOut" }}
              />
              {/* Gradient frame */}
              <div className="absolute inset-0 rounded-full p-[3px] bg-gradient-to-br from-[#009FE3] to-[#0057A8] shadow-2xl shadow-[#0057A8]/40">
                <div className="w-full h-full rounded-full overflow-hidden bg-white">
                  <img
                    src="/images/sonia.png"
                    alt="Sónia Silva"
                    className="w-full h-full object-cover"
                    style={{ objectPosition: "50% 10%" }}
                  />
                </div>
              </div>
              {/* Online dot */}
              <span className="absolute bottom-0.5 right-0.5 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white shadow" />
              {/* IA badge */}
              <span className="absolute -top-1 -left-1 bg-gradient-to-br from-[#009FE3] to-[#0057A8] text-white text-[8px] font-extrabold px-1.5 py-0.5 rounded-full shadow-lg">
                IA
              </span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/*  WELCOME — Animated intro screen with Sónia waving               */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {phase === "welcome" && (
          <motion.div
            key="welcome"
            className="fixed bottom-6 right-4 sm:right-6 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <WelcomeAvatar
              onEnterChat={() => setPhase("lead_form")}
              onClose={handleClose}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/*  LEAD FORM — Capturing User Info First                            */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {phase === "lead_form" && (
          <motion.div
            key="lead"
            className="fixed bottom-6 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[380px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-100 flex flex-col items-center p-6 text-center">
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 w-7 h-7 bg-slate-50 hover:bg-slate-100 rounded-full flex items-center justify-center text-slate-400 transition"
              >
                <X className="w-3.5 h-3.5" />
              </button>

              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#EAF6FF] shadow-sm mb-3">
                <img
                  src="/images/sonia.png"
                  alt="Sónia"
                  className="w-full h-full object-cover"
                  style={{ objectPosition: "50% 10%" }}
                />
              </div>
              <h3 className="font-bold text-slate-800 text-lg mb-1">Para iniciarmos uma boa conversa...</h3>
              <p className="text-sm text-slate-500 mb-5 leading-relaxed">
                Por favor, colocar as suas informações abaixo.
              </p>

              <form
                className="w-full flex flex-col gap-3"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (leadInfo.name && leadInfo.phone && leadInfo.email) {
                    setPhase("chat");
                  }
                }}
              >
                <input
                  required
                  type="text"
                  placeholder="Seu nome"
                  value={leadInfo.name}
                  onChange={e => setLeadInfo({ ...leadInfo, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#009FE3]/50 text-sm"
                />
                <input
                  required
                  type="email"
                  placeholder="Seu e-mail"
                  value={leadInfo.email}
                  onChange={e => setLeadInfo({ ...leadInfo, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#009FE3]/50 text-sm"
                />
                <input
                  required
                  type="tel"
                  placeholder="Seu telefone"
                  value={leadInfo.phone}
                  onChange={e => setLeadInfo({ ...leadInfo, phone: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#009FE3]/50 text-sm"
                />

                <button
                  type="submit"
                  className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-[#009FE3] to-[#0057A8] text-white font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition active:scale-[0.98] shadow-lg shadow-[#009FE3]/20"
                >
                  <Send className="w-4 h-4" /> Iniciar conversa
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/*  CHAT — Full conversation panel                                   */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {phase === "chat" && (
          <motion.div
            key="chat"
            initial={{ opacity: 0, scale: 0.86, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.86, y: 40 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="fixed bottom-6 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[400px] flex flex-col"
            style={{ maxHeight: minimized ? "auto" : "min(680px, calc(100vh-6rem))" }}
          >
            <div
              className="flex flex-col rounded-3xl overflow-hidden border border-white/50"
              style={{
                backdropFilter: "blur(20px)",
                background: "rgba(255,255,255,0.97)",
                boxShadow: "0 32px 80px -16px rgba(0,87,168,0.35)",
              }}
            >
              {/* ── Header ─────────────────────────────────────────────── */}
              <div className="relative bg-gradient-to-r from-[#0057A8] via-[#006FCC] to-[#009FE3] px-4 py-3 flex items-center gap-3">
                {/* Deco shapes */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-white/10" />
                  <div className="absolute -bottom-6 left-1/3 w-16 h-16 rounded-full bg-white/5" />
                  <svg className="absolute top-2 right-14 opacity-20" width="56" height="56" viewBox="0 0 56 56" fill="none">
                    <circle cx="28" cy="28" r="26" stroke="white" strokeWidth="1" strokeDasharray="3 4" />
                  </svg>
                </div>

                {/* Back to welcome */}
                <button
                  onClick={() => setPhase("welcome")}
                  className="relative z-10 w-7 h-7 rounded-full bg-white/15 hover:bg-white/30 flex items-center justify-center text-white transition shrink-0"
                  title="Voltar"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>

                {/* Avatar in header */}
                <div className="relative shrink-0 w-12 h-12">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-white/30 to-white/10 p-[2px]">
                    <div className="w-full h-full rounded-full overflow-hidden">
                      <AvatarFace talking={talking} listening={listening} />
                    </div>
                  </div>
                  {talking && (
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-white/60"
                      animate={{ scale: [1, 1.15, 1] }}
                      transition={{ repeat: Infinity, duration: 0.6 }}
                    />
                  )}
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white" />
                </div>

                <div className="flex-1 min-w-0 relative z-10">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-white text-sm">Sónia Silva</p>
                    <Sparkles className="w-3 h-3 text-yellow-300" />
                    {profile.intent !== "unknown" && (
                      <motion.span
                        initial={{ opacity: 0, x: 5 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-white/20 text-white text-[9px] px-1.5 py-0.5 rounded border border-white/20 font-bold uppercase tracking-wider"
                      >
                        {profile.intent}
                      </motion.span>
                    )}
                  </div>
                  <p className="text-white/75 text-[11px]">Consultora Virtual · RE/MAX</p>
                  {profile.score > 0 && (
                    <div className="flex items-center gap-1 mt-0.5">
                      <div className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden max-w-[60px]">
                        <motion.div
                          className="h-full bg-yellow-400"
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min(profile.score, 100)}%` }}
                        />
                      </div>
                      <span className="text-[9px] text-white/60 font-mono">L.S: {profile.score}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <SoundWave active={talking} />
                    {!talking && !listening && (
                      <span className="flex items-center gap-1 text-white/70 text-[10px]">
                        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" /> Online agora
                      </span>
                    )}
                    {listening && (
                      <span className="flex items-center gap-1 text-[#9BD8FF] text-[10px] font-semibold animate-pulse">
                        <Mic className="w-2.5 h-2.5" /> A ouvir...
                      </span>
                    )}
                    {talking && (
                      <span className="flex items-center gap-1 text-white/80 text-[10px]">
                        <Volume2 className="w-2.5 h-2.5" /> A falar em {LANGUAGES.find(l => l.id === currentLang)?.label || "PT"}...
                      </span>
                    )}
                  </div>
                  {/* Voice indicator pill */}
                  {voiceReady && !talking && !listening && (
                    <div className="mt-1 flex items-center gap-1">
                      <span className="bg-white/20 text-white/80 text-[9px] px-2 py-0.5 rounded-full truncate max-w-[140px]"
                        title={`Voz: ${voiceName}`}>
                        🎙️ {voiceName ? voiceName.split(" ").slice(0, 3).join(" ") : "pt-PT"}
                      </span>
                    </div>
                  )}
                  {!voiceReady && (
                    <div className="mt-1">
                      <span className="bg-white/15 text-white/60 text-[9px] px-2 py-0.5 rounded-full">
                        🎙️ A carregar voz pt-PT...
                      </span>
                    </div>
                  )}
                </div>

                {/* Controls */}
                <div className="flex items-center gap-1 relative z-10">
                  {/* Gender Toggle */}
                  <button
                    onClick={() => {
                      setVoiceGender(voiceGender === "female" ? "male" : "female");
                      voiceRef.current = null; // force reload voice
                    }}
                    title={voiceGender === "female" ? "Mudar para voz masculina" : "Mudar para voz feminina"}
                    className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white transition text-sm"
                  >
                    {voiceGender === "female" ? "👩" : "👨"}
                  </button>

                  {/* Language Selector */}
                  <div className="relative">
                    <button
                      onClick={() => setShowLangMenu(!showLangMenu)}
                      title="Mudar idioma"
                      className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white transition"
                    >
                      <Globe className="w-3.5 h-3.5" />
                    </button>
                    <AnimatePresence>
                      {showLangMenu && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.9 }}
                          className="absolute top-10 right-0 w-32 bg-white rounded-xl shadow-2xl border border-slate-100 overflow-hidden z-30"
                        >
                          {LANGUAGES.map((lang) => (
                            <button
                              key={lang.id}
                              onClick={() => {
                                setCurrentLang(lang.id);
                                setShowLangMenu(false);
                              }}
                              className={`w-full flex items-center gap-2 px-3 py-2 text-xs font-medium hover:bg-slate-50 transition-colors ${currentLang === lang.id ? "text-[#009FE3] bg-blue-50/50" : "text-slate-600"
                                }`}
                            >
                              <span>{lang.flag}</span>
                              <span className="truncate">{lang.label}</span>
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <button
                    onClick={toggleMute}
                    title={muted ? "Ativar áudio" : "Silenciar"}
                    className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white transition"
                  >
                    {muted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    onClick={() => setMinimized((m) => !m)}
                    className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white transition"
                  >
                    {minimized ? <Maximize2 className="w-3.5 h-3.5" /> : <Minimize2 className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    onClick={handleClose}
                    className="w-8 h-8 rounded-full bg-white/15 hover:bg-red-500/80 flex items-center justify-center text-white transition"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* ── Messages + input ────────────────────────────────────── */}
              <AnimatePresence>
                {!minimized && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    className="overflow-hidden flex flex-col"
                  >
                    {/* Scrollable messages */}
                    <div
                      className="overflow-y-auto px-4 py-4 space-y-4"
                      style={{ maxHeight: 360, minHeight: 200 }}
                    >
                      {/* Empty state */}
                      {messages.length === 0 && !typing && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-center py-3"
                        >
                          <div className="w-20 h-20 rounded-full mx-auto overflow-hidden border-4 border-[#EAF6FF] shadow-xl mb-3">
                            <img
                              src="/images/sonia.png"
                              alt="Sónia"
                              className="w-full h-full object-cover"
                              style={{ objectPosition: "50% 10%" }}
                            />
                          </div>
                          <p className="text-sm font-semibold text-slate-700">Assistente Virtual IA</p>
                          <p className="text-xs text-slate-500 mt-0.5">Sónia Silva · RE/MAX Dinâmica</p>
                          <div className="mt-3 flex flex-wrap justify-center gap-1.5">
                            {["Comprar imóvel", "Vender imóvel", "Investir", "Contactos"].map((qr) => (
                              <button
                                key={qr}
                                onClick={() => handleQuickReply(qr)}
                                className="text-xs px-3 py-1.5 rounded-full bg-[#EAF6FF] text-[#0057A8] font-medium hover:bg-[#009FE3] hover:text-white transition-all"
                              >
                                {qr}
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}

                      {/* Chat bubbles */}
                      {messages.map((msg) => (
                        <motion.div
                          key={msg.id}
                          initial={{ opacity: 0, y: 12, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ duration: 0.25 }}
                          className={`flex gap-2.5 ${msg.from === "user" ? "justify-end" : "justify-start"}`}
                        >
                          {msg.from === "assistant" && (
                            <div className="w-8 h-8 rounded-full shrink-0 overflow-hidden border-2 border-[#EAF6FF] mt-1">
                              <img
                                src="/images/sonia.png"
                                alt="Sónia"
                                className="w-full h-full object-cover"
                                style={{ objectPosition: "50% 10%" }}
                              />
                            </div>
                          )}

                          <div className={`flex flex-col gap-1 max-w-[80%] ${msg.from === "user" ? "items-end" : "items-start"}`}>
                            <div
                              className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${msg.from === "user"
                                ? "bg-gradient-to-br from-[#009FE3] to-[#0057A8] text-white rounded-tr-sm shadow-lg shadow-[#0057A8]/20"
                                : "bg-slate-50 text-slate-800 border border-slate-100 rounded-tl-sm shadow-sm"
                                }`}
                            >
                              {parseText(msg.text, leadInfo, profile)}
                            </div>
                            <span className="text-[10px] text-slate-400 px-1">{msg.time}</span>

                            {msg.from === "assistant" && msg.quickReplies && (
                              <div className="flex flex-wrap gap-1.5 mt-1">
                                {msg.quickReplies.map((qr) => (
                                  <motion.button
                                    key={qr}
                                    whileHover={{ scale: 1.04 }}
                                    whileTap={{ scale: 0.96 }}
                                    onClick={() => handleQuickReply(qr)}
                                    className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-full bg-white border border-[#009FE3]/40 text-[#0057A8] font-medium hover:bg-[#009FE3] hover:text-white hover:border-[#009FE3] transition-all shadow-sm"
                                  >
                                    {qr.toLowerCase().includes("whatsapp") && (
                                      <span className="text-[10px]">💬</span>
                                    )}
                                    {qr.toLowerCase().includes("formulário") && (
                                      <span className="text-[10px]">📋</span>
                                    )}
                                    {qr.toLowerCase().includes("site") && (
                                      <ExternalLink className="w-2.5 h-2.5" />
                                    )}
                                    {qr}
                                  </motion.button>
                                ))}
                              </div>
                            )}
                          </div>

                          {msg.from === "user" && (
                            <div className="w-8 h-8 rounded-full shrink-0 bg-gradient-to-br from-slate-300 to-slate-400 flex items-center justify-center text-white text-sm font-bold mt-1">
                              V
                            </div>
                          )}
                        </motion.div>
                      ))}

                      {/* Typing dots */}
                      <AnimatePresence>
                        {typing && (
                          <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 8 }}
                            className="flex gap-2.5 justify-start"
                          >
                            <div className="w-8 h-8 rounded-full shrink-0 overflow-hidden border-2 border-[#EAF6FF]">
                              <img
                                src="/images/sonia.png"
                                alt="Sónia"
                                className="w-full h-full object-cover"
                                style={{ objectPosition: "50% 10%" }}
                              />
                            </div>
                            <div className="bg-slate-50 border border-slate-100 rounded-2xl rounded-tl-sm shadow-sm">
                              <TypingDots />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div ref={bottomRef} />
                    </div>

                    {/* ── Input bar ──────────────────────────────────────── */}
                    <div className="border-t border-slate-100 px-3 py-3 bg-white">
                      <div className="flex items-center gap-2">
                        <motion.button
                          whileHover={{ scale: 1.08 }}
                          whileTap={{ scale: 0.92 }}
                          onClick={toggleMic}
                          className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center shadow-sm transition-all ${listening
                            ? "bg-red-500 text-white animate-pulse"
                            : "bg-slate-100 text-slate-500 hover:bg-[#EAF6FF] hover:text-[#0057A8]"
                            }`}
                          title={listening ? "Parar" : "Falar"}
                        >
                          {listening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                        </motion.button>

                        <input
                          ref={inputRef}
                          type="text"
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                              e.preventDefault();
                              handleSend(input);
                            }
                          }}
                          placeholder="Escreva a sua pergunta..."
                          className="flex-1 rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#009FE3] focus:ring-2 focus:ring-[#009FE3]/15 outline-none transition"
                        />

                        <motion.button
                          whileHover={{ scale: 1.08 }}
                          whileTap={{ scale: 0.92 }}
                          onClick={() => handleSend(input)}
                          disabled={!input.trim()}
                          className="w-10 h-10 shrink-0 rounded-full bg-gradient-to-br from-[#009FE3] to-[#0057A8] text-white flex items-center justify-center shadow-lg shadow-[#0057A8]/25 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                        >
                          <Send className="w-4 h-4" />
                        </motion.button>
                      </div>

                      {/* Quick strip */}
                      <div className="flex items-center gap-2 mt-2.5 overflow-x-auto pb-0.5 scrollbar-none">
                        {["Contactos", "Agendar", "WhatsApp", "Serviços", "Comprar"].map((qr) => (
                          <button
                            key={qr}
                            onClick={() => handleQuickReply(qr)}
                            className="whitespace-nowrap text-[11px] px-3 py-1 rounded-full bg-[#EAF6FF] text-[#0057A8] font-medium hover:bg-[#009FE3] hover:text-white transition-all shrink-0"
                          >
                            {qr}
                          </button>
                        ))}
                        <ChevronDown className="w-3 h-3 text-slate-400 shrink-0 -rotate-90" />
                      </div>

                      <p className="text-center text-[9px] text-slate-400 mt-2">
                        Assistente Virtual IA · Sónia Silva RE/MAX · Respostas automáticas
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
