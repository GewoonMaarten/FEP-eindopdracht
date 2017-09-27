import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { Materiaal } from '../models/materiaal';


@Injectable()
export class MaterialenService {

    constructor(private db: AngularFireDatabase){}

    public getMaterialen(query={}): FirebaseListObservable<Materiaal[]> {
        return this.db.list('/materialen', {
            query: query
        });
    }
}