import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-power-by',
  standalone: true,
  imports: [],
  templateUrl: './power-by.component.html',
  styleUrl: './power-by.component.scss'
})
export class PowerByComponent {

  private readonly authService = inject(AuthService);
  isSynchronizedWithFast = this.authService.isSynchronizedWithFast();
}
