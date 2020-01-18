import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

const BACKEND_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class AdmminService {

  constructor(private http: HttpClient) { }

  UpdateCGStatus(email: string, approval: boolean) {
    const caregiver = {
      email,
      approval
    };
    this.http
    .patch(BACKEND_URL + 'caregivers/' + email, caregiver)
    .subscribe(response => { });
  }

  UpdateServices(dailyCare: any, specialCare: any) {
    const service = {
      dailyCare,
      specialCare
    };
    this.http
    .patch(BACKEND_URL + 'services/', service)
    .subscribe(response => { });
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
    this.http.post(BACKEND_URL + 'rejections', rejection);
  }
}
