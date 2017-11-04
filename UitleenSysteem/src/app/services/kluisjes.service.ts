import { Injectable } from '@angular/core';
import { AngularFireDatabase, QueryFn, AngularFireObject, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import { Kluisje } from '../models/kluisje';

@Injectable()
export class KluisjesService {
    constructor(private db: AngularFireDatabase){ }
    
    groups: AngularFireList<any>;

    getKluisjes(): Observable<Kluisje[]> {
        return this.db.list('kluisjes')
        .snapshotChanges()
        .map(action => {

          let kluisjes = [];

          action.forEach(el => {
            const $key = el.key;
            const data = { $key, ...el.payload.val()};
            kluisjes.push(data);
          });

          return kluisjes;

        });
    }
}