import { Injectable } from '@angular/core';
import { AngularFireDatabase, QueryFn } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import { Reservering } from '../models/index';
import { Subject } from 'rxjs';

@Injectable()
export class ReserveringService {
  private subject = new Subject<any>();
  private reserveringen: Reservering[] = [];

  constructor(private db: AngularFireDatabase) { }

  addToCart(reservering: Reservering[]) {
    this.reserveringen = reservering;
    this.subject.next(reservering);
  }

  getCart(): Observable<Reservering[]> {
    return this.subject.asObservable();
  }

  clearCart() {
    this.subject.next([]);
  }

  getReserveringen(): Observable<Reservering[]> {
    return this.db.list('reservering')
      .snapshotChanges()
      .map(action => {

        let reserveringen = [];

        action.forEach(el => {
          const $key = el.key;
          const data = { $key, ...el.payload.val() };
          reserveringen.push(data);
        });

        return reserveringen;

      });
  }

  addReservering() {
    this.reserveringen.forEach(x => {
      this.db.list('reservering').push(x);
    });
    this.clearCart();
    
    return true;
  }
}