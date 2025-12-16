import { Component, inject, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogClose, MatDialogContent, MatDialogActions, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BaseDialog } from '../base/base-dialog';
import { FileUploadComponent, FileUploadOptions } from "../../services/common/file-upload/file-upload.component";
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/common/models/product.service';
import { List_Product_image } from '../../contracts/list_product_image';
import { DialogService } from '../../services/common/dialog.service';
import { DeleteDialogComponent, DeleteState } from '../delete-dialog/delete-dialog.component';
declare var $: any;

@Component({
  selector: 'app-select-product-image-dialog',
  imports: [MatDialogModule, MatDialogClose, MatDialogContent,
    MatDialogActions, MatFormFieldModule, MatInputModule,
    MatButtonModule, FileUploadComponent,
    MatCardModule, CommonModule
  ],
  templateUrl: './select-product-image-dialog.component.html',
  styleUrl: './select-product-image-dialog.component.scss'
})
export class SelectProductImageDialogComponent extends BaseDialog<SelectProductImageDialogComponent> {

  constructor(private productService: ProductService, private dialogService: DialogService) {
    super();
  }
  
  readonly data = inject<SelectState | string>(MAT_DIALOG_DATA);

  @Output() options: Partial<FileUploadOptions> = {
    controller: "products",
    action: "upload",
    isAdminPage: true,
    explanation: "Select or drop product images here...",
    accept: ".png,.jpg,.jpeg,.gif",
    queryString: `id=${this.data}`
  };

  images: List_Product_image[] = [];
  
  async ngOnInit(): Promise<void> {
    this.images = await this.productService.readImages(this.data as string);
  }

  async deleteImage(imageId: string, event: any) {
    this.dialogService.openDialog({
      componentType: DeleteDialogComponent,
      data: DeleteState.Yes,
      options: { },
      afterClosed: async () => {
        await this.productService.deleteImage(this.data as string, imageId, () => {
          $(event.target).closest('.example-card').fadeOut(500);
        });
      }
    });
  }
}

export enum SelectState {
  Close
}