import { Injectable } from '@angular/core';
import { AngularFireDatabase, QueryFn, AngularFireObject, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import { Kluisje } from '../models/kluisje';

@Injectable()
export class KluisjesService {
    constructor(private db: AngularFireDatabase){ }
    
    groups: AngularFireList<any>;
    private rootPath: string = '/kluisjes';

    getKluisjes(): Observable<Kluisje[]> {
        return this.db.list(`${this.rootPath}`)
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

  public updateKluisje(id: string, kluisje: Kluisje) {
    delete kluisje['$key']
    this.db.object<Kluisje>(`${this.rootPath}/${id}`)
      .update(kluisje)
      .then(_ => {return true;})
      .catch(error => {return false;});
  }

}