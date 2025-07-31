import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http'; // <--- IMPORTANTE

@Component({
  selector: 'app-cat-clothes',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule], // <--- ADICIONE AQUI TAMBÉM
  templateUrl: './cat-clothes.component.html',
  styleUrls: ['./cat-clothes.component.css']
})
export class CatClothesComponent implements OnInit {
 @Input() limit?: number; 
   @Input() smallCards: boolean = false;

  produtos: any[] = [];
  categoria = 'Vestuario';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any[]>('http://localhost:5000/produtos').subscribe(data => {
      this.produtos = data
  .filter(produto => produto.categoria.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "") === 'vestuario')
  .slice(0, this.limit);

    });
  }

  gerarLinkWhatsApp(produto: any): string {
    const mensagem = `Olá! Gostaria de pedir o produto: ${produto.nome}, no valor de R$ ${produto.preco}`;
    const numero = '5583999999999';
    return `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
  }
}
