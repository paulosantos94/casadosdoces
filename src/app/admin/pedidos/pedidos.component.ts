import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe, CurrencyPipe, DecimalPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PedidosService } from '../../services/pedidos';
import { Pedido } from '../../models/pedido.model';

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, DatePipe, CurrencyPipe, DecimalPipe],
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {
  pedidos: Pedido[] = [];
  filtro = '';
  statusFiltro: 'todos' | 'pendente' | 'confirmado' | 'entregue' | 'cancelado' = 'todos';

  constructor(private pedidosService: PedidosService) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.pedidosService.pedidos$.subscribe(pedidos => {
      this.pedidos = pedidos.sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());
      this.aplicarFiltros();
    });
  }

  aplicarFiltros() {
    let pedidosFiltrados = this.pedidosService.getAll();
    
    if (this.filtro) {
      const termo = this.filtro.toLowerCase();
      pedidosFiltrados = pedidosFiltrados.filter(p => 
        p.nomeCliente.toLowerCase().includes(termo) ||
        p.id.toString().includes(termo)
      );
    }
    
    if (this.statusFiltro !== 'todos') {
      pedidosFiltrados = pedidosFiltrados.filter(p => p.status === this.statusFiltro);
    }
    
    this.pedidos = pedidosFiltrados.sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());
  }

  alterarStatus(id: number, novoStatus: Pedido['status']) {
    this.pedidosService.updateStatus(id, novoStatus);
    this.load();
  }

  excluir(id: number) {
    if (!confirm('Deseja realmente excluir este pedido?')) return;
    this.pedidosService.delete(id);
    this.load();
  }

  getStatusClass(status: string): string {
    const classes: { [key: string]: string } = {
      'pendente': 'status-pendente',
      'confirmado': 'status-confirmado',
      'entregue': 'status-entregue',
      'cancelado': 'status-cancelado'
    };
    return classes[status] || '';
  }
}

