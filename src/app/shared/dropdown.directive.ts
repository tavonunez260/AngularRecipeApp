import {Directive, ElementRef, HostBinding, HostListener, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective implements OnInit {
  @HostBinding('class.show') isOpen: boolean = false;
  list: HTMLElement | undefined;

  constructor(private el: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit(): void {
    this.list = this.el.nativeElement.querySelector('.dropdown-menu');
  }

  @HostListener('click')
  toggleOpen() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) this.renderer.removeClass(this.list, 'show');
    else this.renderer.addClass(this.list, 'show');
  }
}
