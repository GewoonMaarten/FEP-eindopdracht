import { Injectable, Inject } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import { Observable } from 'rxjs';
import { Materiaal} from '../models/materiaal';


/**
 * Service om de navbar zichtbaar of onzichtbaar te maken.
 * */
@Injectable()
export class NavbarService {
  visible: boolean;
  materiaalCart: Materiaal[] = [];
  
  // private subject = new Subject<any>();  

  constructor() { this.visible = true; }

  hide() { this.visible = false; }

  show() { this.visible = true; }

  toggle() { this.visible = !this.visible; }

  addToCart(data: Materiaal []) {
    // this.subject.next(data);   
    this.materiaalCart = data; 
  }
  
// clearMessage() {
//     this.subject.next();
// }

  getCart() {
      // return this.subject.asObservable();
      return this.materiaalCart;
  }
}
