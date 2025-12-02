import { Component, ViewChild } from '@angular/core';
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { HttpClientService } from '../../../services/common/http-client.service';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import {MatSidenavModule} from '@angular/material/sidenav';
import { CreateComponent } from "./create/create.component";
import { ListComponent } from "./list/list.component";
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';

@Component({
  selector: 'app-products',
  imports: [NgxSpinnerModule, MatSidenavModule, CreateComponent, ListComponent, MatTableModule,MatDialogModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent extends BaseComponent {

  constructor(spinner:NgxSpinnerService,private httpClientService:HttpClientService) {
   super(spinner);
  }
@ViewChild(ListComponent) listComponents!: ListComponent;
createdProduct(createdProduct: any) {
   
    this.listComponents.getProducts();
  }
  ngOnInit(): void {
    
    
}}
