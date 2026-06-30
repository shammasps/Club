import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ProfileService {

  apiUrl = `${environment.apiUrl}/Profile`;
    // apiUrl = 'https://localhost:7180/api/Profile';

  constructor(private http: HttpClient) {}


  // =============================
  // Profile Image Shared
  // =============================

  private profileImageSource = new BehaviorSubject<string>(
    localStorage.getItem('ProfileImage') || '/Profile/DefaultProfile.png'
  );

  profileImage$ = this.profileImageSource.asObservable();

  updateProfileImage(image: string) {

    localStorage.setItem('ProfileImage', image);

    this.profileImageSource.next(image);

  }

  // =============================
  // User Name Shared
  // =============================

  private userNameSource = new BehaviorSubject<string>(
    localStorage.getItem('UserName') || ''
  );

  userName$ = this.userNameSource.asObservable();

  updateUserName(name: string) {

    localStorage.setItem('UserName', name);

    this.userNameSource.next(name);

  }

   // =============================
  // API Calls
  // =============================


  getProfile(userId: number) {

    return this.http.get(

      `${this.apiUrl}/GetProfile/${userId}`

    );

  }

  updateProfile(data: any) {

    return this.http.post(

      `${this.apiUrl}/UpdateProfile`,

      data

    );

  }
}
