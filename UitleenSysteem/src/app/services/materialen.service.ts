import { Injectable } from '@angular/core';
import {AngularFireDatabase, QueryFn} from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import { Materiaal } from '../models/materiaal';


@Injectable()
export class MaterialenService {

  private rootPath: string = '/materialen';

    constructor(private db: AngularFireDatabase){ }

    public getMaterialen(): Observable<Materiaal[]> {
      return this.db.list('/materialen')
        .snapshotChanges()
        .map(action => {

          let materialen = [];

          action.forEach(el => {
            const $key = el.key;
            const data = { $key, ...el.payload.val()};
            materialen.push(data);
          });

          return materialen;

        });
    }

    public getMaterialenByPage(pageSize: number, key: string): Observable<Materiaal[]> {

      return this.db.list('/materialen', ref =>
        ref.orderByKey()
          .startAt(key)
          .limitToFirst(pageSize + 1)
        ).snapshotChanges()
        .map(action => {

          let materialen = [];

          action.forEach(el => {
          const $key = el.key;
          const data = { $key, ...el.payload.val()};
          materialen.push(data);
        });

        return materialen;

        });
    }

    public getMateriaalById(id: number): Observable<Materiaal>{
      return this.db.object<Materiaal>(`${this.rootPath}/inventaris/${id}`).valueChanges();
    }

    public updateMateriaalInCatalogus(id: number, materiaal: Materiaal) {
      this.db.object<Materiaal>(`${this.rootPath}/catalogus/${id}`)
        .update(materiaal)
        .then(_ => {return true;})
        .catch(error => {return false;});
    }
}
