import { Component } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { ProductService } from '../../../../services/common/models/product.service';
import { Create_Product } from '../../../../contracts/create_product';
import { BaseComponent, SpinnerType } from '../../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService, MessageType, Position } from '../../../../services/admin/alertify.service';


@Component({
  selector: 'app-create',
  imports: [MatFormFieldModule,MatInputModule,MatButtonModule,MatDividerModule,MatIconModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent extends BaseComponent {
  constructor(private productService:ProductService,spinner:NgxSpinnerService,private alertify:AlertifyService)
  {
    super(spinner)
  }

  create(txtName:string,stock:string,price:string){
    this.showSpinner(SpinnerType.BallScaleMultiple);
    const create_product:Create_Product ={
      name:txtName,
      stock:parseInt(stock),
      price:parseFloat(price)
    }
    if(txtName==null || txtName.length===0){
      this.alertify.message("Product name cannot be empty",{
        messageType:MessageType.Error,});
        this.hideSpinner(SpinnerType.BallScaleMultiple)
        return;
    }


    this.productService.create(create_product,()=>{
      this.hideSpinner(SpinnerType.BallScaleMultiple)
      this.alertify.message("product added",{
        messageType:MessageType.Success,
        position:Position.TopRight

      });
    },(errorMessage:string)=>{
     this.alertify.message(errorMessage,{
      position:Position.TopRight,
      messageType:MessageType.Error
     })
    });
  }

}
