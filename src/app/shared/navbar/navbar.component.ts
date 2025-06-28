import { Component, type OnInit, type OnDestroy, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import type { Subscription } from 'rxjs';
import type { User } from 'firebase/auth';
import { AuthService } from '../../auth/auth.service';


@Component({
    selector: 'app-navbar',
    imports: [CommonModule, RouterModule],
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
    @Input() currentUser: User | null = null;
    isMenuOpen = false;

    constructor(
        private authService: AuthService,
        private router: Router
    ) {}

    toggleMobileMenu() {
        this.isMenuOpen = !this.isMenuOpen;
    }

    closeMobileMenu() {
        this.isMenuOpen = false;
    }

    async logout() {
        try{
            await this.authService.logout();
            this.router.navigate(['/login']);
            this.closeMobileMenu();
        } catch (error) {
            console.error('Logout error:', error);
        }
    }

    // this function is sus
    isLoggedIn(): boolean {
        return this.currentUser !== null;
    }

    getUserDisplayName(): string {
        if (this.currentUser?.displayName) {
            return this.currentUser.displayName
        }
        if (this.currentUser?.email) {
            return this.currentUser.email.split("@")[0]
        }
            return "User"
    }
}
