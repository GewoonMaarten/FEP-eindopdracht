import { Injectable } from '@angular/core';
import {AngularFireDatabase, QueryFn} from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import { Materiaal } from '../models/materiaal';
import {AuthService} from "./auth.service";

import * as _ from 'lodash';
import {formatDate} from "../helpers/dateFormater";

@Injectable()
export class MaterialenService {

  userRoles: Array<string>;
  private rootPath: string = '/materialen';

  constructor(private auth: AuthService,
              private db: AngularFireDatabase){

    auth.user.map(user => {
      // Set an array of user roles, ie ['admin', 'author', ...]
      return this.userRoles = _.keys(_.get(user, 'roles'));
    })
    .subscribe();
  }

  public getMaterialen(status: string): Observable<Materiaal[]> {
    return this.db.list(`${this.rootPath}/${status}`)
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

  public searchMaterialen(start: string, end: string, status: string): Observable<Materiaal[]>{
    console.log(start+" "+ end);

    return this.db.list<Materiaal>(`${this.rootPath}/${status}`, ref =>
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

  public getMaterialenByPage(pageSize: number, key: string, status: string): Observable<Materiaal[]> {

    return this.db.list(`${this.rootPath}/${status}`, ref =>
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

  public getMateralenNaam(status: string): Observable<string[]>{
    return this.db.list<Materiaal[]>(`${this.rootPath}/${status}`)
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

  public addMateriaal(materiaal: Materiaal, status: string) {

    materiaal.aanmaakDatum = formatDate(new Date);
    materiaal.status = "inventaris";

    this.db.list<Materiaal>(`${this.rootPath}/${status}`)
      .push(materiaal);
  }

  public updateMateriaal(id: number, materiaal: Materiaal) {
    this.db.object<Materiaal>(`${this.rootPath}/inventaris/${id}`)
      .update(materiaal)
      .then(_ => {return true;})
      .catch(error => {return false;});
  }


  public deleteMateriaal(id: number, status: string){

    this.db.object<Materiaal>(`${this.rootPath}/catalogus/${id}`)
      .remove();

    if (status === 'inventaris'){
      this.db.object<Materiaal>(`${this.rootPath}/inventaris/${id}`)
        .remove();
    }
  }

  public getMateriaalById(id: number): Observable<Materiaal>{
    return this.db.object<Materiaal>(`${this.rootPath}/${id}`).valueChanges();
  }

  // Authorization

  get isBeheerder(): boolean {
    const allowedRoles = ['beheerder'];
    return !_.isEmpty(_.intersection(allowedRoles, this.userRoles));
  }
}
