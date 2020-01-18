import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaregiverLoginComponent } from './caregiver-login.component';

describe('CaregiverLoginComponent', () => {
  let component: CaregiverLoginComponent;
  let fixture: ComponentFixture<CaregiverLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaregiverLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaregiverLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
