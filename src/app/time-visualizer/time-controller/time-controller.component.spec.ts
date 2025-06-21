import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeControllerComponent } from './time-controller.component';

describe('TimeControllerComponent', () => {
  let component: TimeControllerComponent;
  let fixture: ComponentFixture<TimeControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimeControllerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
