
import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appRegExp]'
})
export class RegExpDirective {

  @Input('appRegExp') regExp: string;

  constructor(private el: ElementRef) {
  }
  @HostListener('keypress', ['$event'])

  //Esta directiva filtra caracteres según una expresión regular
  onkeypress(event: KeyboardEvent) {
    if (!event.key.match(new RegExp(this.regExp))) {
      event.preventDefault();
      return false;
    }
  }

}
