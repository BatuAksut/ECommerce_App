import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../../../services/common/models/user.service';


@Component({
  selector: 'app-login',
  imports: [CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private userService: UserService) {}

  username = '';
  password = '';

  async login(form: NgForm) {
    if (form.valid) {
      try {
        const response = await this.userService.login(this.username, this.password);

        if (response.isSuccess) {
          console.log("Giriş Başarılı!");
          
          localStorage.setItem("isLoggedIn", "true"); 
          
          alert(response.message);
 
        } else {
          alert(response.message);
        }
      } catch (error) {
        console.error("Bir hata oluştu:", error);
      }
    }
}
}