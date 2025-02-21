// supabase.service.ts
import { Injectable } from "@angular/core";
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from "../../../../environments/environment.development";

@Injectable({ providedIn: 'root' })
export class SupabaseService {
  private readonly supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  }

  async validateUserCredentials(username: string, password: string) {
    try {
      const { data, error } = await this.supabase.rpc('validate_user_credentials', {
        p_username: username,
        p_password: password
      });

      if (error) {
        console.error('Error en validate_user_credentials:', error.message);
        throw new Error(error.message);
      }

      return data;
    } catch (error: any) {
      console.error('Error en validateUserCredentials:', error.message);
      throw error;
    }
  }

  async signOut() {
    const { error } = await this.supabase.auth.signOut();
    if (error) throw error;
  }
}