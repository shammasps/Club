import { ChangeDetectorRef, Component } from '@angular/core';
import { PredictionService } from '../../../../core/services/predictionServices/prediction-services';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatchService } from '../../../../core/services/matchServices/match-service';
import { Footer } from '../../components/footer/footer';
import { DateTime } from 'luxon';
import { NotificationService } from '../../../../core/services/notification/notification-service';
import { Navbar } from '../../components/navbar/navbar';

@Component({
  selector: 'app-predict',
  imports: [FormsModule, CommonModule, Footer,Navbar],
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
    private notification: NotificationService,
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
                this.formatMatchDate(
                  match?.local_date,
                  Number(match?.stadium_id)
                ),

              matchDateObject:
                this.convertDate(
                  match?.local_date,
                  Number(match?.stadium_id)
                ),

              matchType: this.getMatchType(match?.type),

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
          this.startCountdown();
          console.log(this.predictions);

          this.cdr.detectChanges();

        },

        error: err => {

          console.log(err);

        }

      });

  }

  getMatchType(type: string): string {

    switch ((type || '').toLowerCase()) {

      case 'group':
        return 'Group Stage';

      case 'r32':
        return 'Round of 32';

      case 'r16':
        return 'Round of 16';

      case 'qf':
        return 'Quarter Final';

      case 'sf':
        return 'Semi Final';

      case 'third':
        return '3rd Place Playoff';

      case 'final':
        return 'Final';

      default:
        return type;

    }

  }

  convertDate(date: string, stadiumID: number): Date {

    const zone =
      this.stadiumTimeZones[stadiumID] ??
      'America/New_York';

    const dt = DateTime.fromFormat(

      date,

      'MM/dd/yyyy HH:mm',

      { zone }

    );

    return dt
      .setZone('Asia/Kolkata')
      .toJSDate();

  }
  formatMatchDate(
    date: string,
    stadiumID: number
  ): string {

    const zone =
      this.stadiumTimeZones[stadiumID] ??
      'America/New_York';

    return DateTime
      .fromFormat(

        date,

        'MM/dd/yyyy HH:mm',

        { zone }

      )
      .setZone('Asia/Kolkata')
      .toFormat(
        "ccc, dd LLL yyyy • hh:mm a"
      );

  }

  private countdownInterval: any;
  startCountdown() {

    this.updateCountdown();

    clearInterval(this.countdownInterval);

    this.countdownInterval =
      setInterval(() => {

        this.updateCountdown();

        this.cdr.detectChanges();

      }, 1000);

  }
updateCountdown() {

  const now = Date.now();

  this.predictions.forEach(item => {

    const diff =
      item.matchDateObject.getTime() - now;

    // Same logic as Home page
    const predictionCloseTime =
      item.matchDateObject.getTime() - (10 * 60 * 1000);

    item.predictionClosed = now >= predictionCloseTime;

    if (diff <= 0) {

      item.countdown = 'Kick Off';

      item.predictionClosed = true;

      return;

    }

    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);

    item.countdown =
      `${days}d ${hours}h ${minutes}m ${seconds}s`;

  });

}

  ngOnDestroy() {

    clearInterval(this.countdownInterval);

  }

  private stadiumTimeZones: { [key: number]: string } = {

    1: 'America/Mexico_City',
    2: 'America/Mexico_City',
    3: 'America/Monterrey',

    4: 'America/Chicago',
    5: 'America/Chicago',
    6: 'America/Chicago',

    7: 'America/New_York',
    8: 'America/New_York',
    9: 'America/New_York',
    10: 'America/New_York',
    11: 'America/New_York',

    12: 'America/Toronto',

    13: 'America/Vancouver',

    14: 'America/Los_Angeles',
    15: 'America/Los_Angeles',
    16: 'America/Los_Angeles'

  };


  showPredictionModal = false;

  selectedMatch: any = null;

  prediction = {

    homeScore: 0,

    awayScore: 0,
    homePenalty: 0,
  awayPenalty: 0

  };

  predictionResult = 'Draw';

  editPrediction(item: any) {

 if (item.predictionClosed) {

    this.notification.warning(
      'Prediction is closed.'
    );

    return;

  }

    this.selectedMatch = item;

    this.prediction = {

      homeScore: item.homeScore,

      awayScore: item.awayScore,
      homePenalty: item.homePenalty,
      awayPenalty: item.awayPenalty

    };

    this.updatePrediction();

    this.showPredictionModal = true;

  }

  closePrediction() {

    this.showPredictionModal = false;

  }
