import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MaterialenService, FirebaseStorageService } from '../../services/index';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import { Subscription } from 'rxjs/Subscription';
import { Materiaal, Afbeelding } from '../../models/index';
import * as firebase from 'firebase';

@Component({
  selector: 'app-materiaal-form',
  templateUrl: './materiaal-form.component.html',
  styleUrls: ['./materiaal-form.component.css']
})
export class MateriaalFormComponent implements OnInit, OnDestroy {

  materiaalId: number;
  naamControlSubscription: Subscription;

  isUpdate = false;

  filteredOptions: Observable<string[]>;
  namen: Subscription;

  materiaalForm: FormGroup;

  upload: Afbeelding;

  constructor(private materialenService: MaterialenService,
    private firebaseStorageService: FirebaseStorageService,
    private _formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    // Form
    this.materiaalForm = this._formBuilder.group({
      naam: ['', Validators.required],
      aantal: ['', Validators.required],
      afbeelding: this._formBuilder.group({
        naam: '',
        url: ''
      }),
      omschrijving: '',
      aangemaaktDatum: MateriaalFormComponent.currentDate()
    });

    const naamControl = this.materiaalForm.controls['naam'] as FormControl;

    // Auto fill
    this.naamControlSubscription = naamControl.valueChanges
      .startWith(null)
      .subscribe(value => {

        this.materialenService.searchMaterialen(value, value + '\uf8ff', 'inventaris')
          .take(1)
          .subscribe(materialen => {
            const materiaal = materialen[0] as Materiaal;

            if (materiaal && naamControl.value === materiaal.naam) {

              this.isUpdate = true;
              this.materiaalId = materiaal.$key;

              this.materiaalForm.patchValue({
                aantal: materiaal.aantal,
                afbeelding: {
                  naam: materiaal.afbeelding.naam,
                  url: materiaal.afbeelding.url
                },
                omschrijving: materiaal.omschrijving
              });
            } else {
              this.isUpdate = false;
            }
          });
      });

    // Auto complete
    this.namen = this.materialenService.getMateralenNaam('inventaris')
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

  /** Filter op naam */
  private filterNames(val: string, namen: string[]): string[] {
    return namen.filter(option =>
      option.toLowerCase().indexOf(val.toLowerCase()) === 0
    );
  }

  /** Verander de afbeelding naar een nieuwe */
  fileChange(event): void {
    const files: FileList = event.target.files;
    if (files.length > 0) {
      const file: File = files[0];

      if (this.materiaalForm.value.afbeelding.naam !== '' && file.name !== this.materiaalForm.value.afbeelding.naam) {
        this.firebaseStorageService.deleteFile(this.materiaalForm.value.afbeelding.naam);
      }

      this.upload = new Afbeelding(file);

      const uploadTask = this.firebaseStorageService.uploadFile(this.upload);

      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        snapshot => {
          // upload in progress
        },
        error => {
          // upload failed
        },
        () => {
          // upload success
          this.upload.url = uploadTask.snapshot.downloadURL;
          this.upload.naam = this.upload.file.name;

          this.materiaalForm.patchValue({
            afbeelding: {
              url: this.upload.url,
              naam: this.upload.naam
            }
          });
        }
      );
    }
  }

  /** verwijder de afbeelding. */
  deleteAfbeelding() {
    this.firebaseStorageService.deleteFile(this.materiaalForm.value.afbeelding.naam);
    this.materiaalForm.patchValue({
      afbeelding: {
        url: '',
        naam: ''
      }
    });
  }

  /** update of add een nieuw materiaal. */
  submit() {
    if (this.isUpdate) {
      this.materialenService.updateMateriaal(this.materiaalId, this.materiaalForm.value as Materiaal);
      this.router.navigate(['/materiaal/1']);

    } else if (!this.isUpdate) {
      this.materialenService.addMateriaal(this.materiaalForm.value as Materiaal, 'inventaris');
      this.router.navigate(['/materiaal/1']);
    }
  }

  /** Haal de datum op*/
  private static currentDate(): Date {
    return new Date();
  }
}
