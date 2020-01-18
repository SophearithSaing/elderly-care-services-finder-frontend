import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EldersSignupComponent } from './elders-signup.component';

describe('EldersSignupComponent', () => {
  let component: EldersSignupComponent;
  let fixture: ComponentFixture<EldersSignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EldersSignupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EldersSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
