import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

// Decorator que torna o serviço disponível em todo o app (singleton)
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  
  constructor(private router: Router) {}

  // Método chamado pelo Angular Router para decidir se uma rota pode ser ativada
  canActivate(): boolean {
    // Verifica se existe um token válido na sessionStorage (simulando autenticação simples)
    const token = sessionStorage.getItem('token');
    
    // Se token é 'admin321', permite acesso à rota
    if (token === 'admin321') return true;

    // Caso contrário, redireciona para a página de login
    this.router.navigate(['/login']);

    // Bloqueia a ativação da rota
    return false;
  }
}
