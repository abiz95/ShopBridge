import { Component, OnInit } from '@angular/core';
import { LocalDataModel } from 'src/app/app.models';
import { LocalDataService } from 'src/app/shared/services/LocalDataService/local-data-service.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ViewProductComponent } from '../product/view-product/view-product.component';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  private store = new LocalDataModel();
  productList: any = [];
  constructor(
    private localDataService: LocalDataService,
    private matDialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.localDataService.getLocalData().subscribe(
      (update) => {
        this.store = update;
        this.productList = this.store.productData.value;
      }
    );
  }

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


}
