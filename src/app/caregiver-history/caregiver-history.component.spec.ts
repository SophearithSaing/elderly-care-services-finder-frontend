import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaregiverHistoryComponent } from './caregiver-history.component';

describe('CaregiverHistoryComponent', () => {
  let component: CaregiverHistoryComponent;
  let fixture: ComponentFixture<CaregiverHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaregiverHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaregiverHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
