import { Component, OnInit } from '@angular/core';

//Servicios
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public token:TokenService) { }

  ngOnInit(): void {
  }

}
