import { Injectable } from '@angular/core';

export interface Produto {
  id: number;
  nome: string;
  preco: number;
  imagem: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  private produtos: Produto[] = [
    { id: 1, nome: 'Bolo de Chocolate', preco: 45, imagem: 'bolo-chocolate.jpg' },
    { id: 2, nome: 'Bombom de Morango', preco: 3, imagem: 'bombom-morango.jpg' },
  ];

  listar() {
    return this.produtos;
  }

  adicionar(produto: Produto) {
    produto.id = Date.now();
    this.produtos.push(produto);
  }

  remover(id: number) {
    this.produtos = this.produtos.filter(p => p.id !== id);
  }
}
