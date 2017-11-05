import { Component, OnInit } from '@angular/core';
import { NavbarService, AuthService, ReserveringService, MaterialenService } from '../../services/index';
import { Reservering, User } from '../../models/index';
import { Subject } from 'rxjs/Subject';
import { MatDialog } from '@angular/material';
import { CartComponent } from '../cart/cart.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: Subject<User> = new Subject();
  materiaalCart: Reservering[] = [];

  constructor(public nav: NavbarService,
    public dialog: MatDialog,
    public auth: AuthService,
    public reserveringService: ReserveringService,
    public materialenService: MaterialenService) {
    this.reserveringService.getCart().subscribe(data => {
      this.materiaalCart = data;
    });
  }

  ngOnInit() {
    this.user = this.auth.user;
  }

  // Logout
  public logout(): void {
    this.auth.signOut();
  }

  showCart() {
    const dialogRef = this.dialog.open(CartComponent, {
      data: this.materiaalCart
    });
  }
}
