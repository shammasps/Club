import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PredictionReportService {
apiUrl = `${environment.apiUrl}/PredictionReport`;
//   private apiUrl =
//     'https://localhost:7180/api/PredictionReport';

  constructor(
    private http: HttpClient
  ) { }

  // Get Started Matches
  getStartedMatches() {

    return this.http.get(
      `${this.apiUrl}/GetStartedMatches`
    );

  }

  // Download Excel
  downloadExcel(matchId: number) {

    return this.http.get(

      `${this.apiUrl}/DownloadExcel/${matchId}`,

      {
        responseType: 'blob'
      }

    );

  }

}