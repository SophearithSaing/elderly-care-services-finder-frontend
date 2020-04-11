import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaregiverNavComponent } from './caregiver-nav.component';

describe('CaregiverNavComponent', () => {
  let component: CaregiverNavComponent;
  let fixture: ComponentFixture<CaregiverNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaregiverNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaregiverNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
