import { Injectable, ReflectiveInjector } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from 'rxjs/operators';

import { Elder } from "../models/elder.model";
import { Caregiver } from "../models/caregiver.model";
import { User } from '../models/user.model';
import { Schedule } from '../models/schedule.model';

import { Request } from '../models/request.model';
// import { History } from '../models/history.model';

import * as Fuse from 'fuse.js';
import { RequestComponent } from '../request/request.component';
import { stringify } from 'querystring';
import { dashCaseToCamelCase } from '@angular/compiler/src/util';
import { environment } from 'src/environments/environment';

const BACKEND_URL = environment.apiUrl;



@Injectable({ providedIn: "root" })
export class SearchService {

  private caregivers: Caregiver[] = [];
  private caregiverUpdated = new Subject<Caregiver[]>();

  private elders: Elder[] = [];
  private elder: Elder;
  private elderUpdated = new Subject<Elder[]>();

  private users: User[] = [];
  private userUpdated = new Subject<User[]>();

  private schedule: Schedule;
  private scheduleUpdate = new Subject<Schedule[]>();
  constructor(private http: HttpClient) { }

  // add elder
  addElder(
    name: string,
    email: string,
    birthDate: Date,
    gender: string,
    houseNumber: string,
    street: string,
    subDistrict: string,
    district: string,
    province: string,
    postalCode: string,
    phoneNumber: string,
    imagePath: string,
  ) {
    const elder = {
      _id: null,
      name: name,
      email: email,
      birthDate: birthDate,
      gender: gender,
      houseNumber: houseNumber,
      street: street,
      subDistrict: subDistrict,
      district: district,
      province: province,
      postalCode: postalCode,
      phoneNumber: phoneNumber,
      imagePath: imagePath
    };
    // const Data = new FormData();
    // Data.append("name", name);
    // Data.append("email", email);
    // Data.append("password", password);
    // Data.append("birthDate", birthDate);
    // Data.append("gender", gender);
    // Data.append("houseNumber", houseNumber);
    // Data.append("street", street);
    // Data.append("subDistrict", subDistrict);
    // Data.append("district", district);
    // Data.append("province", province);
    // Data.append("postalCode", postalCode);
    // Data.append("phoneNumber", phoneNumber);
    // Data.append("image", image);
    // console.log(image);
    this.http
      // .post<{ message: string, postId: string }>('http://localhost:3000/api/elders', Data)
      .post<{ message: string, postId: string }>(BACKEND_URL + 'elders', elder)
      .subscribe(responseData => {
        // const id = responseData.postId;
        // elder._id = id;
        // this.elders.push(elder);
        // this.elderUpdated.next([...this.elders]);
      });
  }
  // update elder
  UpdateElder(
    id: string,
    name: string,
    email: string,
    birthDate: Date,
    gender: string,
    houseNumber: string,
    street: string,
    subDistrict: string,
    district: string,
    province: string,
    postalCode: string,
    phoneNumber: string,
    imagePath: string
  ) {
    const elder = {
      _id: id,
      name: name,
      email: email,
      birthDate: birthDate,
      gender: gender,
      houseNumber: houseNumber,
      street: street,
      subDistrict: subDistrict,
      district: district,
      province: province,
      postalCode: postalCode,
      phoneNumber: phoneNumber,
      imagePath: imagePath
    };
    // const dateString = birthDate.toString;
    // const Data = new FormData();
    // Data.append("_id", id);
    // Data.append("name", name);
    // Data.append("email", email);
    // Data.append("birthDate", birthDate);
    // Data.append("gender", gender);
    // Data.append("houseNumber", houseNumber);
    // Data.append("street", street);
    // Data.append("subDistrict", subDistrict);
    // Data.append("district", district);
    // Data.append("province", province);
    // Data.append("postalCode", postalCode);
    // Data.append("phoneNumber", phoneNumber);
    // Data.append("image", image);
    // console.log('running http://localhost:3000/api/elders/' + email);
    this.http
      .patch(BACKEND_URL + "elders/" + email, elder)
      .subscribe(response => {
        console.log(response);
        // const updatedUsers = [...this.elders];
        // const oldIndex = updatedUsers.findIndex(u => u.email === elder.email);
        // updatedUsers[oldIndex] = elder;
        // this.elders = updatedUsers;
        // this.elderUpdated.next([...this.elders]);
      });
  }
  // get one elder for update
  getElder(email: string) {
    return this.http.get<{ _id: string, name: string, email: string, password: string, birthDate: Date, gender: string, houseNumber: string, street: string, subDistrict: string, district: string, province: string, postalCode: string, phoneNumber: string, imagePath: string }>(
      BACKEND_URL + "elders/" + email
    );
  }
  // get all elders
  getElders() {
    this.http
      .get<{ message: string; users: any }>(
        BACKEND_URL + 'elders'
      )
      .subscribe((data) => {
        this.elders = data.users;
        this.elderUpdated.next([...this.elders]);
      });
  }
  getElderUpdateListener() {
    return this.elderUpdated.asObservable();

  }

