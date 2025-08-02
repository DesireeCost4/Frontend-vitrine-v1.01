import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, OnChanges {

  @Output() fechar = new EventEmitter<void>();  // Evento para fechar o formulário (emitido para o pai)
  @Input() produtoId: string | null = null;    // ID do produto para edição (se houver)

  productForm: FormGroup;                       // Formulário reativo para produto
  imagemSelecionada: File | null = null;       // Arquivo de imagem selecionado
  mensagem: string = '';                        // Mensagem para feedback ao usuário
  descricaoGerada: string = '';                 // Descrição gerada automaticamente
  editando: boolean = false;                    // Flag para saber se estamos editando ou criando novo

  constructor(private fb: FormBuilder, private http: HttpClient) {
    // Inicializa o formulário com validações básicas
    this.productForm = this.fb.group({
      nome: ['', Validators.required],
      categoria: ['', Validators.required],
      estoque: [0, [Validators.required, Validators.min(0)]],
      preco: [0, [Validators.required, Validators.min(0)]],
      descricao: ['']
    });
  }

  // Executa ao iniciar o componente: se tem produtoId, carrega para edição
  ngOnInit(): void {
    if (this.produtoId) {
      this.carregarProdutoParaEdicao();
    }
  }

  // Executa ao detectar mudanças nos inputs, útil para detectar mudanças no produtoId vindo do pai
  ngOnChanges(changes: SimpleChanges) {
    if (changes['produtoId'] && changes['produtoId'].currentValue) {
      this.carregarProdutoParaEdicao();
    }
  }

  // Função para carregar dados do produto para o formulário quando editando
  carregarProdutoParaEdicao() {
    this.editando = true;
    this.http.get<any>(`https://trunk-vendas.onrender.com/produtos/${this.produtoId}`).subscribe({
      next: (produto) => {
        this.productForm.patchValue({
          nome: produto.nome,
          categoria: produto.categoria,
          estoque: produto.estoque,
          preco: produto.preco,
          descricao: produto.descricao
        });
        this.descricaoGerada = produto.descricao;
      },
      error: (err) => {
        this.mensagem = 'Erro ao carregar produto para edição.';
        console.error(err);
      }
    });
  }

  // Função para gerar descrição automática via backend, usando nome e categoria
  gerarDescricao(): void {
    const nome = this.productForm.get('nome')?.value;
    const categoria = this.productForm.get('categoria')?.value;

    if (!nome || !categoria) {
      this.mensagem = 'Por favor, preencha nome e categoria para gerar a descrição.';
      return;
    }

    this.http.post<{ descricao: string }>('https://trunk-vendas.onrender.com/descricao', { nome, categoria }).subscribe({
      next: (res) => {
        this.descricaoGerada = res.descricao;
        this.mensagem = 'Descrição gerada com sucesso!';
      },
      error: (err) => {
        this.mensagem = 'Erro ao gerar descrição.';
        console.error(err);
      }
    });
  }

  // Captura arquivo de imagem selecionado no input file
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.imagemSelecionada = input.files[0];
    }
  }

  // Fecha o formulário e reseta estado interno
  fecharCadastro(): void {
    this.fechar.emit();
    this.productForm.reset();
    this.imagemSelecionada = null;
    this.descricaoGerada = '';
    this.editando = false;
    this.produtoId = null;
    this.mensagem = '';
  }

  // Submete o formulário para criar ou atualizar produto
  onSubmit(): void {
    if (!this.productForm.valid) {
      this.mensagem = 'Por favor, preencha todos os campos corretamente.';
      return;
    }

    if (this.editando && this.produtoId) {
      // Atualiza produto existente usando FormData (para enviar imagem se houver)
      const formData = new FormData();
      formData.append('nome', this.productForm.get('nome')?.value);
      formData.append('categoria', this.productForm.get('categoria')?.value);
      formData.append('estoque', this.productForm.get('estoque')?.value.toString());
      formData.append('preco', this.productForm.get('preco')?.value.toString());
      formData.append('descricao', this.descricaoGerada || this.productForm.get('descricao')?.value || '');
      if (this.imagemSelecionada) {
        formData.append('imagem', this.imagemSelecionada);
      }

      this.http.patch<{ mensagem?: string }>(`https://trunk-vendas.onrender.com/produtos/${this.produtoId}`, formData).subscribe({
        next: (res) => {
          this.mensagem = res.mensagem || 'Produto atualizado com sucesso!';
          this.fecharCadastro();
        },
        error: (err) => {
          console.error('Erro ao atualizar produto:', err);
          this.mensagem = 'Erro ao atualizar o produto. Tente novamente.';
        }
      });

    } else {
      // Caso queira implementar criação aqui, usar POST e FormData
      // (exemplo omitido para foco no update)
    }
  }

}
