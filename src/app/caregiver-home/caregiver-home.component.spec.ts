import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaregiverHomeComponent } from './caregiver-home.component';

describe('CaregiverHomeComponent', () => {
  let component: CaregiverHomeComponent;
  let fixture: ComponentFixture<CaregiverHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaregiverHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaregiverHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
