import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClockSelectorComponent } from './clock-selector.component';

describe('ClockSelectorComponent', () => {
  let component: ClockSelectorComponent;
  let fixture: ComponentFixture<ClockSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClockSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClockSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
