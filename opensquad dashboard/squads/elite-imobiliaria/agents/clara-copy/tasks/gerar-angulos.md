---
task: "gerar-angulos"
order: 1
input: |
  - research_data: Relatório em YAML contido no output da tarefa do Iago Insight.
output: |
  - angles: Uma lista em YAML com 5 opções de ganchos narrativos (Hooks).
---

# Gerar Ângulos para Redes Sociais

Gera 5 ganchos estratégicos em forma de tese ou pergunta para usar na abertura de peças de Instagram e contatos pelo WhatsApp.

## Process

1. Leia atentamente o output analítico vindo do estrategista Iago Insight que foi providenciado no `research_data`.
2. Pegue os números concretos e fatos citados.
3. Desenvolva 5 formas únicas e criativas de atacar ou apresentar esse mesmo dado (os "ângulos"), variando entre ser educacional, alarmista, exclusivo (Aspiracional C-Level), de curiosidade (Mito vs Verdade), e orientado ao benefício de segurança/liberdade.
4. Formate como um arquivo YAML sem envolver em blocos markdown (` ``` `), com opções diretas.

## Output Format

```yaml
angles:
  - id: 1
    type: "Educacional"
    hook: "..."
    rationale: "..."
  - id: 2
    type: "Mito vs Verdade"
    hook: "..."
    rationale: "..."
  - id: 3
    type: "Aspiracional Financeiro"
    hook: "..."
    rationale: "..."
  - id: 4
    type: "Curiosidade"
    hook: "..."
    rationale: "..."
  - id: 5
    type: "Orientado a Desejo"
    hook: "..."
    rationale: "..."
```

## Output Example

> Use as quality reference, not as rigid template.

```yaml
angles:
  - id: 1
    type: "Curiosidade Financeira"
    hook: "A inflação consome 4% do seu dinheiro ao ano. O metro quadrado em Lisboa ganha 7,4% de reprecificação com solidez em moeda forte. As contas fecham bem rápido."
    rationale: "Foca no medo da inflação no Brasil e ataca de forma racional sobre a valorização das pedras portuguesas."
  - id: 2
    type: "Mito VS Verdade"
    hook: "Ainda acha que investir na Europa é colocar o dinheiro a dormir para sempre em retornos pífios de 1%? É porque não lhe mostraram o sul de Portugal e as rentabilidades em Arrendamentos locais de luxo."
    rationale: "Desmonta a ideia errada de baixas de remunerações da zona euro e constroi curiosidade do leitor."
  - id: 3
    type: "Aspiracional de Acesso"
    hook: "Os maiores escritórios privados de investimento não divulgam onde seus clientes estão alocando proteção fiduciária global... Mas eu te conto."
    rationale: "Gatilho de acesso VIP e curiosidade restrita."
  - id: 4
    type: "Lifestyle Premium"
    hook: "Mudar-se para a Europa não é mais sacrifício. É simplesmente continuar tendo a sua vista e o seu luxo, mas removendo a blindagem e o medo e podendo passear o cão de noite à beira-mar."
    rationale: "Foco integral no estilo de vida e não apenas no cimento ou parede da moradia. É o bem estar da tranquilidade em Portugal."
  - id: 5
    type: "Urgência Analítica"
    hook: "Enquanto eles reclamam da taxa SELIC, as construtoras portuguesas estão a reportar lucros gigantes sobre investidores que acordaram para Ouro Real que o Algarve se tornou."
    rationale: "Aponta um erro dos comuns (reclamação geral) e destaca uma atitude vencedora."
```

## Quality Criteria

- [ ] 5 ganchos distintos garantidos, sem repetições cansativas.
- [ ] Cada gancho apela fortemente para as diretrizes de tom (profissional refinado) estipuladas.
- [ ] Nenhum gancho soa barato ou utiliza "Imperdível/Clique Aqui" - em vez, vendem valor intrínseco.

## Veto Conditions

Reject and redo if ANY are true:
1. Mais de dois angulos compartilham as mesmas três primeiras palavras - isso gera falta criativa.
2. Formato YAML imperfeito que travará o runner do sistema.
3. Não incorporou diretamente os números repassados da pesquisa de mercado, ficando um gancho 'genérico' focado apenas em Portugal.
