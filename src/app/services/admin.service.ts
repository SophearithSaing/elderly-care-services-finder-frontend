import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

const BACKEND_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  serviceId = '5e231b73a3748a35d8b6b467';

  constructor(private http: HttpClient) { }

  UpdateCGStatus(id: string, email: string, approval: boolean) {
    const caregiver = {
      _id: id,
      email,
      approval
    };
    this.http
    .patch(BACKEND_URL + 'caregivers/' + email, caregiver)
    .subscribe(response => { });
    console.log(caregiver);
  }

  GetCaregivers() {
    return this.http
    .get<{ message: string; users: any }>(
      BACKEND_URL + 'caregivers/',
    );
  }

  AddReason(caregiverEmail: string, reason: string) {
    const rejection = {
      caregiverEmail,
      reason
    };
    this.http.post(BACKEND_URL + 'rejections', rejection).subscribe(Response => {});
  }

  // initService() {
  //   const dailyCare = [
  //     'Bathroom Assistance', 'Dressing Assitance', 'Meals', 'Joyful Companionship'
  //   ];
  //   const specialCare = [
  //     'Rehabilitation', 'Medicine'
  //   ];
  //   const services = {
  //     dailyCare,
  //     specialCare
  //   };
  //   this.http.post(BACKEND_URL + 'services/', services).subscribe(Response => {});
  // }

  GetServices() {
    return this.http.get<{dailyCare: Array<any>, specialCare: Array<any>}>(BACKEND_URL + 'services/' + this.serviceId);
  }

  UpdateServices(dailyCare: any, specialCare: any) {
    const services = {
      dailyCare,
      specialCare
    };
    this.http
    .patch(BACKEND_URL + 'services/', services)
    .subscribe(response => { });
  }
}
