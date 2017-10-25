import { Injectable } from '@angular/core';
import {AngularFireDatabase, QueryFn} from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import { Materiaal } from '../models/materiaal';
import {AuthService} from "./auth.service";

import * as _ from 'lodash';

@Injectable()
export class MaterialenService {

  userRoles: Array<string>;

  constructor(private auth: AuthService,
              private db: AngularFireDatabase){

    auth.user.map(user => {
      // Set an array of user roles, ie ['admin', 'author', ...]
      return this.userRoles = _.keys(_.get(user, 'roles'));
    })
    .subscribe();
  }

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

  public getMateralenNaam(): Observable<string[]>{
    return this.db.list<Materiaal[]>('/materialen')
      .snapshotChanges()
      .map(action => {

        let namen: string[] = [];

        action.forEach(el => {
          const materiaal = el.payload.val() as Materiaal;
          namen.push(materiaal.naam);
        });

        return namen;
      });
  }

  // Authorization


  get canEdit(): boolean {
    const allowedRoles = ['beheerder'];
    return !_.isEmpty(_.intersection(allowedRoles, this.userRoles));
  }

  private matchingRole(allowedRoles): boolean {
    return !_.isEmpty(_.intersection(allowedRoles, this.userRoles))
  }
}
