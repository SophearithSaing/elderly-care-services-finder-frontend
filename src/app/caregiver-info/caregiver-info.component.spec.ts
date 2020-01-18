import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaregiverInfoComponent } from './caregiver-info.component';

describe('CaregiverInfoComponent', () => {
  let component: CaregiverInfoComponent;
  let fixture: ComponentFixture<CaregiverInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaregiverInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaregiverInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
