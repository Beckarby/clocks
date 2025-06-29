import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { TimeService } from '../../../core/services/time.service';
import { Subscription } from 'rxjs';
import { Clock } from '../../interfaces/clock.interface';

@Component({
  selector: 'app-water-glass-clock',
  imports: [],
  templateUrl: './water-glass-clock.component.html',
  styleUrl: './water-glass-clock.component.css'
})
export class WaterGlassClockComponent implements OnInit, OnDestroy, Clock {

  @Input() clockName: string = 'Water Glasses Clock';

  hourFillPercentage: number = 0; 
  minuteFillPercentage: number = 0;
  secondFillPercentage: number = 0;

  currentHours: string = '00';
  currentMinutes: string = '00';
  currentSeconds: string = '00';

  private timeSubscription: Subscription | undefined;

  constructor(private timeService: TimeService) { }

  ngOnInit(): void {
    this.timeSubscription = this.timeService.currentTime$.subscribe(date => {
      this.updateWaterGlass(date);
    });
  }

  private updateWaterGlass(date: Date): void {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    this.currentHours = this.padZero(hours);
    this.currentMinutes = this.padZero(minutes);
    this.currentSeconds = this.padZero(seconds);

    this.hourFillPercentage = (hours / 23) * 100; // 0 to 23 hours
    this.minuteFillPercentage = (minutes / 59) * 100; // 0 to 59 minutes
    this.secondFillPercentage = (seconds / 59) * 100; // 0 to 59 seconds
  
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
