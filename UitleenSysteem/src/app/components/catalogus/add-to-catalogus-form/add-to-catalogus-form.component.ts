import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router} from '@angular/router';

import {Subscription} from "rxjs/Subscription";
import * as _ from 'lodash';

import { Materiaal} from '../../../models/materiaal';
import { MaterialenService } from '../../../services/materialen.service';

@Component({
  selector: 'app-add-to-catalogus-form',
  templateUrl: './add-to-catalogus-form.component.html',
  styleUrls: ['./add-to-catalogus-form.component.css']
})
export class AddToCatalogusFormComponent implements OnInit {

  materialenList = [];
  geselecteerdMaterialen = [];
  inventarisMaterialen = [];
  allMaterialenInCatalogus : any[];

  constructor(private materialenService : MaterialenService, private router: Router) { 
                
    this.materialenList = _.clone(this.materialenService.selectedMaterialen);
    this.geselecteerdMaterialen = _.cloneDeep(this.materialenList);
    this.inventarisMaterialen = _.cloneDeep(this.materialenList);
    this.materialenService.selectedMaterialen = [];

    // voor alle geselecteerd materialen, pas de status aan en maak een foreign key
    this.geselecteerdMaterialen.forEach(element => {
      element.aantal = 1;
      element.status = "catalogus";
      element['foreign_key'] = element.$key;
    });
  }

  ngOnInit() { 
    // Haal alle materialen in de catalogus.
    this.materialenService.getMaterialen("catalogus").subscribe(materialen => {
      this.allMaterialenInCatalogus = materialen;
    });
  }

  onSubmit(){
    this.geselecteerdMaterialen.forEach(gm => {
      this.inventarisMaterialen.forEach(element2 => {
        if (gm.foreign_key == element2.$key) {
          element2.aantal = element2.aantal - gm.aantal
        }
      });

      let found = false;
      if(this.allMaterialenInCatalogus.length > 0) {
        // Loopen door alle materialen in de catalogus        
        for (let i = 0; i < this.allMaterialenInCatalogus.length; i++) {
          if (this.allMaterialenInCatalogus[i].naam == gm.naam) {
            gm.aantal = gm.aantal + this.allMaterialenInCatalogus[i].aantal;
            gm.$key = this.allMaterialenInCatalogus[i].$key;
            found = true;
          } 
        }        
      }
      /* 
      update => als het materiaal in de catalogus voorkomt
      anders voeg het toe aan de catalogus
      */
      if(!found) {
        delete gm['$key'];
        this.materialenService.addMateriaalInCatalogus(gm as Materiaal);
      } else {
        var key = gm.$key;
        delete gm['$key'];
        this.materialenService.updateMateriaalInCatalogus(key, gm as Materiaal);
      }
    });

    // update inventaris
    this.inventarisMaterialen.forEach(element => {
      console.log("inventarisMateriaal: ", element);
      var key = element.$key;
      delete element['$key'];
      this.materialenService.updateMateriaal(key, element as Materiaal);
    });
    this.router.navigate(['/materiaal/catalogus/:page'])
  }
}
