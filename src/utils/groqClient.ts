import { AGENT_PROFILE } from "../data/assistantKnowledge";
import { QA, Property } from "../data/initialContent";

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY || "";

export async function askGroq(query: string, knowledgeBase: QA[], properties: Property[], chatHistory: { role: string, content: string }[], langCode: string = "pt-PT", leadInfo?: { name: string; phone: string; email: string }): Promise<string> {
    const kbContext = knowledgeBase.map(kb => `Se perguntarem sobre: ${kb.triggers.join(', ')} -> Responda de forma parecida com: "${kb.answer}"`).join('\n');

    const propertiesContext = properties.map(p =>
        `- ${p.title} (${p.type}) | ${p.location} | Preço: ${p.price}\n  Quartos: ${p.rooms} | Área: ${p.area}\n  Imagem Principal: ${p.images[0]}\n  Ref: ${p.idRef}`
    ).join('\n\n');

    const leadContext = leadInfo?.name ? `\n\n  INFORMAÇÕES DO CLIENTE:\n  O nome do utilizador(a) com quem você está falando é ${leadInfo.name}. Use o nome dele(a) nas respostas para criar mais empatia.` : "";

    const systemPrompt = `
  Você é ${AGENT_PROFILE.name}, ${AGENT_PROFILE.role} na ${AGENT_PROFILE.agency}.
  Objetivo: Converter leads em reuniões/visitas.
  Estilo de comunicação: Empático e persuasivo. RESPOSTAS SEMPRE CURTAS E DIRETAS — máximo 3 frases de texto, depois qualquer link/imagem.${leadContext}

  BASE DE CONHECIMENTO PERSONALIZADA RE/MAX:
  ${kbContext}

  PORTFÓLIO DE IMÓVEIS ATUAL (O Teu Guia de Portfólio):
  ${propertiesContext}

  REGRAS OBRIGATÓRIAS:
  1. RESPONDA **SEMPRE** NO IDIOMA: ${langCode}.
  2. **RESPOSTAS CURTAS:** Máximo 2 a 3 frases de texto. Nunca faça parágrafos longos.
  3. Quando falar sobre imóveis, apresente no máximo 1 imóvel com imagem markdown: ![Nome](URL)
  4. Após sugerir imóvel, adicione: "[Ver mais no Site RE/MAX](${AGENT_PROFILE.officialSite})"
  5. Nunca revele que é uma IA.
  6. NUNCA diga URLs em texto corrido. Apenas use markdown clicável.
  7. **AGENDAMENTO / MARCAÇÃO DE VISITA:** Se o utilizador quiser agendar ou marcar visita, responda com UMA frase curta de confirmação e em seguida coloque EXATAMENTE este link markdown (substituindo IMOVEL, DATA e HORA):
     [Confirmar no WhatsApp da Sónia](https://wa.me/${AGENT_PROFILE.whatsapp.replace(/\D/g, '')}?text=Olá%20Sónia!%20Vim%20pelo%20site.%20Quero%20visitar:%20IMOVEL%20no%20dia%20DATA%20às%20HORA.)
     Não escreva mais texto após esse link. NÃO use sintaxe de imagem (![...]) dentro do link.
  `;

    const messages = [
        { role: "system", content: systemPrompt },
        ...chatHistory,
        { role: "user", content: query }
    ];

    try {
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${GROQ_API_KEY}`
            },
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile",
                messages: messages,
                temperature: 0.7,
                max_tokens: 500, // increased tokens to allow room for property descriptions
            })
        });

        if (!response.ok) {
            throw new Error("Erro na API Groq");
        }

        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        console.error("Groq Error:", error);
        return "Desculpe, a nossa equipa está toda em visitas neste momento! Poderia deixar o seu contacto de WhatsApp ou ligar para a Sónia Silva diretamente?";
    }
}

export async function translateChat(messages: any[], targetLangCode: string): Promise<any[]> {
    const systemPrompt = `You are a professional translator. Translate the 'text' and 'quickReplies' fields of the provided JSON array to the language code: ${targetLangCode}.
Rules:
1. ONLY return valid JSON array.
2. DO NOT output any markdown blocks like \`\`\`json. Just the raw JSON.
3. Keep the exact same structure and IDs.
4. If a text contains markdown (like **bold** or ![alt](url) or links), keep the markdown syntax intact.`;

    try {
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${GROQ_API_KEY}`
            },
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile",
                response_format: { type: "json_object" },
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: JSON.stringify({ messages }) }
                ],
                temperature: 0.1,
                max_tokens: 4000,
            })
        });

        if (!response.ok) throw new Error("Translation failed");

        const data = await response.json();
        const content = data.choices[0].message.content;
        const parsed = JSON.parse(content);
        return parsed.messages || messages;
    } catch (e) {
        console.error("Groq Translation Error", e);
        return messages; // fallback
    }
}
