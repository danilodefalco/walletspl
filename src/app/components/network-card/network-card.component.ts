import { Component, OnInit, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-network-card',
  templateUrl: './network-card.component.html',
  styleUrls: ['./network-card.component.css']
})
export class NetworkCardComponent implements OnInit {

  @Input()
  body: string = '';
  
  constructor() { }

  ngOnInit(): void {
  }

}
