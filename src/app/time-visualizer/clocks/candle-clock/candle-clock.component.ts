import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { TimeService } from '../../../core/services/time.service';
import { Subscription } from 'rxjs';
import { Clock } from '../../interfaces/clock.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-candle-clock',
  imports: [CommonModule],
  templateUrl: './candle-clock.component.html',
  styleUrl: './candle-clock.component.css'
})
export class CandleClockComponent implements OnInit, OnDestroy, Clock {
  @Input() clockName: string = 'Candle Clock';

  candleHeightPercentage: number = 100;

  private totalBurnDurationMs: number = 24 * 60 * 60 * 1000; 

  private timeSubscription: Subscription | undefined;

  constructor(private timeService: TimeService) { }

  ngOnInit(): void {
    this.timeSubscription = this.timeService.currentTime$.subscribe(date => {
      this.updateCandleHeight(date);
    });
  }

  private updateCandleHeight(date: Date): void {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const milliseconds = date.getMilliseconds();

    const elapsedTodayMs = 
      (hours * 60 * 60 * 1000) + 
      (minutes * 60 * 1000) + 
      (seconds * 1000) + 
      milliseconds; 

    const percentageBurned = (elapsedTodayMs / this.totalBurnDurationMs) * 100;
    this.candleHeightPercentage = Math.max(0, 100 - percentageBurned); 
  }

  ngOnDestroy(): void {
    if (this.timeSubscription) {
      this.timeSubscription.unsubscribe(); // Clean up the subscription
    }
  }

}
