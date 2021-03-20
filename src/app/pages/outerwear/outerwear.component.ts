import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tu-outerwear',
  templateUrl: './outerwear.component.html',
  styleUrls: ['./outerwear.component.scss']
})
export class OuterwearComponent implements OnInit {
  panelOpenState = false;

  constructor() { }

  ngOnInit(): void {
  }

}
