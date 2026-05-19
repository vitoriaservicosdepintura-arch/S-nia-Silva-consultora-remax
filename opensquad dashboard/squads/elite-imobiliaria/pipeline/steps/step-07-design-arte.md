---
execution: subagent
agent: davi-design
inputFile: squads/elite-imobiliaria/output/approved-contents.md
outputFile: squads/elite-imobiliaria/output/visual-design.yaml
model_tier: powerful
---

# Step 07: Design da Arte Visual

## Context Loading

Load these files before executing:
- `squads/elite-imobiliaria/output/approved-contents.md` — O pacote com o instagram_quote_text aprovado final.
- `squads/elite-imobiliaria/pipeline/data/visual-identity.md` — Regras identitárias colorways AAA.
- `squads/elite-imobiliaria/pipeline/data/template-reference.html` — A base construtora inteira!

## Instructions

### Process
1. Inicie varrendo as diretrizes visais obrigatórias contidas em `visual-identity.md`.
2. Extraia SOMENTE a tag `instagram_quote_text` do input repassado da etapa 06.
3. Insira esse quote no template da Citação (Template A ref). Se você quiser destilar ou separar em parágrafos HTML `<br>`, o faça visando estetica perfeita no centro, marcando o trecho "forte" do gancho usando `<span>` como dita a regra CSS contida no Head.
4. Finalize o Output com a entrega do html recheado de volta e chame a task via image-creator salvando a peça gerada sob o prefixo "final-art" no subdiretório de Output do pipeline. (Como a pipeline corre de modo virtual e a imagem física é exigida, diga o status do render, mesmo que simule o salvamento de "rendered-post.png" dentro do dir). 

## Output Format

The output MUST follow this exact structure:
```yaml
message: "[Mensagem indicando sucesso na montagem do HTML e path de png salvo virtual ou fisicamente se Playwright atuou integralmente]"
path_imagem: "[o caminho da imagem png caso Playwright exporte fisicamente no disk drive]"
html: |
   <!DOCTYPE html>
   [...]
```

## Output Example
*(Veja tasks do Davi para Ref e Example)*

## Veto Conditions
Reject and redo if ANY of these are true:
1. O css em tempo real foi esquecido do html jogado no output.
2. O HTML de output faltou com pedaços do logo/header. 

## Quality Criteria
- [ ] Output preenchido com template-A sem destruir cor \#001A33 do body.
- [ ] Formatado de modo legivél. 
