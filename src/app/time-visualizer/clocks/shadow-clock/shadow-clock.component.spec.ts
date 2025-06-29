import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShadowClockComponent } from './shadow-clock.component';

describe('ShadowClockComponent', () => {
  let component: ShadowClockComponent;
  let fixture: ComponentFixture<ShadowClockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShadowClockComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShadowClockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
