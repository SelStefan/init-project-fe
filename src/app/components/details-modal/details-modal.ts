import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Post } from '../home/home';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-details-modal',
    imports: [CommonModule, FormsModule, MatDialogModule, MatButtonModule],
    templateUrl: './details-modal.html',
    styleUrl: './details-modal.scss',
})
export class DetailsModal {
    readonly dialogRef = inject(MatDialogRef<DetailsModal>);
    readonly data = inject<Post>(MAT_DIALOG_DATA);
    readonly post = this.data;

    closeClick(): void {
        this.dialogRef.close();
    }
}
