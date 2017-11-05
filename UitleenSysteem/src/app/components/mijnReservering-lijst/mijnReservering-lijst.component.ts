import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavbarService } from '../../services/navbar.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { User, Reservering, Materiaal } from '../../models/index';
import { DataSource } from '@angular/cdk/collections';
import { AuthService, MaterialenService, ReserveringService, UserService } from '../../services/index';

@Component({
  selector: 'mijnReservering-lijst',
  templateUrl: './mijnReservering-lijst.component.html',
  styleUrls: ['./mijnReservering-lijst.component.css']
})
export class MijnReserveringLijstComponent implements OnInit {

  displayedColumns = ['materiaal_naam', 'aantal', 'einddatum', 'aanmaakdatum'];
  dataSource: MijnReserveringsLijstDataSource | null;
  afgehandeldDataSource: MijnReserveringsLijstDataSource | null;

  constructor(private reserveringService: ReserveringService,
    private materialenService: MaterialenService,
    private userService: UserService,
    private auth: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.getReserveringenDataByStatus('afgehandeld');

    this.getReserveringenDataByStatus('aangemaakt');
  }

  getReserveringenDataByStatus(status: string) {
    this.reserveringService.getReserveringen().subscribe(
      (res) => {
        const reserveringen: MijnReserveringTable[] = [];
        res.forEach(reservering => {
          if (reservering.status === status) {
            this.materialenService.getMateriaalFromCatalogusById(reservering.materiaal_id).subscribe(
              (materiaal) => {
                this.auth.getUserUid().subscribe(user_id => {
                  if (reservering.user_uid === user_id) {
                    console.log(reservering.user_uid, user_id)
                    reserveringen.push(this.mapTableData(reservering, materiaal));
                    if (status === 'aangemaakt') { this.dataSource = new MijnReserveringsLijstDataSource(reserveringen); }
                    if (status === 'afgehandeld') { this.afgehandeldDataSource = new MijnReserveringsLijstDataSource(reserveringen); }
                  }
                });
              });
          }
        });
      }
    );
  }

  mapTableData(reservering: Reservering, materiaal: Materiaal): MijnReserveringTable {
    return {
      'key': reservering['$key'],
      'materiaal_naam': materiaal.naam,
      'aantal': reservering.aantal,
      'einddatum': reservering.einddatum,
      'aanmaakdatum': reservering.aanmaakdatum
    };
  }
}

export class MijnReserveringsLijstDataSource extends DataSource<any> {
  private elements: MijnReserveringTable[];

  constructor(elements: MijnReserveringTable[]) {
    super();
    this.elements = elements;
  }

  connect(): Observable<MijnReserveringTable[]> {
    return Observable.of(this.elements);
  }

  disconnect() { }
}

export interface MijnReserveringTable {
  key: number;
  materiaal_naam: string;
  aantal: number;
  einddatum: string;
  aanmaakdatum: string;
}
