import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { ReserveringService, NavbarService, MaterialenService, UserService } from '../../services/index';
import { Observable } from 'rxjs/Observable';
import { Reservering, Materiaal, User } from '../../models/index';
import { DataSource } from '@angular/cdk/collections';

@Component({
  selector: 'reservering-lijst',
  templateUrl: './reservering-lijst.component.html',
  styleUrls: ['./reservering-lijst.component.css']
})
export class ReserveringLijstComponent implements OnInit {

  displayedColumns = ['materiaal_naam', 'aantal', 'student_naam', 'student_nummer', 'einddatum', 'aanmaakdatum'];
  dataSource: ReserveringsLijstDataSource | null;
  afgehandeldDataSource: ReserveringsLijstDataSource | null;

  constructor(private reserveringService: ReserveringService,
              private materialenService: MaterialenService,
              private userService: UserService,
              private router: Router) { }

   ngOnInit() {
    this.getReserveringenDataByStatus('afgehandeld');

    this.getReserveringenDataByStatus('aangemaakt');
  }

  getReserveringenDataByStatus(status: string) {
    this.reserveringService.getReserveringen().subscribe(
      (res) => {
        const reserveringen: ReserveringTable[] = [];
        res.forEach(reservering => {
          if (reservering.status === status) {
            this.materialenService.getMateriaalFromCatalogusById(reservering.materiaal_id).subscribe(
              (materiaal) => {
                this.userService.getUserById(reservering.user_uid).subscribe(
                  (user) => {
                    reserveringen.push(this.mapTableData(reservering, materiaal, user));
                    if (status === 'aangemaakt') {this.dataSource = new ReserveringsLijstDataSource(reserveringen); }
                    if (status === 'afgehandeld') {this.afgehandeldDataSource = new ReserveringsLijstDataSource(reserveringen); }
                  });
                });
          }
        });
      }
    );
  }

  mapTableData(reservering: Reservering, materiaal: Materiaal, user: User): ReserveringTable {
    return {
      'key': reservering['$key'],
      'materiaal_naam': materiaal.naam,
      'aantal': reservering.aantal,
      'student_naam': user.naam,
      'student_nummer': user.studentnummer,
      'einddatum': reservering.einddatum,
      'aanmaakdatum': reservering.aanmaakdatum
      };
  }

  selectReservering(reservering: Reservering) {
    this.reserveringService.getReserveringById(reservering['$key']);
  }

  selectRow(row) {
    this.router.navigate(['reservering/afhandelen/', row.key]);
  }
}

export class ReserveringsLijstDataSource extends DataSource<any> {
  private elements: ReserveringTable[];

  constructor(elements: ReserveringTable[]) {
    super();
    this.elements = elements;
  }

  connect(): Observable<ReserveringTable[]> {
    return Observable.of(this.elements);
  }

  disconnect() {}
}

export interface ReserveringTable {
  key: number;
  materiaal_naam: string;
  aantal: number;
  student_naam: string;
  student_nummer: number;
  einddatum: string;
  aanmaakdatum: string;
}
