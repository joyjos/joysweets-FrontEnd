import { Component, OnInit } from '@angular/core';

//Servicios
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(public sidebar:SidebarService) { }

  ngOnInit(): void {
  }

}
