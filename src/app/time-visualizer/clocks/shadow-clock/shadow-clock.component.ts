import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { TimeService } from '../../../core/services/time.service';
import { Subscription } from 'rxjs';
import { Clock } from '../../interfaces/clock.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shadow-clock',
  imports: [CommonModule],
  templateUrl: './shadow-clock.component.html',
  styleUrl: './shadow-clock.component.css'
})
export class ShadowClockComponent implements OnInit, OnDestroy, Clock {
  @Input() clockName: string = 'Shadow Clock';

  shadowRotation: number = 0;
  shadowLength: number = 30;
  currentTime = '';

  hourMarkers: number[] = Array.from({ length: 12 }, (_, i) => i);

  private timeSubscription: Subscription | undefined;

  constructor(private timeService: TimeService) { }

  ngOnInit(): void {
    this.timeSubscription = this.timeService.currentTime$.subscribe(date => {
      this.updateShadow(date);
      this.currentTime = date.toLocaleTimeString();
    });
  }

  updateShadow(date: Date): void {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const decimalHours = hours + minutes / 60 + seconds / 3600
    this.shadowRotation = (decimalHours - 12) * 15;

    const sunElevation = Math.abs(decimalHours - 12) / 6
    this.shadowLength = 20 + sunElevation * 25;
  }

  getHourMarkerTransform(hour: number): string {
    const angle = (hour - 3) * 30;
    return `rotate(${angle} 50 50)`
  }

  getHourNumberPosition(hour: number): { x: number, y: number } {
    const angle = (hour - 3) * 30 * (Math.PI / 180);
    return {
      x: 50 + 32 * Math.cos(angle),
      y: 50 + 32 * Math.sin(angle)
    };
  }

  getHourNumber(hour: number): number {
    return hour === 0 ? 12 : hour;
  }

  getShadowEndPosition(): { x: number, y: number } {
    const angleRad = this.shadowRotation * (Math.PI / 180);
    return {
      x: 50 + this.shadowLength * Math.cos(angleRad),
      y: 50 + this.shadowLength * Math.sin(angleRad)
    };
  }

  ngOnDestroy(): void {
    if (this.timeSubscription) {
      this.timeSubscription.unsubscribe(); // Clean up the subscription
    }
  }
}
