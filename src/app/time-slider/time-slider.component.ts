import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { TimeService } from '../core/services/time.service';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-time-slider',
  imports: [FormsModule],
  templateUrl: './time-slider.component.html',
  styleUrl: './time-slider.component.css'
})
export class TimeSliderComponent implements OnInit, AfterViewInit, OnDestroy {

  hour: number = 0;
  minute: number = 0;
  second: number = 0;
  isCustomTime: boolean = false;

  private timeSubscription: Subscription | undefined;

  constructor(private timeService: TimeService) { }

  ngOnInit(): void {
    this.timeSubscription = this.timeService.currentTime$.subscribe(date => {
      this.hour = date.getHours();
      this.minute = date.getMinutes();
      this.second = date.getSeconds();

      this.isCustomTime = this.timeService.isUsingCustomTime();
    });
  }

  ngAfterViewInit(): void {
    const now = this.timeService.getCurrentTime();
    this.hour = now.getHours();
    this.minute = now.getMinutes();
    this.second = now.getSeconds();
    this.isCustomTime = this.timeService.isUsingCustomTime();
  }

  onSliderChange(): void {
    const userTime = new Date();
    userTime.setHours(this.hour, this.minute, this.second, 0);

    const now = new Date();
    const offset = userTime.getTime() - now.getTime();
    this.timeService.setTimeOffset(offset);
    this.isCustomTime = true;
  }

  resetToCurrentTime(): void {
    this.timeService.resumeAutomaticTime();
    this.isCustomTime = false;
  }
  
  ngOnDestroy(): void {
    if (this.timeSubscription) {
      this.timeSubscription.unsubscribe(); // Clean up the subscription
    }
  }
}
