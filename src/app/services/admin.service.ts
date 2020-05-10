import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { SearchService } from './search.service';

const BACKEND_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  serviceId = '5e231b73a3748a35d8b6b467';

  constructor(private http: HttpClient, private search: SearchService) { }

  UpdateCGStatus(id: string, email: string, name: string, approval: boolean) {
    let newCg = null;
    let experience =  null;
    if (approval === true) {
      newCg = true;
    }
    this.search.getCaregiver(email).subscribe(res => {
      experience = res.experience;
      const caregiver = {
        _id: id,
        email,
        name,
        approval,
        newCg,
        experience
      };
      this.http
      .patch(BACKEND_URL + 'caregivers/' + email, caregiver)
      .subscribe(response => { });
      console.log(caregiver);
    });
  }

  GetCaregivers() {
    return this.http
    .get<{ message: string; users: any }>(
      BACKEND_URL + 'u-caregivers/',
    );
  }

  AddReason(caregiverEmail: string, caregiverName: string, reason: string) {
    const rejection = {
      caregiverEmail,
      caregiverName,
      reason
    };
    this.http.post(BACKEND_URL + 'rejections', rejection).subscribe(Response => {});
  }

  UpdateReason(caregiverEmail: string, caregiverName: string, reason: string) {
    const rejection = {
      caregiverEmail,
      caregiverName,
      reason
    };
    this.http.patch(BACKEND_URL + 'rejections', rejection).subscribe(Response => {});
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
    .patch(BACKEND_URL + 'services/' + this.serviceId, services)
    .subscribe(response => { });
  }
}
