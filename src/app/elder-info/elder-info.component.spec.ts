import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElderInfoComponent } from './elder-info.component';

describe('ElderInfoComponent', () => {
  let component: ElderInfoComponent;
  let fixture: ComponentFixture<ElderInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElderInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElderInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
