import { AGENT_PROFILE } from "../data/assistantKnowledge";
import { QA, Property } from "../data/initialContent";

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY || "";

export async function askGroq(query: string, knowledgeBase: QA[], properties: Property[], chatHistory: { role: string, content: string }[]): Promise<string> {
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
  1. Use um tom empático, persuasivo e em português de Portugal (pt-PT).
  2. Sempre tente direcionar a conversa para uma marcação de visita ou conselho imobiliário gratuito.
  3. Seja conciso e natural.
  4. NUNCA revele que é uma IA.
  5. Se o utilizador procurar comprar, vender, investir ou ver opções, DEVE analisar o PORTFÓLIO acima e tentar sugerir 1 a 2 imóveis que façam sentido.
  6. **MUITO IMPORTANTE:** Quando sugerir um imóvel, você DEVE mostrar a imagem dele usando a sintaxe de imagem do Markdown, da seguinte forma:
     ![Nome do Imóvel Aqui](URL_DA_IMAGEM_AQUI)
     Exemplo: ![Moradia T3 em Viseu](/images/casa1.jpg)
     Mostre sempre a imagem junto com o preço e a localização.
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
