import { Injectable } from "@angular/core";
import {
  AuthSession,
  createClient,
  SupabaseClient,
} from '@supabase/supabase-js'
import { environment } from "../../../../environments/environment.development";

@Injectable({ providedIn: 'root' })
export class SupabaseService {

  readonly supabase: SupabaseClient;
  _session: AuthSession | null = null;

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl, 
      environment.supabaseKey,
      {
        auth: {
          autoRefreshToken: true,
          persistSession: true,
          storageKey: 'sb-auth-token', // Personaliza la clave
          storage: {
            getItem: key => localStorage.getItem(key),
            setItem: (key, value) => {
              try {
                localStorage.setItem(key, value)
              } catch (error) {
                console.error('Error al guardar token:', error)
              }
            },
            removeItem: key => localStorage.removeItem(key)
          }
        }
      }
    );
    
    this.initializeAuth();
  }

  private initializeAuth() {
    this.supabase.auth.onAuthStateChange((event, session) => {
      this._session = session; // Siempre actualiza la sesión
      console.log('Evento de auth:', event, session);
    });
  }

  get session() {
    return this._session;
  }

  get auth() {
    return this.supabase.auth;
  }

  async signInWithCredentials(email: string, password: string) {
    console.log('Intentando login con:', email);
    try {
      const { data, error } = await this.supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Error de autenticación:', error);
        throw error;
      }

      console.log('Login exitoso:', data);
      return data;
    } catch (error) {
      console.error('Error en signInWithCredentials:', error);
      throw error;
    }
  }

  async signOut() {
    try {
      const { error } = await this.supabase.auth.signOut();
      if (error) throw error;
      console.log('Logout exitoso');
    } catch (error) {
      console.error('Error en signOut:', error);
      throw error;
    }
  }
}