  ////////////////////////////////////////////////////////////////////////
  addUser(
    name: string,
    email: string,
    password: string,
  ) {
    const user: User =
    {
      _id: null,
      name: name,
      email: email,
      password: password,
    };
    this.http
      .post<{ message: string, userId: string }>(BACKEND_URL + 'users', user)
      .subscribe(responseData => {
        const id = responseData.userId;
        user._id = id;
        this.users.push(user);
        this.userUpdated.next([...this.users]);
      });
  }
  updateUser(id: string, name: string, email: string, password: string) {
    const user: User = { _id: id, name: name, email: email, password: password };
    this.http
      .put(BACKEND_URL + "users/" + id, user)
      .subscribe(response => {
        const updatedUsers = [...this.users];
        const oldIndex = updatedUsers.findIndex(u => u._id === user._id);
        updatedUsers[oldIndex] = user;
        this.users = updatedUsers;
        this.userUpdated.next([...this.users]);
        // this.router.navigate(["/"]);
      });
  }
  getUser(id: string) {
    return this.http.get<{ _id: string, name: string, email: string, password: string }>(
      BACKEND_URL + "users/" + id
    );
  }
  getUsers() {
    this.http
      .get<{ message: string; users: any }>(
        BACKEND_URL + 'users'
      )
      .subscribe((data) => {
        this.users = data.users;
        this.userUpdated.next([...this.users]);
      });
  }
  getUserUpdateListener() {
    return this.userUpdated.asObservable();
  }
  ////////////////////////////////////////////////////////////////////////

  // add caregiver
  addCaregiver(
    name: string,
    email: string,
    birthDate: Date,
    gender: string,
    houseNumber: string,
    street: string,
    subDistrict: string,
    district: string,
    province: string,
    postalCode: string,
    phoneNumber: string,
    services: string,
    certificate: string,
    experience: string,
    dailyPrice: number,
    monthlyPrice: number,
    imagePath: string,
    schedule: Array<any>,
    approval: boolean
  ) {
    const caregiver =
    {
      _id: null,
      name: name,
      email: email,
      birthDate: birthDate,
      gender: gender,
      houseNumber: houseNumber,
      street: street,
      subDistrict: subDistrict,
      district: district,
      province: province,
      postalCode: postalCode,
      phoneNumber: phoneNumber,
      services: services,
      certificate: certificate,
      experience: experience,
      dailyPrice: dailyPrice,
      monthlyPrice: monthlyPrice,
      imagePath: imagePath,
      schedule: schedule,
      approval: approval
    };
    this.http
      .post<{ message: string, postId: string }>(BACKEND_URL + 'caregivers', caregiver)
      .subscribe(responseData => {
        // const id = responseData.postId;
        // caregiver._id = id;
        // this.caregivers.push(caregiver);
        // this.caregiverUpdated.next([...this.caregivers]);
      });
  }
  // update caregiver
  UpdateCaregiver(
    id: string,
    name: string,
    email: string,
    birthDate: Date,
    gender: string,
    houseNumber: string,
    street: string,
    subDistrict: string,
    district: string,
    province: string,
    postalCode: string,
    phoneNumber: string,
    imagePath: string
  ) {
    const caregiver = {
      _id: id,
      name: name,
      email: email,
      birthDate: birthDate,
      gender: gender,
      houseNumber: houseNumber,
      street: street,
      subDistrict: subDistrict,
      district: district,
      province: province,
      postalCode: postalCode,
      phoneNumber: phoneNumber,
      imagePath: imagePath
    };
    console.log(caregiver);
    this.http
      .patch(BACKEND_URL + "caregivers/" + email, caregiver)
      .subscribe(response => {
        // const updatedCaregiver = [...this.caregivers];
        // const oldIndex = updatedCaregiver.findIndex(u => u._id === caregiver._id);
        // updatedCaregiver[oldIndex] = caregiver;
        // this.caregivers = updatedCaregiver;
        // this.caregiverUpdated.next([...this.caregivers]);
      });
  }

