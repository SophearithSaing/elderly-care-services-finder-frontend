import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaregiverExperienceComponent } from './caregiver-experience.component';

describe('CaregiverExperienceComponent', () => {
  let component: CaregiverExperienceComponent;
  let fixture: ComponentFixture<CaregiverExperienceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaregiverExperienceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaregiverExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
