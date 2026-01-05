import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Produto } from '../../models/produto.model';
import { ProdutosService } from '../../services/produtos';
import { CarrinhoService } from '../../services/carrinho';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-pudins',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './pudins.html',
  styleUrls: ['./pudins.css']
})
export class Pudins implements OnInit {
  produtos: Produto[] = [];
  totalItens = 0;
  produtoAdicionado: number | null = null;

  constructor(
    private produtosService: ProdutosService,
    private carrinhoService: CarrinhoService,
    private toastService: ToastService
  ) {
    carrinhoService.setProdutosService(produtosService);
  }

  ngOnInit(): void {
    this.produtosService.produtos$.subscribe(produtos => {
      this.produtos = produtos.filter(p => p.categoria === 'pudins' && p.ativo);
    });
    
    this.carrinhoService.carrinho$.subscribe(() => {
      this.totalItens = this.carrinhoService.getTotalItens();
    });
  }

  adicionarAoCarrinho(produto: Produto): void {
    const resultado = this.carrinhoService.adicionarProduto(produto, 1);
    
    if (resultado.success) {
      this.produtoAdicionado = produto.id;
      this.toastService.success(`${produto.nome} adicionado ao carrinho!`);
      
      setTimeout(() => {
        this.produtoAdicionado = null;
      }, 600);
    } else {
      this.toastService.error(resultado.message || 'Não foi possível adicionar ao carrinho.');
    }
  }
}
