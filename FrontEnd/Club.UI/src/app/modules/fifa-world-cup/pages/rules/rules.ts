import { Component } from '@angular/core';
import { Navbar } from '../../components/navbar/navbar';
import { Footer } from '../../components/footer/footer';

@Component({
  selector: 'app-rules',
  imports: [Navbar,Footer],
  templateUrl: './rules.html',
  styleUrl: './rules.css',
})
export class Rules {}
