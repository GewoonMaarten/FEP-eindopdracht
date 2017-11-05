import {Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Materiaal} from '../../../models/materiaal';

import { MaterialenService } from '../../../services/materialen.service';

import * as _ from 'lodash';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/do';
import {NavbarService} from "../../../services/navbar.service";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-catalogus-list',
  templateUrl: './catalogus-list.component.html',
  styleUrls: ['./catalogus-list.component.css']
})
export class CatalogusListComponent implements OnInit, OnDestroy {

  showSpinner: boolean = true;

  materialen: Materiaal[];
  pageSize: number = 12;
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

    this.materialenSubscription = this.materialenService.getMaterialen("catalogus").subscribe(materialen => {

      this.totalMaterialen = materialen.length;

      const totalPages = Math.ceil(this.totalMaterialen / this.pageSize);
      this.pages = Array.from(Array(totalPages),(x,i)=>i);
    });
  }

  ngOnDestroy(): void {
    this.materialenSubscription.unsubscribe();
  }

  private getMaterialen(key?) {

    this.materialenService.getMaterialenByPage(this.pageSize, key, "catalogus")
    .subscribe(materialen => {
      this.showSpinner = false;

      this.activePage = this.prevKeys.length;

      this.materialen = _.slice(materialen, 0, this.pageSize);

      this.nextKey = _.get(materialen[this.pageSize], '$key');
    });
  }

  /* Pagination */
  onNext() {
    this.prevKeys.push(_.first(this.materialen)['$key']);
    this.getMaterialen(this.nextKey);

    this.router.navigate(['/materiaal', this.activePage + 2]);
  }

  onPrev() {
    const prevKey = _.last(this.prevKeys);
    this.prevKeys = _.dropRight(this.prevKeys);
    this.getMaterialen(prevKey);

    this.router.navigate(['/materiaal', this.activePage]);
  }

  changePage(page){
    this.nextKey = (page * this.pageSize).toString();
    this.prevKeys = Array.from(new Array(page),(val,index) => (index * this.pageSize).toString() );
    this.getMaterialen(this.nextKey);
  }

  /* Collapse */

  collapse(id){
    this.activeMateriaal = this.activeMateriaal == id ? undefined : id;
  }

  //Delete
  delete(id: number){
    this.materialenService.deleteMateriaal(id, "catalogus");
  }
}
