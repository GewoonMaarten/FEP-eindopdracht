import { Injectable } from '@angular/core';
import {AngularFireDatabase, QueryFn} from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import { Materiaal } from '../models/materiaal';
import {AuthService} from "./auth.service";

import * as _ from 'lodash';
import {BehaviorSubject} from "rxjs/BehaviorSubject";

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

  public searchMaterialen(start: string, end: string): Observable<Materiaal[]>{
    console.log(start+" "+ end);

    return this.db.list<Materiaal>('/materialen', ref =>
      ref.orderByChild('naam')
        .limitToFirst(1)
        .startAt(start)
        .endAt(end)
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

  public addMateriaal(materiaal: Materiaal) {
    this.db.list<Materiaal>('/materialen')
      .push(materiaal);
  }

  public updateMateriaal(id: number, materiaal: Materiaal) {
    this.db.object<Materiaal>(`/materialen/${id}`)
      .update(materiaal)
      .then(_ => {return true;})
      .catch(error => {return false;});
  }

  public deleteMateriaal(id: number){
    this.db.object<Materiaal>(`/materialen/${id}`)
      .remove()
      .then(_ => {return true;})
      .catch(error => {return false;});
  }

  public getMateriaalById(id: number): Observable<Materiaal>{
    return this.db.object<Materiaal>(`/materialen/${id}`).valueChanges();
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
