import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CarrinhoService } from '../../services/carrinho';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  totalItens = 0;

  constructor(private carrinhoService: CarrinhoService) {}

  ngOnInit(): void {
    this.carrinhoService.carrinho$.subscribe(() => {
      this.totalItens = this.carrinhoService.getTotalItens();
    });
  }
}