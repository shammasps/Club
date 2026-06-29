import { Component } from '@angular/core';
import { AuthService } from '../../../../core/services/authServices/auth-service';
import { FormsModule } from '@angular/forms';
import { LoginModel } from '../../../models/login.model';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { ProfileService } from '../../../../core/services/profileServices/profile-service';


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
    // email: '',
    // userID: '',
    // teamName:'',
    // profileImage:''


  };

  constructor(
    private authService: AuthService,
    private router: Router,
     private profileService: ProfileService,
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

          // Clear old data
  localStorage.clear();

  // Update BehaviorSubjects FIRST
  this.profileService.updateUserName('');
  this.profileService.updateProfileImage('/Profile/DefaultProfile.png');

          // Save new data
  localStorage.setItem('UserName', res.userName);
  localStorage.setItem('UserID', res.userID.toString());
  localStorage.setItem('Email', res.email);
  localStorage.setItem('SelectedTeam', res.teamName || '');
  localStorage.setItem(
    'ProfileImage',
    res.profileImage || '/Profile/DefaultProfile.png'
  );

           // Update BehaviorSubjects with new values
  this.profileService.updateUserName(res.userName);
  this.profileService.updateProfileImage(
    res.profileImage || '/Profile/DefaultProfile.png'
  );


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
