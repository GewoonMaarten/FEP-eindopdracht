import { Injectable } from '@angular/core';
import { AngularFireDatabase, QueryFn, AngularFireObject, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import { Reservering } from '../models/index';
import { Subject } from 'rxjs';

@Injectable()
export class ReserveringService {
  private subject = new Subject<any>();
  private reserveringen: Reservering[] = [];
  groups: AngularFireList<any>;
  rootPath: string = "/reservering";

  constructor(private db: AngularFireDatabase) { }

  /**
   * Toevoegen van Reservering[]
   * @param {Reservering[]} reservering - De Reservering array welke moet worden bijgehouden door de service.
   * */
  addToCart(reservering: Reservering[]) {
    this.reserveringen = reservering;
    this.subject.next(reservering);
  }

  /**
   * De Cart ophalen
   * @return {Observable<Reservering[]>}
   * */
  getCart(): Observable<Reservering[]> {
    return this.subject.asObservable();
  }

  /** De Cart legen */
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

  /** Reservering toevoegen */
  addReservering() {
    this.reserveringen.forEach(x => {
      this.db.list('reservering').push(x);
    });
    this.clearCart();
    
    return true;
  }

  getReserveringById(key: string): Observable<Reservering> {
    return this.db.object<Reservering>(`${this.rootPath}/${key}`).valueChanges();
  }

  public updateReservering(id: string, reservering: Reservering) {
    delete reservering['$key']
    this.db.object<Reservering>(`${this.rootPath}/${id}`)
      .update(reservering)
      .then(_ => {return true;})
      .catch(error => {return false;});
  }
}