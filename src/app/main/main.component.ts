import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../pages/header/header.component";
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';



@Component({
  selector: 'app-main',
  standalone: true,
  imports: [HeaderComponent, RouterModule, CommonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

  constructor(){

  }


  ngOnInit(){

  }
}