  // update caregiver
  UpdateCaregiverSchedule(
    id: string,
    availability: Array<any>
  ) {
    // const caregiver: Caregiver = {
    //   _id: id,
    //   name: name,
    //   email: email,
    //   password: password,
    //   birthDate: birthDate,
    //   gender: gender,
    //   houseNumber: houseNumber,
    //   street: street,
    //   subDistrict: subDistrict,
    //   district: district,
    //   province: province,
    //   postalCode: postalCode,
    //   phoneNumber: phoneNumber,
    //   services: services,
    //   certificate: certificate,
    //   experience: experience,
    //   dailyPrice: dailyPrice,
    //   monthlyPrice: monthlyPrice,
    //   imagePath: imagePath,
    //   schedule: schedule
    // };
    this.http
      .put(BACKEND_URL + "caregivers/" + id, availability)
      .subscribe(response => { });
  }

  // add schedule
  addSchedule(
    caregiverEmail: string,
    availability: Array<any>
  ) {
    const schedule: Schedule =
    {
      _id: null,
      caregiverEmail: caregiverEmail,
      availability: availability
    };
    this.http
      .post<{ message: string, scheduleId: string }>(BACKEND_URL + 'schedules', schedule)
      .subscribe(responseData => {
        const id = responseData.scheduleId;
        schedule._id = id;
      });
  }



  // get schedule
  getSchedule(email: string) {
    return this.http.get<{ _id: string, caregiverEmail: string, availability: Array<any> }>(
      BACKEND_URL + "schedules/" + email
    );
  }

  // update schedule
  updateSchedule(id: string, email: string, availability: Array<any>) {
    const schedule: Schedule = {
      _id: id,
      caregiverEmail: email,
      availability: availability
    }
    this.http.put(BACKEND_URL + "schedules/" + email, schedule).subscribe(response => { });
    console.log("update schedule ran")
    console.log(availability);
    console.log(schedule);
  }



  // get one caregiver
  getCaregiver(email: string) {
    return this.http.get<{ _id: string, name: string, email: string, birthDate: Date, gender: string, houseNumber: string, street: string, subDistrict: string, district: string, province: string, postalCode: string, phoneNumber: string, services: string, certificate: string, experience: string, dailyPrice: number, monthlyPrice: number, imagePath: string }>(
      BACKEND_URL + "caregivers/" + email
    );
  }

  getCaregiverSchedule() {

  }
  // get all caregivers
  getCaregivers() {
    return this.http
      .get<{ users: any }>(
        BACKEND_URL + 'caregivers'
      );
    // .subscribe((data) => {
    // this.caregivers = data.users;
    // this.caregiverUpdated.next([...this.caregivers]);
    // });

  }
  getCaregiverUpdateListener() {
    return this.caregiverUpdated.asObservable();
  }

  results: any;
  newResult: any;

  // searchCaregivers(postalCode: string, startDate: Date, stopDate: Date, services: Array<any>) {
  //   let searchParams = new HttpParams();
  //   searchParams = searchParams.append('postalCode' , postalCode);
  //   console.log(searchParams);
  //   this.http
  //   .get<{ message: string; users: any }>(
  //     'http://localhost:3000/api/caregivers/',
  //     {
  //       params: searchParams
  //     }
  //   )
  //   .subscribe((data) => {
  //     this.results = data.users;
  //     console.log(this.results);
  //   });
  // }

