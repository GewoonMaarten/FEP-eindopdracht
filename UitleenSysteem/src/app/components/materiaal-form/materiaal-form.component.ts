import {Component, OnDestroy, OnInit} from '@angular/core';
import {Form, FormControl, FormGroup} from "@angular/forms";

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

  materiaalForm: FormGroup;
  naamControl: FormControl;
  aantalControl: FormControl;
  fileControl: FormControl;
  omschrijvingControl: FormControl;

  constructor(private materialenService: MaterialenService) { }

  ngOnInit():void {

    this.naamControl = new FormControl();
    this.aantalControl = new FormControl();
    this.fileControl = new FormControl();
    this.omschrijvingControl = new FormControl();

    this.materiaalForm = new FormGroup({});
    this.materiaalForm.addControl('naam', this.naamControl);
    this.materiaalForm.addControl('aantal', this.aantalControl);
    this.materiaalForm.addControl('file', this.fileControl);
    this.materiaalForm.addControl('omschrijving', this.omschrijvingControl);

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

  fileChange(event): void{
    const files: FileList = event.target.files;

    if(files.length > 0){
      const file: File = files[0];


    }
  }

}
