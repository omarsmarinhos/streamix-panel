// auth.service.ts
import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from './supabase.service';
import { AlertService } from './alert.service';
import { Session, User } from '@supabase/supabase-js';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly supabase = inject(SupabaseService);
  private readonly router = inject(Router);
  private readonly alertService = inject(AlertService);
  
  session = signal<Session | null>(null);
  user = signal<User | null>(null);

  constructor() {
    // Inicializar con la sesión existente
    this.session.set(this.supabase.session);
    this.user.set(this.supabase.session?.user ?? null);
    
    // Escuchar cambios de sesión
    this.supabase.auth.onAuthStateChange((event, session) => {
      console.log('AuthService: Cambio de estado:', event);
      this.session.set(session);
      this.user.set(session?.user ?? null);
    });
  }

  async login(email: string, password: string) {
    try {
      console.log('Iniciando proceso de login para:', email);
      const data = await this.supabase.signInWithCredentials(email, password);
      
      if (!data.session || !data.user) {
        console.error('No se recibió sesión o usuario después del login');
        throw new Error('Authentication failed');
      }
      
      console.log('Login exitoso, usuario:', data.user.email);
      this.alertService.showSuccess('Login exitoso');
      this.router.navigate(['/dashboard']);
    } catch (error: any) {
      console.error('Error en login:', error);
      this.alertService.showWarning(error.message || 'Credenciales incorrectas');
      throw error;
    }
  }

  async logout() {
    try {
      await this.supabase.signOut();
      this.router.navigate(['/auth']);
    } catch (error) {
      console.error('Error en logout:', error);
      this.alertService.showWarning('Error al cerrar sesión');
    }
  }
}