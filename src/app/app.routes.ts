import { Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { DetailsProductComponent } from './details-product/details-product.component';
import { CatClothesComponent } from './cat-clothes/cat-clothes.component';
import { CatSupplementsComponent } from './cat-supplements/cat-supplements.component';
import { CatAccessoriesComponent } from './cat-accessories/cat-accessories.component';
import { CatShoesComponent } from './cat-shoes/cat-shoes.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminProdutosComponent } from './admin-produtos/admin-produtos.component';



export const routes: Routes = [
  { path: '', component: ProductsComponent },
{ path: 'produto/:id', component: DetailsProductComponent },
{ path: 'produtos/roupas', component: CatClothesComponent },
{ path: 'produtos/suplementos', component: CatSupplementsComponent },
{ path: 'produtos/oculos&acessorios', component: CatAccessoriesComponent },
{ path: 'produtos/sapatos', component: CatShoesComponent },
{ path: 'admin', component: AdminProdutosComponent, canActivate: [AuthGuard] },
{ path: 'login', component: LoginComponent },
{ path: 'produtos', component: ProductsComponent }

];
