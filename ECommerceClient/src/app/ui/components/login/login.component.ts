import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../../../services/common/models/user.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/common/auth.service';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-login',
  standalone: true, 
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router
  ) {}

  username = '';
  password = '';

  async login(form: NgForm) {
    if (form.valid) {
      try {
        const response = await this.userService.login(this.username, this.password);
        
        if (response.isSuccess) {
          
   
          if(response.token) {
             localStorage.setItem("accessToken", response.token.accessToken);
          }

         
          this.authService.identityCheck();

          this.toastr.success("Login successful!");
          
    
          this.router.navigate(['']);

        } else {
          this.toastr.error("Login failed: " + response.message);
       
          this.authService.identityCheck();
        }
      } catch (error) {
        console.error("An error occurred:", error);
        this.toastr.error("An unexpected error occurred.");
      }
    }
  }
}