import { Injectable } from '@angular/core';
import {AngularFireDatabase, QueryFn} from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import { Reservering } from '../models/reservering';

@Injectable()
export class ReserveringService {
    constructor(private db: AngularFireDatabase){ }

    getReserveringen (): Observable<Reservering[]> {
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
}