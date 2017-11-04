import { Injectable, Inject } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import { Observable } from 'rxjs';
import { Materiaal} from '../models/materiaal';
import { Reservering } from '../models/reservering';


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