updatePrediction() {

  if (this.prediction.homeScore > this.prediction.awayScore) {

    this.predictionResult =
      `${this.selectedMatch.homeTeam} Wins`;

  }
  else if (this.prediction.homeScore < this.prediction.awayScore) {

    this.predictionResult =
      `${this.selectedMatch.awayTeam} Wins`;

  }
  else {

    if (this.prediction.homePenalty > this.prediction.awayPenalty) {

      this.predictionResult =
        `${this.selectedMatch.homeTeam} Wins on Penalties`;

    }
    else if (this.prediction.homePenalty < this.prediction.awayPenalty) {

      this.predictionResult =
        `${this.selectedMatch.awayTeam} Wins on Penalties`;

    }
    else {

      this.predictionResult =
        'Select Penalty Winner';

    }

  }

}
  increaseHomeScore() {

    this.prediction.homeScore++;

    this.updatePrediction();

  }

  decreaseHomeScore() {

    if (this.prediction.homeScore > 0) {

      this.prediction.homeScore--;

      this.updatePrediction();

    }

  }

  increaseAwayScore() {

    this.prediction.awayScore++;

    this.updatePrediction();

  }

  decreaseAwayScore() {

    if (this.prediction.awayScore > 0) {

      this.prediction.awayScore--;

      this.updatePrediction();

    }

  }

  increaseHomePenalty() {

  this.prediction.homePenalty++;

  this.updatePrediction();

}

decreaseHomePenalty() {

  if (this.prediction.homePenalty > 0) {

    this.prediction.homePenalty--;

    this.updatePrediction();

  }

}

increaseAwayPenalty() {

  this.prediction.awayPenalty++;

  this.updatePrediction();

}

decreaseAwayPenalty() {

  if (this.prediction.awayPenalty > 0) {

    this.prediction.awayPenalty--;

    this.updatePrediction();

  }

}

  savePrediction() {

    if (
  this.prediction.homeScore === this.prediction.awayScore &&
  this.prediction.homePenalty === this.prediction.awayPenalty
) {

  this.notification.warning(
    'Penalty shootout cannot end in a draw.'
  );

  return;

}

   const data = {

  userID: Number(localStorage.getItem('UserID')),

  matchID: this.selectedMatch.matchID,

  homeTeam: this.selectedMatch.homeTeam,

  awayTeam: this.selectedMatch.awayTeam,

  homeScore: this.prediction.homeScore,

  awayScore: this.prediction.awayScore,

  homePenalty: this.prediction.homePenalty,

  awayPenalty: this.prediction.awayPenalty,

  winner:
this.prediction.homeScore > this.prediction.awayScore
? this.selectedMatch.homeTeam
: this.prediction.homeScore < this.prediction.awayScore
? this.selectedMatch.awayTeam
: this.prediction.homePenalty > this.prediction.awayPenalty
? this.selectedMatch.homeTeam
: this.prediction.homePenalty < this.prediction.awayPenalty
? this.selectedMatch.awayTeam
: '',

  matchDate: this.selectedMatch.matchDate,

  matchType: this.selectedMatch.matchType,

  finished: this.selectedMatch.finished

};

    this.predictionService
      .savePrediction(data)
      .subscribe({

        next: (res: any) => {

          this.notification.success(res.message);

          this.showPredictionModal = false;

          this.loadPredictions();
          this.cdr.detectChanges();
        },

        error: (err) => {

          this.notification.error(err.error?.message);

        }

      });

  }

  isKnockoutMatch(): boolean {

  return this.selectedMatch &&
         this.selectedMatch.matchType !== 'Group Stage';

}

}
