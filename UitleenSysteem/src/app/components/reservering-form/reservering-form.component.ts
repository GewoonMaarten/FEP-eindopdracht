import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router, ActivatedRoute} from '@angular/router';

import { Kluisje } from "../../models/kluisje";
import { KluisjesService } from "../../services/kluisjes.service";

import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/startWith";
import {Subscription} from "rxjs/Subscription";
import * as firebase from "firebase";
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'reservering-form',
  templateUrl: './reservering-form.component.html',
  styleUrls: ['./reservering-form.component.css']
})
export class ReserveringFormComponent implements OnInit {

  reserveringForm: FormGroup;
  kluisjes: Kluisje[];
  status = [
    {value: 'afgehandeld', viewValue: 'Afgehandeld'},
    {value: 'nietafgehandeld', viewValue: 'Niet Afgehandeld'}
  ];

  constructor(private kluisjesService: KluisjesService,
              private _formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log(params['key']);
    });

    this.kluisjesService.getKluisjes().subscribe(
      (res) => {
        this.kluisjes = res;
      }
    )

    this.reserveringForm = this._formBuilder.group({
      status: ['', Validators.required],
      aantal: ['1', Validators.required],
      pincode: [this.generatePincode(), Validators.required],
      kluisnummer: ['', Validators.required],
      opmerking: ''
    });
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