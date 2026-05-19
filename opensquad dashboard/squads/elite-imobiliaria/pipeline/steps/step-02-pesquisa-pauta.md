---
execution: subagent
agent: iago-insight
inputFile: squads/elite-imobiliaria/output/research-focus.md
outputFile: squads/elite-imobiliaria/output/market-data.md
model_tier: fast
---

# Step 02: Pesquisa de Pauta

## Context Loading

Load these files before executing:
- `squads/elite-imobiliaria/output/research-focus.md` — The user's input topic focus.
- `squads/elite-imobiliaria/pipeline/data/research-brief.md` — The macro research brief text.

## Instructions

### Process
1. Leia o foco contido no arquivo `research-focus.md` designado pelo usuário no passo anterior.
2. Inicie pesquisas via `web_search` utilizando os termos do input do user em combinação a fontes oficias listadas em suas guidelines (Ex. "Tendência valorização Algarve INE"). Navegue com as tools até compilar uma base crua.
3. Elabore e formate a saída estrutural de YAML respondendo minuciosamente o Dossiê/Task `pesquisar-mercado`.

## Output Format

The output MUST follow this exact structure:
```yaml
summary: "[short executive summary of findings]"
data_points:
  - stat: "[Specific stat]"
    source: "[Source name]"
  - stat: "[Specific stat]"
    source: "[Source name]"
  - stat: "[Specific stat]"
    source: "[Source name]"
analytical_insight: "[What this means for the target persona]"
```

## Output Example

```yaml
summary: "O mercado habitacional do Algarve registra grande alta devido aos fluxos de americanos e paulistanos exigindo condomínios fechados em detrimento de apartamentos de centro urbano."
data_points:
  - stat: "A valorização das quintas de luxo bate os 5,8% YoY apenas em Vilamoura e Loulé."
    source: "INE - Instituto Nacional de Estatística (Dados Q4 2025/2026)."
  - stat: "Vendas à vista (sem crédito habitação) compreendem 82% do fecho de imóveis com ticket superior a 1 milhão de euros."
    source: "Idealista Relatório Nacional."
analytical_insight: "O apelo maior para este público é a simplicidade da transferência de riqueza global associado a aquisição 'cash' fugindo de juros europeus, ancorando-se sob telhados super premium com vista mar onde a especulação é protegida pela baixa oferta de novos terrenos."
```

## Veto Conditions
Reject and redo if ANY of these are true:
1. Ausência do uso de skills web para verificar dados reais que estejam correlacionados ao foco da pauta, fabricando ao invés disso apenas dados ficcionais.
2. A formatação de YAML possui sintaxe corrompida.

## Quality Criteria
- [ ] 3 dados chaves extraídos perfeitamente.
- [ ] O 'analytical_insight' de fato é uma conclusão pensada sobre as pedras filosofais AAA, e não apenas um sumário repetitivo.
