import { Directive, inject } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
@Directive()
export class BaseDialog<DialogComponent> {
    readonly dialogRef = inject(MatDialogRef<DialogComponent>);


    close(){
        this.dialogRef.close();
    }
}
