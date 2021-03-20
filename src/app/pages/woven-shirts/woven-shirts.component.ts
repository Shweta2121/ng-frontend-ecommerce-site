import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tu-woven-shirts',
  templateUrl: './woven-shirts.component.html',
  styleUrls: ['./woven-shirts.component.scss']
})
export class WovenShirtsComponent implements OnInit {
  panelOpenState = false;

  constructor() { }

  ngOnInit(): void {
  }

}
