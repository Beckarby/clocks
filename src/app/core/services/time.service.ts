import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { throttleTime } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TimeService implements OnDestroy {
  private currentTimeSubject = new BehaviorSubject<Date>(new Date());
  public currentTime$: Observable<Date> = this.currentTimeSubject.asObservable();

  private timerSubscription: Subscription | undefined;
  private intervalMs: number = 1000; // Default update interval

  constructor() {
    this.startTimer();
  }

  private startTimer(): void {
    // Clear any existing timer to prevent duplicates
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }

    this.timerSubscription = new Observable<Date>(observer => {
      const intervalId = setInterval(() => {
        observer.next(new Date());
      }, this.intervalMs);
      return () => clearInterval(intervalId); // Cleanup function
    })
    .subscribe(date => {
      this.currentTimeSubject.next(date);
    });
  }

  // Method to change the update interval (e.g., for testing or different clock speeds)
  public setInterval(ms: number): void {
    if (ms > 0 && ms !== this.intervalMs) {
      this.intervalMs = ms;
      this.startTimer();
    }
  }

  public getCurrentTime(): Date {
    return this.currentTimeSubject.getValue();
  }

  ngOnDestroy(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe(); 
    }
  }
}