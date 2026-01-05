import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Produto } from '../models/produto.model';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {
  private storageKey = 'produtos_casinha';
  private produtos: BehaviorSubject<Produto[]>;
  public produtos$: Observable<Produto[]>;

  constructor() {
    this.produtos = new BehaviorSubject<Produto[]>([]);
    this.produtos$ = this.produtos.asObservable();
    this.seedIfEmpty();
    this.loadFromStorage();
  }

  private loadFromStorage() {
    const raw = localStorage.getItem(this.storageKey);
    const items = raw ? JSON.parse(raw) as Produto[] : [];
    this.produtos.next(items);
  }

  private saveToStorage(items: Produto[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(items));
    this.produtos.next(items);
  }

  private seedIfEmpty() {
    const raw = localStorage.getItem(this.storageKey);
    if (!raw || JSON.parse(raw).length === 0) {
      const seed: Produto[] = [
        { id: 1, nome: 'Bombom Sortido', descricao: 'Bombons artesanais', preco: 4.5, quantidade: 30, categoria: 'bombons', imagemBase64: '', ativo: true },
        { id: 2, nome: 'Bolo de Chocolate', descricao: 'Bolo caseiro', preco: 45.0, quantidade: 10, categoria: 'bolos', imagemBase64: '', ativo: true }
      ];
      this.saveToStorage(seed);
    }
  }

  private nextId(items: Produto[]): number {
    if (!items || items.length === 0) return 1;
    return Math.max(...items.map(i => i.id ?? 0)) + 1;
  }

  getAll(): Produto[] {
    return this.produtos.getValue();
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
    this.saveToStorage(items);
    return newItem;
  }

  update(id: number, changes: Partial<Produto>): Produto | undefined {
    const items = this.getAll();
    const idx = items.findIndex(p => p.id === id);
    if (idx === -1) return undefined;
    items[idx] = { ...items[idx], ...changes };
    this.saveToStorage(items);
    return items[idx];
  }

  delete(id: number): boolean {
    let items = this.getAll();
    const before = items.length;
    items = items.filter(p => p.id !== id);
    this.saveToStorage(items);
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
