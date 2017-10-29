import {Component, OnDestroy, OnInit} from '@angular/core';
import {Form, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from '@angular/router';

import {MaterialenService} from "../../services/materialen.service";

import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/startWith";
import {Subscription} from "rxjs/Subscription";
import {Materiaal} from "../../models/materiaal";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Component({
  selector: 'app-materiaal-form',
  templateUrl: './materiaal-form.component.html',
  styleUrls: ['./materiaal-form.component.css']
})
export class MateriaalFormComponent implements OnInit, OnDestroy {

  materiaalId: number;
  naamControlSubscription: Subscription;

  isUpdate: boolean = false;

  filteredOptions: Observable<string[]>;
  namen: Subscription;

  materiaalForm: FormGroup;

  startAt = new BehaviorSubject("");
  endAt = new BehaviorSubject("");

  constructor(private materialenService: MaterialenService,
              private _formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit():void {
    //Form
    this.materiaalForm = this._formBuilder.group({
      naam: ['', Validators.required],
      aantal: ['', Validators.required],
      afbeelding: '',
      omschrijving: ''
    });

    let naamControl = this.materiaalForm.controls['naam'] as FormControl;

    //Auto fill
    this.naamControlSubscription = naamControl.valueChanges
      .startWith(null)
      .subscribe(value => {

        this.materialenService.searchMaterialen(value, value+"\uf8ff")
          .take(1)
          .subscribe(materialen => {
            const materiaal = materialen[0] as Materiaal;

            if (materiaal && naamControl.value === materiaal.naam){

              this.isUpdate = true;
              this.materiaalId = materiaal.$key;

              this.materiaalForm.patchValue({
                aantal: materiaal.aantal,
                omschrijving: materiaal.omschrijving
              });
            } else {
              this.isUpdate = false;
            }
          });
    });



    //Auto complete
    this.namen = this.materialenService.getMateralenNaam()
      .subscribe(namen => {
        this.filteredOptions = naamControl.valueChanges
          .startWith(null)
          .map(val => val ? this.filterNames(val, namen) : namen.slice());
      });
  }


  ngOnDestroy(): void {
    this.namen.unsubscribe();
    this.naamControlSubscription.unsubscribe();
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

 submit(){
    if(this.isUpdate){

      console.log(`Update ${this.materiaalId}, ${this.materiaalForm.value}`);

      this.materialenService.updateMateriaal(this.materiaalId, this.materiaalForm.value as Materiaal);

      this.router.navigate(['/materiaal/1'])

    } else if(!this.isUpdate){
      this.materialenService.addMateriaal(this.materiaalForm.value as Materiaal);
    }
  }

}
