import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from "@angular/router";
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr.service';
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";
import { AuthService } from './services/common/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterOutlet, NgxSpinnerModule], 
  templateUrl: './app.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  styleUrl: './app.component.scss'
})
export class AppComponent {

 
  constructor(
    public authService: AuthService, 
    private toastrService: CustomToastrService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {
 
    authService.identityCheck();
  }

  signOut() {
    localStorage.removeItem("accessToken");
    this.authService.identityCheck(); 
    
    this.router.navigate([""]); 
    this.toastrService.message("Logout successful", "Logged Out", {
      messageType: ToastrMessageType.Warning,
      position: ToastrPosition.TopRight
    });
  }
}