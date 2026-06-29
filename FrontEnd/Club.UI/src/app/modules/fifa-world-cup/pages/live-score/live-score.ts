import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatchService } from '../../../../core/services/matchServices/match-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-live-score',
  imports: [CommonModule,FormsModule],
  templateUrl: './live-score.html',
  styleUrl: './live-score.css',
})
export class LiveScore implements OnInit, OnDestroy {

  teams: any[] = [];

  matches: any[] = [];

  liveMatches: any[] = [];

  refreshInterval: any;

  constructor(
    private matchService: MatchService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {

    this.loadTeams();

    // Refresh every 30 seconds
    this.refreshInterval = setInterval(() => {

      this.loadMatches();

    }, 30000);

  }

  ngOnDestroy() {

    clearInterval(this.refreshInterval);

  }

  loadTeams() {

    this.matchService.getTeams()
      .subscribe({

        next: (res: any) => {

          this.teams = res.teams;

          this.loadMatches();

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

          this.prepareLiveMatches();

        },

        error: err => {

          console.log(err);

        }

      });

  }

  prepareLiveMatches() {

    this.liveMatches = [];

    for (const match of this.matches) {

      // Show only live matches
      if (
        (match.finished ?? '').toUpperCase() !== 'FALSE' ||
        (match.time_elapsed ?? '').toLowerCase() === 'notstarted'
      ) {
        continue;
      }

      const home = this.teams.find(
        (t: any) => t.name_en === match.home_team_name_en
      );

      const away = this.teams.find(
        (t: any) => t.name_en === match.away_team_name_en
      );

      this.liveMatches.push({

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

        type: this.getMatchType(match.type),

        timeElapsed: match.time_elapsed,

        stadiumID: match.stadium_id,

        date: match.local_date

      });

    }

    this.liveMatches.sort((a, b) => {

      return this.convertDate(b.date).getTime() -
             this.convertDate(a.date).getTime();

    });

    console.log(this.liveMatches);

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
}
