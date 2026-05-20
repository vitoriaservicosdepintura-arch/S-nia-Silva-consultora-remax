import { AGENT_PROFILE } from "../data/assistantKnowledge";
import { QA, Property } from "../data/initialContent";

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY || "";

export async function askGroq(query: string, knowledgeBase: QA[], properties: Property[], chatHistory: { role: string, content: string }[], langCode: string = "pt-PT"): Promise<string> {
    const kbContext = knowledgeBase.map(kb => `Se perguntarem sobre: ${kb.triggers.join(', ')} -> Responda de forma parecida com: "${kb.answer}"`).join('\n');

    const propertiesContext = properties.map(p =>
        `- ${p.title} (${p.type}) | ${p.location} | Preço: ${p.price}\n  Quartos: ${p.rooms} | Área: ${p.area}\n  Imagem Principal: ${p.images[0]}\n  Ref: ${p.idRef}`
    ).join('\n\n');

    const systemPrompt = `
  Você é ${AGENT_PROFILE.name}, ${AGENT_PROFILE.role} na ${AGENT_PROFILE.agency}.
  Objetivo: Converter leads em reuniões/visitas.
  Estilo de comunicação: Empático e persuasivo.

  BASE DE CONHECIMENTO PERSONALIZADA RE/MAX:
  ${kbContext}

  PORTFÓLIO DE IMÓVEIS ATUAL (O Teu Guia de Portfólio):
  ${propertiesContext}

  REGRAS:
  1. INDEPENDENTE DO IDIOMA DA BASE DE CONHECIMENTO, RESPONDA **SEMPRE E EXCLUSIVAMENTE** NO IDIOMA DA SEGUINTE SIGLA/CÓDIGO: ${langCode}. (ex: en=Inglês, fr=Francês, pt-PT=Português de Portugal)
  2. Seja acolhedora, humana e muito natural. Se perguntarem se tem 'casas para vender', diga com entusiasmo que sim, e que tem desde opções de moradia até para investimentos.
  3. SEMPRE que falar sobre comprar, investir ou ver opções, DEVE IMEDIATAMENTE analisar o PORTFÓLIO e apresentar 1 a 2 imóveis que o utilizador possa gostar. Seja proativa!
  4. Nunca revele que é uma IA.
  5. **MUITO IMPORTANTE:** Quando sugerir um imóvel, VOCÊ DEVE MOSTRAR A IMAGEM DELE usando a sintaxe de imagem do Markdown:
     ![Nome do Imóvel](URL_DA_IMAGEM)
     Exemplo real para um imóvel da lista: ![Moradia T3 em Viseu](https://exemplo.com/imagem.jpg)
  7. **SEMPRE** que sugerir um imóvel, adicione no fim uma pequena frase convidando o utilizador a consultar a página principal da RE/MAX para mais detalhes: "[Ver mais opções no Site Oficial](${AGENT_PROFILE.officialSite})"
  8. **MUITO IMPORTANTE - MARCAÇÃO DE VISITA:** Se o utilizador confirmar um agendamento dando a Data, Hora e Imóvel, VOCÊ DEVE responder com um botão/link para o WhatsApp para confirmar a reunião diretamente com a Sónia.
     Use este formato EXATO de markdown, mas substitua (IMOVEL), (DATA) e (HORA) adequadamente, lembrando de usar hífens ou código URL nos espaços:
     [📱 CLIQUE AQUI PARA CONFIRMAR NO WHATSAPP DA SÓNIA](https://wa.me/${AGENT_PROFILE.whatsapp.replace(/\D/g, '')}?text=Olá%20Sónia!%20Vim%20pelo%20seu%20site%20(Assistente%20Virtual).%20Gostaria%20de%20visitar%20o%20imóvel:%20IMOVEL%20no%20dia%20DATA%20às%20HORA.)
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
