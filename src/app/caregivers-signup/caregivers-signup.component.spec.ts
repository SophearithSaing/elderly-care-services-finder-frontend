import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaregiversSignupComponent } from './caregivers-signup.component';

describe('CaregiversSignupComponent', () => {
  let component: CaregiversSignupComponent;
  let fixture: ComponentFixture<CaregiversSignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaregiversSignupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaregiversSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
