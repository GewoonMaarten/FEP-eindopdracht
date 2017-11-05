import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/do';
import { NavbarService, MaterialenService, ReserveringService, AuthService } from '../../../services/index';
import { Subscription } from 'rxjs/Subscription';
import { Reservering, Materiaal } from '../../../models/index';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-catalogus-list',
  templateUrl: './catalogus-list.component.html',
  styleUrls: ['./catalogus-list.component.css']
})
export class CatalogusListComponent implements OnInit, OnDestroy {

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

  materiaalCart: Reservering[] = [];  

  constructor(private materialenService: MaterialenService,
    private route: ActivatedRoute,
    private router: Router,
    private nav: NavbarService,
    private reserveringService: ReserveringService,
    private auth: AuthService,
    private datePipe: DatePipe) { }

  ngOnInit(): void {

    this.nav.show();

    this.route.params.subscribe(params => {
      this.page = +params['page'] - 1 || 0;

      this.changePage(this.page);
    });

    this.materialenSubscription = this.materialenService.getMaterialen('catalogus').subscribe(materialen => {

      this.totalMaterialen = materialen.length;

      const totalPages = Math.ceil(this.totalMaterialen / this.pageSize);
      this.pages = Array.from(Array(totalPages), (x, i) => i);
    });

    // keep the cart up-to-date
    this.reserveringService.getCart().subscribe(data => {
      this.materiaalCart = data;
    });
  }

  ngOnDestroy(): void {
    this.materialenSubscription.unsubscribe();
  }

  private getMaterialen(key?) {
    this.materialenService.getMaterialenByPage(this.pageSize, key, 'catalogus')
      .subscribe(materialen => {
        this.showSpinner = false;

        this.activePage = this.prevKeys.length;

        this.materialen = _.slice(materialen, 0, this.pageSize);

        this.nextKey = _.get(materialen[this.pageSize], '$key');
      });
  }

  /** Voeg het materiaal en aantal toe aan de Cart
  *  en wijzig daarbij de observable, zodat de NavbarComponent het aantal verandert
  */
  addToCart(key, addAantal) {

    this.materialen.forEach(x => {
      if (x.$key === key) {

        // raise aantal als exists in materiaalCart
        let exists = false;
        let outOfOrder = false;

        this.materiaalCart.forEach(y => {
          // check of new reserveringsaantal niet >= beschikbaaraantal
          if (x.$key === y.materiaal_id && Number(y.aantal) + Number(addAantal) >= x.aantal) {
            outOfOrder = true;
          }

          if (x.$key === y.materiaal_id && !outOfOrder) {
            exists = true;
            y.aantal = Number(y.aantal) + Number(addAantal);
          }
        });

        // voeg anders een nieuwe Reservering toe aan materiaalCart
        if (!exists && !outOfOrder) {
          const newReservering = new Reservering();
          this.auth.getUserUid().subscribe(userid => newReservering.user_uid = userid);

          newReservering.aantal = addAantal;
          newReservering.materiaal_id = x.$key;
          const now = new Date();
          newReservering.aanmaakdatum = this.datePipe.transform(now, 'dd-MM-yyyy'); // whatever format you need.

          now.setMonth(now.getMonth() + 1);
          newReservering.einddatum = this.datePipe.transform(now, 'dd-MM-yyyy'); // whatever format you need.

          newReservering.status = 'aangemaakt';
          newReservering.opmerking = '';

          this.materiaalCart.push(newReservering);
        }

        // wijzig de Cart in de service
        this.reserveringService.addToCart(this.materiaalCart);
      }
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

  changePage(page) {
    this.nextKey = (page * this.pageSize).toString();
    this.prevKeys = Array.from(new Array(page), (val, index) => (index * this.pageSize).toString());
    this.getMaterialen(this.nextKey);
  }

  /* Collapse */

  collapse(id) {
    this.activeMateriaal = this.activeMateriaal === id ? undefined : id;
  }

  // Delete
  delete(id: number) {
    this.materialenService.deleteMateriaal(id, 'catalogus');
  }
}
