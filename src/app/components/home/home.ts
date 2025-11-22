import { HttpClient } from '@angular/common/http';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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
    imports: [MatTableModule, MatPaginatorModule, NgSelectModule, FormsModule, CommonModule],
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

    selectedTag = signal<number | null>(null);
    selectedTagValue = computed(() => this.tags.find(tag => tag.id === this.selectedTag())?.name);
    tags = [
        { id: 1, name: 'history' },
        { id: 2, name: 'american' },
        { id: 3, name: 'crime' },
        { id: 4, name: 'magical' },
        { id: 5, name: 'french' },
    ];

    ngOnInit(): void {
        console.log('Home component initialized');
        this.getPosts();
    }

    getPosts() {
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
        this.skip.set(event.pageIndex * event.pageSize);
        this.limit.set(event.pageSize);
        this.getPosts();
    }
}
