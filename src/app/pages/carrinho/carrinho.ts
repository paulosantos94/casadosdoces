import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe, DecimalPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CarrinhoService } from '../../services/carrinho';
import { PedidosService } from '../../services/pedidos';
import { ProdutosService } from '../../services/produtos';
import { ToastService } from '../../services/toast.service';
import { ItemCarrinho } from '../../models/item-carrinho.model';

@Component({
  selector: 'app-carrinho',
  standalone: true,
  imports: [CommonModule, RouterModule, CurrencyPipe, DecimalPipe, FormsModule],
  templateUrl: './carrinho.html',
  styleUrl: './carrinho.css',
})
export class Carrinho implements OnInit {
  itens: ItemCarrinho[] = [];
  total: number = 0;
  nomeCliente: string = '';

  constructor(
    private carrinhoService: CarrinhoService,
    private pedidosService: PedidosService,
    private produtosService: ProdutosService,
    private toastService: ToastService
  ) {
    carrinhoService.setProdutosService(produtosService);
  }

  ngOnInit(): void {
    this.carrinhoService.carrinho$.subscribe(itens => {
      this.itens = itens;
      this.total = this.carrinhoService.getTotal();
    });

    // Carregar nome salvo
    const nomeSalvo = localStorage.getItem('cliente_nome_casinha');
    if (nomeSalvo) {
      this.nomeCliente = nomeSalvo;
    }
  }

  alterarQuantidade(item: ItemCarrinho, novaQuantidade: number): void {
    if (novaQuantidade < 1) {
      this.removerProduto(item.produto.id);
      return;
    }

    const resultado = this.carrinhoService.alterarQuantidade(item.produto.id, novaQuantidade);
    
    if (!resultado.success && resultado.message) {
      this.toastService.error(resultado.message);
      // Reverter para quantidade máxima disponível
      const produto = this.produtosService.getById(item.produto.id);
      if (produto && item.quantidade > produto.quantidade) {
        this.carrinhoService.alterarQuantidade(item.produto.id, produto.quantidade);
      }
    }
  }

  getQuantidadeMaxima(produtoId: number): number {
    const produto = this.produtosService.getById(produtoId);
    return produto ? produto.quantidade : 0;
  }

  removerProduto(produtoId: number): void {
    this.carrinhoService.removerProduto(produtoId);
    this.toastService.info('Item removido do carrinho');
  }

  finalizarPedido(): void {
    if (this.itens.length === 0) {
      this.toastService.error('Seu carrinho está vazio!');
      return;
    }

    if (!this.nomeCliente || this.nomeCliente.trim() === '') {
      this.toastService.error('Por favor, informe seu nome para finalizar o pedido.');
      return;
    }

    // Criar pedido no sistema
    const nome = this.nomeCliente.trim();
    
    // Salvar nome no localStorage
    localStorage.setItem('cliente_nome_casinha', nome);
    
    this.pedidosService.criarPedido(nome, [...this.itens], this.total);

    // Número do WhatsApp - Casinha dos Doces
    const numeroWhatsApp = '5589988174851';
    
    // Montar mensagem do pedido
    let mensagem = '🍰 *NOVO PEDIDO - Casinha dos Doces*\n\n';
    mensagem += `*Cliente:* ${nome}\n\n`;
    mensagem += '*Itens do Pedido:*\n\n';
    
    this.itens.forEach((item, index) => {
      mensagem += `${index + 1}. *${item.produto.nome}*\n`;
      mensagem += `   Quantidade: ${item.quantidade}x\n`;
      mensagem += `   Preço unitário: R$ ${item.produto.preco.toFixed(2)}\n`;
      mensagem += `   Subtotal: R$ ${(item.produto.preco * item.quantidade).toFixed(2)}\n\n`;
    });
    
    mensagem += `*TOTAL: R$ ${this.total.toFixed(2)}*\n\n`;
    mensagem += 'Por favor, confirme o pedido e informe o endereço de entrega. Obrigado! 💗';
    
    // Codificar mensagem para URL
    const mensagemEncoded = encodeURIComponent(mensagem);
    
    // Criar link do WhatsApp
    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensagemEncoded}`;
    
    // Limpar carrinho
    this.carrinhoService.limparCarrinho();
    
    // Abrir WhatsApp
    window.open(urlWhatsApp, '_blank');
    
    this.toastService.success('Pedido enviado com sucesso! Você será redirecionado para o WhatsApp.');
  }

  limparCarrinho(): void {
    this.carrinhoService.limparCarrinho();
    this.toastService.info('Carrinho limpo');
  }
}
