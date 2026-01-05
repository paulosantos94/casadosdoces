import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

// IMPORTS NECESSÁRIOS
import { NgFor, NgIf, DecimalPipe, TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProdutosService } from '../../services/produtos';
import { Produto } from '../../models/produto.model';

@Component({
  selector: 'app-produtos-admin',
  standalone: true,
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css'],
  imports: [
    NgFor,
    NgIf,
    FormsModule,
    DecimalPipe,
    TitleCasePipe,
    RouterModule
  ]
})
export class ProdutosComponent implements OnInit {

  produtos: Produto[] = [];
  filtro = '';

  constructor(
    private produtosService: ProdutosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.produtos = this.produtosService.getAll();
  }

  novo() {
    this.router.navigate(['/admin/produto-form']);
  }

  editar(id: number) {
    this.router.navigate(['/admin/produto-form', id]);
  }

  excluir(id: number) {
    if (!confirm('Deseja realmente excluir este produto?')) return;
    this.produtosService.delete(id);
    this.load();
  }

  aplicarFiltro() {
    if (!this.filtro) return this.load();
    this.produtos = this.produtosService.search(this.filtro);
  }
}
