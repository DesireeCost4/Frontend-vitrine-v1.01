import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { debounceTime, distinctUntilChanged, switchMap, catchError } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class NavbarComponent {
  termoBusca = new Subject<string>();
  produtosFiltrados: any[] = []; // Inicializa como array vazio ✅

  constructor(private http: HttpClient) {

    this.termoBusca.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((termo: string) => {
        if (termo.trim() === '') {
          return of([]); // Evita requisição com string vazia
        }
        return this.http.get<any[]>(`https://trunk-vendas.onrender.com/produtos?busca=${termo}`).pipe(
          catchError(() => of([]))
        );
      })//ALTERAR FILTRO PARA LETRAS EM DIGITAÇÃO. << 27/07/2025
    ).subscribe((resultados: any[]) => {
      this.produtosFiltrados = resultados;
    });
  }

  buscar(event: Event): void {
  const input = event.target as HTMLInputElement;
  const termo = input.value;
  this.termoBusca.next(termo);
}
}
