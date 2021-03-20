import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrinkwareComponent } from './drinkware.component';

describe('DrinkwareComponent', () => {
  let component: DrinkwareComponent;
  let fixture: ComponentFixture<DrinkwareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrinkwareComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DrinkwareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
