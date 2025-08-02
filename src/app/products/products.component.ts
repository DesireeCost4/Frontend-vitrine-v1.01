import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';        // Importa funcionalidades comuns do Angular
import { RouterModule } from '@angular/router';        // Importa para navegação entre rotas

import { HttpClient, HttpClientModule } from '@angular/common/http';  // Para fazer requisições HTTP
import { CatSupplementsComponent } from "../cat-supplements/cat-supplements.component";
import { CatClothesComponent } from "../cat-clothes/cat-clothes.component";
import { CatShoesComponent } from "../cat-shoes/cat-shoes.component";
import { CatAccessoriesComponent } from "../cat-accessories/cat-accessories.component";  // Importa componentes categoria
import { CardComponent } from '../card/card.component';                      // Componente para exibir produtos em card
import { CatDestaquesComponent } from "../cat-destaques/cat-destaques.component";

@Component({
  selector: 'app-products',   // Nome do seletor para usar em HTML
  standalone: true,           // Componente standalone para não depender de módulo
  // Importa os módulos necessários e componentes usados dentro do template deste componente
  imports: [
    CommonModule, 
    RouterModule, 
    HttpClientModule, 
    CatSupplementsComponent, 
    CatClothesComponent, 
    CatShoesComponent, 
    CatAccessoriesComponent, 
    CardComponent, 
    CatDestaquesComponent
  ],
  templateUrl: './products.component.html',  // Template HTML externo
  styleUrls: ['./products.component.css']    // Arquivo CSS externo
})
export class ProductsComponent implements OnInit {  // Implementa o ciclo de vida OnInit

  produtos: any[] = [];        // Array para armazenar produtos carregados da API
  todosProdutos: any[] = [];   // Array para armazenar todos os produtos, caso queira usar depois

  // Injeta HttpClient para fazer requisições HTTP
  constructor(private http: HttpClient) {}

  // Método executado quando o componente é inicializado
  ngOnInit() {
    // Requisição GET para buscar todos os produtos do backend
    this.http.get<any[]>('hhttps://trunk-vendas.onrender.com/produtos').subscribe({
      next: (res) => {
        this.produtos = res;    // Salva os produtos recebidos na variável local
      },
      error: (err) => {
        console.error('Erro ao buscar produtos:', err);  // Loga erro no console se houver falha
      }
    });
  }

  // Método para gerar link do WhatsApp com mensagem pronta para compra do produto
  gerarLinkWhatsApp(produto: any): string {
    // Monta mensagem simples com nome e preço do produto
    const mensagem = `Olá! Gostaria de pedir o produto: ${produto.nome}, no valor de R$ ${produto.preco}`;
    const numero = '5583999999999'; // Número de telefone da loja para receber pedidos (substituir pelo real)
    // Retorna URL completa com texto codificado para abrir WhatsApp direto no número com a mensagem
    return `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
  }
}
