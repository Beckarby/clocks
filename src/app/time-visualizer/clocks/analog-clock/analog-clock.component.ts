import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { TimeService } from '../../../core/services/time.service';
import { Subscription } from 'rxjs';
import { Clock } from '../../interfaces/clock.interface';

@Component({
  selector: 'app-analog-clock',
  imports: [],
  templateUrl: './analog-clock.component.html',
  styleUrl: './analog-clock.component.css'
})
export class AnalogClockComponent implements OnInit, OnDestroy, Clock {
  @Input() clockName: string = 'Analog Clock';
  
  hourHandDeg: number = 0;
  minuteHandDeg: number = 0;
  secondHandDeg: number = 0;

  private timeSubscription: Subscription | undefined;

  constructor(private timeService: TimeService) { }

  ngOnInit(): void {
      this.timeSubscription = this.timeService.currentTime$.subscribe(date => {
      this.updateClockHands(date);
    });
  }

  updateClockHands(date: Date): void {
    const seconds = date.getSeconds();
    const minutes = date.getMinutes();
    const hours = date.getHours();

    this.secondHandDeg = (seconds * 6);
    this.minuteHandDeg = (minutes * 6) + (seconds * 0.1); 
    this.hourHandDeg = (hours % 12) * 30 + (minutes * 0.5) + (seconds * (0.5 / 60)); 
  }

  ngOnDestroy(): void {
    if (this.timeSubscription) {
      this.timeSubscription.unsubscribe(); 
    }
  }

}
