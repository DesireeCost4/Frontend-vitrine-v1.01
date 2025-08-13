import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HttpClient, HttpClientModule } from '@angular/common/http'; // IMPORTANTE para fazer requisições HTTP

@Component({
  selector: 'app-cat-accessories',
  // Importa módulos necessários para o componente standalone funcionar corretamente
  imports: [CommonModule, RouterModule, HttpClientModule], 
  templateUrl: './cat-accessories.component.html',
  styleUrl: './cat-accessories.component.css' // CSS específico para este componente
})
export class CatAccessoriesComponent implements OnInit {
  
  produtos: any[] = [];        // Array que armazenará os produtos filtrados pela categoria
  @Input() limit?: number;     // Recebe opcionalmente um limite de itens para mostrar, via input do componente
  categoria = 'Acessorio';     // Categoria fixa para este componente (acessórios)

  constructor(private http: HttpClient) {} // Injeta HttpClient para chamadas HTTP

  // Função para normalizar texto, deixando tudo em minúsculo e sem acentos para facilitar comparação
  normalizeText(text: string): string {
    return text.toLowerCase()
      .normalize('NFD')               // Decompõe caracteres acentuados em partes (ex: á -> a + ´)
      .replace(/[\u0300-\u036f]/g, ''); // Remove os acentos, deixando só letras base
  }

  // Método do ciclo de vida do Angular que roda após criação do componente
  ngOnInit() {
    // Faz uma requisição GET para pegar todos os produtos do backend
    this.http.get<any[]>('https://trunk-vendas.onrender.com/produtos').subscribe(data => {
      // Define quais nomes de categoria são considerados válidos para este componente (normalizados)
      const filtroCategoriasAceitas = ['acessorio', 'acessorios'];

      this.produtos = data
        // Filtra apenas os produtos cuja categoria (normalizada) está dentro do filtro
        .filter(produto => 
          filtroCategoriasAceitas.includes(this.normalizeText(produto.categoria))
        )
        // Aplica o limite opcional de produtos, se informado
        .slice(0, this.limit);
    });
  }

  // Gera o link para WhatsApp com mensagem personalizada para cada produto
  gerarLinkWhatsApp(produto: any): string {
    // Mensagem padrão com nome e preço do produto
    const mensagem = `Olá! Gostaria de pedir o produto: ${produto.nome}, no valor de R$ ${produto.preco}`;
    // Número do WhatsApp da loja (deve estar no formato internacional sem o '+')
    const numero = '5583991898632';
    // Retorna a URL formatada para abrir a conversa no WhatsApp com a mensagem codificada
    return `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
  }
}
