import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth/auth.service';
import { FormsModule } from '@angular/forms';
import type { User } from 'firebase/auth';
import { Router } from '@angular/router';
import { NavbarComponent } from "../shared/navbar/navbar.component";
import { DigitalClockComponent } from "./clocks/digital-clock/digital-clock.component";
import { AnalogClockComponent } from "./clocks/analog-clock/analog-clock.component";
import { BinaryClockComponent } from "./clocks/binary-clock/binary-clock.component";
import { CandleClockComponent } from './clocks/candle-clock/candle-clock.component';
import { ShadowClockComponent } from "./clocks/shadow-clock/shadow-clock.component";
import { TimeSliderComponent } from '../time-slider/time-slider.component';
import { WaterGlassClockComponent } from './clocks/water-glass-clock/water-glass-clock.component';
import { WordClockComponent } from './clocks/word-clock/word-clock.component';
import { BarClockComponent } from './clocks/bar-clock/bar-clock.component';
@Component({
  selector: 'app-time-visualizer',
  imports: [
    CommonModule,
    FormsModule,
    NavbarComponent,
    DigitalClockComponent,
    AnalogClockComponent,
    BinaryClockComponent,
    CandleClockComponent,
    ShadowClockComponent, 
    TimeSliderComponent,
    WaterGlassClockComponent,
    WordClockComponent,
    BarClockComponent
],
  templateUrl: './time-visualizer.component.html',
  styleUrls: ['./time-visualizer.component.css']
})
export class TimeVisualizerComponent {
    currentUser: User | null = null;
    isDarkTheme = false;

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
