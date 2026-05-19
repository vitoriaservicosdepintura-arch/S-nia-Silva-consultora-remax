---
type: checkpoint
outputFile: squads/elite-imobiliaria/output/research-focus.md
---

# Step 01: Pesquisar Foco

## Context Loading

- Load `squads/elite-imobiliaria/pipeline/data/research-brief.md` — To recall the general market trends previously discovered.

## Instructions

### Process
1. Apresente-se como o coordenador do squad Elite Imobiliária e pergunte qual o tema ou pauta o usuário gostaria de trabalhar hoje.
2. Dê algumas sugestões baseadas na pesquisa inicial (ex: "Podemos focar nas tendências de valorização em Lisboa, na oportunidade em Comporta, ou no impacto dos investidores norte-americanos no Algarve. Ou traga sua própria pauta.").
3. Aguarde a resposta do usuário e envie exatamente o que o usuário escolheu para o arquivo de output.

## Output Format

Apenas o texto com a escolha do usuário. Não aplique formatações complexas e ignore os backticks. Exemplo literal:
```
[TEMA REPOSITADO]
```

## Output Example

Foco no investidor do sudeste do Brasil procurando diversificação e proteção no sul de Portugal (Algarve / Vilamoura).

## Veto Conditions
Reject and redo if ANY of these are true:
1. N/A (It's a user checkpoint)

## Quality Criteria
- [ ] O tema está claro para iniciar a busca na web.
