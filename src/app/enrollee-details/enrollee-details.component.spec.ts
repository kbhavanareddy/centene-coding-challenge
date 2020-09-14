import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrolleeDetailsComponent } from './enrollee-details.component';

describe('EnrolleeDetailsComponent', () => {
  let component: EnrolleeDetailsComponent;
  let fixture: ComponentFixture<EnrolleeDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnrolleeDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrolleeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
