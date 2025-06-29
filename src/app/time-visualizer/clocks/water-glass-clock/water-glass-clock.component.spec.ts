import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterGlassClockComponent } from './water-glass-clock.component';

describe('WaterGlassClockComponent', () => {
  let component: WaterGlassClockComponent;
  let fixture: ComponentFixture<WaterGlassClockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WaterGlassClockComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WaterGlassClockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
