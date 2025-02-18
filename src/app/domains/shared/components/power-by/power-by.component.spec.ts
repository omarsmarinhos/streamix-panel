import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PowerByComponent } from './power-by.component';

describe('PowerByComponent', () => {
  let component: PowerByComponent;
  let fixture: ComponentFixture<PowerByComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PowerByComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PowerByComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
