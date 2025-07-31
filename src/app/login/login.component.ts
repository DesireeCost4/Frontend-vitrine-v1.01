import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';  // Para requisições HTTP
import { Router } from '@angular/router';           // Para navegação entre páginas
import { FormsModule } from '@angular/forms';       // Importa FormsModule para usar ngModel no template

@Component({
  standalone: true,                                // Componente standalone (sem módulo)
  selector: 'app-login',                           // Selector para usar no HTML
  templateUrl: './login.component.html',          // Template HTML externo
  styleUrls: ['./login.component.css'],           // Estilos CSS externos
  imports: [FormsModule],                          // Declara import do FormsModule para usar em template
})
export class LoginComponent {
  // Variáveis para ligação bidirecional com o template (formulário)
  email = '';
  senha = '';
  mensagemErro = '';  // Mensagem para mostrar erros no login

  // Injeta HttpClient para fazer chamadas HTTP e Router para navegação
  constructor(private http: HttpClient, private router: Router) {}

  // Método chamado no submit do formulário para tentar o login
  logar() {
    this.mensagemErro = '';  // Limpa mensagem de erro ao tentar logar

    // Validação simples para evitar campos vazios
    if (!this.email.trim() || !this.senha.trim()) {
      this.mensagemErro = 'Preencha e-mail e senha.';
      return;  // Sai sem fazer requisição se campos vazios
    }

    // Monta o objeto payload com email e senha para enviar na requisição POST
    const payload = { email: this.email, senha: this.senha };

    // Faz requisição para backend de login, esperando receber um token JWT
    this.http.post<{ token: string }>('http://localhost:5000/login', payload).subscribe({
      next: (res) => {
        // Se login for autorizado, grava o token na sessionStorage
        console.log('Token recebido:', res.token);
        sessionStorage.setItem('token', res.token);

        // Navega para a rota /admin após login bem sucedido
        this.router.navigate(['/admin']).then(success => {
          console.log('Navegação para /admin:', success);
        }).catch(err => {
          console.error('Erro na navegação:', err);
        });
      },
      error: () => {
        // Caso backend retorne erro (credenciais inválidas), mostra mensagem para o usuário
        this.mensagemErro = 'E-mail ou senha incorretos.';
      }
    });
  }
}
