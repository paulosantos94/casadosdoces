import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CarrinhoService } from '../../services/carrinho';

@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './produtos.html',
  styleUrls: ['./produtos.css']
})
export class Produtos implements OnInit {
  totalItens = 0;

  constructor(private carrinhoService: CarrinhoService) {}

  ngOnInit(): void {
    this.carrinhoService.carrinho$.subscribe(() => {
      this.totalItens = this.carrinhoService.getTotalItens();
    });
  }
}
