import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WovenShirtsComponent } from './woven-shirts.component';

describe('WovenShirtsComponent', () => {
  let component: WovenShirtsComponent;
  let fixture: ComponentFixture<WovenShirtsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WovenShirtsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WovenShirtsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
