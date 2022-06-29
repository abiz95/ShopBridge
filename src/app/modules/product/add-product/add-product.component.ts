import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalDataService } from 'src/app/shared/services/LocalDataService/local-data-service.service';
import { validatePrice } from 'src/app/shared/validators/priceValidator';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  addProductForm: any;
  imageName: string = '';
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private localDataService: LocalDataService,
  ) { }

  ngOnInit(): void {
    this.addProductForm = this.formBuilder.group(
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
  }

  get productFormValues() {
    return this.addProductForm.controls;
  }


  addId() {
    this.localDataService.id = this.localDataService.id + 1;
    this.addProductForm.patchValue({
      productId: this.localDataService.id
    })
  }

  onImgFileChange(event: any) {
    console.log('onImgFileChange', event)
    if (event.target.files.length > 0) {
      this.imageName = event.target.files[0].name;
      const file = event.target.files[0];
      this.addProductForm.get('productImage')!.setValue(file);
    }
  }

  saveForm() {
    console.log("update user details");
    if (this.addProductForm.valid) {
      console.log("addProductForm valid");
      console.log("addProductForm values: " + this.addProductForm.value);
      this.addId();
      this.localDataService.localDataArray.push(this.addProductForm.value);
      this.localDataService.setProductData(this.localDataService.localDataArray);
      this.router.navigate(['product/manage']);
    }
  }


}
