import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
    selector: 'app-test',
    imports: [MatSlideToggleModule],
    templateUrl: './test.html',
    styleUrl: './test.scss',
})
export class Test implements OnInit {
    httpClient = inject(HttpClient);

    ngOnInit(): void {
        this.httpClient.get('http://localhost:5055/WeatherForecast').subscribe((res) => {
            console.log(res);
        });
    }
}
