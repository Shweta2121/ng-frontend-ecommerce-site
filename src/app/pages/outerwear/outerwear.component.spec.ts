import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OuterwearComponent } from './outerwear.component';

describe('OuterwearComponent', () => {
  let component: OuterwearComponent;
  let fixture: ComponentFixture<OuterwearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OuterwearComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OuterwearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
