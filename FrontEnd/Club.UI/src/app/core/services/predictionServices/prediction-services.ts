import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Prediction } from '../../../modules/models/prediction';

@Injectable({
  providedIn: 'root'
})
export class PredictionService {

  private apiUrl = 'https://localhost:7180/api/Prediction';

  constructor(private http: HttpClient) { }

  savePrediction(data: Prediction) {

    return this.http.post(
      `${this.apiUrl}/SavePrediction`,
      data
    );

  }

  getPredictions(userId:number){

    return this.http.get(
      `${this.apiUrl}/GetPredictions/${userId}`
    );

  }
getLeaderboard() {

  return this.http.get(
    `${this.apiUrl}/GetLeaderboard`
  );

}

}