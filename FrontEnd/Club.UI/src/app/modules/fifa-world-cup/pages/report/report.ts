import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Navbar } from '../../components/navbar/navbar';
import { Footer } from '../../components/footer/footer';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PredictionReportService } from '../../../../core/services/prediction-report-services/report-service';

@Component({
  selector: 'app-report',
  imports: [CommonModule, FormsModule, Footer, Navbar],
  templateUrl: './report.html',
  styleUrl: './report.css',
})
export class Report implements OnInit{

  matches: any[] = [];

  loading = false;

  constructor(
    private reportService: PredictionReportService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {

    this.loadStartedMatches();

  }

  loadStartedMatches() {

    this.loading = true;

    this.reportService
      .getStartedMatches()
      .subscribe({

        next: (res: any) => {

          this.matches = res.matches;
          

          console.log(this.matches);

          this.loading = false;
          this.cdr.detectChanges();

        },

        error: err => {

          console.log(err);

          this.loading = false;

        }

      });

  }

  downloadExcel(match: any) {

    this.reportService
      .downloadExcel(match.matchID)
      .subscribe({

        next: (file: Blob) => {

          const blob = new Blob([file], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          });

          const url =
            window.URL.createObjectURL(blob);

          const a =
            document.createElement('a');

          a.href = url;

          a.download =
            `${match.homeTeam}_vs_${match.awayTeam}.xlsx`;

          a.click();

          window.URL.revokeObjectURL(url);
this.cdr.detectChanges();
        },

        error: err => {

          console.log(err);

          alert('Download Failed');

        }

      });

  }
}
