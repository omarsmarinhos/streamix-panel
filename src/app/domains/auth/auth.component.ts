import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AlertService } from '../shared/services/alert.service';
import { AuthService } from '../shared/services/auth.service';
import { PowerByComponent } from '../shared/components/power-by/power-by.component';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    PowerByComponent
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export default class AuthComponent {
  hide = true;
  loginForm: FormGroup;
  isLoading = false;

  @ViewChild('usuarioInput') usuarioInput!: ElementRef;

  private readonly authService = inject(AuthService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly alertService = inject(AlertService);

  constructor() {
    this.loginForm = this.formBuilder.group({
      usuario: [ // Mantén el nombre del campo como 'usuario' si así lo prefieres
        '',
        [
          Validators.required,
          Validators.email, // Agregamos validación de email
          Validators.pattern(/^\S*$/),
        ],
      ],
      clave: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.usuarioInput.nativeElement.focus();
    });
  }

  async login() {
    if (this.loginForm.invalid) {
      console.log('Formulario inválido:', this.loginForm.errors);
      return;
    }

    this.isLoading = true;
    try {
      console.log('Intentando login con:', this.loginForm.value.usuario);
      await this.authService.login(
        this.loginForm.value.usuario, // Este valor debe ser un email
        this.loginForm.value.clave
      );
    } catch (error) {
      console.error('Error en componente de login:', error);
    } finally {
      this.isLoading = false;
    }
  }


  getErrorMessage(controlName: string): string {
    const control = this.loginForm.get(controlName);
    if (control?.hasError('required')) {
      return 'Este campo es requerido';
    }
    if (control?.hasError('minlength')) {
      return `Mínimo ${control.errors?.['minlength'].requiredLength} caracteres`;
    }
    if (control?.hasError('pattern') && controlName === 'usuario') {
      return 'No se permiten espacios en blanco';
    }
    return '';
  }
}
