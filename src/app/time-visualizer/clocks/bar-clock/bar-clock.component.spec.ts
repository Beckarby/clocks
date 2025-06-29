import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarClockComponent } from './bar-clock.component';

describe('BarClockComponent', () => {
  let component: BarClockComponent;
  let fixture: ComponentFixture<BarClockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BarClockComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarClockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
