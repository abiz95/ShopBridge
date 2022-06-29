import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from 'src/app/modules/landing/landing.component';
import { AddProductComponent } from 'src/app/modules/product/add-product/add-product.component';
import { EditProductComponent } from 'src/app/modules/product/edit-product/edit-product.component';
import { ManageProductsComponent } from 'src/app/modules/product/manage-products/manage-products.component';
import { DefaultComponent } from './default.component';

const routes: Routes = [
  { 
      path: '', 
      component: DefaultComponent,
      children: [
        { path: '', component: LandingComponent},
        { path: 'product/add', component: AddProductComponent},
        { path: 'product/edit/:id', component: EditProductComponent},
        { path: 'product/manage', component: ManageProductsComponent},
      ] 
    }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DefaultRoutingModule { }
