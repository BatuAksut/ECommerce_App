import { Component } from '@angular/core';
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { HttpClientService } from '../../../services/common/http-client.service';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { HttpClient } from '@angular/common/http';
import {MatSidenavModule} from '@angular/material/sidenav';
import { CreateComponent } from "./create/create.component";
import { ListComponent } from "./list/list.component";

@Component({
  selector: 'app-products',
  imports: [NgxSpinnerModule, MatSidenavModule, CreateComponent, ListComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent extends BaseComponent {

  constructor(spinner:NgxSpinnerService,private httpClientService:HttpClientService) {
   super(spinner);
  }

  ngOnInit(): void {
    this.showSpinner(SpinnerType.BallClipRotate);
    this.httpClientService.get({controller:"products"}).subscribe(data=>{
      console.log(data);
      this.hideSpinner(SpinnerType.BallClipRotate);
     
    });
    
}}
