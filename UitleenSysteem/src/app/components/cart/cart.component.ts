import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Materiaal, Reservering } from "../../models/index";
import { Subscription } from 'rxjs/Subscription';
import { MaterialenService, ReserveringService } from '../../services/index'

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  subscription: Subscription;
  confirmStep1: boolean = false;
  confirmStep2: boolean = false;
  materiaalCart: Reservering [] =[];
  materialenInCart: Materiaal[] = [];

  constructor(
    public materialenService: MaterialenService,
    public reserveringSerivce: ReserveringService,
    public dialogRef: MatDialogRef<CartComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Reservering[]) {

    this.confirmStep1 = false;
    this.confirmStep1 = false;

    this.materiaalCart = data;

    this.materiaalCart.forEach(x => {
      this.materialenService.getMateriaalById(x.materiaal_id).subscribe(materiaal => {

        //add the $key, because it doesn't get returned
        let addMateriaal = materiaal;
        addMateriaal.$key = x.materiaal_id;

        this.materialenInCart.push(materiaal);  
      });
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  checkRemove(key) {
    this.materiaalCart.forEach(x => {
      if (x.materiaal_id == key) {
        x.aantal = Number(x.aantal) - 1;
        this.pushToService();        
      }
    });
  }

  checkAdd(key) {
    this.materiaalCart.forEach(x => {
      if (x.materiaal_id == key) {
        x.aantal = Number(x.aantal) + 1;
        this.pushToService();        
      }
    });
  }

  deleteReservering(key) {
    //delete Reservering from Cart
    this.materiaalCart.forEach(x => {
      if (x.materiaal_id == key) {
        var index = this.materiaalCart.indexOf(x);
        this.materiaalCart.splice(index, 1);
        this.pushToService();        
      }
    });

    //delete Materiaal from materialenInCart
    this.materialenInCart.forEach(x => {
      if (x.$key == key) {
        var index = this.materialenInCart.indexOf(x);
        this.materialenInCart.splice(index, 1);
      }
    });
  }

  confirmReservering() {
    if (this.reserveringSerivce.addReservering()) {
      this.onNoClick()
    }
  }

  pushToService():void {
    //push new Cart to reserveringsService
    this.reserveringSerivce.addToCart(this.materiaalCart);
  }
}
