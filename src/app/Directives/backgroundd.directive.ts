import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appBackgroundd]'
})
export class BackgrounddDirective {

  constructor(private elm:ElementRef) { 

  }
  @HostListener('click') bgcolor(){
    this.elm.nativeElement.style.backgroundColor='black';
  }
  @HostListener('mouseover') mousein(){
    // this.elm.nativeElement.style.shadow='10px 10px red';
     this.elm.nativeElement.style.border='2px dotted green';

    }

}
