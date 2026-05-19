---
execution: inline
agent: clara-copy
format: instagram-feed
inputFile: squads/elite-imobiliaria/output/selected-angle.md
outputFile: squads/elite-imobiliaria/output/social-contents.md
---

# Step 05: Criar Conteúdos (Instagram e WhatsApp)

## Context Loading

Load these files before executing:
- `squads/elite-imobiliaria/output/selected-angle.md` — The user's chosen hook.
- `squads/elite-imobiliaria/output/market-data.md` — The original research facts.
- `squads/elite-imobiliaria/agents/clara-copy/tasks/escrever-conteudo.md` — Formatting requirements e Tone rules.

## Instructions

### Process
1. Use o Gancho escolhido para gerar o texto central do card Visual do feed e as legendas engajadoras.
2. Siga as orientações focais da task referida para escrever o texto longo PAS focando em converter com CTA orgânico no direct message (Instagram_caption)
3. Modifique ligeiramente a aproximação pra uma comunicação conversacional ultra fluída com o grupo fechado no WhatsApp, anexando a ideia de que "vi esse dossiê agora e achem importante lhes passar por aqui antes..."

## Output Format

The output MUST follow this exact structure:
```yaml
instagram_quote_text: "[Text specifically carved down from hook to fit visual bounds easily]"
instagram_caption: |
  [Line 1 based heavily on hook]
  
  [Agitating PAS lines + Insights]
  
  [Hard facts injection]
  
  [Call to Action to a single focused word on comments]
whatsapp_broadcast: |
  [Greeting]
  
  [Informal yet authoritative transition to topic]
  
  [The value insight]
  
  [Casual closing and hook to chat further]
```

## Output Example

```yaml
instagram_quote_text: "Portugal te oferece risco em Euro com estabilidade secular e taxas muito acima da média ibérica."
instagram_caption: |
  A inflação toma 4% do seu patrimônio por ano enquanto você pondera onde guardar dinheiro da sucessão da família. As métricas do sul da Europa estão batendo de lado contra os pombos-correios convencionais do Brasil de hoje.
  
  Não seria lógico espelharmos os milionários americanos? De acordo com INE os números bateram 5,4%.
  
  Seja sincera consigo: deixar capital sem exposição a blocos globais de euro te darão menos do que a mera inflação lhe toma em doze anos de rentabilidade sem dividend-yields na porta real.

  Nós não enviamos pdfs, nós prestamos um conselho em chamada privada global com quem quer focar a vida onde ainda respira-se paz.
  📲 Comente 'CONSULTORIA' nesse reel e nosso backoffice engata o dossier de estabilidade por direct pra alinhar a mesa contigo.
whatsapp_broadcast: |
  Oi [nome], como estamos essa semana? 
  
  Antes que minha correria por aqui aperte entre cartórios, nossa pesquisa interna aqui em Lisboa filtrou o porquê 80% das aquisições no Algarve mês passado foram pagas á vista e longe de hipotecas bancárias por ingleses. Basicamente as TIRs estão acima dos 5% na Comporta. 
  
  Filtrei os imóveis que nós conseguimos entrar antes de bater no portfólio web de lá.
  Mando aqui atachado. Se vires algo interessante da tua tese de negócio... só mandar mensagem. Um abraço!
```

## Veto Conditions
Reject and redo if ANY of these are true:
1. `instagram_quote_text` has more than 2 full sentences.
2. The YAML breaks or forgets multiline markers `|`.

## Quality Criteria
- [ ] O Whatsapp contente parece uma senhora CEO/consultora top falando calmamente e prestativamente no microfone.
- [ ] A legenda instiga leitura através da separação limpa de bloquinhos minúsculos respiráveis.
