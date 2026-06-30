import { Component } from '@angular/core';
import { DateTime } from 'luxon';
import { MatchService } from '../../../../core/services/matchServices/match-service';

@Component({
  selector: 'app-match-schedule-sync',
  imports: [],
  templateUrl: './match-schedule-sync.html',
  styleUrl: './match-schedule-sync.css',
})
export class MatchScheduleSync {

  constructor(
    private matchService: MatchService
  ) { }

  ngOnInit() {

    this.loadMatches();

  }

  loadMatches() {

    this.matchService.getMatches()
      .subscribe({

        next: (res: any) => {

          const data = res.games.map((m: any) => ({

            matchID: Number(m.id),

            homeTeam: m.home_team_name_en,

            awayTeam: m.away_team_name_en,

            matchType: this.getMatchType(m.type),

            matchDate: this.convertDate(
              m.local_date,
              Number(m.stadium_id)
            )

          }));

          console.log(data);

          this.matchService
            .saveSchedules(data)
            .subscribe({

              next: (r) => {

                console.log(r);

                alert('104 Matches Saved Successfully');

              },

              error: e => console.log(e)

            });

        }

      });

  }

  convertDate(date: string, stadiumId: number): string {

    const zone =
      this.stadiumTimeZones[stadiumId];

    
  return (
    DateTime.fromFormat(
      date,
      'MM/dd/yyyy HH:mm',
      { zone }
    )
      .setZone('Asia/Kolkata')
      .toISO() ?? ''
  );

  }

  getMatchType(type: string) {

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

  stadiumTimeZones: any = {

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

}
