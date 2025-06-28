import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { TimeService } from '../../../core/services/time.service';
import { Subscription } from 'rxjs';
import { Clock } from '../../interfaces/clock.interface';

@Component({
  selector: 'app-digital-clock',
  templateUrl: './digital-clock.component.html',
  styleUrls: ['./digital-clock.component.css']
})
export class DigitalClockComponent implements OnInit, OnDestroy, Clock {
  @Input() clockName: string = 'Digital Clock';
  currentTimeFormatted: string = '';
  private timeSubscription: Subscription | undefined;

  constructor(private timeService: TimeService) { }

  ngOnInit(): void {
    // Subscribe to the time service's observable
    this.timeSubscription = this.timeService.currentTime$.subscribe(date => {
      this.currentTimeFormatted = date.toLocaleTimeString('en-US', { hour12: false });
    });
  }

  ngOnDestroy(): void {
    if (this.timeSubscription) {
      this.timeSubscription.unsubscribe(); // Clean up the subscription
    }
  }
}