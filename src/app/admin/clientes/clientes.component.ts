import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ClientesService } from '../../services/clientes';
import { Cliente } from '../../models/cliente.model';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, CurrencyPipe, DatePipe],
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[] = [];
  filtro = '';

  constructor(private clientesService: ClientesService) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.clientesService.clientes$.subscribe(clientes => {
      this.clientes = clientes.sort((a, b) => b.totalGasto - a.totalGasto);
      this.aplicarFiltro();
    });
  }

  aplicarFiltro() {
    if (!this.filtro) {
      this.load();
      return;
    }
    const termo = this.filtro.toLowerCase();
    this.clientes = this.clientesService.getAll().filter(c => 
      c.nome.toLowerCase().includes(termo)
    ).sort((a, b) => b.totalGasto - a.totalGasto);
  }
}

