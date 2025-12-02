import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogClose, MatDialogContent, MatDialogActions, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-delete-dialog',
  imports: [MatFormFieldModule, MatInputModule, MatDialogClose,MatDialogContent,MatDialogActions,MatDialogModule,MatButtonModule],
  templateUrl: './delete-dialog.component.html',
  styleUrl: './delete-dialog.component.scss'
})
export class DeleteDialogComponent {

   readonly dialogRef = inject(MatDialogRef<DeleteDialogComponent>);
  readonly data = inject<DeleteState>(MAT_DIALOG_DATA);

  close(): void {
    this.dialogRef.close();
  }
  
}

export enum DeleteState{
  Yes,
  No
}