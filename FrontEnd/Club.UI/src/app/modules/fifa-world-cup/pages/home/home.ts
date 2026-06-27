import { Component } from '@angular/core';
import { Footer } from '../../components/footer/footer';
import { RouterLink } from '@angular/router';
import { ProfileService } from '../../../../core/services/profileServices/profile-service';
import { MatchService } from '../../../../core/services/matchServices/match-service';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Footer, RouterLink,CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  constructor(
    private profileService: ProfileService,
    private matchService: MatchService,
    private cdr: ChangeDetectorRef
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

  ngOnInit() {

    this.loadTeams();

    this.profileService.profileImage$
      .subscribe(image => {

        this.profileImage = image;

      });

    this.profileService.userName$
      .subscribe(name => {

        this.userName = name;

      });

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
    this.matches.filter((x:any)=>
      x.finished === "FALSE"
    ).length
  );

  this.prepareMatches();
this.cdr.detectChanges();
},

        error: (err) => {

          console.log(err);

        }

      });

  }

  prepareMatches() {

  this.todayMatches = [];

  for (const match of this.matches) {

    // Skip finished matches
    if ((match.finished ?? '').toUpperCase() !== 'FALSE') {
      continue;
    }

    const home = this.teams.find(
      t => t.name_en === match.home_team_name_en
    );

    const away = this.teams.find(
      t => t.name_en === match.away_team_name_en
    );

    this.todayMatches.push({

      id: match.id,

      homeTeam:
        match.home_team_name_en ??
        match.home_team_label ??
        'TBD',

      awayTeam:
        match.away_team_name_en ??
        match.away_team_label ??
        'TBD',

      homeFlag: home?.flag || '/FIFALogo/team-placeholder.png',

      awayFlag: away?.flag || '/FIFALogo/team-placeholder.png',

      date: match.local_date,

      group: match.group,

      type: match.type,

      stadiumID: match.stadium_id,

      finished: match.finished,

      timeElapsed: match.time_elapsed

    });

  }

  this.todayMatches.sort((a, b) => {

    return this.convertDate(a.date).getTime()
      - this.convertDate(b.date).getTime();

  });

  console.log("Upcoming Matches");
  console.log(this.todayMatches);

}

convertDate(date: string): Date {

  const [datePart, timePart] = date.split(' ');

  const [month, day, year] = datePart.split('/').map(Number);

  const [hour, minute] = timePart.split(':').map(Number);

  return new Date(
    year,
    month - 1,
    day,
    hour,
    minute
  );

}
trackByMatchId(index: number, match: any): string {
  return match.id;
}

}