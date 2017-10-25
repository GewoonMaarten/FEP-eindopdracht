import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";

import {MaterialenService} from "../../services/materialen.service";

import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/startWith";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-materiaal-form',
  templateUrl: './materiaal-form.component.html',
  styleUrls: ['./materiaal-form.component.css']
})
export class MateriaalFormComponent implements OnInit, OnDestroy {


  filteredOptions: Observable<string[]>;
  namen: Subscription;

  naamControl: FormControl;

  constructor(private materialenService: MaterialenService) { }

  ngOnInit():void {

    this.naamControl = new FormControl();

    this.namen = this.materialenService.getMateralenNaam()
      .subscribe(namen => {
        this.filteredOptions = this.naamControl
          .valueChanges
          .startWith(null)
          .map(val => val ? this.filterNames(val, namen) : namen.slice());
      });
  }


  ngOnDestroy(): void {
    this.namen.unsubscribe();
  }

  private filterNames(val: string, namen: string[]): string[]  {
    return namen.filter(option =>
      option.toLowerCase().indexOf(val.toLowerCase()) === 0
    );
  }

}
