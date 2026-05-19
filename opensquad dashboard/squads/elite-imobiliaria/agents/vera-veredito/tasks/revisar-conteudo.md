---
task: "revisar-conteudo"
order: 1
input: |
  - copy_instagram: A copy extraída do processo anterior pela Clara Copy.
  - whatsapp_broadcast: O texto para Wpp formulado pela mesma copiadora.
  - template_html: A string de injeção gerada pelo modelo do agente Davi Design via template de layout visual.
output: |
  - verdict: "APPROVE" ou "REJECT".
  - feedback_reason: O motivo pelo qual reprovou (ou justificação de aprovação focada em pq atendeu os requirimentos premium C-Level da imobiliária).
  - revision_action: Apenas preenchido caso 'REJECT' (o que eles precisam mudar urgentemente da parte deles para adequação legal/corporativa).
---

# Auditoria e Revisão de Conformidade de Conteúdo

Inspeciona o pacote criativo completo de redes (Capitation para Feed, Broadcast focado em Zap da lista VIP, Layout do HTML preenchido) comparando com os ditames da Eliane Imóveis Luxo.

## Process

1. Leia ativamente  `squads/elite-imobiliaria/pipeline/data/anti-patterns.md`, `quality-criteria.md`, e demais guias disponíveis para esta equipe na memória compartilhada do agente e de ambiente de base de referência.
2. Cheque os vocabulários: houve banalização (ex: "liquidacão", "oportunidade imperdível", emojis em profusão, exclamações aos montes)? Se sim, vá para passo Veredito Rejeição. Se seguro com base em dados de TIR% ou segurança patrimonial e LifeStyle de elite, prossiga aprovação.
3. Checklist the Formatos em WPP e Insta (Possuem CTAs robustos em cada um dos formatos solicitados?).
4. Produza Output preenchendo as chaves formatadas YAML que respondam aos resultados da inspeção.

## Output Format

```yaml
verdict: "APPROVE" # ou "REJECT"
feedback_reason: "..."
revision_action: "..."
```

## Output Example

> Use as quality reference, not as rigid template.

```yaml
verdict: "REJECT"
feedback_reason: "O uso da expressão 'comprar barato nesse momento incrivel' foi localizado no broadcast. Tal expressão compromete a figuração consultiva da marca e posiciona as assets em concorrência predatória por preço em vez da exclusividade natural vendida e atracão real. Ademais, o texto de whatsapp careceu do tom relacional 1x1 íntimo exigido pelas políticas anti-spam do grupo. Texto corporativista demais nas frases: 'A nossa corretora notifica vc...'."
revision_action: "Clara Copy: Rescrever a base focalizando no framework de pertencimento. Tire adjetivo 'barato', use ancoragem no Euro ao invés da banalidade. Faça o Whats soar como um recado falado rápido sem pretensões."
```

## Quality Criteria

- [ ] Todos os três ativos (WPP, Copy e Foto-quote) foram inspecionados concomitantemente.
- [ ] Ação de revisão indica expressamente QUEM do pipeline precisa corrigir algo.
- [ ] Retorno da palavra `APPROVE` estritamente limpo só sai quando o padrão AAA está blindado no material examinado sem falhas menores aparentes.

## Veto Conditions

Reject and redo if ANY are true:
1. Rejeitou a arte de um copywriter mas não apontou as razões práticas para a re-tentativa e melhorias da geração anterior.
2. Quebrou o formato YAML no meio do report, gerando falha serializadora aos próximos loops.
