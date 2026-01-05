export interface Cliente {
  id: number;
  nome: string;
  totalPedidos: number;
  totalGasto: number;
  primeiroPedido: Date;
  ultimoPedido: Date;
}

