import { Component ,OnInit} from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-base',
  imports: [],
  template: ``,
  styles: []
})
export class BaseComponent {
  constructor(private spinner:NgxSpinnerService) { }

    showSpinner(spinnerType:SpinnerType){
      this.spinner.show(spinnerType);
      setTimeout(() => this.hideSpinner(spinnerType), 3000);
    }


    hideSpinner(spinnerType:SpinnerType){
      this.spinner.hide(spinnerType);
    }
  }


export enum SpinnerType{
  BallScaleMultiple="s1",
  BallClipRotate="s2",

}
