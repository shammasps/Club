import { Component } from '@angular/core';
import { AuthService } from '../../../../core/services/authServices/auth-service';
import { FormsModule } from '@angular/forms';
import { Router,RouterLink } from '@angular/router';
import { RegisterModel } from '../../../models/register.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  registerObj: RegisterModel = {
    userName: '',
    email: '',
    password: '',
    mobile: ''

  };

  confirmPassword: string = '';

  errors = {
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
    mobile: ''
  };


  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  validateForm(): boolean {

    this.errors = {
      userName: '',
      email: '',
      password: '',
      confirmPassword: '',
      mobile: ''
    };

    let isValid = true;

    // Username
    if (!this.registerObj.userName.trim()) {
      this.errors.userName = 'Username is required';
      isValid = false;
    }

    // Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!this.registerObj.email.trim()) {
      this.errors.email = 'Email is required';
      isValid = false;
    }
    else if (!emailRegex.test(this.registerObj.email)) {
      this.errors.email = 'Invalid email address';
      isValid = false;
    }

    // Mobile
    if (
      this.registerObj.mobile &&
      !/^\d{10}$/.test(this.registerObj.mobile)
    ) {
      this.errors.mobile = 'Mobile number must be 10 digits';
      isValid = false;
    }

    // Password
    if (!this.registerObj.password) {
      this.errors.password = 'Password is required';
      isValid = false;
    }
    // else if (this.registerObj.password.length < 6) {
    //   this.errors.password = 'Password must be at least 6 characters';
    //   isValid = false;
    // }

    // Confirm Password
    if (!this.confirmPassword) {
      this.errors.confirmPassword = 'Confirm Password is required';
      isValid = false;
    }
    else if (this.registerObj.password !== this.confirmPassword) {
      this.errors.confirmPassword = 'Password and Confirm Password do not match';
      isValid = false;
    }

    return isValid;
  }
  onRegister() {

    if (!this.validateForm()) {
      return;
    }

    this.authService.register(this.registerObj).subscribe({
      next: (res: any) => {
         setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1000);
      },
      error: (err) => {
        alert(err.error.message);
      }
    });

  }

}
