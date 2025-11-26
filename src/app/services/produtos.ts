import { Injectable } from '@angular/core';
import { Produto } from '../models/produto.model';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {
  private storageKey = 'produtos_casinha';

  constructor() {
    this.seedIfEmpty();
  }

  private seedIfEmpty() {
    const all = this.getAll();
    if (!all || all.length === 0) {
      const seed: Produto[] = [
        { id: 1, nome: 'Bombom Sortido', descricao: 'Bombons artesanais', preco: 4.5, quantidade: 30, categoria: 'bombons', imagemBase64: '', ativo: true },
        { id: 2, nome: 'Bolo de Chocolate', descricao: 'Bolo caseiro', preco: 45.0, quantidade: 10, categoria: 'bolos', imagemBase64: '', ativo: true }
      ];
      localStorage.setItem(this.storageKey, JSON.stringify(seed));
    }
  }

  private nextId(items: Produto[]): number {
    if (!items || items.length === 0) return 1;
    return Math.max(...items.map(i => i.id ?? 0)) + 1;
  }

  getAll(): Produto[] {
    const raw = localStorage.getItem(this.storageKey);
    return raw ? JSON.parse(raw) as Produto[] : [];
  }

  getById(id: number): Produto | undefined {
    return this.getAll().find(p => p.id === id);
  }

  create(produto: Partial<Produto>): Produto {
    const items = this.getAll();
    const newItem: Produto = {
      id: this.nextId(items),
      nome: produto.nome || 'Novo Produto',
      descricao: produto.descricao || '',
      preco: produto.preco ?? 0,
      quantidade: produto.quantidade ?? 0,
      categoria: produto.categoria || '',
      imagemBase64: produto.imagemBase64 || '',
      ativo: produto.ativo ?? true
    };
    items.push(newItem);
    localStorage.setItem(this.storageKey, JSON.stringify(items));
    return newItem;
  }

  update(id: number, changes: Partial<Produto>): Produto | undefined {
    const items = this.getAll();
    const idx = items.findIndex(p => p.id === id);
    if (idx === -1) return undefined;
    items[idx] = { ...items[idx], ...changes };
    localStorage.setItem(this.storageKey, JSON.stringify(items));
    return items[idx];
  }

  delete(id: number): boolean {
    let items = this.getAll();
    const before = items.length;
    items = items.filter(p => p.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(items));
    return items.length < before;
  }

  changeQuantity(id: number, quantidade: number) {
    return this.update(id, { quantidade });
  }

  search(term: string): Produto[] {
    term = term?.toLowerCase() || '';
    return this.getAll().filter(p =>
      p.nome.toLowerCase().includes(term) || (p.categoria || '').toLowerCase().includes(term)
    );
  }
}
