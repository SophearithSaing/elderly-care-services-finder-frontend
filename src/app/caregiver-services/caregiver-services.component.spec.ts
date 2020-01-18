import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaregiverServicesComponent } from './caregiver-services.component';

describe('CaregiverServicesComponent', () => {
  let component: CaregiverServicesComponent;
  let fixture: ComponentFixture<CaregiverServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaregiverServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaregiverServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
