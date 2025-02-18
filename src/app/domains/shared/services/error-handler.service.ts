import { inject, Injectable } from '@angular/core';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {

  private readonly alertService = inject(AlertService);

  constructor() { }

  showError(err: any): void {
    console.error(err);
    if (err.error.message) {
      this.alertService.showError(`${err.error.message} Status: ${err.status}`);
    } else {
      this.alertService.showError(`Ocurrió un error inesperado. Status: ${err.status}`);
    }
  }
}
