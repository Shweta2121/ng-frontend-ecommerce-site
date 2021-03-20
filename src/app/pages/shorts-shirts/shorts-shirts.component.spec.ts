import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortsShirtsComponent } from './shorts-shirts.component';

describe('ShortsShirtsComponent', () => {
  let component: ShortsShirtsComponent;
  let fixture: ComponentFixture<ShortsShirtsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShortsShirtsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShortsShirtsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
