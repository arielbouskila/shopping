import { Component, OnInit, ViewChild, ElementRef,Input, SimpleChanges, OnChanges, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { ProductCategory } from 'src/app/models/product-category';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit ,OnChanges {

  @Input() product:any = null;
  @Output() onEditedProduct= new EventEmitter();
  fileAttr = 'Choose File';
  dataImage: any;
  selectedCategoryCtrl:FormControl;

  constructor(private productService: ProductService, private formBuilder: FormBuilder) { }
  categories: Array<ProductCategory> = [];
  productForm: FormGroup;
  isEdit:boolean = false;

  ngOnInit(): void {
    this.isEdit = this.product!==null;
    this.productService.getAllCategoriesNew().subscribe((cats)=>{
      this.categories = cats.category;
    });
    
    this.initForm();
  }
  initForm(){
    this.productForm = this.formBuilder.group({
      productName: [this.isEdit ? this.product.name : '' , [Validators.required]],
      productPrice: [this.isEdit ? this.product.price : '' , Validators.required],
      productImage: [this.isEdit ? this.product.image : ''],
      productCategory: [this.isEdit ? this.product.category : '' , Validators.required]
    });
  }
  ngOnChanges(changes: SimpleChanges) {
    this.isEdit = this.product!==null;
    if(this.isEdit){
      this.product = changes.product.currentValue;
    } else{
      this.dataImage=null;
      this.initForm();
    }
    
      
  }
  addProduct() {
    console.log(this.productForm.valid);
    if (this.productForm.valid) {
      const payload: Product = {
        product_name: this.productForm.get('productName').value,
        price: this.productForm.get('productPrice').value,
        product_img: this.productForm.get('productImage').value,
        category: this.productForm.get('productCategory').value
      }
      this.productService.addProduct(payload).subscribe((item) => {
        console.log(item);
        alert( 'product has been added');
        
      }, (err) => {
        console.log(err);
      
       
      })
    }
  }
  editProduct(){

    const payload: Product = {
      product_name: this.productForm.get('productName').value,
      price: this.productForm.get('productPrice').value,
      product_img: this.productForm.get('productImage').value,
      category: this.productForm.get('productCategory').value
    }
    // this.productService.editProduct(this.product._id,payload).subscribe((item)=>{
    //   this.snackBar.open('Product has been edited', 'OK',{
    //     duration:2000,
    //     verticalPosition:'top'
    //   });
    //   this.onEditedProduct.emit(true);
    // })
  }
  uploadFileEvt(imgFile: any) {
    if (imgFile.target.files && imgFile.target.files[0]) {
      this.fileAttr = '';
      Array.from(imgFile.target.files).forEach((file: File) => {
        this.fileAttr += file.name + ' - ';
        console.log(file.name);
      });

      // HTML5 FileReader API
      let reader = new FileReader();
      reader.onload = (e: any) => {
        let image = new Image();
        image.src = e.target.result;
        image.onload = rs => {

          let imgBase64Path = e.target.result;
          console.log(imgBase64Path);
          this.dataImage = imgBase64Path;
        };
      };
      reader.readAsDataURL(imgFile.target.files[0]);


    } else {
      this.fileAttr = 'Choose File';
    }
  }
  // uploadImage() {
  //   const formData = new FormData();
  //   formData.append('mypic', this.fileInput.nativeElement.files[0]);
  //   this.fileInput.nativeElement.inProgress = true;
  //   this.uploadService.upload(formData).pipe(
  //     map(event => {
  //       switch (event.type) {
  //         case HttpEventType.UploadProgress:
  //           this.fileInput.nativeElement.progress = Math.round(event.loaded * 100 / event.total);
  //           break;
  //         case HttpEventType.Response:
  //           return event;
  //       }
  //     }),
  //     catchError((error: HttpErrorResponse) => {
  //       this.fileInput.nativeElement.inProgress = false;
  //       return of(`Upload failed: ${this.fileInput.nativeElement.data.name}`);
  //     })).subscribe((event: any) => {
  //       if (typeof (event) === 'object') {
  //         this.productForm.get('productImage').setValue(event.body);
  //       }
  //     });

  // }
  

}
