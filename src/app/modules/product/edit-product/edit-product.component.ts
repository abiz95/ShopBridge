import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalDataModel } from 'src/app/app.models';
import { LocalDataService } from 'src/app/shared/services/LocalDataService/local-data-service.service';
import { validatePrice } from 'src/app/shared/validators/priceValidator';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  private store = new LocalDataModel();
  productIdParam: any;
  productList: any;
  editProductForm: any;
  oldProductData: any;
  constructor(
    private activatedroute:ActivatedRoute, 
    private localDataService: LocalDataService,
    private formBuilder: FormBuilder,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.editProductForm = this.formBuilder.group(
      {
        productId: [""],
        productName: ["", [Validators.required]],
        productPrice: ["", [Validators.required]],
        productDescription: ["", [Validators.required]],
        productImage: [""],
      }, {
        validator : validatePrice('productPrice')
      }
    );
    this.localDataService.getLocalData().subscribe(
      (update) => {
        this.store = update;
        console.log('edit product dataset: ', this.store.productData.value);
        this.productList = this.store.productData.value;
      }
    );
    this.activatedroute.paramMap.subscribe(params => {
      this.productIdParam = params.get('id');
    });
    this.getProductDetails(this.productIdParam);
  }

  get productFormValues() {
    return this.editProductForm.controls;
  }

  getProductDetails(productId: any) {
    this.localDataService.localDataArray.forEach(details => {
      if ( details.productId === parseInt(productId)) {
        this.loadFormValues(details);
        this.oldProductData = details;
      }
    })
  }
  
  loadFormValues(productDetails: any) {
    this.editProductForm.patchValue({
      productId: productDetails.productId,
      productName: productDetails.productName,
      productPrice: productDetails.productPrice,
      productDescription: productDetails.productDescription,
    })
  }

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

  saveForm() {
    console.log("update user details");
    if (this.editProductForm.valid) {
      this.removeProductById(this.productList, this.oldProductData);
      this.localDataService.localDataArray.push(this.editProductForm.value);
      this.localDataService.setProductData(this.localDataService.localDataArray);
      this.router.navigate(['product/manage']);
    }
  }

}
