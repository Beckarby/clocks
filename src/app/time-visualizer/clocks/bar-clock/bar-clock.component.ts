import { Component, OnInit, OnDestroy, Input} from '@angular/core';
import { TimeService } from '../../../core/services/time.service';
import { Subscription } from 'rxjs';
import { Clock } from '../../interfaces/clock.interface';

@Component({
  selector: 'app-bar-clock',
  imports: [],
  templateUrl: './bar-clock.component.html',
  styleUrl: './bar-clock.component.css'
})
export class BarClockComponent implements OnInit, OnDestroy, Clock {
  @Input() clockName: string = 'Bar Clock';

  hourBarWidth: number = 0;
  minuteBarWidth: number = 0;
  secondBarWidth: number = 0;

  currentTimeDisplay: string = '';
  private timeSubscription: Subscription | undefined;
  constructor(private timeService: TimeService) { }

  ngOnInit(): void {
    this.timeSubscription = this.timeService.currentTime$.subscribe(date => {
      this.updateBarWidths(date);
    });
  }

  private updateBarWidths(date: Date): void {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const milliseconds = date.getMilliseconds();

    this.secondBarWidth = ((seconds + milliseconds / 1000) / 59.999) * 100;
    this.secondBarWidth = Math.min(100, Math.max(0, this.secondBarWidth));

    const totalSecondsInMinuteCycle = minutes * 60 + seconds + milliseconds / 1000;
    this.minuteBarWidth = (totalSecondsInMinuteCycle / 3599.999) * 100;
    this.minuteBarWidth = Math.min(100, Math.max(0, this.minuteBarWidth));

     const totalSecondsInHourCycle = hours * 3600 + minutes * 60 + seconds + milliseconds / 1000;
    this.hourBarWidth = (totalSecondsInHourCycle / 86399.999) * 100; 
    this.hourBarWidth = Math.min(100, Math.max(0, this.hourBarWidth));

    this.currentTimeDisplay = this.padZero(hours) + ':' + this.padZero(minutes) + ':' + this.padZero(seconds);
  }

  private padZero(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }

  ngOnDestroy(): void {
    if (this.timeSubscription) {
      this.timeSubscription.unsubscribe(); 
    }
  }
}
