import { Component } from '@angular/core';
import { AuthService } from '../../../../core/services/authServices/auth-service';
import { FormsModule } from '@angular/forms';
import { LoginModel } from '../../../models/login.model';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  loginObj: LoginModel = {
    userName: '',
    password: '',
    email: '',
    userID: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  errorMessage = '';
  successMessage = '';
  isLoading = false;

  onLogin() {

    this.errorMessage = '';
    this.successMessage = '';
    this.isLoading = true;

    this.authService.login(this.loginObj).subscribe({

      next: (res: any) => {
        this.isLoading = false;

        if (res.success) {
          this.errorMessage = '';
          this.successMessage = res.message;

          localStorage.setItem('UserName', res.userName);
          localStorage.setItem('UserID', res.userID);
          localStorage.setItem('Email', res.email);

          // Default profile image (until user uploads one)
          localStorage.setItem('ProfileImage', '');

          setTimeout(() => {
            this.router.navigate(['/home']);
          }, 1000);

        } else {
          this.successMessage = '';
          this.errorMessage = res.message;
          this.cdr.detectChanges();

        }
      },

      error: (err) => {

        this.isLoading = false;
        this.successMessage = '';
        this.errorMessage = 'Something went wrong. Please try again.';
        this.cdr.detectChanges();
        console.log(err);

      }

    });

  }

}
