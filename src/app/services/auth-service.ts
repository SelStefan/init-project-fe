import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    isLoggedIn = signal(false);

    readonly router = inject(Router);

    login(username: string, password: string) {
        username = username.trim().toLowerCase();

        if (username === 'test' && password === 'test123') {
            this.isLoggedIn.set(true);
            this.router.navigate(['/home']);
        } else {
            this.isLoggedIn.set(false);
        }
    }

    logout(): void {
        this.isLoggedIn.set(false);
        this.router.navigate(['/login']);
    }
}
