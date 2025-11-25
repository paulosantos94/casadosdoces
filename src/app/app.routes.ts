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
import { Produtos } from './pages/produtos/produtos';  // <-- AQUI ESTAVA ERRADO

// ADMIN
import { LoginComponent } from './admin/login/login';
import { Dashboard } from './admin/dashboard/dashboard';
import { ProdutosService } from './admin/produtos/produtos'; // ADMIN DE PRODUTOS

export const routes: Routes = [
  { path: '', component: HomeComponent },

  { path: 'produtos', component: Produtos }, // <-- AGORA FUNCIONA!

  // Categorias
  { path: 'bolos', component: Bolos },
  { path: 'bombons', component: Bombons },
  { path: 'pudins', component: Pudins },
  { path: 'cupcakes', component: Cupcakes },
  { path: 'cookies', component: Cookies },

  // Admin
  { path: 'admin', component: LoginComponent },
  { path: 'admin/dashboard', component: Dashboard },
  { path: 'admin/produtos', component: ProdutosService },

  { path: 'carrinho', component: Carrinho },

  // rota inválida
  { path: '**', redirectTo: '' }
];
