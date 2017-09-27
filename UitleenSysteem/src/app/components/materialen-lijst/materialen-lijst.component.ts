import { Component, OnInit, Input } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2/database';

import { Materiaal} from '../../models/materiaal';

import { MaterialenService } from '../../services/materialen.service';

@Component({
  selector: 'materialen-lijst',
  templateUrl: './materialen-lijst.component.html',
  styleUrls: ['./materialen-lijst.component.css']
})
export class MaterialenLijstComponent implements OnInit {

  @Input() itemsPerPage: number;
  @Input() images: boolean;

  materialen: FirebaseListObservable<Materiaal[]>;

  showSpinner: boolean = true;

  constructor(private materialenService: MaterialenService) {}

  ngOnInit() {
    this.images = true;
    this.itemsPerPage = 30;

    this.materialen = this.materialenService.getMaterialen();
    this.materialen.subscribe(() => this.showSpinner = false);
  }

}
