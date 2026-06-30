import { Component } from '@angular/core';
import { Footer } from '../../components/footer/footer';
import { RouterLink } from '@angular/router';
import { ProfileService } from '../../../../core/services/profileServices/profile-service';
import { MatchService } from '../../../../core/services/matchServices/match-service';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PredictionService } from '../../../../core/services/predictionServices/prediction-services';
import { NotificationService } from '../../../../core/services/notification/notification-service';
import { DateTime } from 'luxon';
import { LiveScore } from '../live-score/live-score';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Footer, RouterLink, CommonModule, FormsModule, LiveScore],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  constructor(
    private profileService: ProfileService,
    private matchService: MatchService,
    private predictionService: PredictionService,
    private cdr: ChangeDetectorRef,
    private notification: NotificationService
  ) {

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

  profileImage = '/Profile/DefaultProfile.png';

  greeting = '';

  emoji = '';

  userName = '';

  matches: any[] = [];

  teams: any[] = [];

  todayMatches: any[] = [];

  userPredictions: any[] = [];

  ngOnInit() {


    // Load latest values immediately
     this.userName = localStorage.getItem('UserName') || '';

    this.profileImage = localStorage.getItem('ProfileImage') || '/Profile/DefaultProfile.png';

    this.profileService.userName$
      .subscribe(name => {
        this.userName = name;
      });

    this.profileService.profileImage$
      .subscribe(image => {
        this.profileImage = image;
      });


    this.loadTeams();
    this.loadUserPredictions();

    // this.profileService.profileImage$
    //   .subscribe(image => {

    //     this.profileImage = image;

    //   });

    // this.profileService.userName$
    //   .subscribe(name => {

    //     this.userName = name;

    //   });

  }

  onImageError(event: Event): void {
  const img = event.target as HTMLImageElement;
  img.src = '\Dummy_flag.png';
}

  loadTeams() {

    this.matchService.getTeams()
      .subscribe({

        next: (res: any) => {

          this.teams = res.teams;
          this.cdr.detectChanges();
          this.loadMatches();

        },

        error: (err) => {

          console.log(err);

        }

      });

  }

  loadMatches() {

    this.matchService.getMatches()
      .subscribe({

        next: (res: any) => {

          this.matches = res.games;
          this.cdr.detectChanges();
          console.log("Total Games :", this.matches.length);

          console.log(
            "Upcoming :",
            this.matches.filter((x: any) =>
              x.finished === "FALSE"
            ).length
          );

          this.prepareMatches();
          this.startCountdown();
          this.cdr.detectChanges();
        },

        error: (err) => {

          console.log(err);

        }

      });

  }

  prepareMatches() {

    this.todayMatches = [];

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const nextFiveDays = new Date(today);
    nextFiveDays.setDate(today.getDate() + 5);
    nextFiveDays.setHours(23, 59, 59, 999);

    for (const match of this.matches) {

      // Skip finished matches
      if ((match.finished ?? '').toUpperCase() !== 'FALSE') {
        continue;
      }

      const matchDate = this.convertDate(
        match.local_date,
        Number(match.stadium_id)
      );

      // Show only today -> next 5 days
      if (matchDate < today || matchDate > nextFiveDays) {
        continue;
      }

      const teamsReady =
        match.home_team_id !== '0' &&
        match.away_team_id !== '0';

      const home = teamsReady
        ? this.teams.find(t => t.name_en === match.home_team_name_en)
        : null;

      const away = teamsReady
        ? this.teams.find(t => t.name_en === match.away_team_name_en)
        : null;

      this.todayMatches.push({

        id: match.id,

        homeTeam: teamsReady
          ? (match.home_team_name_en ?? 'TBD')
          : (match.home_team_label ?? 'TBD'),

        awayTeam: teamsReady
          ? (match.away_team_name_en ?? 'TBD')
          : (match.away_team_label ?? 'TBD'),

        homeFlag: teamsReady
          ? (home?.flag || '/FIFALogo/team-placeholder.png')
          : '/FIFALogo/team-placeholder.png',

        awayFlag: teamsReady
          ? (away?.flag || '/FIFALogo/team-placeholder.png')
          : '/FIFALogo/team-placeholder.png',

        teamsReady: teamsReady,

        predictionClosed: !teamsReady,

        date: match.local_date,

        matchDate: matchDate,

        formattedDate: this.formatMatchDate(
          match.local_date,
          Number(match.stadium_id)
        ),

        countdown: '',

        group: match.group,

        type: this.getMatchType(match.type),

        stadiumID: match.stadium_id,

        finished: match.finished,

        timeElapsed: match.time_elapsed

      });

    }

    this.todayMatches.sort(
      (a, b) => a.matchDate.getTime() - b.matchDate.getTime()
    );

    console.log('Upcoming Matches');
    console.log(this.todayMatches);

  }

  convertDate(date: string, stadiumId: number): Date {

    const zone = this.stadiumTimeZones[stadiumId];

    return DateTime.fromFormat(
      date,
      'MM/dd/yyyy HH:mm',
      { zone }
    )
      .setZone('Asia/Kolkata')
      .toJSDate();

  }

  trackByMatchId(index: number, match: any): string {
    return match.id;
  }


  showPredictionModal = false;

  selectedMatch: any = null;

  prediction = {
    homeScore: 0,
    awayScore: 0,
    homePenalty: 0,
  awayPenalty: 0
  };

  predictionResult = 'Draw';
  openPrediction(match: any) {

    

  document.body.style.overflow = 'hidden';
    if (!match.teamsReady) {

      this.notification.warning(
        'Prediction will open once both teams are confirmed.'
      );

      return;
    }

    if (match.predictionClosed) {

      this.notification.warning(
        'Prediction is closed. Predictions are allowed only until 10 minutes before kickoff.'
      );

      return;
    }

    this.selectedMatch = match;

  //   this.prediction = {
  //     homeScore: 0,
  //     awayScore: 0,
  //     homePenalty: 0,
  // awayPenalty: 0
  //   };

  const oldPrediction = this.userPredictions.find(
    (x:any) => Number(x.matchID) === Number(match.id)
);

if(oldPrediction){

    this.prediction = {

        homeScore: oldPrediction.homeScore,

        awayScore: oldPrediction.awayScore,

        homePenalty: oldPrediction.homePenalty ?? 0,

        awayPenalty: oldPrediction.awayPenalty ?? 0

    };

}
else{

    this.prediction = {

        homeScore: 0,

        awayScore: 0,

        homePenalty: 0,

        awayPenalty: 0

    };

}

    this.updatePrediction();

    this.showPredictionModal = true;
  }

  closePrediction() {

    this.showPredictionModal = false;


  document.body.style.overflow = 'auto';

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

isKnockoutMatch(): boolean {

  return this.selectedMatch &&
         this.selectedMatch.type !== 'Group Stage';

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

  savePrediction() {

    if (this.selectedMatch?.predictionClosed) {

      this.notification.warning(
        'Prediction time has expired.'
      );

      return;
    }

    if (
    this.prediction.homeScore === this.prediction.awayScore &&
    this.isKnockoutMatch() &&
    this.prediction.homePenalty === this.prediction.awayPenalty
) {

    this.notification.warning(
        'Penalty shootout cannot end in a draw.'
    );

    return;

}

    const data = {

      userID: Number(localStorage.getItem('UserID')),

      matchID: this.selectedMatch.id,

      homeTeam: this.selectedMatch.homeTeam,

      awayTeam: this.selectedMatch.awayTeam,

      homeScore: this.prediction.homeScore,

      awayScore: this.prediction.awayScore,
      homePenalty: this.prediction.homePenalty,

      awayPenalty: this.prediction.awayPenalty,

      matchDate: this.selectedMatch.date,

      matchType: this.selectedMatch.type,

      finished: this.selectedMatch.finished,

winner:
this.prediction.homeScore > this.prediction.awayScore
? this.selectedMatch.homeTeam
: this.prediction.homeScore < this.prediction.awayScore
? this.selectedMatch.awayTeam
: this.prediction.homePenalty > this.prediction.awayPenalty
? this.selectedMatch.homeTeam
: this.prediction.homePenalty < this.prediction.awayPenalty
? this.selectedMatch.awayTeam
: ''

    };

    this.predictionService.savePrediction(data)

      .subscribe({

        next: (res: any) => {

          console.log(res);

          // alert(res[0].Message);
          this.showPredictionModal = false;
          document.body.style.overflow = 'auto';
          this.notification.success(res.message);
          this.loadUserPredictions();
          // this.cdr.detectChanges();



        },

        error: (err) => {

          console.log(err);
          this.notification.error(err);
          // alert('Prediction Save Failed');

        }

      });

  }

  private countdownInterval: any;

  startCountdown() {

    this.updateCountdown();

    this.countdownInterval = setInterval(() => {

      this.updateCountdown();
      this.cdr.detectChanges();

    }, 1000);

  }
  updateCountdown() {

    const now = Date.now();

    this.todayMatches.forEach(match => {

      const diff = match.matchDate.getTime() - now;

      const predictionCloseTime =
        match.matchDate.getTime() - (10 * 60 * 1000);

      match.predictionClosed = now >= predictionCloseTime;

      if (diff <= 0) {

        match.countdown = 'Kick Off';

        return;

      }

      const days = Math.floor(diff / 86400000);
      const hours = Math.floor((diff % 86400000) / 3600000);
      const minutes = Math.floor((diff % 3600000) / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);

      match.countdown =
        `${days}d ${hours}h ${minutes}m ${seconds}s`;

    });

  }

  formatMatchDate(date: string, stadiumId: number): string {

    const matchDate = this.convertDate(date, stadiumId);

    return matchDate.toLocaleString('en-GB', {

      weekday: 'short',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone: 'Asia/Kolkata'

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

  private stadiumTimeZones: { [key: number]: string } = {

    // Mexico
    1: 'America/Mexico_City',
    2: 'America/Mexico_City',
    3: 'America/Monterrey',

    // USA Central
    4: 'America/Chicago', // Dallas
    5: 'America/Chicago', // Houston
    6: 'America/Chicago', // Kansas City

    // USA Eastern
    7: 'America/New_York', // Atlanta
    8: 'America/New_York', // Miami
    9: 'America/New_York', // Boston
    10: 'America/New_York', // Philadelphia
    11: 'America/New_York', // New York

    // Canada Eastern
    12: 'America/Toronto',

    // Canada Western
    13: 'America/Vancouver',

    // USA Western
    14: 'America/Los_Angeles', // Seattle
    15: 'America/Los_Angeles', // San Francisco
    16: 'America/Los_Angeles'  // Los Angeles
  };

  ngOnDestroy() {

  clearInterval(this.countdownInterval);

  document.body.style.overflow = 'auto';

}


loadUserPredictions() {

  const userId = Number(localStorage.getItem('UserID'));

  this.predictionService.getPredictions(userId)
    .subscribe({

      next: (res: any) => {

        if (res.success) {

          this.userPredictions = res.predictions;
          this.cdr.detectChanges();
          this.prepareMatches();
          

        }

      }

    });

}

}