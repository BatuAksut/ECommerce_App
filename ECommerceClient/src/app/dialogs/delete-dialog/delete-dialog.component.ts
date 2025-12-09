import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogClose, MatDialogContent, MatDialogActions, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BaseDialog } from '../base/base-dialog';

@Component({
  selector: 'app-delete-dialog',
  imports: [MatFormFieldModule, MatInputModule, MatDialogClose,MatDialogContent,MatDialogActions,MatDialogModule,MatButtonModule],
  templateUrl: './delete-dialog.component.html',
  styleUrl: './delete-dialog.component.scss'
})
export class DeleteDialogComponent  extends BaseDialog<DeleteDialogComponent> {

   
  readonly data = inject<DeleteState>(MAT_DIALOG_DATA);


}

export enum DeleteState{
  Yes,
  No
}