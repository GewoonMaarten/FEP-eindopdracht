import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavbarService } from "../../services/navbar.service";
import { AngularFireDatabase } from 'angularfire2/database';
import { ReserveringService } from '../../services/reservering.service';
import { Observable } from 'rxjs/Observable';
import { Reservering } from '../../models/reservering';

@Component({
  selector: 'reservering-lijst',
  templateUrl: './reservering-lijst.component.html',
  styleUrls: ['./reservering-lijst.component.css']
})
export class ReserveringLijstComponent {

  items: Reservering[];

  constructor(private reserveringService: ReserveringService) {
      this.reserveringService.getReserveringen().subscribe(reserveringen => {
        this.items = reserveringen;
      });
  }

  selectReservering(reservering: Reservering) {
    this.reserveringService.getReservering(reservering['$key']);
  }
}
