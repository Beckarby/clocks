import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandleClockComponent } from './candle-clock.component';

describe('CandleClockComponent', () => {
  let component: CandleClockComponent;
  let fixture: ComponentFixture<CandleClockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CandleClockComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandleClockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
