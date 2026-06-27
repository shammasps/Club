import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  private apiUrl = 'https://worldcup26.ir';

  constructor(private http: HttpClient) { }

  getMatches() {

    return this.http.get(
      `${this.apiUrl}/get/games`
    );

  }

  getTeams() {

    return this.http.get(
      `${this.apiUrl}/get/teams`
    );

  }

}