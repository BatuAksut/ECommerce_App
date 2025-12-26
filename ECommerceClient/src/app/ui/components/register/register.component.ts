import { CommonModule, NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators,ValidatorFn } from '@angular/forms';
import { User } from '../../../entities/user';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule,NgClass,CommonModule],
  standalone: true,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) { }

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

  onSubmit(): void {
  if (this.frm.valid) {
    // Formdaki tüm değerleri alıyoruz
    const { confirmPassword, ...userData } = this.frm.value;

    // 'userData' artık User interface'ine uygun (confirmPassword içermiyor)
    const user: User = userData as User;

    console.log('Form Submitted!', user);
    
    // Burada servise 'user' objesini gönderebilirsin:
    // this.userService.register(user).subscribe(...);
  } else {
    this.frm.markAllAsTouched(); // Hataları görünür yap
    console.log('Form is invalid');
  }
}

}

export const passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  if (!password || !confirmPassword) return null;

  return password.value === confirmPassword.value ? null : { passwordMismatch: true };
};