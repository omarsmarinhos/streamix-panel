import { Component } from '@angular/core';

@Component({
  selector: 'app-power-by',
  standalone: true,
  imports: [],
  templateUrl: './power-by.component.html',
  styleUrl: './power-by.component.scss'
})
export class PowerByComponent {

  currentYear: number;

  constructor() {
    this.currentYear = this.getCurrentYear();
  }

  getCurrentYear(): number {
    return new Date().getFullYear();
  }
}
