import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavbarService } from "../../services/navbar.service";
import { AngularFireDatabase } from 'angularfire2/database';
import { ReserveringService } from '../../services/reservering.service';
import { MaterialenService } from '../../services/materialen.service';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs/Observable';
import { Reservering } from '../../models/reservering';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'reservering-lijst',
  templateUrl: './reservering-lijst.component.html',
  styleUrls: ['./reservering-lijst.component.css']
})
export class ReserveringLijstComponent implements OnInit{

  displayedColumns = ['materiaal_naam', 'aantal', 'student_naam', 'student_nummer', 'einddatum', 'aanmaakdatum'];
  dataSource: ReserveringsLijstDataSource | null;
  allElements: reservering[];

  constructor(private reserveringService: ReserveringService,
              private materialenService: MaterialenService,
              private userService: UserService) {
    
   }
   
   ngOnInit(){
    this.reserveringService.getReserveringen().subscribe(
      (res) => {
        this.allElements = [];
        res.forEach(reservering => {
          this.materialenService.getMateriaalById(reservering.materiaal_id).subscribe(
            (materiaal) => {
              this.userService.getUserById(reservering.user_uid).subscribe(
                (user) => {
                  this.allElements.push({ 
                  'materiaal_naam': materiaal.naam,
                  'aantal': reservering.aantal,
                  'student_naam': user.naam,
                  'student_nummer': user.studentnummer,
                  'einddatum': reservering.einddatum,
                  'aanmaakdatum': reservering.aanmaakdatum
                  });
                  this.dataSource = new ReserveringsLijstDataSource(this.allElements);             
                });
            }
          );
        });
    });
 }

  selectReservering(reservering: Reservering) {
    this.reserveringService.getReservering(reservering['$key']);
  }
}

export class ReserveringsLijstDataSource extends DataSource<any> {
  constructor(private elements: reservering[]) {
    super();
  }

  connect(): Observable<reservering[]> {
    return Observable.of(this.elements);
  }

  disconnect() {}
}

export interface reservering {
  materiaal_naam: string;
  aantal: number;
  student_naam: string;
  student_nummer: number;
  einddatum: string;
  aanmaakdatum: string;
}