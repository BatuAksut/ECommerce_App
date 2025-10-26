import { Component } from '@angular/core';
import { HeaderComponent } from "./components/header/header.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { FooterComponent } from "./components/footer/footer.component";
import { RouterModule, RouterOutlet } from "@angular/router";
import {MatSidenavModule} from '@angular/material/sidenav';
import { ToastrService } from 'ngx-toastr';
import { AlertifyService, MessageType, Position } from '../../services/admin/alertify.service';


@Component({
  selector: 'app-layout',
  imports: [HeaderComponent, SidebarComponent, FooterComponent, RouterModule,RouterOutlet,MatSidenavModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  standalone: true
})
export class LayoutComponent {
  constructor(private alertify:AlertifyService) {}

  ngOnInit(): void {
    this.alertify.message("Welcome to Admin Panel", {
      messageType: MessageType.Success,
      position: Position.TopRight,
      delay: 5
    });
  }

}
