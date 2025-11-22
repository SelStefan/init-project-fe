import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

interface PostsResponse {
    posts: Post[];
    total: number;
    skip: number;
    limit: number;
}

interface Post {
    id: number;
    title: string;
    body: string;
    userId: number;
    tags: string[];
    reactions: {
        likes: number;
        dislikes: number;
    };
    views: number;
}

@Component({
    selector: 'app-home',
    imports: [MatTableModule, MatPaginatorModule],
    templateUrl: './home.html',
    styleUrl: './home.scss',
})
export class Home implements OnInit {
    posts = signal<Post[]>([]);
    total = signal<number>(0);
    skip = signal<number>(0);
    limit = signal<number>(10);

    httpClient = inject(HttpClient);

    displayedColumns: string[] = ['id', 'title', 'body', 'tags'];

    ngOnInit(): void {
        console.log('Home component initialized');
        this.getPosts();
    }

    getPosts() {
        // console.log(skip, limit);
        this.httpClient.get<PostsResponse>('https://dummyjson.com/posts/search',
            { params: { skip: this.skip(), limit: this.limit() } }).subscribe((res) => {
                console.log(res);
                this.posts.set(res.posts);
                this.total.set(res.total);
                this.skip.set(res.skip);
                this.limit.set(res.limit);
            });
    }

    onPageChange(event: PageEvent) {
        // console.log(event.pageIndex * event.pageSize, event.pageSize);
        this.skip.set(event.pageIndex * event.pageSize);
        this.limit.set(event.pageSize);
        this.getPosts();
    }
}
