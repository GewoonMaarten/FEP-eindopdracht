import { Injectable } from '@angular/core';
import { AngularFireDatabase, QueryFn, AngularFireObject, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import { Reservering } from '../models/reservering';

@Injectable()
export class ReserveringService {
    constructor(private db: AngularFireDatabase){ }
    groups: AngularFireList<any>;
    getReserveringen(): Observable<Reservering[]> {
        return this.db.list('reservering')
        .snapshotChanges()
        .map(action => {

          let reserveringen = [];

          action.forEach(el => {
            const $key = el.key;
            const data = { $key, ...el.payload.val()};
            reserveringen.push(data);
          });

          return reserveringen;

        });
    }

    getReserveringById(key: string): Observable<Reservering> {
      return this.db.object<Reservering>(`/reservering/${key}`).valueChanges();
    }
}