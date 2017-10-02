import { Component, OnInit} from '@angular/core';
import { FirebaseListObservable } from 'angularfire2/database';
import { ActivatedRoute } from '@angular/router';

import { Materiaal} from '../../models/materiaal';

import { MaterialenService } from '../../services/materialen.service';

import * as _ from 'lodash';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/do';

@Component({
  selector: 'materialen-lijst',
  templateUrl: './materialen-lijst.component.html',
  styleUrls: ['./materialen-lijst.component.css']
})
export class MaterialenLijstComponent implements OnInit {

  showSpinner: boolean = true;

  materialen: Materiaal[];
  pageSize: number = 12;
  nextKey: any;
  prevKeys: any[] = [];

  page: number;
  pages: number[];
  activePage: number;

  activeMateriaal: number;

  constructor(private materialenService: MaterialenService,
    private route: ActivatedRoute) {}

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.page = +params['page'] - 1;

      this.changePage(this.page);
    })


    this.getMaterialen();

    this.materialenService.getMaterialen().subscribe(materialen => {
      const totalPages = Math.ceil(materialen.length / this.pageSize);
      this.pages = Array.from(Array(totalPages),(x,i)=>i);
    });
  }

  private getMaterialen(key?) {

    this.materialenService.getMaterialen({
      orderByKey: true,
      startAt: key,
      limitToFirst: this.pageSize + 1
    })
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
  }
  
  onPrev() {
    const prevKey = _.last(this.prevKeys);
    this.prevKeys = _.dropRight(this.prevKeys);
    this.getMaterialen(prevKey);
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
}
