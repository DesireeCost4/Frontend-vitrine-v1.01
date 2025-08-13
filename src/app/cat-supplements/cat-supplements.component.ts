import { Component, OnInit, Input } from '@angular/core'; // Componentes Angular básicos e decorator Input para receber dados de componente pai
import { CommonModule } from '@angular/common'; // Módulo Angular comum para diretivas como *ngIf, *ngFor
import { RouterModule } from '@angular/router'; // Para navegação/link dentro da aplicação Angular
import { HttpClient, HttpClientModule } from '@angular/common/http'; // Cliente HTTP para fazer requisições à API REST (importante para pegar os produtos)

@Component({
  selector: 'app-cat-supplements', // Nome do componente para uso em templates HTML <app-cat-supplements>
  imports: [CommonModule, RouterModule, HttpClientModule], // Importa módulos usados dentro do template e lógica do componente
  templateUrl: './cat-supplements.component.html', // Arquivo HTML com a estrutura visual do componente
  styleUrl: './cat-supplements.component.css' // Arquivo CSS para estilização específica do componente
})
export class CatSupplementsComponent implements OnInit  {
  @Input() limit?: number; // Recebe opcionalmente a quantidade máxima de produtos a mostrar (exemplo: 5 produtos)
  @Input() smallCards: boolean = false; // Recebe um boolean para controlar se os cards serão pequenos (estilização condicional)

  produtos: any[] = []; // Array para armazenar os produtos filtrados da categoria "Suplemento"

  categoria = 'Suplemento'; // Categoria fixa para filtrar produtos

  constructor(private http: HttpClient) {} // Injeta o HttpClient para chamadas HTTP

  // Função para normalizar texto, útil para comparar categorias ignorando maiúsculas e acentos
  normalizeText(text: string): string {
    return text.toLowerCase()                   // deixa tudo minúsculo para comparação case-insensitive
      .normalize('NFD')                         // separa os caracteres acentuados em base + acento
      .replace(/[\u0300-\u036f]/g, '');        // remove os acentos efetivamente, deixando só a base
  }

  // Método do ciclo de vida Angular que roda quando o componente é inicializado
  ngOnInit() {
    // Requisição HTTP GET para pegar todos os produtos da API local
    this.http.get<any[]>('https://trunk-vendas.onrender.com/produtos').subscribe(data => {
      // Array com as categorias consideradas como suplemento (normalizadas)
      const filtroCategoriasAceitas = ['suplemento', 'suplementos'];

      // Filtra os produtos recebidos para manter apenas os que pertencem à categoria suplemento
      this.produtos = data
        .filter(produto => 
          filtroCategoriasAceitas.includes(this.normalizeText(produto.categoria))
        )
        .slice(0, this.limit); // Limita o número de produtos exibidos, se for passado o limit
    });
  }

  // Método para gerar um link direto para WhatsApp com uma mensagem pré-formatada para pedido
  gerarLinkWhatsApp(produto: any): string {
    const mensagem = `Olá! Gostaria de pedir o produto: ${produto.nome}, no valor de R$ ${produto.preco}`;
    const numero = '5583991898632'; // Número do WhatsApp da loja
    // Monta a URL do WhatsApp com o texto da mensagem codificado para URL
    return `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
  }
}
