import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAllusersComponent } from './admin-allusers.component';

describe('AdminAllusersComponent', () => {
  let component: AdminAllusersComponent;
  let fixture: ComponentFixture<AdminAllusersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAllusersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAllusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
