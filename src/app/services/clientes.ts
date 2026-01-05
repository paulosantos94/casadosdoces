import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cliente } from '../models/cliente.model';
import { PedidosService } from './pedidos';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  private clientes: BehaviorSubject<Cliente[]>;
  public clientes$: Observable<Cliente[]>;

  constructor(private pedidosService: PedidosService) {
    this.clientes = new BehaviorSubject<Cliente[]>([]);
    this.clientes$ = this.clientes.asObservable();
    this.atualizarClientes();
    
    // Atualizar clientes quando houver novos pedidos
    this.pedidosService.pedidos$.subscribe(() => {
      this.atualizarClientes();
    });
  }

  private atualizarClientes() {
    const pedidos = this.pedidosService.getAll();
    const clientesMap = new Map<string, Cliente>();

    pedidos.forEach(pedido => {
      const nome = pedido.nomeCliente.trim();
      if (!clientesMap.has(nome)) {
        clientesMap.set(nome, {
          id: clientesMap.size + 1,
          nome: nome,
          totalPedidos: 0,
          totalGasto: 0,
          primeiroPedido: new Date(pedido.data),
          ultimoPedido: new Date(pedido.data)
        });
      }

      const cliente = clientesMap.get(nome)!;
      cliente.totalPedidos += 1;
      cliente.totalGasto += pedido.total;
      
      const dataPedido = new Date(pedido.data);
      if (dataPedido < cliente.primeiroPedido) {
        cliente.primeiroPedido = dataPedido;
      }
      if (dataPedido > cliente.ultimoPedido) {
        cliente.ultimoPedido = dataPedido;
      }
    });

    const clientesArray = Array.from(clientesMap.values());
    this.clientes.next(clientesArray);
  }

  getAll(): Cliente[] {
    return this.clientes.getValue();
  }

  getTotalAtivos(): number {
    const ultimos30Dias = new Date();
    ultimos30Dias.setDate(ultimos30Dias.getDate() - 30);
    return this.getAll().filter(c => c.ultimoPedido >= ultimos30Dias).length;
  }
}

