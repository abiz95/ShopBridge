import { Component, OnInit } from '@angular/core';
import { LocalDataModel } from 'src/app/app.models';
import { LocalDataService } from 'src/app/shared/services/LocalDataService/local-data-service.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ViewProductComponent } from '../view-product/view-product.component';
import { DeleteDialogComponent } from 'src/app/shared/dialogs/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.scss']
})
export class ManageProductsComponent implements OnInit {

  private store = new LocalDataModel();
  productList: any = [];
  localData: any;

  constructor(
    private localDataService: LocalDataService,
    private matDialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.localData = this.localDataService.getLocalData().subscribe(
      (update) => {
        this.store = update;
        this.productList = this.store.productData.value;
        
      }
    );
  }

  // confirmation for deletion 
  deleteProductDialog(productId: any) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;


    let urlRef = this.matDialog.open(DeleteDialogComponent, dialogConfig);
    urlRef.afterClosed().subscribe(
      (data) => {
        if (data === "true") {
          this.removeProductById(this.localDataService.localDataArray, productId);
          this.localDataService.setProductData(this.localDataService.localDataArray);
        }
      }
    );


  }

  deleteProduct(productId: any) {
    this.deleteProductDialog(productId);
  }

  // To delete the product
  removeProductById = (productArray, product) => {
    let productIndex
    productArray.forEach(val => {
      if (val.productId === product.productId) {
        productIndex = productArray.indexOf(product);
      }
    })
    if (productIndex === -1) {
      return false;
    };
    return !!productArray.splice(productIndex, 1);
  };

  //It will call the dialog for viewing the product
  viewProduct(productDetails: any) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.data = productDetails;
    dialogConfig.width = "500px";
    dialogConfig.height = 'auto';

    let urlRef = this.matDialog.open(ViewProductComponent, dialogConfig);
    urlRef.afterClosed().subscribe(
      (data) => {
      }
    );
  }

  ngOnDestroy(): void {
    if (this.localData) {
      this.localData.unsubscribe();
    }
  }

}
