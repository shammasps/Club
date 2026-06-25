import { Component } from '@angular/core';
import { Navbar } from '../../components/navbar/navbar';
import { Footer } from '../../components/footer/footer';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [Footer,RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  profileImage = localStorage.getItem('ProfileImage') || '/Profile/DefaultProfile.png';
  

  greeting = '';

  emoji = '';

  userName = '';

ngOnInit()
{
   this.userName =
      localStorage.getItem('UserName') || '';
}

  constructor() {

    const hour = new Date().getHours();

    if (hour < 12) {

      this.greeting = 'Good Morning';
      this.emoji = '☀️';

    }
    else if (hour < 17) {

      this.greeting = 'Good Afternoon';
      this.emoji = '🌤️';

    }
    else {

      this.greeting = 'Good Evening';
      this.emoji = '🌙';

    }

  }
}
