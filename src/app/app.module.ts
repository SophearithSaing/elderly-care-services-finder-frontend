import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AngularFontAwesomeModule} from 'angular-font-awesome';


import { LoginComponent } from './auth/login/login.component';
import { SearchComponent } from './search/search.component';
import { HomeComponent } from './home/home.component';
import { HistoryComponent } from './history/history.component';
import { SignupComponent } from './signup/signup.component';
import { ResultComponent } from './result/result.component';
import { AuthSignUpComponent } from './auth/auth-sign-up/auth-sign-up.component';
import { AuthGuard } from './auth/auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { CaregiversSignupComponent } from './caregivers-signup/caregivers-signup.component';
import { CaregiverInfoComponent } from './caregiver-info/caregiver-info.component';
import { ElderInfoComponent } from './elder-info/elder-info.component';
import { CaregiverRegisterComponent } from './caregiver-register/caregiver-register.component';
import { ElderRegisterComponent } from './elder-register/elder-register.component';
import { ElderProfileComponent } from './elder-profile/elder-profile.component';
import { CaregiverProfileComponent } from './caregiver-profile/caregiver-profile.component';
import { EldersSignupComponent } from './elders-signup/elders-signup.component';
import { ElderHomeComponent } from './elder-home/elder-home.component';
import { CaregiverHomeComponent } from './caregiver-home/caregiver-home.component';
import { CaregiverLoginComponent } from './auth/caregiver-login/caregiver-login.component';
import { ElderLoginComponent } from './auth/elder-login/elder-login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatGridListModule} from '@angular/material/grid-list';
import { RequestComponent } from './request/request.component';
import { CalendarComponent } from './calendar/calendar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { CaregiverServicesComponent } from './caregiver-services/caregiver-services.component';
import { MatButtonModule } from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatRadioModule} from '@angular/material/radio';

import { RequestStatusComponent } from './request-status/request-status.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminApprovalComponent } from './admin-approval/admin-approval.component';
import { AdminServicesComponent } from './admin-services/admin-services.component';
import { AuthInterceptor } from './auth/auth-interceptor';
import { AdminAllusersComponent } from './admin-allusers/admin-allusers.component';
import { ChatAppComponent } from './chat-app/chat-app.component';
import { CaregiverHistoryComponent } from './caregiver-history/caregiver-history.component';
import { AdminAllactivitiesComponent } from './admin-allactivities/admin-allactivities.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { ElderNavComponent } from './elder-nav/elder-nav.component';
import { PasswordRecoveryComponent } from './password-recovery/password-recovery.component';
import { CaregiverExperienceComponent } from './caregiver-experience/caregiver-experience.component';
import { MessagesComponent } from './messages/messages.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { CaregiverNavComponent } from './caregiver-nav/caregiver-nav.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminNavComponent } from './admin-nav/admin-nav.component';


const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'admin-login', component: AdminLoginComponent},
  { path: 'admin-home', component: AdminHomeComponent, canActivate: [AuthGuard] },
  { path: 'admin-allusers', component: AdminAllusersComponent, canActivate: [AuthGuard] },
  { path: 'admin-allactivities', component: AdminAllactivitiesComponent, canActivate: [AuthGuard] },
  { path: 'admin-approval', component: AdminApprovalComponent, canActivate: [AuthGuard] },
  { path: 'admin-services', component: AdminServicesComponent },
  { path: 'caregiver-home', component: CaregiverHomeComponent, canActivate: [AuthGuard] },
  { path: 'elder-home', component: ElderHomeComponent, canActivate: [AuthGuard] },
  { path: 'signup', component: SignupComponent },
  { path: 'caregiver-login', component: CaregiverLoginComponent },
  { path: 'elder-login', component: ElderLoginComponent },
  { path: 'elder-register', component: ElderRegisterComponent },
  { path: 'caregiver-register', component: CaregiverRegisterComponent },
  { path: 'elder-register/:elderEmail', component: EldersSignupComponent, canActivate: [AuthGuard]},
  { path: 'caregiver-register/:caregiverEmail', component: CaregiversSignupComponent, canActivate: [AuthGuard]},
  { path: 'edit/:userId', component: SignupComponent, canActivate: [AuthGuard] },
  { path: 'auth-signup', component: AuthSignUpComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  // { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  // { path: 'elder-profile', component: ElderProfileComponent, canActivate: [AuthGuard] },
  { path: 'elder-profile', component: ElderProfileComponent, canActivate: [AuthGuard]},
  // { path: 'caregiver-profile', component: CaregiverProfileComponent, canActivate: [AuthGuard] },
  { path: 'caregiver-profile', component: CaregiverProfileComponent, canActivate: [AuthGuard]},
  { path: 'eldersEdit/:eldersId', component: EldersSignupComponent, canActivate: [AuthGuard] },
  { path: 'search', component: SearchComponent, canActivate: [AuthGuard]},
  // { path: 'history', component: HistoryComponent, canActivate: [AuthGuard] },
  { path: 'history', component: HistoryComponent, canActivate: [AuthGuard]},
  { path: 'caregiver-history', component: CaregiverHistoryComponent, canActivate: [AuthGuard]},
  // { path: 'result', component: ResultComponent, canActivate: [AuthGuard] },
  { path: 'result', component: ResultComponent, canActivate: [AuthGuard]},
  { path: 'requests', component: RequestComponent, canActivate: [AuthGuard]},
  { path: 'requests-status', component: RequestStatusComponent, canActivate: [AuthGuard]},
  // { path: 'calendar/:email', component: CalendarComponent, canActivate: [AuthGuard]},
  { path: 'calendar', component: CalendarComponent, canActivate: [AuthGuard]},
  { path: 'services', component: CaregiverServicesComponent, canActivate: [AuthGuard]},
  { path: 'caregiver-experience', component: CaregiverExperienceComponent, canActivate: [AuthGuard]},
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password/:token', component: PasswordRecoveryComponent },
  { path: 'messages', component: MessagesComponent, canActivate: [AuthGuard]},
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: '**', component: HomeComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    EldersSignupComponent,
    LoginComponent,
    SearchComponent,
    HomeComponent,
    HistoryComponent,
    SignupComponent,
    ResultComponent,
    AuthSignUpComponent,
    ProfileComponent,
    CaregiversSignupComponent,
    CaregiverInfoComponent,
    ElderInfoComponent,
    CaregiverRegisterComponent,
    ElderRegisterComponent,
    ElderProfileComponent,
    CaregiverProfileComponent,
    ElderHomeComponent,
    CaregiverHomeComponent,
    CaregiverLoginComponent,
    ElderLoginComponent,
    RequestComponent,
    CalendarComponent,
    CaregiverServicesComponent,
    RequestStatusComponent,
    AdminHomeComponent,
    AdminApprovalComponent,
    AdminServicesComponent,
    AdminAllusersComponent,
    ChatAppComponent,
    CaregiverHistoryComponent,
    AdminAllactivitiesComponent,
    MainNavComponent,
    ElderNavComponent,
    PasswordRecoveryComponent,
    CaregiverExperienceComponent,
    MessagesComponent,
    ForgotPasswordComponent,
    CaregiverNavComponent,
    AdminLoginComponent,
    AdminNavComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    AngularFontAwesomeModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserAnimationsModule,
    MatSliderModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatCardModule,
    MatCheckboxModule,
    MatRadioModule,
    MatIconModule,
    MatDialogModule,
    MatToolbarModule,
    MatGridListModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    LayoutModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule
  ],
  providers: [
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
