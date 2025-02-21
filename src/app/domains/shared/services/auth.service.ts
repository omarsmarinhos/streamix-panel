// auth.service.ts
import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from './supabase.service';
import { AlertService } from './alert.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly supabase = inject(SupabaseService);
  private readonly router = inject(Router);
  private readonly alertService = inject(AlertService);
  
  private readonly userSignal = signal<any>(null);

  get user() {
    return this.userSignal();
  }

  async login(username: string, password: string) {
    try {
      console.log('Username enviado:', username);
      console.log('Password enviado:', password);

      const data = await this.supabase.validateUserCredentials(username, password);

      if (!data || (Array.isArray(data) && data.length === 0)) {
        this.alertService.showWarning('Credenciales incorrectas');
        throw new Error('Credenciales inválidas');
      }

      console.log('Usuario encontrado:', data);
      this.userSignal.set(data);
      this.alertService.showSuccess('Login exitoso');
      this.router.navigate(['/dashboard']);
      
      return data;
    } catch (error: any) {
      console.error('Error en login:', error.message);
      this.alertService.showWarning('Error de autenticación');
      throw error;
    }
  }

  async logout() {
    try {
      await this.supabase.signOut();
      this.userSignal.set(null);
      this.router.navigate(['/auth']);
    } catch (error) {
      console.error('Error en logout:', error);
      throw error;
    }
  }

  isAuthenticated(): boolean {
    return !!this.userSignal();
  }
}