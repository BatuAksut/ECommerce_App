import { Directive, ElementRef, EventEmitter, HostListener, Input, input, Output, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent, DeleteState } from '../../dialogs/delete-dialog/delete-dialog.component';
import { HttpClientService } from '../../services/common/http-client.service';
import { AlertifyService, MessageType, Position } from '../../services/admin/alertify.service';
declare var $: any;
@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {

  constructor(private element: ElementRef,
    private _renderer: Renderer2,
    private httpClientService: HttpClientService,
    private dialog:MatDialog,
    private alertify:AlertifyService
  ) {

    const img = this._renderer.createElement("img")
    img.setAttribute("src", "/delete24.ico")
    img.setAttribute("style", "cursor:pointer")
    _renderer.appendChild(element.nativeElement, img)
  }

@Input() id!:string;
@Input() controller!:string;

@Output() callback:EventEmitter<any> = new EventEmitter()

  @HostListener("click")
  async onclick() {
    this.openDialog(async ()=>{
    const td:HTMLTableCellElement=this.element.nativeElement
    this.httpClientService.delete({
      controller:this.controller
    },this.id).subscribe()
    
    $(td.parentElement).fadeOut(2000,()=>{
      this.callback.emit()
    })
    this.alertify.message("Item successfully deleted.",{messageType:MessageType.Success,
        position:Position.TopRight})
        
  })
    
  }


   openDialog(afterClosed:any): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
 
      data: DeleteState.Yes,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == DeleteState.Yes) {
        afterClosed();
      }
    });
  }
}
