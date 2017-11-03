import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavbarService } from "../../services/navbar.service";
import { AngularFireDatabase } from 'angularfire2/database';
import { ReserveringService } from '../../services/reservering.service';
import { Observable } from 'rxjs/Observable';
import { Reservering } from '../../models/reservering';

@Component({
  selector: 'reservering-afhandelen',
  templateUrl: './reservering-afhandelen.component.html',
  styleUrls: ['./reservering-afhandelen.component.css']
})
export class ReserveringAfhandelenComponent {

  items: Reservering[];

  constructor(db: AngularFireDatabase,
    private reserveringService: ReserveringService) {
      this.reserveringService.getReserveringen().subscribe(reserveringen => {
        this.items = reserveringen;
      });
  }

  selectReservering(reservering: Reservering) {
    console.log("We gaan deze reservering ophalen: " + reservering.aanmaakdatum)
  }
}
