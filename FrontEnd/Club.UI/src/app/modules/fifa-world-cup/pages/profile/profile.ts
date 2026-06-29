import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { Footer } from '../../components/footer/footer';
import { ProfileService } from '../../../../core/services/profileServices/profile-service';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { NotificationService } from '../../../../core/services/notification/notification-service';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, FormsModule, Footer],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {

  constructor(
    private location: Location,
    private profileService: ProfileService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private notification: NotificationService
  ) { }

  successMessage = '';
  errorMessage = '';
  isLoading = false;

  profileImage = '/Profile/DefaultProfile.png';

  profile = {

    userID: 0,

    userName: '',

    email: '',

    teamName: '',

    totalPoints: 0,

    rank: 0,

    totalPrediction: 0

  };

  teams = [

    'Argentina',

    'Brazil',

    'France',

    'England',

    'Portugal',

    'Spain',

    'Germany',

    'Netherlands',

    'Belgium',

    'Italy'

  ];

  ngOnInit() {

    this.loadProfile();

  }

  loadProfile() {
    
    const userID = Number(localStorage.getItem('UserID'));

    this.profileService.getProfile(userID)
      .subscribe({
        next: (res: any) => {

          if (res.success) {

            this.profile.userID = res.userID;

            this.profile.userName = res.userName;

            this.profile.email = res.email;

            this.profile.teamName = res.teamName;

            this.profileImage =

              res.profileImage
                ? res.profileImage
                : '/Profile/DefaultProfile.png';

          }
          this.cdr.detectChanges();
        },

        error: (err) => {

          console.log(err);

        }

      });

  }

  goBack() {

    this.location.back();

  }

  onImageSelected(event: any) {
    debugger;
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onload = (e: any) => {

      this.profileImage = e.target.result;
      this.cdr.detectChanges();
      console.log(this.profileImage); // Check the Base64 string

    };

    reader.readAsDataURL(file);

  }
  //   onImageSelected(event: any) {

  //     if (event.target.files.length == 0)
  //       return;

  //     const file = event.target.files[0];

  //     const reader = new FileReader();

  //     reader.onload = () => {

  //       this.profileImage = reader.result as string;

  //     };

  //     reader.readAsDataURL(file);

  //   }

  saveProfile() {
    debugger;
    this.successMessage = '';
    this.errorMessage = '';
    this.isLoading = true;
    const obj = {

      userID: this.profile.userID,

      userName: this.profile.userName,

      teamName: this.profile.teamName,

      profileImage: this.profileImage

    };

    this.profileService.updateProfile(obj)
      .subscribe({

        next: (res: any) => {

          this.isLoading = false;
          if (res.status == 1) {

            // localStorage.setItem(
            //   'UserName',
            //   this.profile.userName
            // );

            localStorage.setItem(
              'SelectedTeam',
              this.profile.teamName
            );

            // localStorage.setItem(
            //   'ProfileImage',
            //   this.profileImage
            // );
            this.profileService.updateProfileImage(
              this.profileImage
            );

            this.profileService.updateUserName(
              this.profile.userName
            );
            this.notification.success(res.message);
            
            // alert(res.message);

          }
          else {

            this.successMessage = '';
            this.errorMessage = res.message;
            this.notification.error(res.message);
            
          }

        },

        error: (err) => {

          this.isLoading = false;
          this.successMessage = '';

          this.errorMessage =
            err.error.message || 'Something went wrong.';
            

        }

      });

  }

  logout() {

     // Clear all saved data
  localStorage.clear();
setTimeout(() => {
  this.router.navigate(['/login']);
}, 1000);
  // Navigate to Login
  

  }
}
