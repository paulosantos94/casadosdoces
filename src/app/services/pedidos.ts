import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Pedido } from '../models/pedido.model';
import { ItemCarrinho } from '../models/item-carrinho.model';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {
  private storageKey = 'pedidos_casinha';
  private pedidos: BehaviorSubject<Pedido[]>;
  public pedidos$: Observable<Pedido[]>;

  constructor() {
    this.pedidos = new BehaviorSubject<Pedido[]>([]);
    this.pedidos$ = this.pedidos.asObservable();
    this.loadFromStorage();
  }

  private loadFromStorage() {
    const raw = localStorage.getItem(this.storageKey);
    const items = raw ? JSON.parse(raw).map((p: any) => ({
      ...p,
      data: new Date(p.data)
    })) : [];
    this.pedidos.next(items);
  }

  private saveToStorage(items: Pedido[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(items));
    this.pedidos.next(items);
  }

  private nextId(items: Pedido[]): number {
    if (!items || items.length === 0) return 1;
    return Math.max(...items.map(i => i.id ?? 0)) + 1;
  }

  criarPedido(nomeCliente: string, itens: ItemCarrinho[], total: number): Pedido {
    const items = this.pedidos.getValue();
    const novoPedido: Pedido = {
      id: this.nextId(items),
      nomeCliente,
      itens,
      total,
      data: new Date(),
      status: 'pendente'
    };
    items.push(novoPedido);
    this.saveToStorage(items);
    return novoPedido;
  }

  getAll(): Pedido[] {
    return this.pedidos.getValue();
  }

  getById(id: number): Pedido | undefined {
    return this.getAll().find(p => p.id === id);
  }

  getPedidosHoje(): Pedido[] {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    return this.getAll().filter(p => {
      const dataPedido = new Date(p.data);
      dataPedido.setHours(0, 0, 0, 0);
      return dataPedido.getTime() === hoje.getTime();
    });
  }

  updateStatus(id: number, status: Pedido['status']): Pedido | undefined {
    const items = this.getAll();
    const idx = items.findIndex(p => p.id === id);
    if (idx === -1) return undefined;
    items[idx] = { ...items[idx], status };
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
}

