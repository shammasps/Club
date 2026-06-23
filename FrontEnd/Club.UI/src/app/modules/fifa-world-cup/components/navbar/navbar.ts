import { Component } from '@angular/core';
import { Home } from '../../pages/home/home';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
   profileImage =
    'https://i.pravatar.cc/100';

}
