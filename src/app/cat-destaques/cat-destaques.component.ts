import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-cat-destaques',
  standalone: true, 
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './cat-destaques.component.html',
  styleUrl: './cat-destaques.component.css'
})
export class CatDestaquesComponent implements OnInit {
  @Input() limit?: number;

  produtos: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('https://trunk-vendas.onrender.com/produtos').subscribe(data => {
      this.produtos = data
        .sort((a, b) => b.id - a.id) // ordena do mais novo (maior id) para o mais antigo
        .slice(0, this.limit); // aplica o limite
    });
  }

  gerarLinkWhatsApp(produto: any): string {
    const numero = '5583999999999';
    const mensagem = `Olá! Gostaria de pedir o produto: ${produto.nome}, no valor de R$ ${produto.preco}`;
    return `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
  }
}
