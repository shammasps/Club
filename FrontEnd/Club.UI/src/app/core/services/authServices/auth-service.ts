import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    apiUrl = 'https://localhost:7180/api/Auth';
  constructor(private http: HttpClient) { }


  register(data: any) {
    return this.http.post(
      `${this.apiUrl}/Register`,
      data
    );
  }

  login(data: any) {
    return this.http.post(
      `${this.apiUrl}/Login`,
      data
    );
  }

}