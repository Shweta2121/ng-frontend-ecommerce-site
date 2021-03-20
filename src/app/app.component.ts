import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'tu-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'ng-test-site-frontend';

  ngOnInit(): void { }

  ngOnDestroy(): void { }

}
