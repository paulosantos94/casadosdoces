import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProdutosService } from '../../services/produtos';
import { PedidosService } from '../../services/pedidos';
import { ClientesService } from '../../services/clientes';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

  produtosCadastrados = 0;
  pedidosHoje = 0;
  clientesAtivos = 0;

  constructor(
    private produtosService: ProdutosService,
    private pedidosService: PedidosService,
    private clientesService: ClientesService
  ) {}

  ngOnInit(): void {
    this.produtosService.produtos$.subscribe(produtos => {
      this.produtosCadastrados = produtos.length;
    });

    this.pedidosService.pedidos$.subscribe(() => {
      this.pedidosHoje = this.pedidosService.getPedidosHoje().length;
    });

    this.clientesService.clientes$.subscribe(() => {
      this.clientesAtivos = this.clientesService.getTotalAtivos();
    });
  }

}
