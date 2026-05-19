---
execution: inline
agent: clara-copy
inputFile: squads/elite-imobiliaria/output/market-data.md
outputFile: squads/elite-imobiliaria/output/angles.md
---

# Step 03: Geração de Ganchos

## Context Loading

Load these files before executing:
- `squads/elite-imobiliaria/output/market-data.md` — The researched data compiled by Iago.
- `squads/elite-imobiliaria/pipeline/data/tone-of-voice.md` — Relembrar o tom das headlines.
- `squads/elite-imobiliaria/agents/clara-copy/tasks/gerar-angulos.md` — O formato task que guia o output.

## Instructions

### Process
1. Leia o `market-data.md`. Note especial atenção ao "analytical_insight" gerado.
2. Crie as 5 opções de Ganchos rigorosamente como a task `gerar-angulos` instruiu Clara Copy. 
3. Formate rigorosamente a saída como um esquema YAML puro listando as opções de ganchos criativos.

## Output Format

The output MUST follow this exact structure:
```yaml
angles:
  - id: 1
    type: "[Tipo de angulo ex: Curiosidade]"
    hook: "[O texto literal do hook / headline]"
    rationale: "[Explicação de pq isso vai dar certo para a brand C-Level]"
  - id: 2
    type: "[Tipo de angulo ex: Curiosidade]"
    hook: "[O texto literal do hook / headline]"
    rationale: "[Explicação de pq isso vai dar certo para a brand C-Level]"
  - id: 3
    type: "[Tipo de angulo ex: Curiosidade]"
    hook: "[O texto literal do hook / headline]"
    rationale: "[Explicação de pq isso vai dar certo para a brand C-Level]"
  - id: 4
    type: "[Tipo de angulo ex: Curiosidade]"
    hook: "[O texto literal do hook / headline]"
    rationale: "[Explicação de pq isso vai dar certo para a brand C-Level]"
  - id: 5
    type: "[Tipo de angulo ex: Curiosidade]"
    hook: "[O texto literal do hook / headline]"
    rationale: "[Explicação de pq isso vai dar certo para a brand C-Level]"
```

## Output Example

```yaml
angles:
  - id: 1
    type: "Status Quo Interrompido"
    hook: "Vender uma propriedade AAA em São Paulo e deixar o dinheiro na janela inflacionária pode ser o erro que a sua família vai cobrar no futuro. Hoje o sul atlântico diz outra coisa."
    rationale: "Pegamos a dor de investidores que sabem que o capital braga derrete com a inflação frente a mercados globais lastreados."
  - id: 2
    type: "Contra Intuitivo"
    hook: "Por que as famílias do norte da Europa não compram luxo nas metrópoles, mas pagam qualquer preço pelo Algarve?"
    rationale: "Usa a 'segregação de riqueza' de bilionários norte europeus pra espelhar desejo de compra em nossos locais no Algarve."
  - id: 3
    type: "Hard Data & Fatos"
    hook: "5,8% YoY é o mínimo em áreas como Vilamoura. Mas a verdadeira pauta por trás desse número no Algarve não vêm pro papel do INE."
    rationale: "Constrói credibilidade chamando o nome da instituição mas avisa que a copy detalhará coisas das 'trincheiras' ou back-office."
  - id: 4
    type: "Benefício Imediato Lifestyle"
    hook: "Sabe como as escrituras premium pagam à vista fecham em Portugal sem dor de cabeça ou inflação corroendo seu ativo? Estabilidade é a nova métrica de riqueza."
    rationale: "Aponta o valor da ausência de stress - coisa incalculavel pra quem investe acima da casa de 1 Milhão e paga a vista."
  - id: 5
    type: "Medo / Perda de Oportunidade Paternal"
    hook: "O preço de proteger seu legado internacionalmente nunca foi tão baixo comparado com o custo que vai estar amanhã com a escassez de terrenos frente-mar em Portugal."
    rationale: "Atua na tese econômica de base: oferta travada (terra) vs alta demanda e mexe no lado parental do Family office."
```

## Veto Conditions
Reject and redo if ANY of these are true:
1. Output is missing one or more angles (must have 5 exactly).
2. The YAML is incorrectly formatted.

## Quality Criteria
- [ ] 5 ganchos seguindo o tone of voice (Nenhum "Imperdivel", etc).
- [ ] A tese analítica informada pela task do Iago não foi descartada e brilha em cada gancho de modos variados.
