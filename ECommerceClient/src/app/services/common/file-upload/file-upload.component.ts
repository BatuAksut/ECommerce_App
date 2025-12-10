import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxFileDropModule, NgxFileDropEntry, FileSystemFileEntry } from 'ngx-file-drop';
import { HttpClientService } from '../http-client.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AlertifyService, MessageType, Position } from '../../admin/alertify.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { FileUploadDialogComponent, UploadState } from '../../../dialogs/file-upload-dialog/file-upload-dialog.component';
import { DialogService } from '../dialog.service'; 

@Component({
  selector: 'app-file-upload',
  imports: [NgxFileDropModule, CommonModule, FormsModule],
  standalone: true,
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss'
})
export class FileUploadComponent {
  
  constructor(
    private httpClientService: HttpClientService,
    private alertifyService: AlertifyService,
    private customToastrService: CustomToastrService,
    private dialogService: DialogService 
  ) { }

  public files: NgxFileDropEntry[] = [];

  @Input() options: Partial<FileUploadOptions> = {
    controller: "file-upload",
    action: "upload",
    explanation: "Please select a file to upload",
    accept: ".png,.jpg,.jpeg,.pdf"
  };

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    const fileData: FormData = new FormData();
    for (const file of files) {
      (file.fileEntry as FileSystemFileEntry).file((_file: File) => {
        fileData.append(_file.name, _file, file.relativePath);
      });
    }

  
    this.openDialog(() => {
      this.httpClientService.post({
        controller: this.options.controller,
        action: this.options.action,
        queryString: this.options.queryString,
        headers: new HttpHeaders({ "responseType": "blob" })
      }, fileData).subscribe(data => {
        if (this.options.isAdminPage) {
          this.alertifyService.message("File uploaded successfully", {
            messageType: MessageType.Success,
            position: Position.TopRight,
            delay: 1
          });
        } else {
          this.customToastrService.message("File uploaded successfully", "Success", {
            messageType: ToastrMessageType.Success,
            position: ToastrPosition.TopRight
          })
        }

      }, (errorResponse: HttpErrorResponse) => {
        if (this.options.isAdminPage) {
          this.alertifyService.message("Error", {
            messageType: MessageType.Error,
            position: Position.TopRight,
            delay: 1
          });
        } else {
          this.customToastrService.message("File could not uploaded", "Error", {
            messageType: ToastrMessageType.Success,
            position: ToastrPosition.TopRight
          })
        }
      });
    });
  }


  openDialog(afterClosed: any): void {
    this.dialogService.openDialog({
      componentType: FileUploadDialogComponent,
      data: UploadState.Yes,
      afterClosed: afterClosed,
      options: {
        width: "250px" 
      }
    });
  }

  public fileOver(event: any) {
    console.log(event);
  }

  public fileLeave(event: any) {
    console.log(event);
  }
}

export class FileUploadOptions {
  controller?: string;
  action?: string;
  queryString?: string;
  explanation?: string;
  accept?: string;
  isAdminPage?: boolean;
}