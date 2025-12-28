import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BaseComponent,SpinnerType } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-customer',
  imports: [RouterModule],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss'
})
export class CustomerComponent extends BaseComponent {
  constructor(spinner:NgxSpinnerService) {
    super(spinner);
  }

  ngOnInit(): void {
   
  }

}
