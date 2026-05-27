/**
 * ptVoice.ts — Selects the best available Portuguese (Portugal) female voice
 * from the Web Speech API, with a priority ranking and fallback chain.
 *
 * Priority order:
 *  1. Exact pt-PT female voice (e.g. "Microsoft Maria", "Google português")
 *  2. Any pt-PT voice
 *  3. Any pt-BR female voice (as fallback — still Portuguese)
 *  4. Any pt-* voice
 *  5. First available voice (last resort)
 */

// High-quality female voice name markers per locale
const LOCALE_VOICE_MAP: Record<string, string[]> = {
  "pt-PT": ["natural", "neural", "raquel", "helia", "inês", "ines", "sofia", "joana", "maria", "fátima"],
  "pt-BR": ["natural", "neural", "francisca", "vitória", "vitoria", "leila", "luciana", "google português"],
  "es-ES": ["natural", "neural", "helena", "laura", "elvira", "google español", "monica"],
  "en-GB": ["natural", "neural", "libby", "mia", "sonia", "google uk english female", "hazel"],
};

const MALE_FRAGMENTS = [
  "male", "humberto", "heitor", "daniel", "jorge", "ricardo", "felipe",
  "antonio", "antônio", "marcos", "pedro", "carlos", "miguel", "rafael", "duarte",
  "pablo", "enrique", "james", "george", "harry"
];

function isLikelyFemale(voice: SpeechSynthesisVoice, locale: string): boolean {
  const name = voice.name.toLowerCase();
  if (MALE_FRAGMENTS.some((m) => name.includes(m))) return false;
  const markers = LOCALE_VOICE_MAP[locale] || [];
  return markers.some((m) => name.includes(m));
}

export function pickBestVoice(voices: SpeechSynthesisVoice[], locale: string, gender: "female" | "male" = "female"): SpeechSynthesisVoice | null {
  if (!voices.length) return null;

  // Filter by requested lang code
  const filtered = voices.filter((v) => v.lang.toLowerCase().startsWith(locale.toLowerCase().split('-')[0]));

  // Refine by exact locale if possible
  const exactLocale = filtered.filter(v => v.lang.toLowerCase().includes(locale.toLowerCase()));
  const targetPool = exactLocale.length > 0 ? exactLocale : filtered;

  if (gender === "male") {
    // 1️⃣ Priority: Neural/Natural Male
    const maleNeural = targetPool.find(v => {
      const n = v.name.toLowerCase();
      return (n.includes("natural") || n.includes("neural") || n.includes("online")) && !isLikelyFemale(v, locale);
    });
    if (maleNeural) return maleNeural;

    // 2️⃣ Priority: Listed Male Names
    const maleNamed = targetPool.find(v => MALE_FRAGMENTS.some(m => v.name.toLowerCase().includes(m)));
    if (maleNamed) return maleNamed;

    // 3️⃣ Priority: Any non-female
    const nonFemale = targetPool.find(v => !isLikelyFemale(v, locale));
    if (nonFemale) return nonFemale;
  } else {
    // 1️⃣ Priority: Neural/Natural Female
    const femaleNeural = targetPool.find(v => {
      const n = v.name.toLowerCase();
      return (n.includes("natural") || n.includes("neural") || n.includes("online")) && isLikelyFemale(v, locale);
    });
    if (femaleNeural) return femaleNeural;

    // 2️⃣ Priority: Listed Female Names
    const femaleNamed = targetPool.find(v => isLikelyFemale(v, locale));
    if (femaleNamed) return femaleNamed;

    // 3️⃣ Priority: Any non-male for that lang
    const nonMale = targetPool.find(v => !MALE_FRAGMENTS.some(m => v.name.toLowerCase().includes(m)));
    if (nonMale) return nonMale;
  }

  return targetPool.length > 0 ? targetPool[0] : voices[0];
}

/**
 * Load voices — handles the async nature of speechSynthesis.getVoices()
 */
export function loadVoices(): Promise<SpeechSynthesisVoice[]> {
  return new Promise((resolve) => {
    if (typeof window === "undefined" || !window.speechSynthesis) {
      resolve([]);
      return;
    }
    const tryGet = () => {
      const v = window.speechSynthesis.getVoices();
      if (v.length > 0) return v;
      return null;
    };
    const immediate = tryGet();
    if (immediate) { resolve(immediate); return; }
    const handler = () => {
      const v = window.speechSynthesis.getVoices();
      if (v.length > 0) {
        window.speechSynthesis.removeEventListener("voiceschanged", handler);
        resolve(v);
      }
    };
    window.speechSynthesis.addEventListener("voiceschanged", handler);
    setTimeout(() => {
      window.speechSynthesis.removeEventListener("voiceschanged", handler);
      resolve(window.speechSynthesis.getVoices() ?? []);
    }, 3000);
  });
}

/**
 * Clean text for TTS
 */
export function cleanForTTS(text: string): string {
  return text
    // Remove image markdown completely (don't read alt text either)
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, "")
    // Remove markdown links — keep label text but discard URL
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    // Remove raw URLs (http/https)
    .replace(/https?:\/\/\S+/g, "")
    // Remove bold/italic markers
    .replace(/\*\*/g, "")
    .replace(/\*/g, "")
    // Remove emoji/symbols from unicode ranges
    .replace(/[^\x00-\x7FÀ-ÿ\s.,!?;:()\-]/gu, "")
    // Remove RE/MAX slashes
    .replace(/RE\/MAX/gi, "Remax")
    // Remove number formatting dots
    .replace(/(\d)\.(\d{3})/g, "$1$2")
    .replace(/(\d)\.(\d{3})/g, "$1$2")
    // Remove WhatsApp button label noise
    .replace(/Confirmar no WhatsApp.*$/gim, "")
    .replace(/CLIQUE AQUI.*$/gim, "")
    // Collapse extra whitespace/newlines
    .replace(/\n{2,}/g, " ")
    .replace(/\s{2,}/g, " ")
    .trim();
}
