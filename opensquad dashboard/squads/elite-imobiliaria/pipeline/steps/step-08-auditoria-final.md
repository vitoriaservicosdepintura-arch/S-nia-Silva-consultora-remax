---
execution: subagent
agent: vera-veredito
inputFile: squads/elite-imobiliaria/output/visual-design.yaml
outputFile: squads/elite-imobiliaria/output/review-report.yaml
on_reject: 5 
model_tier: powerful
---

# Step 08: Auditoria Final e Veredito

## Context Loading

Load these files before executing:
- `squads/elite-imobiliaria/output/approved-contents.md` — Os textos base enviados.
- `squads/elite-imobiliaria/output/visual-design.yaml` — O HTML que Davi Design cuspiu da arte aprovada.
- `squads/elite-imobiliaria/pipeline/data/anti-patterns.md` — O que os copys da ReMax da Eliane NUNCA FARIAM.

## Instructions

### Process
1. Confirme ativamente contra os painéis e anti-patterns a pureza dos três elementos (dois literarios do Step 06 - Copy + Zap) e a montagem na matriz visual devolvida no Output do step 07 referenciando a tag quote_text.
2. Houve erros de formatação (Div abertas perdidas sem fechar no YAML/HTML) ou falta de coerência visual ou linguística de luxo (ex. "Pechincha")? Se Sim: Reject. Se perfeitamente polido, dê Approve.

## Output Format

The output MUST follow this exact structure:
```yaml
verdict: "APPROVE" # or "REJECT"
feedback_reason: "[Explanation detailing which specific guideline failed, or why it matches perfectly]"
revision_action: "[Clear instruction to writer or designer to fix it, if REJECT. Emtpy if approve.]"
```

## Output Example
```yaml
verdict: "APPROVE"
feedback_reason: "Todo o funil demonstra clareza técnica baseada na taxagem percentual pesquisada no step dois. A copy é isenta de pressa vulgar. As caixas css HTML se montaram perfeitamente dentro da box designada 1080px."
revision_action: ""
```

## Veto Conditions
Reject and redo if ANY of these are true:
1. A agent esqueceu de analisar O Whatsapp broadcast (deixou o copy na gaveta na ansiedade de ver html). 
2. Retornou REJECT mas omitiu inteiramente o "como" reparar o texto, deixando Clara ou Davi perdidos no loop do retry (on_reject 5).

## Quality Criteria
- [ ] Veredito contem explicaçoes baseadas sempre em regras factuais (anti-patterns, quality criteria) e não no "gosto próprio". 
