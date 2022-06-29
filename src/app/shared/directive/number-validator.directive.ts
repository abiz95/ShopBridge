import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appNumberValidator]'
})
export class NumberValidatorDirective {

  constructor(
    private elemRef: ElementRef,
  ) {
  }

  // listens on blur of the input field
  @HostListener('blur')
  @HostListener('keyup')
  checkNumberValidation() {
    // replace alphabets with empty character
    this.elemRef.nativeElement.value = this.elemRef.nativeElement.value.replace(/[^0-9.]+/g,'');
  }

}
