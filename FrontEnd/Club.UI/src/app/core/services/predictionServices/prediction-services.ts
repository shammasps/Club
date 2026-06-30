import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Prediction } from '../../../modules/models/prediction';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PredictionService {

  apiUrl = `${environment.apiUrl}/Prediction`;
  // private apiUrl = 'https://localhost:7180/api/Prediction';

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