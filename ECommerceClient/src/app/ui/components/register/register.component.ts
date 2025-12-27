import { CommonModule, NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators,ValidatorFn } from '@angular/forms';
import { User } from '../../../entities/user';
import { UserService } from '../../../services/common/models/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule,NgClass,CommonModule],
  standalone: true,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  constructor(private formBuilder: FormBuilder,private userService:UserService,private toastr: ToastrService) { }
backendErrors: string[] = [];
  frm!: FormGroup;
  ngOnInit(): void {
  this.frm = this.formBuilder.group({
    fullname: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(2)]],
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
  }, { 
    validators: passwordMatchValidator 
  });
}
  get f() { return this.frm.controls; }

async onSubmit(): Promise<void> {
  this.backendErrors = [];
  if (this.frm.valid) {
    const { confirmPassword, ...userData } = this.frm.value;
    const user: User = userData as User;

    const result = await this.userService.create(user);

    if (result.isSuccess) {
      this.toastr.success(result.message, "Registration Successful");
    } else {
      this.backendErrors = result.errors || ["An unknown error occurred."];
      this.toastr.error(result.message, "Registration Failed");
      
   
      if (result.errors) {
         result.errors.forEach(err => console.error(err));
       
      }
    }
  } else {
    
    this.frm.markAllAsTouched();
  }
}

}

export const passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  if (!password || !confirmPassword) return null;

  return password.value === confirmPassword.value ? null : { passwordMismatch: true };
};