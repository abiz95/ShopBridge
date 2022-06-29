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
  imageName: string = '';
  localData: any;
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
    this.localData = this.localDataService.getLocalData().subscribe(
      (update) => {
        this.store = update;
        this.productList = this.store.productData.value;
      }
    );
    //Fetch request params
    this.activatedroute.paramMap.subscribe(params => {
      this.productIdParam = params.get('id');
    });
    this.getProductDetails(this.productIdParam);
  }

  get productFormValues() {
    return this.editProductForm.controls;
  }

  // Fetch product details
  getProductDetails(productId: any) {
    this.localDataService.localDataArray.forEach(details => {
      if ( details.productId === parseInt(productId)) {
        this.loadFormValues(details);
        this.oldProductData = details;
      }
    })
  }
  
  // Load product details to the form
  loadFormValues(productDetails: any) {
    this.editProductForm.patchValue({
      productId: productDetails.productId,
      productName: productDetails.productName,
      productPrice: productDetails.productPrice,
      productDescription: productDetails.productDescription,
    })
  }

  // To remove the product
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

  //To upload the image
  onImageFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.imageName = event.target.files[0].name;
      const file = event.target.files[0];
      this.editProductForm.get('productImage')!.setValue(file);
    }
  }


  // To save edited change of products
  saveForm() {
    if (this.editProductForm.valid) {
      //This remove the old details of the product
      this.removeProductById(this.productList, this.oldProductData);
      //This will add the new details of the product
      this.localDataService.localDataArray.push(this.editProductForm.value);
      //Saving the details to the BehaviorSubject object
      this.localDataService.setProductData(this.localDataService.localDataArray);
      this.router.navigate(['product/manage']);
    }
  }

  ngOnDestroy(): void {
    if (this.localData) {
      this.localData.unsubscribe();
    }
  }

}
