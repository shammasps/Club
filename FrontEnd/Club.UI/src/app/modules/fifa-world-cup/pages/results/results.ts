import { ChangeDetectorRef, Component } from '@angular/core';
import { NotificationService } from '../../../../core/services/notification/notification-service';
import { PredictionService } from '../../../../core/services/predictionServices/prediction-services';
import { MatchService } from '../../../../core/services/matchServices/match-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Footer } from '../../components/footer/footer';
import { Navbar } from '../../components/navbar/navbar';

@Component({
  selector: 'app-results',
  imports: [CommonModule,FormsModule,Footer,Navbar],
  templateUrl: './results.html',
  styleUrl: './results.css',
})
export class Results {

  predictions: any[] = [];

teams: any[] = [];

matches: any[] = [];

finishedMatches: any[] = [];

constructor(
    private matchService: MatchService,
    private predictionService: PredictionService,
    private cdr: ChangeDetectorRef,
    private notification: NotificationService
  ) {}

ngOnInit() {

  this.loadTeams();

}

loadTeams() {

  this.matchService.getTeams()
    .subscribe({

      next: (res: any) => {

        this.teams = res.teams;

        this.loadMatches();
        this.cdr.detectChanges();

      },

      error: err => {

        console.log(err);

      }

    });

}

loadMatches() {

  this.matchService.getMatches()
    .subscribe({

      next: (res: any) => {

        this.matches = res.games;

        this.prepareFinishedMatches();
        this.cdr.detectChanges();

      },

      error: err => {

        console.log(err);

      }

    });

}

prepareFinishedMatches() {

  this.finishedMatches = [];

  for (const match of this.matches) {

    if ((match.finished ?? '').toUpperCase() !== 'TRUE') {

      continue;

    }

    const home = this.teams.find(
  (t: any) =>
    t.name_en === match.home_team_name_en
);

const away = this.teams.find(
  (t: any) =>
    t.name_en === match.away_team_name_en
);

    this.finishedMatches.push({

      id: match.id,

      homeTeam:
        match.home_team_name_en ??
        match.home_team_label,

      awayTeam:
        match.away_team_name_en ??
        match.away_team_label,

      homeFlag:
        home?.flag ??
        '/FIFALogo/team-placeholder.png',

      awayFlag:
        away?.flag ??
        '/FIFALogo/team-placeholder.png',

      homeScore: match.home_score,

      awayScore: match.away_score,

      homeScorers: match.home_scorers,

      awayScorers: match.away_scorers,

      group: match.group,

      type: match.type,

      date: match.local_date,

      finished: match.finished,

      timeElapsed: match.time_elapsed,

      stadiumID: match.stadium_id

    });

  }

  

  this.finishedMatches.sort((a, b) => {

    return this.convertDate(b.date).getTime()

      - this.convertDate(a.date).getTime();

  });

  console.log(this.finishedMatches);

  this.cdr.detectChanges();

}

formatScorers(scorers: string): string[] {

  if (!scorers || scorers === 'null') {
    return [];
  }

  return scorers
    .replace(/[{}"]/g, '')
    .split(',')
    .map(x => x.trim())
    .filter(x => x.length > 0);

}

convertDate(date: string): Date {

  const [datePart, timePart] = date.split(' ');

  const [month, day, year] =
    datePart.split('/').map(Number);

  const [hour, minute] =
    timePart.split(':').map(Number);

  return new Date(

    year,

    month - 1,

    day,

    hour,

    minute

  );

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
}
