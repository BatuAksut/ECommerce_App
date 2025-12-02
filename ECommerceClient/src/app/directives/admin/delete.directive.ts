import { Directive, ElementRef, EventEmitter, HostListener, Input, input, Output, Renderer2 } from '@angular/core';
import { ProductService } from '../../services/common/models/product.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent, DeleteState } from '../../dialogs/delete-dialog/delete-dialog.component';
declare var $: any;
@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {

  constructor(private element: ElementRef,
    private _renderer: Renderer2,
    private productService: ProductService,
    private dialog:MatDialog
  ) {

    const img = this._renderer.createElement("img")
    img.setAttribute("src", "/delete24.ico")
    img.setAttribute("style", "cursor:pointer")
    _renderer.appendChild(element.nativeElement, img)
  }

@Input() id!:string;

@Output() callback:EventEmitter<any> = new EventEmitter()

  @HostListener("click")
  async onclick() {
    this.openDialog(async ()=>{
    const td:HTMLTableCellElement=this.element.nativeElement
    await this.productService.delete(this.id)
    $(td.parentElement).fadeOut(2000,()=>{
      this.callback.emit()
    })
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
