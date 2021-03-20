import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SubscriptionHelper } from 'src/app/classes/subscriptions-helper.class';

@Component({
  selector: 'tu-header',
  templateUrl: './header.component.html',
  styleUrls: [],
})
export class HeaderComponent
  extends SubscriptionHelper
  implements OnInit, OnDestroy {
  openSideNav: boolean = false;

  constructor(
  ) {
    super();
  }


  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.unsubscribeAll();
  }

  toggleSideNav() {
    this.openSideNav = !this.openSideNav;
  }
}
