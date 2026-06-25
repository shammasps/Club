import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { Footer } from '../../components/footer/footer';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, FormsModule,Footer],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {

constructor(
    private location: Location
) {}
  
  // profileImage = 'https://i.pravatar.cc/200';
  profileImage = localStorage.getItem('ProfileImage') || '/Profile/DefaultProfile.png';

  profile = {

    userName: '',

    email: '',

    totalPoints: 0,

    rank: 0,

    totalPrediction: 0

  };
ngOnInit() {

    this.profile.userName =
      localStorage.getItem('UserName') || '';

    this.profile.email =
      localStorage.getItem('Email') || '';

    this.profileImage =
      localStorage.getItem('ProfileImage') ||
      'assets/images/default-user.png';

  }
  goBack(){

    this.location.back();

}
  onImageSelected(event: any) {

    if (event.target.files.length > 0) {

        const file = event.target.files[0];

        const reader = new FileReader();

        reader.onload = (e: any) => {

            this.profileImage = e.target.result;

            localStorage.setItem(
                'ProfileImage',
                this.profileImage
            );

        };

        reader.readAsDataURL(file);

    }

}

  saveProfile() {
    localStorage.setItem(
      'UserName',
      this.profile.userName
    );
    localStorage.setItem(
      'Email',
      this.profile.email
    );
    localStorage.setItem(
      'ProfileImage',
      this.profileImage
    );
    alert("Save API will be added in Part 2");

  }

  logout() {

    localStorage.clear();

    alert("Logout");

  }
}
