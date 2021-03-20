import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tu-fleece',
  templateUrl: './fleece.component.html',
  styleUrls: ['./fleece.component.scss']
})
export class FleeceComponent implements OnInit {
  panelOpenState = false;

  constructor() { }

  ngOnInit(): void {
  }

}
