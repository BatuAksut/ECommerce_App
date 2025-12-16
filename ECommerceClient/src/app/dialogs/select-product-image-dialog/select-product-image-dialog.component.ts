import { Component, inject, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogClose, MatDialogContent, MatDialogActions, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BaseDialog } from '../base/base-dialog';
import { FileUploadComponent, FileUploadOptions } from "../../services/common/file-upload/file-upload.component";
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-select-product-image-dialog',
  imports: [MatDialogModule, MatDialogClose, MatDialogContent, 
    MatDialogActions, MatFormFieldModule, MatInputModule, 
    MatButtonModule, FileUploadComponent,
    MatCardModule,CommonModule

  
  ],
  templateUrl: './select-product-image-dialog.component.html',
  styleUrl: './select-product-image-dialog.component.scss'
})
export class SelectProductImageDialogComponent extends BaseDialog<SelectProductImageDialogComponent> {

  readonly data = inject<SelectState|string>(MAT_DIALOG_DATA);
  x = [1,2,3,4,5];
  @Output() options: Partial<FileUploadOptions> = {
    controller: "products",
    action: "upload",
    isAdminPage: true,
    explanation: "Select or drop product images here...",
    accept: ".png,.jpg,.jpeg,.gif",
    queryString: `id=${this.data}`
  };
}



export enum SelectState{
  Close
}