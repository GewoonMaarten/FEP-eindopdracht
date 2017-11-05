import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Materiaal, Reservering } from '../../models/index';
import { Subscription } from 'rxjs/Subscription';
import { MaterialenService, ReserveringService } from '../../services/index'

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  subscription: Subscription;
  confirmStep1 = false;
  confirmStep2 = false;
  materiaalCart: Reservering [] =[];
  materialenInCart: Materiaal[] = [];

  constructor(
    public materialenService: MaterialenService,
    public reserveringSerivce: ReserveringService,
    public dialogRef: MatDialogRef<CartComponent>,
    // data binnengekomen via de NavbarComponent
    @Inject(MAT_DIALOG_DATA) public data: Reservering[]) {

    this.confirmStep1 = false;
    this.confirmStep2 = false;

    this.materiaalCart = data;

    // haal de materialen op welke gereserveerd zijn
    this.materiaalCart.forEach(x => {
      this.materialenService.getMateriaalById(x.materiaal_id).subscribe(materiaal => {

        // voeg de $key toe, omdat deze niet wordt gereturned
        const addMateriaal = materiaal;
        addMateriaal.$key = x.materiaal_id;

        this.materialenInCart.push(materiaal);
      });
    });
  }

  /** sluiten van de dialog */
  onNoClick(): void {
    this.dialogRef.close();
  }

  /** aantal verlagen*/
  checkRemove(key) {
    this.materiaalCart.forEach(x => {
      if (x.materiaal_id === key) {
        x.aantal = Number(x.aantal) - 1;
        this.pushToService();
      }
    });
  }

  /** aantal verhogen  */
  checkAdd(key) {
    this.materiaalCart.forEach(x => {
      if (x.materiaal_id === key) {
        x.aantal = Number(x.aantal) + 1;
        this.pushToService();
      }
    });
  }

  /** verwijderen van Reservering */
  deleteReservering(key) {
    // delete Reservering van Cart
    this.materiaalCart.forEach(x => {
      if (x.materiaal_id === key) {
        const index = this.materiaalCart.indexOf(x);
        this.materiaalCart.splice(index, 1);
        this.pushToService();
      }
    });

    // delete Materiaal van materialenInCart
    this.materialenInCart.forEach(x => {
      if (x.$key === key) {
        const index = this.materialenInCart.indexOf(x);
        this.materialenInCart.splice(index, 1);
      }
    });
  }

  /** bevestigen van Reservering */
  confirmReservering() {
    if (this.reserveringSerivce.addReservering()) {
      this.onNoClick();
    }
  }

  /** push Cart naar reserveringsService */
  pushToService(): void {
    this.reserveringSerivce.addToCart(this.materiaalCart);
  }
}
