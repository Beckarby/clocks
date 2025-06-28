import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth/auth.service';
import type { User } from 'firebase/auth';
import { Router } from '@angular/router';
import { NavbarComponent } from "../shared/navbar/navbar.component";
import { DigitalClockComponent } from "./clocks/digital-clock/digital-clock.component";
import { AnalogClockComponent } from "./clocks/analog-clock/analog-clock.component";
import { BinaryClockComponent } from "./clocks/binary-clock/binary-clock.component";
import { CandleClockComponent } from './clocks/candle-clock/candle-clock.component';
@Component({
  selector: 'app-time-visualizer',
  imports: [
    CommonModule, 
    NavbarComponent, 
    DigitalClockComponent, 
    AnalogClockComponent, 
    BinaryClockComponent, 
    CandleClockComponent
  ],
  templateUrl: './time-visualizer.component.html',
  styleUrls: ['./time-visualizer.component.css']
})
export class TimeVisualizerComponent {
    currentUser: User | null = null;
    constructor(private authService: AuthService, private router: Router) {}
    ngOnInit(): void {
        this.authService.user$.subscribe((User) => {
        this.currentUser = User;
        });
    }

    async onSignOut() {
    try {
        await this.authService.logout();
        this.router.navigate(['/login']);
    } catch (error: any) {
        console.error('Logout error:', error);
      }
    }

    isLoggedIn(): boolean {
        return this.currentUser !== null;
    }
}
