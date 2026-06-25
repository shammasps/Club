import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Home } from './modules/fifa-world-cup/pages/home/home';
import { Footer } from './modules/fifa-world-cup/components/footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Club.UI');
}
