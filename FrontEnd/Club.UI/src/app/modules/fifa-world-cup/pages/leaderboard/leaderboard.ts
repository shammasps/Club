import { ChangeDetectorRef, Component } from '@angular/core';
import { PredictionService } from '../../../../core/services/predictionServices/prediction-services';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Footer } from '../../components/footer/footer';
import { Navbar } from '../../components/navbar/navbar';

@Component({
  selector: 'app-leaderboard',
  imports: [FormsModule,CommonModule,Footer,Navbar],
  templateUrl: './leaderboard.html',
  styleUrl: './leaderboard.css',
})
export class Leaderboard {

   leaderboard: any[] = [];

  constructor(
    private predictionService: PredictionService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {

    this.loadLeaderboard();

  }

  loadLeaderboard() {

    this.predictionService
      .getLeaderboard()
      .subscribe({

        next: (res: any) => {

          console.log(res);

          if (!res.success) {

            this.leaderboard = [];

            return;

          }

          this.leaderboard = res.leaderboard;

          this.cdr.detectChanges();

        },

        error: (err) => {

          console.log(err);

        }

      });

  }

}
