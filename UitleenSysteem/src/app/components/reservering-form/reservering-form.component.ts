import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router, ActivatedRoute} from '@angular/router';

import { Kluisje } from "../../models/kluisje";
import { Reservering } from "../../models/reservering";
import { Materiaal } from "../../models/materiaal";
import { User } from "../../models/user";

import { KluisjesService } from "../../services/kluisjes.service";
import { ReserveringService } from "../../services/reservering.service";
import { MaterialenService } from "../../services/materialen.service";
import { UserService } from "../../services/user.service";

import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/startWith";
import {Subscription} from "rxjs/Subscription";
import * as firebase from "firebase";
import { AngularFireDatabase } from 'angularfire2/database';
import { ReserveringsLijstDataSource, ReserveringTable } from '../reservering-lijst/reservering-lijst.component';

@Component({
  selector: 'reservering-form',
  templateUrl: './reservering-form.component.html',
  styleUrls: ['./reservering-form.component.css']
})
export class ReserveringFormComponent implements OnInit {

  reserveringForm: FormGroup;
  kluisjes: Kluisje[];
  reservering: Reservering;
  materiaal: Materiaal;
  user: User;

  materiaalNaam: string;
  studentNaam: string;
  studentNummer: string;

  displayedColumns = ['materiaal_naam', 'aantal', 'student_naam', 'student_nummer', 'einddatum', 'aanmaakdatum'];
  dataSource: ReserveringsLijstDataSource | null;

  status = [
    {value: 'afgehandeld', viewValue: 'Afgehandeld'},
    {value: 'nietafgehandeld', viewValue: 'Niet Afgehandeld'}
  ];

  constructor(private kluisjesService: KluisjesService,
              private reserveringService: ReserveringService,
              private materialenService: MaterialenService,
              private userService: UserService,
              private _formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.reserveringForm = this._formBuilder.group({
      status: ['', Validators.required],
      aantal: ['', Validators.required],
      pincode: [this.generatePincode(), Validators.required],
      kluisnummer: ['', Validators.required],
      opmerking: ''
    });
    
    this.kluisjesService.getKluisjes().subscribe(
      (res) => {
        this.kluisjes = res;
      }
    )

    this.route.params.subscribe(params => {
      this.reserveringService.getReserveringById(params['key']).subscribe(
        (reservering) => {
          this.reservering = reservering;
          this.materialenService.getMateriaalById(this.reservering.materiaal_id).subscribe(
            (materiaal) => {
              this.materiaal = materiaal; 
              this.userService.getUserById(this.reservering.user_uid).subscribe(
                (user) => {
                  this.user = user;
                  this.initializeTable();
                  this.setReserveringData();
                });
          });
          
        });
    });
  }

  setReserveringData() {
    this.reserveringForm.setValue({
      status: 'afgehandeld',
      aantal: this.reservering.aantal,
      pincode: this.generatePincode(),
      kluisnummer: '',
      opmerking: ''
    })

    this.materiaalNaam = this.materiaal.naam;
    this.studentNaam = this.user.naam;
    this.studentNummer = this.user.studentnummer.toString();
  }

  initializeTable() {
    var item: ReserveringTable = {
      'key': this.reservering['$key'],
      'materiaal_naam': this.materiaal.naam,
      'aantal': this.reservering.aantal,
      'student_naam': this.user.naam,
      'student_nummer': this.user.studentnummer,
      'einddatum': this.reservering.einddatum,
      'aanmaakdatum': this.reservering.aanmaakdatum
      };
      this.dataSource = new ReserveringsLijstDataSource([item]);
  }

  generatePincode() {
    return Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
  }

  submit() {
    // we moeten er nu voor zorgen dat het materiaal de status uitgeleend krijgt en
    // dat de reservering de status afgehandeld krijgt

    

    console.log("JOOOO WE GAAN SUBMITTENNNN")
  }
}