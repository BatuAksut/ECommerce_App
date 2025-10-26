import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {MatListModule} from '@angular/material/list';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink,MatListModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

}
