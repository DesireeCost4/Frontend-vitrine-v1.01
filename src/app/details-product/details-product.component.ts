import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';  // Importa para capturar parâmetros da rota (ex: id do produto)
import { HttpClient, HttpClientModule } from '@angular/common/http';  // Importa para fazer requisições HTTP à API
import { CommonModule } from '@angular/common';  // Importa módulo comum do Angular (diretivas básicas)

@Component({
  selector: 'app-details-product',  // Selector para usar esse componente em templates
  templateUrl: './details-product.component.html',  // HTML do componente
  styleUrls: ['./details-product.component.css'],  // Estilos CSS do componente
  standalone: true,  // Define que esse componente é standalone (não precisa estar declarado em módulo)
  imports: [CommonModule, HttpClientModule]  // Importa módulos usados pelo componente
})
export class DetailsProductComponent implements OnInit {
  produtoId!: string;  // Guarda o ID do produto extraído da URL da rota
  produto: any;        // Objeto que irá armazenar os dados do produto recebidos da API

  // URL base da API onde os produtos estão disponíveis
  private apiUrl = 'https://trunk-vendas.onrender.com/produtos';

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    // Extrai o parâmetro 'id' da rota atual (ex: /produtos/:id)
    this.produtoId = this.route.snapshot.paramMap.get('id')!;


    // Faz requisição HTTP GET para a API, buscando os dados do produto pelo ID
this.http.get(`${this.apiUrl}/${this.produtoId}`).subscribe({
  next: (data) => {
    this.produto = data;
    console.log('Produto recebido:', this.produto);  // Aqui dentro, para logar quando os dados chegarem
  },
  error: (err) => console.error('Erro ao carregar produto:', err)
});

  }
}
