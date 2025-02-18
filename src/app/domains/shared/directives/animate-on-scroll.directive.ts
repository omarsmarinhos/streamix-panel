// animate-on-scroll.directive.ts
import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';

export type AnimateOnScrollType =
  'fade-up' |
  'fade-left' |
  'fade-right' |
  'zoom-in' |
  'flip-left' |
  'slide-rotate' |
  'fade-up-long' |
  'fade-down' |
  'scale-up' |
  'rotate-in' |
  'blur-in' |
  'swing' |
  'bounce-in' |
  'slide-up-fade';

@Directive({
  selector: '[aos]',
  standalone: true
})
export class AnimateOnScrollDirective implements OnInit, OnDestroy {
  private readonly observer: IntersectionObserver;

  // Nuevo input para el tipo de animación (valor por defecto: 'fade-up')
  @Input('aos') animationType: AnimateOnScrollType = 'fade-up';

  constructor(private readonly el: ElementRef) {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateIn();
          this.observer.unobserve(entry.target); // Eliminar si quieres que se repita
        }
      });
    }, { threshold: 0.1 });
  }

  ngOnInit() {
    this.setInitialStyles();
    this.observer.observe(this.el.nativeElement);
  }

  private setInitialStyles() {
    const element = this.el.nativeElement;
    element.classList.add('aos-init');
    element.dataset.aos = this.animationType; // Agrega el tipo de animación como data-atributo
  }

  private animateIn() {
    const element = this.el.nativeElement;
    element.classList.add('aos-animate');
  }

  ngOnDestroy() {
    this.observer.disconnect();
  }
}