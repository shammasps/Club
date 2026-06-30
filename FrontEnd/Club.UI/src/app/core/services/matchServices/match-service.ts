import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  // private apiUrl = 'https://worldcup26.ir';
   private worldCupApi = environment.worldCupApi;
  private apiUrl = `${environment.apiUrl}/Prediction`;

  constructor(private http: HttpClient) { }

  getMatches() {

    return this.http.get(
      `${this.worldCupApi}/get/games`
    );

  }

  getTeams() {

    return this.http.get(
      `${this.worldCupApi}/get/teams`
    );

  }

  saveSchedules(data: any[]) {
    return this.http.post(
      `${this.apiUrl}/SaveSchedules`,
      data
    );
}

}