import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeVisualizerComponent } from './time-visualizer.component';

describe('TimeVisualizerComponent', () => {
  let component: TimeVisualizerComponent;
  let fixture: ComponentFixture<TimeVisualizerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimeVisualizerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeVisualizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
