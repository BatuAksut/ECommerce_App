import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr.service';

declare var $: any;

@Component({
  selector: 'app-root',
  imports: [RouterLink,RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ECommerceClient';
  constructor(private toastrService:CustomToastrService) {

  }
  ngOnInit(): void {
    this.toastrService.message("Welcome to E-Commerce Application","Greetings",{messageType:ToastrMessageType.Success,position:ToastrPosition.TopRight});
  }
}


