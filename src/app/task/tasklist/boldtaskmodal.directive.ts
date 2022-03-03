import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBoldtaskmodal]',
})
export class BoldtaskmodalDirective {
  constructor(private element: ElementRef, private renderer: Renderer2) {
    this.renderer.setStyle(this.element.nativeElement, 'font-weight', 'bolder');
  }
}
