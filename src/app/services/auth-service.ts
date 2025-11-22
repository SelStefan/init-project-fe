import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    isLoggedIn = signal(false);

    router = inject(Router);

    login(username: string, password: string) {
        console.log(username, password);

        username = username.trim().toLowerCase();

        if (username === 'test' && password === 'test123') {
            this.isLoggedIn.set(true);
            this.router.navigate(['/home']);
        } else {
            this.isLoggedIn.set(false);
        }
    }
}
