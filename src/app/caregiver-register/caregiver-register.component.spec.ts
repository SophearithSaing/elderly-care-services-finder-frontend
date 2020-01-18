import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaregiverRegisterComponent } from './caregiver-register.component';

describe('CaregiverRegisterComponent', () => {
  let component: CaregiverRegisterComponent;
  let fixture: ComponentFixture<CaregiverRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaregiverRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaregiverRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
