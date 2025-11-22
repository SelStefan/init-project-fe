import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';

@Component({
    selector: 'app-home',
    imports: [],
    templateUrl: './home.html',
    styleUrl: './home.scss',
})
export class Home implements OnInit {

    httpClient = inject(HttpClient);

    ngOnInit(): void {
        console.log('Home component initialized');
        this.httpClient.get('https://dummyjson.com/posts/search').subscribe((res) => {
            console.log(res);
        });
    }
}
