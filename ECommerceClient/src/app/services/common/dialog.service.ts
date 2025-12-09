import { Component, Injectable } from '@angular/core';
import { DialogPosition, MatDialog } from '@angular/material/dialog';
import { ComponentType } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog:MatDialog) { }

  openDialog(dialogParameters:DialogParameters): void {
      const dialogRef = this.dialog.open(dialogParameters.componentType, {
        width:dialogParameters.options?.width,
        height:dialogParameters.options?.height,
        data: dialogParameters.data,
        position:dialogParameters.options ?.position
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result == dialogParameters.data) {
          dialogParameters.afterClosed();
        }
      });
    }
}

export interface DialogParameters {
  componentType: ComponentType<any>;
  data: any;
  afterClosed: () => void;
  options?: DialogOptions;
}


export class DialogOptions {
  width?:string="250px";
  height?:string;
  position?:DialogPosition
}