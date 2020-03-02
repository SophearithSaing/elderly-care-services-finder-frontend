import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAllactivitiesComponent } from './admin-allactivities.component';

describe('AdminAllactivitiesComponent', () => {
  let component: AdminAllactivitiesComponent;
  let fixture: ComponentFixture<AdminAllactivitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAllactivitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAllactivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
