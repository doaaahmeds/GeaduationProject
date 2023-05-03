import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appBorder]'
})
export class BorderDirective {

  constructor(private elm:ElementRef) { 

  }
  @HostListener('click') bgcolor(){
    this.elm.nativeElement.style.border='2px solid orange';
   
  }
}
