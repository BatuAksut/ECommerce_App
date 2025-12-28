import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../../../services/common/models/user.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  imports: [CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private userService: UserService,private toastr: ToastrService) {}

  username = '';
  password = '';

  async login(form: NgForm) {
    if (form.valid) {
      try {
        const response = await this.userService.login(this.username, this.password);

        if (response.isSuccess) {
          console.log("Logged in!");
          this.toastr.success("Login successful!");
          if(response.token){
             localStorage.setItem("accessToken", response.token.accessToken);
          }
          
 
        } else {
          this.toastr.error("Login failed: " + response.message);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }
}
}