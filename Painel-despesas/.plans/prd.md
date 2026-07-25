# PRD — Painel de Despesas

## 1. Visão geral

O projeto é um painel simples de controle de despesas, desenvolvido com Vite, HTML, CSS e TypeScript vanilla.

A aplicação permite cadastrar despesas em memória, listar os lançamentos adicionados e exibir um resumo financeiro lateral com o total geral e o total acumulado por categoria.

Não haverá autenticação, backend, banco de dados ou persistência local. Ao recarregar a página, os dados cadastrados serão perdidos.

## 2. Objetivo do produto

Criar uma interface simples, clara e responsiva para registrar despesas rapidamente e visualizar:

- todas as despesas adicionadas;
- a soma total das despesas;
- a soma das despesas agrupadas por categoria.

O foco do projeto é praticar organização de código em TypeScript vanilla, estruturação semântica em HTML, manipulação pontual do DOM, eventos via TypeScript e separação básica de responsabilidades.

## 3. Stack técnica

- Vite
- TypeScript
- HTML
- CSS
- Sem framework frontend
- Sem biblioteca de estado
- Sem persistência de dados

## 4. Requisitos funcionais

### RF01 — Cadastro de despesa

O usuário deve conseguir adicionar uma nova despesa informando:

- título;
- valor;
- categoria.

Ao cadastrar, a despesa deve ser adicionada à lista exibida na tela e considerada nos cálculos do resumo lateral.

### RF02 — Campos da despesa

Cada despesa deve possuir a seguinte estrutura:

```ts
type Expense = {
  id: string;
  titulo: string;
  valor: number;
  categoria: Categoria;
};
```

### RF03 — Categorias fixas

As categorias disponíveis devem ser fixas:

- Alimento
- transporte
- lazer
- saúde
- outros

O usuário deve selecionar uma dessas categorias ao cadastrar uma despesa.

### RF04 — Listagem de despesas

A aplicação deve exibir todas as despesas cadastradas durante a sessão atual.

Cada item da lista deve mostrar, no mínimo:

- título;
- valor formatado como moeda;
- categoria.

### RF05 — Resumo total

A sidebar lateral esquerda deve exibir a soma total de todas as despesas cadastradas.

### RF06 — Total por categoria

A sidebar lateral esquerda deve exibir o total acumulado para cada categoria fixa, mesmo que o valor seja zero.

### RF07 — Validação básica do formulário

O formulário deve impedir o cadastro quando:

- o título estiver vazio;
- o valor estiver vazio;
- o valor for menor ou igual a zero;
- nenhuma categoria válida estiver selecionada.

### RF08 — Limpeza do formulário

Após cadastrar uma despesa válida, o formulário deve ser limpo para permitir um novo cadastro.

## 5. Requisitos técnicos

### RT01 — TypeScript vanilla

Toda a lógica da aplicação deve ser implementada em TypeScript simples, sem frameworks.

### RT02 — Eventos no TypeScript

Todos os eventos devem ser registrados no TypeScript com `addEventListener`.

Não deve haver eventos inline no HTML, como:

```html
<button onclick="..."></button>
```

### RT03 — Estrutura HTML no `index.html`

A estrutura principal da interface deve ser escrita diretamente no arquivo HTML.

O TypeScript não deve montar a aplicação inteira dentro do `#app` usando uma grande string HTML.

O `index.html` deve conter a marcação base da aplicação, incluindo:

- layout principal;
- sidebar;
- área de resumo;
- formulário de cadastro;
- campos do formulário;
- botão de adicionar despesa;
- área onde a lista de despesas será exibida.

O TypeScript deve apenas:

- buscar elementos já existentes no DOM;
- registrar eventos;
- ler dados do formulário;
- validar entradas;
- manipular o array de despesas;
- atualizar textos, totais e a lista de despesas.

Exemplo de abordagem esperada:

```ts
const form = document.querySelector<HTMLFormElement>('#expense-form');
const list = document.querySelector<HTMLUListElement>('#expense-list');
const totalElement = document.querySelector<HTMLElement>('#total-expenses');
```

### RT04 — Tipos centralizados

Todos os tipos TypeScript do projeto devem ficar em:

```txt
src/types.ts
```

Tipos mínimos esperados:

```ts

export type Categoria =
  | 'Alimento'
  | 'transporte'
  | 'lazer'
  | 'saúde'
  | 'outros';

export type Expense = {
  id: string;
  titulo: string;
  valor: number;
  categoria: Categoria;
};
```

### RT05 — Estado em memória

As despesas devem ser armazenadas em um array em memória no TypeScript.

Exemplo:

```ts
let expenses: Expense[] = [];
```

Não deve ser usado:

- localStorage;
- sessionStorage;
- IndexedDB;
- API externa;
- banco de dados.

