import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http'; // <--- IMPORTANTE

@Component({
  selector: 'app-cat-shoes',
  imports: [CommonModule, RouterModule, HttpClientModule], // <--- ADICIONE AQUI TAMBÉM
  templateUrl: './cat-shoes.component.html',
  styleUrl: './cat-shoes.component.css'
})
export class CatShoesComponent implements OnInit{
@Input() limit?: number; 
  @Input() smallCards: boolean = false;


produtos: any[] = [];
  categoria = 'Calçados';

  constructor(private http: HttpClient) {}

ngOnInit(): void {
  this.http.get<any[]>('https://trunk-vendas.onrender.com/produtos').subscribe(data => {
    const filtrados = data.filter(produto => 
      produto.categoria.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "") === 'calcado'
    );
    this.produtos = this.limit ? filtrados.slice(0, this.limit) : filtrados;
  });
}


  gerarLinkWhatsApp(produto: any): string {
    const mensagem = `Olá! Gostaria de pedir o produto: ${produto.nome}, no valor de R$ ${produto.preco}`;
    const numero = '5583999999999';
    return `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
  }
}
