---
task: "gerar-imagens"
order: 1
input: |
  - quote_text: A string injetiva contendo o gancho encurtado aprovado pela redação.
output: |
  - message: Retorno dizendo "Imagem Gerada e capturada com playwright".
  - path_imagem: Onde a imagem gerada foi exportada.
---

# Gerar Layous de Imagem HTML via Playwright

Task designada a injetar strings de marketing num modelo master de arte que então é renderizado de forma headless em formato de imagem.

## Process

1. Leia as regras estipuladas no arquivo `squads/elite-imobiliaria/pipeline/data/visual-identity.md` para as cores principais e as fontes. Você encontrará informações vitais que proíbem fontes e cores amadoras.
2. Leia o arquivo-base em `squads/elite-imobiliaria/pipeline/data/template-reference.html`. 
3. Você irá alterar **exclusivamente** o conteúdo dentro do elemento pai chamado `.tweet-text`. Deletando o texto lorem que habita lá, e inserindo a string de Entrada do User que repassou as informações extraídas no Step de copy: instale este html recheado na variavél do Output YAML abaixo.
4. Execute o `image-creator` se permitido, mas lembre-se seu objetivo primacial do subagente é cuspir o HTML preenchido em sua versão adaptada para que o Master Pipeline execute ou um outputter grave isso na task. Seu resultado na task listada é expor que fez isso no YAML e retornar a string codificada HTML do arquivo.

## Output Format

```yaml
message: "..."
path_imagem: "..."
html: |
   <!DOCTYPE html>
   ...
```

## Output Example

> Use as quality reference, not as rigid template.

```yaml
message: "Injeção HTML pronta baseada no template-A, aguardando print ou salvamento no Output do Pipeline."
path_imagem: "output/post-final-do-dia.html"
html: |
   <!DOCTYPE html>
   <html>
   <head>...</head>
   ...
   <div class="tweet-text">
    Acreditava que <span>blindagem patrimonial</span> precisava passar só pelas Bahamas?
    <br><br>
    Portugal te oferece risco em Euro com estabilidade secular e taxas muito acima da média global. Descubra sua segunda casa agora.
   </div>
   ...
   </html>
```

## Quality Criteria

- [ ] HTML é valido. Sem div esquecida de fechamento.
- [ ] Tudo permaneceu com padding do layout original inalterado.
- [ ] O output contém integralmente o corpo html na chave YAML repassada.

## Veto Conditions

Reject and redo if ANY are true:
1. O Body css esqueceu os estilos originais que constroi a hierarquia e cor Azul dominante e os acentos Vermelhos do Template A.
2. O parser de YAML estourou por não estar cercado perfeitamente no output text.
