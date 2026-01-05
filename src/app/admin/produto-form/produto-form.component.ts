import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Produto } from '../../models/produto.model';
import { ProdutosService } from '../../services/produtos';

@Component({
  selector: 'app-produto-form',
  standalone: true,
  templateUrl: './produto-form.component.html',
  styleUrls: ['./produto-form.component.css'],
  imports: [NgIf, FormsModule, RouterModule]
})
export class ProdutoFormComponent implements OnInit {

  produto: Produto = {
    id: 0,
    nome: '',
    descricao: '',
    preco: 0,
    categoria: '',
    quantidade: 0,
    imagemBase64: '',
    ativo: true
  };

  editando = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private produtosService: ProdutosService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (id) {
      this.editando = true;
      const p = this.produtosService.getById(id);
      if (p) this.produto = { ...p };
    }
  }

  salvar() {
    if (this.editando) {
      this.produtosService.update(this.produto.id, this.produto);
    } else {
      this.produtosService.create(this.produto);
    }

    this.router.navigate(['/admin/produtos']);
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.produto.imagemBase64 = e.target.result;
      };

      reader.readAsDataURL(file);
    }
  }
}
