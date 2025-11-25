import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // 👈 IMPORTANTE

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule], // 👈 ADICIONE AQUI
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  email = '';
  senha = '';
  erro = '';

  constructor(private router: Router) {}

  login() {
    if (this.email === 'teste@gmail.com' && this.senha === '123456') {
      localStorage.setItem('admin', 'logado');
      this.router.navigate(['/admin/dashboard']);
    } else {
      this.erro = 'Email ou senha incorretos!';
    }
  }
}
