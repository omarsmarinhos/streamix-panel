import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SupabaseService } from '../domains/shared/services/supabase.service';

// auth.guard.ts
export const privateGuard = (): CanActivateFn => {
  return async () => {
    const router = inject(Router);
    const supabaseService = inject(SupabaseService);
    
    try {
      const { data: { session }, error } = await supabaseService.auth.getSession();
      
      if (error) throw error;
      
      if (session) {
        return true;
      } else {
        router.navigate(['/auth']);
        return false;
      }
    } catch (error) {
      console.error('Error en guard:', error);
      router.navigate(['/auth']);
      return false;
    }
  };
};