import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Home } from './modules/fifa-world-cup/pages/home/home';
import { Footer } from './modules/fifa-world-cup/components/footer/footer';
import { Notification } from './shared/components/notification/notification';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,Notification],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Club.UI');
}

// this.notification.success('Profile updated successfully');

// this.notification.error('Invalid Username or Password');

// this.notification.warning('Prediction time expired');

// this.notification.info('Welcome Shammas');

// private cdr: ChangeDetectorRef
// this.cdr.detectChanges();