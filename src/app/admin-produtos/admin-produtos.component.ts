import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AdminComponent } from '../admin/admin.component'; // componente cadastro

@Component({
  selector: 'app-admin-produtos',
  standalone: true,
  imports: [CommonModule, HttpClientModule, AdminComponent],
  templateUrl: './admin-produtos.component.html',
  styleUrls: ['./admin-produtos.component.css']
})
export class AdminProdutosComponent implements OnInit {

  produtos: any[] = [];
  mostrarCadastro = false;

 produtoSelecionadoId: string | null = null;

  editarProduto(id: string): void {
  this.produtoSelecionadoId = id;
  this.mostrarCadastro = true;
}

abrirCadastro(): void {
  this.produtoSelecionadoId = null; // novo cadastro
  this.mostrarCadastro = true;
}
  

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.carregarProdutos();
  }

  carregarProdutos(): void {
    this.http.get<any[]>('https://trunk-vendas.onrender.com/produtos').subscribe({
      next: (res) => {
        this.produtos = res;
      },
      error: (err) => {
        console.error('Erro ao buscar produtos:', err);
      }
    });
  }

  apagarProduto(id: string): void {
    if (confirm('Tem certeza que deseja apagar este produto?')) {
      this.http.delete(`https://trunk-vendas.onrender.com/produtos/${id}`).subscribe({
        next: () => {
          this.produtos = this.produtos.filter(p => p.id !== id);
        },
        error: (err) => {
          console.error('Erro ao apagar produto:', err);
        }
      });
    }
  }

  fecharCadastro(): void {
    this.mostrarCadastro = false;
    this.carregarProdutos(); // recarrega produtos após fechar cadastro
  }

  // Método para otimizar ngFor
  trackById(index: number, produto: any): string {
    return produto.id;
  }
}
