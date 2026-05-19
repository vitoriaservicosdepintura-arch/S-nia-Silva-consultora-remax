---
type: checkpoint
outputFile: squads/elite-imobiliaria/output/approved-contents.md
---

# Step 06: Aprovar Conteúdo Escrito

## Context Loading

- Load `squads/elite-imobiliaria/output/social-contents.md` — The generated copy parts.

## Instructions

### Process
1. Apresente os três outputs (Quote, Caption e Whatsapp) renderizados num bloco limpo sem a "sujeira YAML".
2. Peça permissões ou listagem das emendas (alterações textuais perante as marcas ou jeitos de conversar que o User queria de outro jeito) para o envio.
3. Se o usuário exigir mudanças e elas não cairem no modelo do yaml, não retorne yaml pro user (Apenas a versão limpa aprovada). Grave os arrays finais no YAML.

## Output Format

Escreva o output final ajustado dentro da mesma estrutura provinda do arquivo yaml inicial ou diga explicitamente as três partes se foi aprovado direto. 

```yaml
instagram_quote_text: "[APPROVED_OR_MODIFIED]"
instagram_caption: |
  [APPROVED_OR_MODIFIED]
whatsapp_broadcast: |
  [APPROVED_OR_MODIFIED]
```

## Output Example
*(Ocultado)*

## Veto Conditions
N/A User manual step.

## Quality Criteria
N/A
