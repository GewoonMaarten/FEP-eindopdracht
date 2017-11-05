import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Materiaal, Reservering } from '../../models/index';
import { MaterialenService, NavbarService, ReserveringService, AuthService } from '../../services/index';
import * as _ from 'lodash';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/do';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'materialen-lijst',
  templateUrl: './materialen-lijst.component.html',
  styleUrls: ['./materialen-lijst.component.css']
})
export class MaterialenLijstComponent implements OnInit, OnDestroy {

  showSpinner = true;

  materialen: Materiaal[];
  pageSize = 12;
  nextKey: any;
  prevKeys: any[] = [];

  page: number;
  pages: number[];
  activePage: number;

  activeMateriaal: number;

  totalMaterialen: number;

  materialenSubscription: Subscription;

  constructor(private materialenService: MaterialenService,
    private route: ActivatedRoute,
    private router: Router,
    private nav: NavbarService) { }

  ngOnInit(): void {

    this.nav.show();

    this.route.params.subscribe(params => {
      this.page = +params['page'] - 1 || 0;

      this.changePage(this.page);
    });

    this.materialenSubscription = this.materialenService.getMaterialen('inventaris').subscribe(materialen => {

      this.totalMaterialen = materialen.length;

      const totalPages = Math.ceil(this.totalMaterialen / this.pageSize);
      this.pages = Array.from(Array(totalPages), (x, i) => i);
    });
  }

  ngOnDestroy(): void {
    this.materialenSubscription.unsubscribe();
  }
  /** Haal een lijst met materialen op waarvan het eerste materiaal het materiaal is met de key. */
  private getMaterialen(key?) {

    this.materialenService.getMaterialenByPage(this.pageSize, key, 'inventaris')
      .subscribe(materialen => {
        this.showSpinner = false;

        this.activePage = this.prevKeys.length;

        this.materialen = _.slice(materialen, 0, this.pageSize);

        this.nextKey = _.get(materialen[this.pageSize], '$key');
      });
  }

  /** Next page */
  onNext() {
    this.prevKeys.push(_.first(this.materialen)['$key']);
    this.getMaterialen(this.nextKey);

    this.router.navigate(['/materiaal', this.activePage + 2]);
  }
  /** previous page */
  onPrev() {
    const prevKey = _.last(this.prevKeys);
    this.prevKeys = _.dropRight(this.prevKeys);
    this.getMaterialen(prevKey);

    this.router.navigate(['/materiaal', this.activePage]);
  }
  /** changepage */
  changePage(page) {
    this.nextKey = (page * this.pageSize).toString();
    this.prevKeys = Array.from(new Array(page), (val, index) => (index * this.pageSize).toString());
    this.getMaterialen(this.nextKey);
  }

  /** Toggle materaal card */
  collapse(id) {
    this.activeMateriaal = this.activeMateriaal === id ? undefined : id;
  }

  /** Delete materiaal*/
  delete(id: number) {
    this.materialenService.deleteMateriaal(id, 'inventaris');
  }
}
