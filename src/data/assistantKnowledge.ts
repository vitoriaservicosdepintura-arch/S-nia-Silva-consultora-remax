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

  // ─── BUYING - Deep Dive ──────────────────────────────────────────────────
  {
    id: "buy_process",
    triggers: ["como comprar", "processo compra", "documentos", "impostos", "imt", "is", "escritura", "crédito", "credito", "financiamento"],
    answer:
      "Excelente pergunta! Comprar em Portugal exige rigor. 📑\n\n**O que precisa saber:**\n1️⃣ **IMT & Imposto do Selo:** São os principais impostos na compra.\n2️⃣ **NIF:** Essencial para qualquer transação em Portugal.\n3️⃣ **Financiamento:** A Sónia trabalha com parceiros bancários para conseguir as melhores taxas.\n\nQuer que façamos uma simulação para o seu caso específico?",
    quickReplies: ["Sim, simular", "Quais os documentos?", "Falar com a Sónia"],
  },

  // ─── SELLING - Deep Dive & Projections ──────────────────────────────────────
  {
    id: "sell_strategy",
    triggers: ["estratégia", "estrategia", "plano marketing", "como vendem", "tempo de venda", "exclusividade"],
    answer:
      "Vender um imóvel não é apenas colocar um anúncio. É estratégia! 🎯\n\n**O nosso plano inclui:**\n✅ **Home Staging:** Dicas para tornar a casa mais apelativa.\n✅ **Reportagem Profissional:** Fotos e vídeo de alta qualidade.\n✅ **Filtro de Compradores:** Só levamos pessoas qualificadas à sua casa.\n✅ **Relatórios Semanais:** Saberá sempre o que está a acontecer.\n\nGostaria de ver o nosso plano de marketing completo?",
    quickReplies: ["Ver plano", "Avaliar minha casa", "Como filtrar compradores?"],
  },

  // ─── OBJECTION: "Too Expensive" ──────────────────────────────────────────
  {
    id: "objection_expensive",
    triggers: ["caro", "muito dinheiro", "preço alto", "preco alto", "comissão alta", "comissao alta", "baixar preço", "percentagem"],
    answer:
      "Compreendo perfeitamente a sua preocupação com os valores. 🤝 No entanto, na RE/MAX, não vendemos apenas um serviço, entregamos **resultados**.\n\n**Pense nisto:** Um imóvel mal vendido pode custar-lhe muito mais do que qualquer comissão. Nós garantimos a **máxima valorização** e segurança jurídica total. O preço é o que se paga, o **valor** é o que recebe.\n\nPodemos analisar o plano de rentabilidade para o seu caso?",
    quickReplies: ["Analisar valorização", "Falar com a Sónia", "Ver provas de vendas"],
  },

  // ─── OBJECTION: "No Hurry" / "Wait" ─────────────────────────────────────────
  {
    id: "objection_wait",
    triggers: ["esperar", "depois", "mais tarde", "sem pressa", "ver no futuro", "daqui a uns meses", "não agora"],
    answer:
      "O mercado imobiliário em Portugal está num momento de **grande dinamismo**. ⏱️\n\nEsperar pode significar perder oportunidades com taxas de juro atuais ou a valorização constante dos distritos como **Viseu, Porto e Lisboa**. \n\nA Sónia pode fazer uma análise de mercado gratuita hoje, para que quando decidir, tenha toda a informação correta. O conhecimento não ocupa lugar, concorda?",
    quickReplies: ["Fazer análise agora", "Saber sobre o mercado", "Contactar depois"],
  },

  // ─── REGIONS: All Districts ──────────────────────────────────────────────
  {
    id: "regions",
    triggers: ["distritos", "cidades", "lisboa", "porto", "braga", "aveiro", "faro", "algarve", "coimbra", "setubal", "leiria", "evora", "beja", "funchal", "madeira", "pontas delgada", "açores", "santarem", "castelo branco", "guarda", "bragança", "vila real", "viana do castelo"],
    answer:
      "Temos especialistas e imóveis em **todos os distritos de Portugal**! 🇵🇹\n\n🌟 **Litoral (Lisboa, Porto, Algarve):** Alta valorização e procura internacional.\n🏡 **Interior (Viseu, Guarda, Castelo Branco):** Qualidade de vida superior e preços competitivos.\n📈 **Ilhas:** Mercados exclusivos e turísticos.\n\nEm qual distrito ou cidade está a focar a sua procura?",
    quickReplies: ["Viseu/Daire", "Porto/Norte", "Lisboa/Centro", "Algarve/Sul"],
  },

  // ─── INVESTOR PROFILE ──────────────────────────────────────────────────
  {
    id: "investor_class",
    triggers: ["perfil investidor", "buy to let", "flipping", "reabilitação", "rendimento mensal", "taxa de retorno", "yield"],
    answer:
      "Para investidores, a Sónia foca em **procurar a rentabilidade (Yield)**. 💰\n\nAtuamos com:\n🏢 **Arrendamento Tradicional:** Estabilidade de longo prazo.\n🏠 **Alojamento Local:** Maximização de ganhos em zonas turísticas.\n🛠️ **Reabilitação:** Compra para recuperar e vender.\n\nQual é a sua meta de rentabilidade anual?",
    quickReplies: ["5% a 7%", "+ de 8%", "Quero segurança", "Falar com a Sónia"],
  },

  // ─── AGENCY LOCATION ────────────────────────────────────────────────────
  {
    id: "agency_location",
    triggers: ["onde fica a agencia", "morada da agencia", "endereço", "endereco", "escritório", "onde estão", "onde estao"],
    answer:
      "A nossa agência é a **RE/MAX Dinâmica Daire**. 📍\n\nFicamos situados no coração da região de Viseu, mas a Sónia desloca-se a qualquer ponto de Portugal para o atender pessoalmente. \n\n📍 **Sede:** Vila Nova de Paiva / Castro Daire\n\nPrefere uma reunião no nosso escritório ou que a Sónia vá até si?",
    quickReplies: ["Vou à agência", "Sónia vem até mim", "Reunião Online"],
  },

  // ─── PROPOSALS / SUGGESTIONS ──────────────────────────────────────────
  {
    id: "proposals",
    triggers: ["proposta", "oportunidade", "negócio", "negocio", "sugestão", "sugestao", "o que tem", "lista de imóveis"],
    answer:
      "A Sónia tem acesso a uma carteira exclusiva no sistema RE/MAX! 💎\n\n**Sugestões atuais:**\n🏠 **Para Morar:** Moradias T3+ na zona de Viseu com excelentes áreas.\n🏢 **Para Investir:** Apartamentos para reabilitação em centros urbanos (Porto/Bragança).\n🌟 **Luxo:** Imóveis de prestígio no Litoral com alta valorização.\n\nQual destas opções gostaria de receber no seu email ou WhatsApp?",
    quickReplies: ["Imóveis Viseu", "Oportunidades Investimento", "Imóveis de Luxo"],
  },

  // ─── Fallback ─────────────────────────────────────────────────────────────
  {
    id: "fallback",
    triggers: [],
    answer:
      "Como sua assistente inteligente, quero dar-lhe a melhor resposta. 🤔 Não encontrei um detalhe exato sobre isso, mas posso ajudar especificamente com:\n\n🏡 **Venda:** Como valorizar a sua casa.\n🔑 **Compra:** Processo e financiamento.\n📈 **Investimento:** Zonas de alta rentabilidade em Portugal.\n🇵🇹 **Regiões:** Análise de qualquer distrito.\n\nQual destes temas prefere explorar agora?",
    quickReplies: ["Comprar", "Vender", "Investir", "Falar com a Sónia"],
  },
];

export function findAnswer(input: string): QA {
  const normalized = input.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  for (const qa of KNOWLEDGE_BASE) {
    if (qa.id === "fallback") continue;
    for (const trigger of qa.triggers) {
      const normTrigger = trigger.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      if (normalized.includes(normTrigger)) {
        return qa;
      }
    }
  }

  // return fallback
  return KNOWLEDGE_BASE[KNOWLEDGE_BASE.length - 1];
}
