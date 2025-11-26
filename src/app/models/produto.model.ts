export interface Produto {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  quantidade: number;
  categoria: string;
  ativo: boolean;
  imagemBase64?: string; // opcional
}
