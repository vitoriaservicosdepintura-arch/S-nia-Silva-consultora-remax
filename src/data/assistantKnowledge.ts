// ─── Knowledge base for Sónia Silva's virtual assistant ───────────────────────
export const AGENT_PROFILE = {
  name: "Sónia Silva",
  role: "Consultora Imobiliária",
  agency: "RE/MAX Dinâmica Daire",
  phone: "+351 913 536 291",
  whatsapp: "https://wa.me/351913536291",
  officialSite: "https://remax.pt/pt/agente/sonia-silva/122031171",
  facebook: "https://www.facebook.com/profile.php?id=100081296978443",
  instagram: "https://www.instagram.com/remaxsoniasilva/",
  location: "Portugal",
};

// ─── Conversational Q&A pairs used for intent matching ─────────────────────
export interface QA {
  id: string;
  triggers: string[]; // keywords / phrases that activate this answer
  answer: string;
  quickReplies?: string[];
}

export const KNOWLEDGE_BASE: QA[] = [
  // ── Welcome / generic greeting ──────────────────────────────────────────
  {
    id: "welcome",
    triggers: ["olá", "ola", "oi", "bom dia", "boa tarde", "boa noite", "hello", "hi", "ajuda", "help", "começar", "comecar", "inicio"],
    answer:
      "Olá! 👋 Sou a assistente virtual da **Sónia Silva**, consultora imobiliária da **RE/MAX Dinâmica Daire**. Estou aqui para o ajudar a encontrar o imóvel ideal, esclarecer dúvidas sobre compra, venda ou investimento em Portugal. Como posso ajudar? 😊",
    quickReplies: ["Comprar imóvel", "Vender imóvel", "Investir", "Falar com a Sónia"],
  },

  // ── Who is Sónia ────────────────────────────────────────────────────────
  {
    id: "about",
    triggers: ["quem é", "sónia", "sonia", "sobre", "consultora", "remax", "agente", "profissional", "experiência", "experiencia"],
    answer:
      "A **Sónia Silva** é consultora imobiliária certificada pela **RE/MAX Dinâmica Daire**, com vasta experiência no mercado imobiliário português. 🏡\n\n✅ Atendimento 100% personalizado\n✅ Especialista em compra, venda e investimento\n✅ Suporte completo do início ao fim\n✅ +200 clientes satisfeitos com avaliação 5★\n\nA sua missão: *\"Confiança que abre portas para o seu futuro!\"*",
    quickReplies: ["Ver serviços", "Agendar consultoria", "Contactar agora"],
  },

  // ── Services ────────────────────────────────────────────────────────────
  {
    id: "services",
    triggers: ["serviço", "servico", "serviços", "servicos", "o que faz", "como ajuda", "ajudar", "oferta", "solução", "solucao"],
    answer:
      "A Sónia oferece serviços completos em 3 áreas principais:\n\n🏠 **Compra de Imóveis** — Encontre o imóvel perfeito com acompanhamento profissional em todo o processo.\n\n🏢 **Investimentos Imobiliários** — Análise especializada de oportunidades rentáveis em Portugal.\n\n🔑 **Venda de Imóveis** — Estratégia, valorização e máxima exposição através da maior rede imobiliária do mundo.\n\nQual área lhe interessa mais?",
    quickReplies: ["Comprar", "Investir", "Vender", "Consultoria gratuita"],
  },

  // ── Buy property ────────────────────────────────────────────────────────
  {
    id: "buy",
    triggers: ["comprar", "compra", "quero casa", "procuro casa", "encontrar imóvel", "encontrar imovel", "casa", "apartamento", "moradia", "habitação", "habitacao", "imóvel", "imovel"],
    answer:
      "Excelente decisão! 🏠 A Sónia tem experiência em ajudar famílias e investidores a encontrar o imóvel perfeito em Portugal.\n\n**Como funciona:**\n1️⃣ Consulta inicial gratuita para entender as suas necessidades\n2️⃣ Pesquisa personalizada de imóveis\n3️⃣ Visitas acompanhadas com total apoio\n4️⃣ Negociação e apoio até à escritura\n\nQuer agendar uma **consultoria gratuita** com a Sónia? 🗓️",
    quickReplies: ["Agendar consultoria grátis", "Falar no WhatsApp", "Ver site RE/MAX"],
  },

  // ── Sell property ───────────────────────────────────────────────────────
  {
    id: "sell",
    triggers: ["vender", "venda", "vendo", "avaliar", "avaliação", "avaliacao", "valorização", "valorizacao", "colocar no mercado"],
    answer:
      "Vender com a Sónia é vender com vantagem! 🔑\n\n**O que inclui:**\n✅ Avaliação gratuita do seu imóvel\n✅ Estratégia de marketing personalizada\n✅ Exposição na rede RE/MAX (a maior do mundo)\n✅ Gestão de visitas e negociações\n✅ Apoio jurídico e documental\n\nGostaria de receber uma **avaliação gratuita** do seu imóvel?",
    quickReplies: ["Avaliação gratuita", "Falar com a Sónia", "Saber mais"],
  },

  // ── Investment ──────────────────────────────────────────────────────────
  {
    id: "investment",
    triggers: ["investir", "investimento", "rentabilidade", "retorno", "rendimento", "renda", "arrendamento", "golden visa", "aplicar", "capital", "oportunidade"],
    answer:
      "Portugal é um dos melhores países do mundo para investimento imobiliário! 📈\n\n**Porquê investir em Portugal:**\n🌟 Mercado estável e em crescimento\n🌟 Rendimentos de arrendamento atrativos\n🌟 Valorização consistente dos imóveis\n🌟 Clima e qualidade de vida excepcionais\n\nA Sónia faz uma **análise personalizada** do melhor investimento para o seu perfil e objetivos. Quer saber mais?",
    quickReplies: ["Análise de investimento", "Falar com a Sónia", "Consultoria gratuita"],
  },

  // ── Free consultation ───────────────────────────────────────────────────
  {
    id: "consultation",
    triggers: ["consultoria", "consulta", "reunião", "reuniao", "agendar", "marcar", "gratuita", "gratis", "grátis", "encontro", "visita"],
    answer:
      "Ótimo! A Sónia oferece **consultoria imobiliária 100% gratuita e sem compromisso**! 🎯\n\n📋 Preencha o formulário no site ou entre em contacto diretamente:\n\n📱 **WhatsApp:** +351 913 536 291\n📞 **Telefone:** +351 913 536 291\n\nA Sónia responde **em menos de 24 horas** e adapta o horário à sua disponibilidade. Quer que eu encaminhe o seu contacto?",
    quickReplies: ["Ir para o formulário", "Abrir WhatsApp", "Ligar agora"],
  },

  // ── Contact / WhatsApp ──────────────────────────────────────────────────
  {
    id: "contact",
    triggers: ["contacto", "contato", "whatsapp", "telefone", "ligar", "falar", "número", "numero", "email", "como contactar", "como contatar", "comunicar"],
    answer:
      "Pode contactar a Sónia pelos seguintes meios: 📞\n\n💬 **WhatsApp:** [+351 913 536 291](https://wa.me/351913536291) ← Mais rápido!\n📞 **Telefone:** +351 913 536 291\n🌐 **Site RE/MAX:** [remax.pt/sonia-silva](https://remax.pt/pt/agente/sonia-silva/122031171)\n📘 **Facebook:** Sónia Silva RE/MAX\n📷 **Instagram:** @remaxsoniasilva\n\n⏱️ Resposta garantida em menos de 24 horas!",
    quickReplies: ["Abrir WhatsApp agora", "Ver site oficial"],
  },

  // ── WhatsApp specifically ───────────────────────────────────────────────
  {
    id: "whatsapp",
    triggers: ["wa", "zap", "mensagem", "mandar mensagem", "escrever"],
    answer:
      "Clique abaixo para falar diretamente com a Sónia no WhatsApp! É o canal mais rápido para agendar visitas, esclarecer dúvidas ou receber propostas personalizadas. 🟢\n\n📱 **+351 913 536 291**",
    quickReplies: ["Abrir WhatsApp agora"],
  },

  // ── Location / area ─────────────────────────────────────────────────────
  {
    id: "location",
    triggers: ["onde", "zona", "localização", "localizacao", "região", "regiao", "portugal", "norte", "sul", "centro", "lisboa", "porto", "algarve", "daire", "viseu"],
    answer:
      "A Sónia atua em **todo o Portugal**, com especial foco nas zonas de atuação da **RE/MAX Dinâmica Daire**. 📍\n\nTem alguma zona específica em mente para o seu imóvel? Posso ajudá-lo a saber mais sobre o mercado local.",
    quickReplies: ["Sim, tenho uma zona", "Não, quero sugestões", "Falar com a Sónia"],
  },

  // ── Process / how it works ──────────────────────────────────────────────
  {
    id: "process",
    triggers: ["como funciona", "processo", "etapas", "passos", "passo a passo", "procedimento", "como é", "como e"],
    answer:
      "O processo com a Sónia é **simples, transparente e acompanhado**! 🌟\n\n**5 Passos:**\n1️⃣ **Contacto inicial** — Consultoria gratuita para conhecer os seus objetivos\n2️⃣ **Pesquisa** — Identificação dos melhores imóveis/compradores\n3️⃣ **Visitas** — Acompanhamento personalizado em todas as visitas\n4️⃣ **Negociação** — Defesa dos seus interesses na negociação\n5️⃣ **Escritura** — Apoio completo até à assinatura final\n\nSim, é mesmo assim — **do início ao fim!** 🎯",
    quickReplies: ["Começar agora", "Falar com a Sónia", "Saber mais"],
  },

  // ── Pricing / fees ──────────────────────────────────────────────────────
  {
    id: "pricing",
    triggers: ["preço", "preco", "custo", "comissão", "comissao", "taxa", "cobrar", "quanto custa", "valor", "pagar", "honorários"],
    answer:
      "As condições são **totalmente transparentes** e discutidas na primeira reunião! 💼\n\nO serviço de **consultoria inicial é 100% gratuito e sem compromisso**. As comissões de mediação imobiliária são regulamentadas pela APEMIP e discutidas abertamente.\n\nPara mais detalhes, a Sónia adoraria conversar consigo pessoalmente. Quer agendar?",
    quickReplies: ["Agendar reunião gratuita", "Falar no WhatsApp"],
  },

  // ── RE/MAX brand ────────────────────────────────────────────────────────
  {
    id: "remax",
    triggers: ["remax", "re/max", "agência", "agencia", "imobiliária", "imobiliaria", "rede", "marca"],
    answer:
      "A **RE/MAX** é a **maior rede imobiliária do mundo** 🌍, com mais de 140.000 agentes em +110 países. Em Portugal, está presente há mais de 20 anos com excelentes resultados.\n\nA **RE/MAX Dinâmica Daire** é a agência da Sónia, reconhecida pela qualidade do atendimento e resultados excepcionais. *\"Nós procuramos o melhor para si!\"*",
    quickReplies: ["Ver site RE/MAX", "Falar com a Sónia"],
  },

  // ── Testimonials / trust ─────────────────────────────────────────────────
  {
    id: "trust",
    triggers: ["confiança", "confianca", "testemunho", "avaliação", "avaliacao", "recomendação", "recomendacao", "clientes", "resultados", "satisfeito"],
    answer:
      "A Sónia tem **mais de 200 clientes satisfeitos** com avaliação média de **5 estrelas** ⭐⭐⭐⭐⭐!\n\n💬 *\"A Sónia foi incrível! Encontrou-me a casa dos meus sonhos em apenas 3 semanas.\"* — Maria Costa, Lisboa\n\nOs pilares do seu trabalho:\n✅ Atendimento personalizado\n✅ Transparência total\n✅ Compromisso com resultados\n✅ Suporte completo em todo o processo",
    quickReplies: ["Quero também resultados!", "Falar com a Sónia"],
  },

  // ─── PORTFOLIO & REAL LISTINGS ──────────────────────────────────────────
  {
    id: "portfolio",
    triggers: ["o que tem", "lista de imóveis", "imóveis disponíveis", "portfolio", "carteira", "ver casas", "onde tem casas", "tondela", "viseu", "castro daire", "mangualde", "moimenta da beira", "sao pedro do sul", "terrenos", "apartamentos"],
    answer:
      "A Sónia gere atualmente uma carteira robusta com **53 imóveis para comprar** e **2 para arrendar**. 🏠\n\n**Destaques do momento:**\n🌟 **Viseu:** Apartamento T3 de Luxo (153m²) por 399.000€ - ideal para famílias.\n🌳 **Tondela (Barreiro de Besteiros):** Terrenos estratégicos a partir de 4.500€ - excelente para pequenos investidores.\n🏡 **Castro Daire:** Moradias com reduções de até 23% (venda rápida).\n📍 **Outras zonas:** Mangualde, Moimenta da Beira e São Pedro do Sul.\n\nQuer ver a lista completa de todos os 53 imóveis no site oficial da RE/MAX?",
    quickReplies: ["Ver 53 imóveis no site", "Quero saber de Viseu", "Investir em Tondela"],
  },

  // ─── BUYING - Strategy ──────────────────────────────────────────────────
  {
    id: "buy_process",
    triggers: ["como comprar", "quero comprar", "compro", "processo compra", "documentos", "impostos", "imt", "is", "escritura", "crédito", "credito", "financiamento"],
    answer:
      "Comprar com a Sónia significa ter acesso a oportunidades antes de chegarem ao mercado público. 📑\n\n**Análise do seu perfil:** Para quem procura habitação própria (como o nosso **Apartamento em Viseu** de 399k) ou investimento em solo (como os nossos **Terrenos em Tondela** de 4.5k), o processo exige:\n1️⃣ NIF e histórico financeiro.\n2️⃣ Análise de IMT e Imposto do Selo.\n3️⃣ Simulação de crédito (temos parceiros diretos).\n\nQual é o seu orçamento ideal neste momento?",
    quickReplies: ["Até 50.000€", "Até 150.000€", "Mais de 300.000€", "Falar com Sónia"],
  },

  // ─── PROPOSALS / SUGGESTIONS ──────────────────────────────────────────
  {
    id: "proposals",
    triggers: ["proposta", "oportunidade", "negócio", "negocio", "sugestão", "sugestao", "o que sugere"],
    answer:
      "Com base no mercado atual em Portugal e no portfólio de 53 imóveis da Sónia, sugiro **três caminhos estratégicos**: 💎\n\n1️⃣ **Investimento Seguro:** Terrenos em Tondela e Moimenta da Beira (baixos valores de entrada/4.500€).\n2️⃣ **Upgrade Familiar:** Apartamento T3 em Viseu (conforto máximo).\n3️⃣ **Retiro de Férias:** Moradias em Castro Daire e São Pedro do Sul com reduções de preço atrativas.\n\nQual destes percursos faz mais sentido para o seu futuro?",
    quickReplies: ["Investimento (4.5k+)", "Familiar (Viseu)", "Oportunidades Castro Daire"],
  },

  // ─── Fallback ─────────────────────────────────────────────────────────────
  {
    id: "fallback",
    triggers: [],
    answer:
      "Como sua assistente inteligente, analiso os 53 imóveis ativos e a rede RE/MAX para lhe dar a melhor resposta. 🤔 Não encontrei um detalhe exato sobre isso, mas posso ajudar especificamente com:\n\n🏠 **Portfólio:** Detalhes de Viseu, Tondela, Castro Daire e mais.\n🔑 **Venda:** Como valorizar e vender rápido.\n📈 **Investimento:** Terrenos a partir de 4.500€.\n📞 **Contacto:** Falar diretamente com a Sónia.\n\nQual destes temas prefere explorar agora?",
    quickReplies: ["Ver Imóveis", "Como Vender", "Falar no WhatsApp"],
  },
];

export function findAnswer(input: string, knowledgeBase: QA[] = KNOWLEDGE_BASE): QA {
  const normalized = input.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  for (const qa of knowledgeBase) {
    if (qa.id === "fallback") continue;
    for (const trigger of qa.triggers) {
      const normTrigger = trigger.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      if (normalized.includes(normTrigger)) {
        return qa;
      }
    }
  }

  // return fallback
  const fallback = knowledgeBase.find(qa => qa.id === 'fallback') || KNOWLEDGE_BASE[KNOWLEDGE_BASE.length - 1];
  return fallback;
}
