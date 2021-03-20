import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tu-drinkware',
  templateUrl: './drinkware.component.html',
  styleUrls: ['./drinkware.component.scss']
})
export class DrinkwareComponent implements OnInit {
  panelOpenState = false;

  constructor() { }

  ngOnInit(): void {
  }

}
