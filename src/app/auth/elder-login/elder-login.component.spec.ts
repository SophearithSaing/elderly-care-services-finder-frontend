import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElderLoginComponent } from './elder-login.component';

describe('ElderLoginComponent', () => {
  let component: ElderLoginComponent;
  let fixture: ComponentFixture<ElderLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElderLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElderLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
