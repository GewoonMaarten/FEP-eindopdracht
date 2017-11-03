import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { Materiaal} from '../../models/materiaal';

import { MaterialenService } from '../../services/materialen.service';

import * as _ from 'lodash';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/do';
import {NavbarService} from "../../services/navbar.service";

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

  materiaalCart: Materiaal[] = [];
  private subscription: Subscription;
  

  constructor(private materialenService: MaterialenService,
    private route: ActivatedRoute,
    private router: Router,
    private nav: NavbarService) {}

  ngOnInit() {

    this.nav.show();

    this.route.params.subscribe(params => {
      this.page = +params['page'] - 1 || 0;

      this.changePage(this.page);
    });

    this.materialenService.getMaterialen().subscribe(materialen => {
      const totalPages = Math.ceil(materialen.length / this.pageSize);
      this.pages = Array.from(Array(totalPages),(x,i)=>i);
    });
    
  }

  private getMaterialen(key?) {
    console.log("next: ", this.nextKey);
    this.materialenService.getMaterialenByPage(this.pageSize, key)
    .subscribe(materialen => {
      this.showSpinner = false;

      this.activePage = this.prevKeys.length;

      this.materialen = _.slice(materialen, 0, this.pageSize);

      console.log(this.materialen);
      this.nextKey = _.get(materialen[this.pageSize], '$key');
    });
  }

  addToCart(key, value) {

    this.materialen.forEach(x => {
      if(x.$key == key){
        let addMateriaal = Object.assign({},x);
        addMateriaal.aantal = value;
        this.materiaalCart.push(addMateriaal);

        this.nav.addToCart(this.materiaalCart);
      }
    })
    console.log(this.materiaalCart);
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
    console.log("changepage next: ", this.nextKey);
    this.getMaterialen(this.nextKey);
  }

  /* Collapse */

  collapse(id){
    this.activeMateriaal = this.activeMateriaal == id ? undefined : id;
  }
}
