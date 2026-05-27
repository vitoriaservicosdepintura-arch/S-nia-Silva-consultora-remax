
export interface Property {
    id: string;
    title: string;
    location: string;
    price: string;
    oldPrice?: string;
    type: string;
    area: string;
    rooms?: number;
    baths?: number;
    year?: string;
    idRef: string;
    description: string;
    details: Record<string, string>;
    images: string[];
}

export interface QA {
    id: string;
    triggers: string[];
    answer: string;
    quickReplies?: string[];
}

export interface ContentState {
    hero: {
        title: string;
        subtitle: string;
        description: string;
        portraitUrl: string;
    };
    options: {
        mainLogoUrl: string;
        secondaryLogoUrl: string;
        extraImages: string[];
    };
    servicesContent: {
        images: string[];
    };
    valuesContent: {
        images: string[];
    };
    properties: Property[];
    knowledgeBase: QA[];
}

export const INITIAL_CONTENT: ContentState = {
    hero: {
        title: "Sónia Silva",
        subtitle: "Consultoria Imobiliária",
        description: "Com a Equipa Júlio Fernandes e Sónia Silva, garantimos uma consultoria de excelência para encontrar o seu imóvel ideal e investir com total segurança, concretizando os seus objetivos no mercado imobiliário em Portugal.",
        portraitUrl: "/images/sonia.png",
    },
    options: {
        mainLogoUrl: "/images/LOGO2-sem-fundo.png",
        secondaryLogoUrl: "/images/LOGO3-sem-fundo.png",
        extraImages: []
    },
    servicesContent: {
        images: []
    },
    valuesContent: {
        images: []
    },
    properties: [
        {
            id: 'casa-1',
            title: "Moradia T4 em Moimenta da Beira",
            location: "Peva e Segões, Moimenta da Beira",
            price: "20.000 €",
            oldPrice: "25.000 €",
            type: "Venda",
            area: "116 m²",
            rooms: 4,
            baths: 1,
            year: "1937",
            idRef: "122031171-52",
            description: "Uma oportunidade com enorme potencial, ideal tanto para habitação própria como para investimento. Localizada em São Martinho de Peva, concelho de Moimenta da Beira, esta moradia de traça tradicional distingue-se pelo seu caráter e pelas excelentes possibilidades de valorização. Necessita de obras de remodelação, sendo ideal para quem pretende renovar ao seu gosto.",
            details: {
                "Área Bruta Privativa": "58 m²",
                "Área Bruta": "116 m²",
                "Área Total do Lote": "58 m²",
                "Área Útil": "52 m²",
                "Piso": "- -",
                "Elevador": "Não",
                "Estacionamento": "1 Lugar"
            },
            images: [
                "/images/images anuncio/casa a venda 1/casa1.jpg",
                "/images/images anuncio/casa a venda 1/casa2.jpg",
                "/images/images anuncio/casa a venda 1/casa3.jpg"
            ]
        },
        {
            id: 'casa-2',
            title: "Moradia T1 em Castro Daire",
            location: "Parada de Ester e Ester, Castro Daire",
            price: "30.000 €",
            oldPrice: "39.000 €",
            type: "Venda",
            area: "60 m²",
            rooms: 1,
            baths: 1,
            year: "1970",
            idRef: "122031171-51",
            description: "Moradia T1 localizada na tranquila aldeia de Ester de Baixo, na freguesia de Parada de Ester. O imóvel é composto por R/C com cozinha e casa de banho, e um piso superior com sala e um quarto. Ideal para quem procura residência permanente, escapadinhas de fim de semana ou para rendimento no mercado de arrendamento.",
            details: {
                "Área Bruta Privativa": "30 m²",
                "Área Bruta": "60 m²",
                "Área Total do Lote": "30 m²",
                "Área Útil": "27 m²",
                "WC/Casas de banho": "1",
                "Carregamento Elétrico": "Não"
            },
            images: [
                "/images/images anuncio/casa a venda 2/casa1.jpg",
                "/images/images anuncio/casa a venda 2/casa2.jpg",
                "/images/images anuncio/casa a venda 2/casa3.jpg",
                "/images/images anuncio/casa a venda 2/casa4.jpg"
            ]
        },
        {
            id: 'terreno-1',
            title: "Terreno para Construção em Tondela",
            location: "Barreiro de Besteiros e Tourigo, Tondela",
            price: "26.000 €",
            type: "Venda",
            area: "3.600 m²",
            idRef: "122031171-61",
            description: "Terreno rústico com viabilidade de construção com 3.600m2, localizado em Barreiro de Besteiros, Tondela. Inserido numa zona tranquila e de fácil acesso, ideal para quem procura qualidade de vida, privacidade e contacto com a natureza. Existe uma construção em pedra de traça tradicional no local, que confere carácter e potencial adicional.",
            details: {
                "Área Total": "3.600 m²",
                "Viabilidade": "Construção",
                "Características": "Boa exposição solar, zona tranquila",
                "Construção existente": "Sim (Pedra tradicional)"
            },
            images: [
                "/images/images anuncio/terrenos a venda/terreno1.jpg",
                "/images/images anuncio/terrenos a venda/terreno2.jpg",
                "/images/images anuncio/terrenos a venda/terreno3.png"
            ]
        }
    ],
    knowledgeBase: [
        {
            id: "welcome",
            triggers: ["olá", "ola", "oi", "bom dia", "boa tarde", "boa noite", "hello", "hi", "ajuda", "help", "começar", "comecar", "inicio"],
            answer: "Olá! 👋 Sou a assistente virtual da **Sónia Silva**, consultora imobiliária da **RE/MAX Dinâmica**. Estou aqui para o ajudar a encontrar o imóvel ideal, esclarecer dúvidas sobre compra, venda ou investimento em Portugal. Como posso ajudar? 😊",
            quickReplies: ["Comprar imóvel", "Vender imóvel", "Investir", "Falar com a Sónia"],
        },
        {
            id: "about",
            triggers: ["quem é", "sónia", "sonia", "sobre", "consultora", "remax", "agente", "profissional", "experiência", "experiencia"],
            answer: "A **Sónia Silva** é consultora imobiliária certificada pela **RE/MAX Dinâmica**, com vasta experiência no mercado imobiliário português. 🏡\n\n✅ Atendimento 100% personalizado\n✅ Especialista em compra, venda e investimento\n✅ Suporte completo do início ao fim\n✅ +200 clientes satisfeitos com avaliação 5★\n\nA sua missão: *\"Confiança que abre portas para o seu futuro!\"*",
            quickReplies: ["Ver serviços", "Agendar consultoria", "Contactar agora"],
        },
    ]
};
