import { Injectable } from '@angular/core';
import { AngularFireDatabase, QueryFn, AngularFireObject, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import { Reservering } from '../models/reservering';

@Injectable()
export class ReserveringService {
  groups: AngularFireList<any>;
  rootPath: string = "/reservering";

    constructor(private db: AngularFireDatabase){ }
    
    getReserveringen(): Observable<Reservering[]> {
        return this.db.list(`${this.rootPath}`)
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