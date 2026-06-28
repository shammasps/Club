import { ChangeDetectorRef, Component } from '@angular/core';
import { PredictionService } from '../../../../core/services/predictionServices/prediction-services';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatchService } from '../../../../core/services/matchServices/match-service';

@Component({
  selector: 'app-predict',
  imports: [FormsModule, CommonModule],
  templateUrl: './predict.html',
  styleUrl: './predict.css',
})
export class Predict {

  predictions: any[] = [];
  teams: any[] = [];

matches: any[] = [];

  constructor(
    private predictionService: PredictionService,
    private matchService: MatchService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.loadTeams();
    // this.loadPredictions();


  }
loadTeams() {

  this.matchService.getTeams()
    .subscribe({

      next: (res: any) => {

        this.teams = res.teams;

        this.loadMatches();

      },

      error: err => console.log(err)

    });

}

loadMatches() {

  this.matchService.getMatches()
    .subscribe({

      next: (res: any) => {

        this.matches = res.games;

        this.loadPredictions();

      },

      error: err => {

        console.log(err);

      }

    });

}
loadPredictions() {

  const userId =
    Number(localStorage.getItem('UserID'));

  this.predictionService
    .getPredictions(userId)
    .subscribe({

      next: (res: any) => {

        if (!res.success) {

          this.predictions = [];

          return;

        }

        this.predictions = res.predictions.map((p: any) => {

          // Find match by MatchID
          const match = this.matches.find(
            (m: any) => Number(m.id) === Number(p.matchID)
          );

          // Find team flags
          const home = this.teams.find(
            (t: any) =>
              t.id == match?.home_team_id
          );

          const away = this.teams.find(
            (t: any) =>
              t.id == match?.away_team_id
          );

          return {

            ...p,

            // Latest match details from API
            homeTeam:
              match?.home_team_name_en ??
              p.homeTeam,

            awayTeam:
              match?.away_team_name_en ??
              p.awayTeam,

            matchDate:
              match?.local_date ??
              p.matchDate,

            matchType:
              match?.type ??
              p.matchType,

            finished:
              match?.finished ??
              p.finished,

            group:
              match?.group,

            stadiumID:
              match?.stadium_id,

            homeFlag:
              home?.flag ??
              '/FIFALogo/team-placeholder.png',

            awayFlag:
              away?.flag ??
              '/FIFALogo/team-placeholder.png'

          };

        });

        console.log(this.predictions);

        this.cdr.detectChanges();

      },

      error: err => {

        console.log(err);

      }

    });

}

}
