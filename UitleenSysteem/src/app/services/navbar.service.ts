import { Injectable } from '@angular/core';


/**
 * Service om de navbar zichtbaar of onzichtbaar te maken.
 * */
@Injectable()
export class NavbarService {
  visible: boolean;

  constructor() { this.visible = true; }

  hide() { this.visible = false; }

  show() { this.visible = true; }

  toggle() { this.visible = !this.visible; }
}