### RT06 — Atualização da interface baseada no estado

Após cada cadastro, a interface deve ser atualizada com base no array de despesas.

A aplicação deve recalcular:

- lista de despesas;
- total geral;
- total por categoria.

A atualização da interface deve ser pontual, usando elementos já existentes no HTML.

É permitido criar os itens da lista de despesas dinamicamente, pois eles dependem dos dados cadastrados pelo usuário.

Não é permitido substituir toda a estrutura da página ou todo o conteúdo do `#app` via TypeScript.

### RT07 — Código simples e manutenível

O código deve priorizar clareza e baixa complexidade.

Funções recomendadas:

- `handleSubmit`
- `addExpense`
- `renderExpenses`
- `renderSummary`
- `calculateTotal`
- `calculateTotalByCategory`
- `formatCurrency`

### RT08 — Geração de ID

Cada despesa deve receber um `id` único do tipo `string`.

Pode ser usado:

- `crypto.randomUUID()`, se disponível;
- fallback simples baseado em data, caso necessário.

### RT09 — Responsabilidades por arquivo

O `index.html` deve ser responsável pela estrutura estática da página.

O `src/style.css` deve ser responsável pela apresentação visual.

O `src/main.ts` deve ser responsável pela lógica da aplicação:

- seleção de elementos do DOM;
- eventos;
- validação;
- criação de despesas;
- cálculos;
- atualização da lista e dos totais.

O `src/types.ts` deve ser responsável apenas pelas definições de tipos.

## 6. Requisitos visuais

### RV01 — Layout principal

A tela deve ser dividida em duas áreas principais:

- sidebar lateral esquerda com os resumos;
- área principal com formulário e lista de despesas.

### RV02 — Sidebar

A sidebar deve conter:

- título ou identificação do resumo;
- valor total de todas as despesas;
- lista com o total de cada categoria.

A sidebar deve ter destaque visual suficiente para diferenciar dados de resumo do conteúdo principal.

### RV03 — Card de nova despesa

O formulário de cadastro deve ser apresentado em formato de card.

O card deve conter:

- título da seção;
- campo de título;
- campo de valor;
- seletor de categoria;
- botão para adicionar despesa.

### RV04 — Lista de despesas

A lista deve aparecer abaixo ou ao lado do card de cadastro, dentro da área principal.

Cada despesa deve ser exibida como item visual separado, preferencialmente com:

- título em destaque;
- valor bem visível;
- categoria como texto auxiliar ou badge.

### RV05 — Estados vazios

Quando não houver despesas cadastradas, a lista deve exibir uma mensagem simples, como:

```txt
Nenhuma despesa adicionada ainda.
```

### RV06 — Responsividade básica

Em telas menores, a interface deve continuar utilizável.

Comportamento esperado:

- sidebar pode aparecer acima do conteúdo principal;
- formulário e lista devem ocupar a largura disponível;
- campos devem permanecer legíveis e fáceis de tocar/clicar.

## 7. Estrutura sugerida de arquivos

```txt
index.html

src/
  main.ts
  style.css
  types.ts
```

O `index.html` deve conter a estrutura base da aplicação. O `main.ts` deve manipular essa estrutura, não recriá-la por completo.

O arquivo `counter.ts` gerado pelo template do Vite não é necessário para este projeto e pode ser removido se não estiver sendo usado.

## 8. Critérios de aceite

O projeto será considerado concluído quando:

- o usuário conseguir adicionar uma despesa válida;
- despesas inválidas não forem cadastradas;
- a lista exibir todas as despesas adicionadas;
- o total geral for atualizado corretamente;
- o total por categoria for atualizado corretamente;
- todas as categorias fixas aparecerem no resumo;
- todos os tipos estiverem em `src/types.ts`;
- nenhum evento estiver declarado inline no HTML;
- a estrutura principal da interface estiver escrita diretamente no `index.html`;
- o TypeScript não montar todo o conteúdo do `#app` com uma string HTML;
- o TypeScript manipular apenas dados, eventos e atualizações pontuais da interface;
- não houver persistência de dados;
- o código estiver simples, legível e compatível com TypeScript vanilla.

## 9. Fora de escopo

Não fazem parte desta versão:

- edição de despesas;
- exclusão de despesas;
- filtros;
- busca;
- ordenação;
- gráficos;
- login;
- backend;
- banco de dados;
- persistência local;
- importação ou exportação de dados.

## 10. Observações de implementação

- Usar nomes de variáveis e funções claros.
- Evitar abstrações desnecessárias.
- Manter o HTML sem lógica inline.
- Manter a estrutura estática da tela no `index.html`.
- Manter o CSS focado em layout, legibilidade e organização visual.
- Re-renderizar a lista e o resumo após cada alteração no array de despesas.
- Evitar montar layouts completos via `innerHTML` no TypeScript.
