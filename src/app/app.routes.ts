import { Routes } from '@angular/router';

// PÁGINAS
import { HomeComponent } from './pages/home/home.component';
import { Carrinho } from './pages/carrinho/carrinho';

// CATEGORIAS
import { Bolos } from './pages/bolos/bolos';
import { Bombons } from './pages/bombons/bombons';
import { Pudins } from './pages/pudins/pudins';
import { Cupcakes } from './pages/cupcakes/cupcakes';
import { Cookies } from './pages/cookies/cookies';

// PRODUTOS (CARDÁPIO)
import { Produtos } from './pages/produtos/produtos';

// ADMIN
import { LoginComponent } from './admin/login/login';
import { DashboardComponent } from './admin/dashboard/dashboard.component';

// PRODUTOS ADMIN
import { ProdutosComponent } from './admin/produtos/produtos.component';
import { ProdutoFormComponent } from './admin/produto-form/produto-form.component';

// PEDIDOS E CLIENTES ADMIN
import { PedidosComponent } from './admin/pedidos/pedidos.component';
import { ClientesComponent } from './admin/clientes/clientes.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'produtos', component: Produtos },

  // Categorias
  { path: 'bolos', component: Bolos },
  { path: 'bombons', component: Bombons },
  { path: 'pudins', component: Pudins },
  { path: 'cupcakes', component: Cupcakes },
  { path: 'cookies', component: Cookies },

  // Admin
  { path: 'admin', component: LoginComponent },
  { path: 'admin/dashboard', component: DashboardComponent },

  // Administração de Produtos
  { path: 'admin/produtos', component: ProdutosComponent },
  { path: 'admin/produto-form', component: ProdutoFormComponent },
  { path: 'admin/produto-form/:id', component: ProdutoFormComponent },

  // Administração de Pedidos e Clientes
  { path: 'admin/pedidos', component: PedidosComponent },
  { path: 'admin/clientes', component: ClientesComponent },

  // Outros
  { path: 'carrinho', component: Carrinho },

  { path: '**', redirectTo: '' }
];
