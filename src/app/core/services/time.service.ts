import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, interval } from 'rxjs';
import { startWith, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimeService implements OnDestroy {
  private currentTimeSubject = new BehaviorSubject<Date>(new Date());
  public currentTime$: Observable<Date> = this.currentTimeSubject.asObservable();

  private timerSubscription: Subscription | undefined;
  private intervalMs: number = 1000; // Default update interval
  private isManualControlActive: boolean = false; 
  private timeOffset: number = 0; 

  constructor() {
    this.startTimer();
  }

  private startTimer(): void {
    // Clear any existing timer to prevent duplicates
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }

    if (!this.isManualControlActive) {
      this.timerSubscription = interval(this.intervalMs)
        .pipe(
          startWith(0),
          map(() => {
            const now = new Date();
            return new Date(now.getTime() + this.timeOffset);
          }),
        )
        .subscribe((adjustedTime) => {
          this.currentTimeSubject.next(adjustedTime);
        })
    }

    // this.timerSubscription = new Observable<Date>(observer => {
    //   const intervalId = setInterval(() => {
    //     observer.next(new Date());
    //   }, this.intervalMs);
    //   return () => clearInterval(intervalId); // Cleanup function
    // })
    // .subscribe(date => {
    //   this.currentTimeSubject.next(date);
    // });
  }

  public setTimeOffset(offsetMs: number): void {
    this.timeOffset = offsetMs;
    this.isManualControlActive = false;
    this.startTimer(); 
  }

  public resetToRealTime(): void {
    this.timeOffset = 0; // Reset offset to zero
    this.isManualControlActive = false;
    this.startTimer(); // Restart the timer to use real time
  }

  public setManualTime(date: Date): void {
    this.isManualControlActive = true;
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
    this.currentTimeSubject.next(date);
  }

  public resumeAutomaticTime(): void {
    this.timeOffset = 0; // Reset offset to zero
    this.isManualControlActive = false;
    this.startTimer(); 
  }

  public setInterval(ms: number): void {
    if (ms > 0 && ms !== this.intervalMs) {
      this.intervalMs = ms;
      if (!this.isManualControlActive) {
        this.startTimer();
      }
    }
  }

  public getCurrentTime(): Date {
    if (this.isManualControlActive) {
      return this.currentTimeSubject.getValue();
    } else {
      const now = new Date();
      return new Date(now.getTime() + this.timeOffset);
    }
  }

  public isUsingCustomTime(): boolean {
    return this.timeOffset !== 0 || this.isManualControlActive;
  }

  public getCurrentOffset(): number {
    return this.timeOffset;
  }

  ngOnDestroy(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe(); 
    }
  }
}