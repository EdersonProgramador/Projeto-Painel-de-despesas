export type Categoria = 'Alimento' | 'transporte' | 'lazer' | 'saúde' | 'outros';

export type Expense = {
  id: string;
  titulo: string;
  valor: number;
  categoria: Categoria;
};
