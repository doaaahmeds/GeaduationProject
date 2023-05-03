import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appBackgroundd]'
})
export class BackgrounddDirective {

  constructor(private elm:ElementRef) { 

  }
  @HostListener('click') bgcolor(){
    this.elm.nativeElement.style.backgroundColor='black';
    this.elm.nativeElement.style.color='white';
  }
 
   

}
