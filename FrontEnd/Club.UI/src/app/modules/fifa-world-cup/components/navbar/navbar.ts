import { Component } from '@angular/core';
import { Home } from '../../pages/home/home';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProfileService } from '../../../../core/services/profileServices/profile-service';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule,RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
   profileImage = '/Profile/DefaultProfile.png';

  constructor(
    private profileService: ProfileService
  ) {}

  ngOnInit() {

    
    this.profileImage = localStorage.getItem('ProfileImage') || '/Profile/DefaultProfile.png';

    this.profileService.profileImage$
      .subscribe(image => {

        this.profileImage = image;

      });

  }

}
