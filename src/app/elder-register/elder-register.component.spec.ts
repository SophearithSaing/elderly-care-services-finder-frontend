import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElderRegisterComponent } from './elder-register.component';

describe('ElderRegisterComponent', () => {
  let component: ElderRegisterComponent;
  let fixture: ComponentFixture<ElderRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElderRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElderRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
