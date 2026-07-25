import './style.css';
import type { Categoria, Expense } from './types';

const categories: Categoria[] = ['Alimento', 'transporte', 'lazer', 'saúde', 'outros'];

let expenses: Expense[] = [];

const form = getElement<HTMLFormElement>('#expense-form');
const titleInput = getElement<HTMLInputElement>('#title');
const valueInput = getElement<HTMLInputElement>('#value');
const categorySelect = getElement<HTMLSelectElement>('#category');
const formError = getElement<HTMLParagraphElement>('#form-error');
const expenseList = getElement<HTMLUListElement>('#expense-list');
const emptyMessage = getElement<HTMLParagraphElement>('#empty-message');
const totalElement = getElement<HTMLElement>('#total-expenses');
const expenseCount = getElement<HTMLElement>('#expense-count');

form.addEventListener('submit', handleSubmit);
renderSummary();
renderExpenses();

function handleSubmit(event: SubmitEvent) {
  event.preventDefault();

  const title = titleInput.value.trim();
  const value = Number(valueInput.value);
  const category = categorySelect.value;

  if (!isValidCategory(category)) {
    showError('Selecione uma categoria válida.');
    return;
  }

  if (!title) {
    showError('Informe o título da despesa.');
    return;
  }

  if (!value || value <= 0) {
    showError('Informe um valor maior que zero.');
    return;
  }

  addExpense({
    id: createId(),
    titulo: title,
    valor: value,
    categoria: category,
  });

  form.reset();
  clearError();
  titleInput.focus();
}

function addExpense(expense: Expense) {
  expenses = [...expenses, expense];
  renderExpenses();
  renderSummary();
}

function renderExpenses() {
  expenseList.replaceChildren();

  emptyMessage.hidden = expenses.length > 0;
  expenseCount.textContent = `${expenses.length} ${expenses.length === 1 ? 'item' : 'itens'}`;

  for (const expense of expenses) {
    const item = document.createElement('li');
    item.className = 'expense-item';

    const info = document.createElement('div');

    const title = document.createElement('strong');
    title.textContent = expense.titulo;

    const category = document.createElement('span');
    category.className = 'expense-category';
    category.textContent = expense.categoria;

    const value = document.createElement('strong');
    value.className = 'expense-value';
    value.textContent = formatCurrency(expense.valor);

    info.append(title, category);
    item.append(info, value);
    expenseList.append(item);
  }
}

function renderSummary() {
  totalElement.textContent = formatCurrency(calculateTotal());

  for (const category of categories) {
    const categoryTotal = document.getElementById(`total-${category}`);

    if (categoryTotal) {
      categoryTotal.textContent = formatCurrency(calculateTotalByCategory(category));
    }
  }
}

function calculateTotal() {
  return expenses.reduce((total, expense) => total + expense.valor, 0);
}

function calculateTotalByCategory(category: Categoria) {
  return expenses
    .filter((expense) => expense.categoria === category)
    .reduce((total, expense) => total + expense.valor, 0);
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

function showError(message: string) {
  formError.textContent = message;
}

function clearError() {
  formError.textContent = '';
}

function isValidCategory(category: string): category is Categoria {
  return categories.includes(category as Categoria);
}

function createId() {
  if (crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return String(Date.now());
}

function getElement<T extends HTMLElement>(selector: string) {
  const element = document.querySelector<T>(selector);

  if (!element) {
    throw new Error(`Elemento não encontrado: ${selector}`);
  }

  return element;
}
