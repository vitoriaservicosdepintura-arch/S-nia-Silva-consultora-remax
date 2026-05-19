---
task: "pesquisar-mercado"
order: 1
input: |
  - focus_topic: A região, tipo de imóvel ou assunto geral escolhido pelo usuário no checkpoint prévio.
output: |
  - summary: Resumo das tendências em parágrafo curto.
  - data_points: Lista de 3 dados chave com fontes.
  - analytical_insight: O significado prático disso para investir (o "Por que se importar").
---

# Pesquisar Mercado Imobiliário

Pesquisa dados e tendências do mercado imobiliário com foco em Portugal para justificar e lastrear com lógica o investimento para clientes de alta renda ou corporativos.

## Process

1. Leia o foco definido no arquivo de input (`focus_topic`).
2. Utilize a skill `web_search` para procurar notícias recentes (últimos dias/meses) nos sites de estatísticas oficiais (ex: INE PT), portais imobiliários conhecidos de análise e jornais financeiros. Utilize também o web_fetch para entrar nos links específicos se achar boas análises.
3. Extraia métricas de valorização (%) e relatórios recentes focados no termo requerido.
4. Analise as motivações de "investidor exterior": se eles estão comprando por qualidade de vida, Golden Visa, impostos ou retornos com aluguel de verão (Alojamento Local).
5. Compile tudo preenchendo as informações dentro do formato de YAML exigido como output.

## Output Format

```yaml
summary: "..."
data_points:
  - stat: "..."
    source: "..."
  - stat: "..."
    source: "..."
analytical_insight: "..."
```

## Output Example

> Use as quality reference, not as rigid template.

```yaml
summary: "O mercado habitacional de luxo segue a registar grande tração de estrangeiros na região sul do conselho de Lisboa, focando na segurança como principal driver de capital."
data_points:
  - stat: "Preços de transação subiram numa média sustentável de 7.4% no último período, indicando desaquecimento especulativo e entrada numa fase saudável."
    source: "Instituto Nacional de Estatística (INE) divulgado esta segunda-feira (Fev 2026)."
  - stat: "Norte-Americanos já representam um número superior nas regiões premium contrapondo as compras por ingleses."
    source: "Eco Finanças."
analytical_insight: "Para o investidor, Portugal não é especulação de subida de preço desabalada, é uma estratégia de hedge de risco e refúgio internacional. O foco deve ser 'Estabilidade' e não 'Oportunidade rápida'."
```

## Quality Criteria

- [ ] Realizou requisição genuína para a web (sem alucinar dados passados).
- [ ] Estatísticas possuem número exato com sinalização de contexto.
- [ ] Formatado estritamente como YAML sem Markdown exterior.

## Veto Conditions

Reject and redo if ANY are true:
1. O summary inclui previsões baseadas no "eu acho", ao invés de análises de repórteres e especialistas do banco/estado.
2. Formato falhou de ser puramente YAML interpretável (vazou aspas múltiplas, blocos de formatação quebrados).
