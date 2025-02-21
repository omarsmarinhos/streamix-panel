import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../domains/shared/services/auth.service';

export const privateGuard = (): CanActivateFn => {
  return () => {
    const router = inject(Router);
    const authService = inject(AuthService);

    if (authService.isAuthenticated()) {
      return true;
    } else {
      router.navigate(['/auth']);
      return false;
    }
  };
};