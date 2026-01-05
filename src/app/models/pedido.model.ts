import { ItemCarrinho } from './item-carrinho.model';

export interface Pedido {
  id: number;
  nomeCliente: string;
  itens: ItemCarrinho[];
  total: number;
  data: Date;
  status: 'pendente' | 'confirmado' | 'entregue' | 'cancelado';
}