  searchCaregivers(postalCode: string, startDate: Date, stopDate: Date, services: Array<any>): any {
    this.http
      .get<{ message: string; users: any }>(
        BACKEND_URL + 'caregivers/',
      )
      .subscribe((data) => {
        const postalSearch: Fuse.FuseOptions<any> = {
          keys: ['postalCode'],
        };
        const fuse = new Fuse(data.users, postalSearch);

        this.results = fuse.search(`${postalCode}`);
        console.log(this.results);
        const dateSearch: Fuse.FuseOptions<any> = {
          keys: ['schedule.startDate', 'schedule.stopDate'],
        };
        const newfuse = new Fuse(this.results, dateSearch);
        this.results = newfuse.search(`${startDate}`);
        console.log(`search for date ${startDate}`);
        console.log(dateSearch);
        console.log(this.results);

        return this.results;
      });
  }

  sendRequest(elderEmail: string, caregiverEmail: string, elderName: string, caregiverName: string, startDate: Date, stopDate: Date, requireInterview: boolean, status: boolean) {
    const request: Request = {
      _id: null,
      elderEmail: elderEmail,
      elderName,
      caregiverEmail: caregiverEmail,
      caregiverName,
      startDate: startDate,
      stopDate: stopDate,
      requireInterview: requireInterview,
      status: null,
      rejectionReason: null
    };
    console.log(request);
    this.http
      .post<{ message: string, postId: string }>(BACKEND_URL + 'requests', request)
      .subscribe(response => { });
  }

  getRequests(email: string) {
    return this.http
      .get<{ requests: Array<any> }>(
        BACKEND_URL + 'requests/' + email
      );
    // .subscribe((data) => {
    // });
  }

  getHistory(email: string) {
    return this.http
      .get<{ requests: Array<any> }>(
        BACKEND_URL + 'history/' + email
      );
    // .subscribe((data) => {
    // });
  }

  getRequest(id: string) {
    return this.http.get<{ _id: string, elderEmail: string, caregiverEmail: string, startDate: Date, stopDate: Date, requireInterview: boolean, status: boolean }>(
      BACKEND_URL + "requests/" + id
    );
  }

  updateRequest(item: Request, elderName: string, caregiverName: string, status: boolean, rejectionReason: string) {
    const request: Request = {
      _id: item._id,
      elderEmail: item.elderEmail,
      elderName,
      caregiverEmail: item.caregiverEmail,
      caregiverName,
      startDate: item.startDate,
      stopDate: item.stopDate,
      requireInterview: item.requireInterview,
      status,
      rejectionReason
    };
    console.log(request);
    const url = BACKEND_URL + 'requests/' + item._id;
    this.http
      .patch<{ message: string, postId: string }>(url, request)
      .subscribe(response => { });

    const requestStartDate = new Date(request.startDate);
    const requestStopDate = new Date(request.stopDate);

    console.log(requestStartDate);
    console.log(requestStopDate);

    const history = {
      _id: null,
      elderEmail: request.elderEmail,
      elderName,
      caregiverEmail: request.caregiverEmail,
      caregiverName,
      startDate: request.startDate,
      stopDate: request.stopDate,
      requireInterview: request.requireInterview,
      rating: null,
      review: null
    };
    console.log(history);
    this.http
      .post<{ message: string, postId: string }>(BACKEND_URL + 'history/', history)
      .subscribe(response => { });
  }

  updateHistory(item, rating, review) {
    console.log(item);
    const history = {
      _id: item._id,
      elderEmail: item.elderEmail,
      caregiverEmail: item.caregiverEmail,
      startDate: item.startDate,
      stopDate: item.stopDate,
      requireInterview: item.requireInterview,
      rating: rating,
      review: review
    };
    console.log(history);
    this.http
      .patch<{ message: string, postId: string }>(BACKEND_URL + 'history/' + item._id, history)
      .subscribe(response => { });
  }
}
