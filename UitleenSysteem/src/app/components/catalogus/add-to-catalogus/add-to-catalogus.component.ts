import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import * as _ from 'lodash';

import { Materiaal} from '../../../models/index';
import { MaterialenService } from '../../../services/index';

@Component({
  selector: 'app-add-to-catalogus',
  templateUrl: './add-to-catalogus.component.html',
  styleUrls: ['./add-to-catalogus.component.css']
})
export class AddToCatalogusComponent {

  displayedColumns = ['C.B.', 'materiaal', 'hoeveelheid', 'aanmaakdatum'];
  dataSource: ExampleDataSource;
  selectedMaterialen = [];

  constructor(private materialenService: MaterialenService) {
    /*
    sla all materialen in de inventaris op in dataSource
    zodat je ze in een table kan tonen
    */
    this.materialenService.getMaterialen('inventaris').subscribe(
      (res) => {
        this.dataSource = new ExampleDataSource(res);
    });
   }

  /*
    event listener [checkbox]
    als een row wordt geselecteert,
    sla het materiaal op in selectedMaterialen
  */
  onSelect(data) {
    if (_.find(this.materialenService.selectedMaterialen, data)) {
      _.pull(this.materialenService.selectedMaterialen, data);
     } else {
      this.materialenService.selectedMaterialen.push(data);
    }
  }
}

/**
 * Data source to provide what data should be rendered in the table. The observable provided
 * in connect should emit exactly the data that should be rendered by the table. If the data is
 * altered, the observable should emit that new set of data on the stream. In this case here,
 * return a stream that contains only one set of data that doesn't change.
 */
export class ExampleDataSource extends DataSource<any> {
  constructor(private elements: Materiaal[]) {
    super();
  }
  // Connect function called by the table to retrieve one stream containing the data to render.
  connect(): Observable<Materiaal[]> {
    return Observable.of(this.elements);
  }

  disconnect() {}
}
