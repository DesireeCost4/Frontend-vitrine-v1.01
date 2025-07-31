import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { BarComponent } from "./bar/bar.component";
import { CardComponent } from "./card/card.component";
import { CatDestaquesComponent } from "./cat-destaques/cat-destaques.component";
import { LoginComponent } from "./login/login.component";
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, FooterComponent, BarComponent, CardComponent, CatDestaquesComponent, LoginComponent,  FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  

  gerarLinkWhatsApp(produto: any): string {
    const mensagem = `Olá! Gostaria de pedir o produto: ${produto.nome}, no valor de R$ ${produto.preco}`;
    const numero = '5583999999999'; // Substitua pelo número real
    return `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
  }
}
