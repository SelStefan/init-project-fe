import { Component, inject, OnInit, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    imports: [MatCardModule, MatButtonModule, MatInputModule, MatFormFieldModule, FormsModule],
    templateUrl: './login.html',
    styleUrl: './login.scss',
})
export class Login {
    username = signal('');
    password = signal('');

    readonly router = inject(Router);
    readonly authService = inject(AuthService);

    login() {
        this.authService.login(this.username(), this.password());
    }
}
