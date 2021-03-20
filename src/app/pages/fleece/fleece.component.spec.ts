import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FleeceComponent } from './fleece.component';

describe('FleeceComponent', () => {
  let component: FleeceComponent;
  let fixture: ComponentFixture<FleeceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FleeceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FleeceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
