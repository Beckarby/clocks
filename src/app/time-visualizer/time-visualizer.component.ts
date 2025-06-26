import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth/auth.service';
import type { User } from 'firebase/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-time-visualizer',
  imports: [CommonModule],
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
}
