import { Component ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { RouterLink, RouterOutlet } from "@angular/router";

import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr.service';
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";
import { HttpClient } from '@angular/common/http';
declare var $: any;

@Component({
  selector: 'app-root',
  imports: [RouterLink,RouterOutlet,NgxSpinnerModule],
  templateUrl: './app.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ECommerceClient';
  constructor(private toastrService:CustomToastrService,private spinner: NgxSpinnerService) {

  }
  ngOnInit(): void {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
    
  }
}



$.get("https://localhost:7287/api/Products").done(function(data:any) {
  console.log(data);
});
