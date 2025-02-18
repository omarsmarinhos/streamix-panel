import { Directive, ElementRef, Input, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: 'img[appImageLoader]',
  standalone: true
})
export class ImageLoaderDirective {
  @Input() appImageLoader: string = '';
  private skeletonDiv: HTMLDivElement;
  private currentSrc: string = '';

  constructor(
    private readonly el: ElementRef<HTMLImageElement>,
    private readonly renderer: Renderer2
  ) {
    this.skeletonDiv = this.renderer.createElement('div');
    this.renderer.addClass(this.skeletonDiv, 'image-skeleton');
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['appImageLoader'] && this.appImageLoader !== this.currentSrc) {
      this.resetLoader();
      this.loadImage();
    }
  }

  private resetLoader() {
    // Limpiar estado anterior
    this.renderer.setStyle(this.el.nativeElement, 'opacity', '0');
    this.renderer.removeChild(this.el.nativeElement.parentElement, this.skeletonDiv);
    this.skeletonDiv = this.renderer.createElement('div');
    this.renderer.addClass(this.skeletonDiv, 'image-skeleton');
    this.currentSrc = '';
  }

  private loadImage() {
    // Agregar skeleton
    this.renderer.insertBefore(
      this.el.nativeElement.parentElement,
      this.skeletonDiv,
      this.el.nativeElement
    );

    // Cache buster + timestamp
    const finalSrc = `${this.appImageLoader}`;

    // Cargar imagen directamente
    this.el.nativeElement.src = finalSrc;
    this.currentSrc = this.appImageLoader;

    // Manejar carga
    this.el.nativeElement.onload = () => {
      this.renderer.removeChild(this.el.nativeElement.parentElement, this.skeletonDiv);
      this.renderer.setStyle(this.el.nativeElement, 'opacity', '1');
    };

    this.el.nativeElement.onerror = () => {
      this.renderer.removeChild(this.el.nativeElement.parentElement, this.skeletonDiv);
      this.renderer.setAttribute(this.el.nativeElement, 'src', 'image-error.webp');
      this.renderer.setStyle(this.el.nativeElement, 'opacity', '1');
    };
  }

  ngOnDestroy() {
    this.renderer.removeChild(this.el.nativeElement.parentElement, this.skeletonDiv);
  }
}