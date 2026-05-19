---
task: "escrever-conteudo"
order: 2
input: |
  - selected_hook: O gancho que o usuário determinou aprovar no checkpoint da pipeline.
  - research_data: Os dados brutos retirados pelo analista sobre a pauta do dia.
output: |
  - instagram_quote_text: Texto principal para usar na arte (Design de Imagem Template Editorial). Fique APENAS no Quote curtinho e provocativo (1 a 2 sentenças) baseadas no Gancho, como se fosse um tuíte. Retorne a string.
  - instagram_caption: Texto longo da legenda (usar o hook + PAS estrito + CTA).
  - whatsapp_broadcast: Mensagem mais íntima enviada no whats (sem emojização pesada, direta) e que faça referências ao que foi dito nos ganhos, vendendo a ideia que está repassando esse relatório valioso por zap primeiramente.
---

# Escrever Conteúdos e Legendas Premium

Escreve o material literário final da rede social: A citação exata para alimentar o componente visual gerado pelo Design (que roda sobre o Template A), a extensa Legenda da vitrine fotográfica, e a adaptação natural do funil do WhatsApp Broadcast.

## Process

1. Observe o "selected_hook" que o usuário escolheu - esta é sua tese principal. E os dados da pauta ("research_data").
2. **Citação de Imagem (Quote)**: Derive do Gancho uma versão muito curta para ser inscrita na arte quadrada do Design. Não precisa conter a explicação do dado, foque apenas na catarse/provocação do gancho para que leiam a legenda.
3. **Legenda do Post**: Formule através do método PAS usando espaçamentos corretos e elegância absoluta. Construa o problema, esfregue a solução calcada na base analítica enviada pela pesquisa global, e inclua um Call to action simples direcionados em 1-botão / DM do Chatbot do insta.
4. **Broadcast de WhatsApp**: O canal VIP pede o formato VIP: olá rápido sem pressa, indicação que esse material é privado, citação central do mercado (o mesmo topic da rede, mas adaptado). Call to Action para interação manual ou agendamento telefónico com a Eliane.

## Output Format

```yaml
instagram_quote_text: "..."
instagram_caption: |
  ...
whatsapp_broadcast: |
  ...
```

## Output Example

> Use as quality reference, not as rigid template.

```yaml
instagram_quote_text: "Onde o topo da pirâmide e os smart-money investors de São Paulo colocam capital em 2026? Portugal tem os números concretos, e não só o Mar da Comporta."
instagram_caption: |
  Você acompanha juros? Então acompanhou que 7,4% de estabilidade europeia baseada em Euro não é um retorno ruim se olharmos todo o cenário geopolítico mundial que vivemos de instabilidade.
  
  Muitos investidores adiam suas blindagens patrimoniais na zona do euro porque acham que a burocracia será estafante. É a grande mentira do setor de media.
  
  O que os números provam (segundo o INE em fevereiro passado) e nós acompanhamos in loco: comprar propriedades exclusivas nos litorais de Lisboa/Algarve deixou de ser status apenas de férias - tornou-se movimento metódico para a segurança global familiar.
  
  Você entende como seu risco exposto no BR pode ser diversificado com residência Cidadã?
  Nós fazemos um tour explicativo do seu património. 
  📲 Comente EURO26 que eu encosto a apresentação e o relatório VIP no seu direct de imediato.
whatsapp_broadcast: |
  Olá, [nome]... vi a loucura no mercado financeiro global e lembrei daquelas conversas sobre segurança nas nossas últimas reuniões.
  Não quero te lotar de dados - mas a equipa compilou uma análise que aponta 7% de estabilização do metro quadrado aqui com entrada massiva de investidores com selo Norte-Americanos. O que faz um "hedging natural" de risco de inflação e uma ponte formidável de sucessão de imposto pra família.
  Tenho a apresentação oficial do INE anexada abaixo. Dá uma vista nela, e se quiserem alocar trinta minutos ainda esta semana, nos falamos por vídeo no escritório.
  
  Confere lá e avise se gostou! Abs, Eliane da REMAX.
```

## Quality Criteria

- [ ] O Quote extraído é afiado como navalha, curtíssimo (2 linhas na imagem no max), sem as quebras que tornem o arquivo HTML instavel (max de 20-30 palavras globais no quote da arte).
- [ ] Todo bloco literário de legenda inclui emojis elegantes mas recuados e pausas verticais fáceis no olho.
- [ ] No broadcast não existem botões - afinal no Zap os envios são de relacionamentos um para um.

## Veto Conditions

Reject and redo if ANY are true:
1. O Quote gerado for gigante impossibilitando legibilidade ao virar arte (design) visual via HTML.
2. Esquecer completamento da "Call to Action" no Instagram que convide o publicador responder um gatilho para engajamento automatizado orgânico.
3. YAML parser quebra perante o mal uso da sintax | multilinha do YAML nas variáveis com múltiplos parágrafos.
