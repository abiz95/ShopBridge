import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DefaultRoutingModule } from './default-routing.module';
import { LandingComponent } from 'src/app/modules/landing/landing.component';
import { AddProductComponent } from 'src/app/modules/product/add-product/add-product.component';
import { ViewProductComponent } from 'src/app/modules/product/view-product/view-product.component';

import { MaterialModule } from 'src/app/shared/design/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { DefaultComponent } from './default.component';
import { ManageProductsComponent } from 'src/app/modules/product/manage-products/manage-products.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditProductComponent } from 'src/app/modules/product/edit-product/edit-product.component';


@NgModule({
  declarations: [
    LandingComponent,
    AddProductComponent,
    ViewProductComponent,
    EditProductComponent,
    DefaultComponent,
    ManageProductsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    DefaultRoutingModule,
    CommonModule,
    MaterialModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class DefaultModule { }
