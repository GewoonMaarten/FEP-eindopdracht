/*
* Materialen service: Een service voor het ophalen, toevoegen, updaten en verwijderen
* van materialen in catalogus of inventaris.
* */
import { Injectable } from '@angular/core';
import {AngularFireDatabase, QueryFn} from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import { Materiaal } from '../models/materiaal';
import {AuthService} from './auth.service';

import * as _ from 'lodash';
import {formatDate} from '../helpers/dateFormater';

@Injectable()
export class MaterialenService {

  userRoles: Array<string>;
  // materialenInInventaris : AngularFireList<any>;
  materialenInCatalogus: Materiaal[];
  selectedMaterialen = [];

  private rootPath = '/materialen';

  constructor(private auth: AuthService,
              private db: AngularFireDatabase) {

    // Krijg de rollen van user voor authorizatie.
    auth.user.map(user => {
      return this.userRoles = _.keys(_.get(user, 'roles'));
    })
      .subscribe();
  }

  /**
   * Haalt een observable op met een lijst van materialen.
   * @param {string} status - naam van de status bijv. inventaris of catalogus.
   * @return {Observable<Materiaal[]>}
   * */
  public getMaterialen(status: string): Observable<Materiaal[]> {
    return this.db.list(`${this.rootPath}/${status}`)
      .snapshotChanges()
      .map(action => {

        const materialen = [];

        action.forEach(el => {
          const $key = el.key;
          const data = { $key, ...el.payload.val()};
          materialen.push(data);
        });

        return materialen;

      });
  }
  /**
   * Zoekt materialen.
   * @param {string} start - het begin van de string.
   * @param {string} end - einde van de string.
   * @param {string} status - naam van de status bijv. inventaris of catalogus.
   * @return {Observable<Materiaal[]>}
   * */
  public searchMaterialen(start: string, end: string, status: string): Observable<Materiaal[]>{
    console.log(start + ' ' + end);

    return this.db.list<Materiaal>(`${this.rootPath}/${status}`, ref =>
      ref.orderByChild('naam')
        .limitToFirst(1)
        .startAt(start)
        .endAt(end)
      ).snapshotChanges()
      .map(action => {

        const materialen = [];

        action.forEach(el => {
          const $key = el.key;
          const data = { $key, ...el.payload.val()};
          materialen.push(data);
        });

        return materialen;

      });
  }
  /**
   * Paginator voor de materialen.
   * @param {number} pageSize - Het aantal materialen per paginas.
   * @param {string} key - De eerste key van de lijst.
   * @param {string} status - naam van de status bijv. inventaris of catalogus.
   * @return {Observable<Materiaal[]>}
   * */
  public getMaterialenByPage(pageSize: number, key: string, status: string): Observable<Materiaal[]> {

    return this.db.list(`${this.rootPath}/${status}`, ref =>
      ref.orderByKey()
        .startAt(key)
        .limitToFirst(pageSize + 1)
      ).snapshotChanges()
      .map(action => {

        const materialen = [];

        action.forEach(el => {
          const $key = el.key;
          const data = { $key, ...el.payload.val()};
          materialen.push(data);
        });

      return materialen;

      });
  }
  /**
   * Geeft een lijst met namen van materialen.
   * @param {string} status - naam van de status bijv. inventaris of catalogus.
   * @return {Observable<string[]>}
   * */
  public getMateralenNaam(status: string): Observable<string[]> {
    return this.db.list<Materiaal[]>(`${this.rootPath}/${status}`)
      .snapshotChanges()
      .map(action => {

        const namen: string[] = [];

        action.forEach(el => {
          const materiaal = el.payload.val() as Materiaal;
          namen.push(materiaal.naam);
        });

        return namen;
      });
  }

  /**
   * Een enkel materiaal ophalen.
   * @param {string} id - het id van het materiaal.
   * @return {Observable<Materiaal>}
   * */
  public getMateriaalById(id: string): Observable<Materiaal> {
    return this.db.object<Materiaal>(`${this.rootPath}/catalogus/${id}`).valueChanges();
  }

  /**
   * Een enkel materiaal ophalen.
   * @param {string} id - het id van het materiaal.
   * @return {Observable<Materiaal>}
   * */
  public getMateriaalFromCatalogusById(id: string): Observable<Materiaal> {
    return this.db.object<Materiaal>(`${this.rootPath}/catalogus/${id}`).valueChanges();
  }

  /**
   * Toevoegen van materialen aan de database.
   * @param {Materiaal} materaal - het materiaal object om te uploaden.
   * @param {string} status - naam van de status bijv. inventaris of catalogus.
   * */
  public addMateriaal(materiaal: Materiaal, status: string) {

    if (!this.isBeheerder) return;

    materiaal.aanmaakDatum = formatDate(new Date);
    materiaal.status = 'inventaris';

    this.db.list<Materiaal>(`${this.rootPath}/${status}`)
      .push(materiaal);
  }

  public addMateriaalInCatalogus(materiaal: Materiaal ) {
    this.db.list<Materiaal>(`${this.rootPath}/catalogus`)
      .push(materiaal);
  }

    /**
   * Updaten van een materiaal.
   * @param {number} id - Het id van het materiaal.
   * @param {Materiaal} materiaal - Het materiaal object om te uploaden.
   * */
  public updateMateriaal(id: number, materiaal: Materiaal) {
    if (!this.isBeheerder) return;

    this.db.object<Materiaal>(`${this.rootPath}/inventaris/${id}`)
      .update(materiaal)
      .then(_ => true)
      .catch(error => false);
  }

   /**
   * Verwijderen van materiaal. Als het materiaal verwijdert wordt uit de
   * inventaris, wordt het ook verwijdert uit de catalogus.
   * @param {number} id - Het id van het materiaal.
   * @param {string} status - naam van de status bijv. inventaris of catalogus.
   * */
  public deleteMateriaal(id: number, status: string) {
    if (!this.isBeheerder) return;

    this.db.object<Materiaal>(`${this.rootPath}/catalogus/${id}`)
      .remove();

    if (status === 'inventaris') {
      this.db.object<Materiaal>(`${this.rootPath}/inventaris/${id}`)
        .remove();
    }
  }

  public updateMateriaalInCatalogus(id: string, materiaal: Materiaal) {
    delete materiaal.$key;
    this.db.object<Materiaal>(`${this.rootPath}/catalogus/${id}`)
      .update(materiaal)
      .then(_ => true)
      .catch(error => false);
  }

  // Authorization
  /**
   * Checkt of de user
   * */
  get isBeheerder(): boolean {
    const allowedRoles = ['beheerder'];
    return !_.isEmpty(_.intersection(allowedRoles, this.userRoles));
  }
}
