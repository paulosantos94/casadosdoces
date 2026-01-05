import { Injectable, Inject, Optional } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ItemCarrinho } from '../models/item-carrinho.model';
import { Produto } from '../models/produto.model';
import { ProdutosService } from './produtos';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {
  private storageKey = 'carrinho_casinha';
  private carrinho: BehaviorSubject<ItemCarrinho[]>;
  public carrinho$: Observable<ItemCarrinho[]>;
  private produtosService: ProdutosService | null = null;

  constructor() {
    this.carrinho = new BehaviorSubject<ItemCarrinho[]>([]);
    this.carrinho$ = this.carrinho.asObservable();
    this.loadFromStorage();
  }

  public setProdutosService(service: ProdutosService) {
    this.produtosService = service;
  }

  private getEstoqueDisponivel(produtoId: number): number {
    if (!this.produtosService) return 999999; // Fallback se serviço não estiver disponível
    const produto = this.produtosService.getById(produtoId);
    return produto ? produto.quantidade : 0;
  }

  private getQuantidadeNoCarrinho(produtoId: number, items: ItemCarrinho[]): number {
    const item = items.find(i => i.produto.id === produtoId);
    return item ? item.quantidade : 0;
  }

  private loadFromStorage() {
    const raw = localStorage.getItem(this.storageKey);
    const items = raw ? JSON.parse(raw) as ItemCarrinho[] : [];
    this.carrinho.next(items);
  }

  private saveToStorage(items: ItemCarrinho[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(items));
    this.carrinho.next(items);
  }

  adicionarProduto(produto: Produto, quantidade: number = 1): { success: boolean; message?: string } {
    const items = this.carrinho.getValue();
    const estoqueDisponivel = this.getEstoqueDisponivel(produto.id);
    const quantidadeAtual = this.getQuantidadeNoCarrinho(produto.id, items);
    const novaQuantidade = quantidadeAtual + quantidade;

    if (novaQuantidade > estoqueDisponivel) {
      return {
        success: false,
        message: `Estoque insuficiente! Disponível: ${estoqueDisponivel} unidades.`
      };
    }

    const existingItem = items.find(item => item.produto.id === produto.id);

    if (existingItem) {
      existingItem.quantidade = novaQuantidade;
    } else {
      items.push({ produto, quantidade });
    }

    this.saveToStorage(items);
    return { success: true };
  }

  removerProduto(produtoId: number): void {
    const items = this.carrinho.getValue().filter(item => item.produto.id !== produtoId);
    this.saveToStorage(items);
  }

  alterarQuantidade(produtoId: number, quantidade: number): { success: boolean; message?: string } {
    if (quantidade <= 0) {
      this.removerProduto(produtoId);
      return { success: true };
    }

    const estoqueDisponivel = this.getEstoqueDisponivel(produtoId);
    
    if (quantidade > estoqueDisponivel) {
      return {
        success: false,
        message: `Estoque insuficiente! Disponível: ${estoqueDisponivel} unidades.`
      };
    }

    const items = this.carrinho.getValue();
    const item = items.find(i => i.produto.id === produtoId);
    
    if (item) {
      item.quantidade = quantidade;
      this.saveToStorage(items);
      return { success: true };
    }

    return { success: false, message: 'Item não encontrado no carrinho.' };
  }

  limparCarrinho(): void {
    this.saveToStorage([]);
  }

  getItens(): ItemCarrinho[] {
    return this.carrinho.getValue();
  }

  getTotal(): number {
    return this.carrinho.getValue().reduce((total, item) => {
      return total + (item.produto.preco * item.quantidade);
    }, 0);
  }

  getTotalItens(): number {
    return this.carrinho.getValue().reduce((total, item) => total + item.quantidade, 0);
  }

  estaVazio(): boolean {
    return this.carrinho.getValue().length === 0;
  }
}

