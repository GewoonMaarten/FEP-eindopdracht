import { Injectable } from '@angular/core';
import {AngularFireDatabase, QueryFn} from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import { Materiaal } from '../models/materiaal';


@Injectable()
export class MaterialenService {

    constructor(private db: AngularFireDatabase){}

    public getMaterialen(): Observable<Materiaal[]> {
        return this.db
          .list<Materiaal>('/materialen').valueChanges();
    }

    public getMaterialenbyPage(page: number, key: string): Observable<Materiaal[]> {
      return this.db.list<Materiaal>('/materialen', ref =>
        ref.orderByKey()
          .startAt(key)
          .limitToFirst(page + 1)
        ).valueChanges();
    }
}
