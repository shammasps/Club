import { Component } from '@angular/core';
import { Navbar } from '../../components/navbar/navbar';
import { Footer } from '../../components/footer/footer';

@Component({
  selector: 'app-home',
  imports: [Footer],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  profileImage =
    'https://i.pravatar.cc/100';
  userName = 'Shammas';

  greeting = '';

  emoji = '';

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
