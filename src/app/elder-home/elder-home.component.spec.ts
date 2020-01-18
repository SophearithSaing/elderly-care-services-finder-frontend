import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElderHomeComponent } from './elder-home.component';

describe('ElderHomeComponent', () => {
  let component: ElderHomeComponent;
  let fixture: ComponentFixture<ElderHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElderHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElderHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
