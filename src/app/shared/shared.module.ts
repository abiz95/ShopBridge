import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MaterialModule } from './design/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DashboardCardComponent } from './widgets/dashboard-card/dashboard-card.component';
import { NumberValidatorDirective } from './directive/number-validator.directive';
import { PricePipe } from './pipes/pricePipe/price.pipe';
import { DeleteDialogComponent } from './dialogs/delete-dialog/delete-dialog.component';
// import { ErrorComponent } from './components/error/error.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    DashboardCardComponent,
    NumberValidatorDirective,
    PricePipe,
    DeleteDialogComponent,
    // ErrorComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    DashboardCardComponent,
    NumberValidatorDirective,
    PricePipe,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class SharedModule { }
