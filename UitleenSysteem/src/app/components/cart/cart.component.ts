import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {Materiaal} from "../../models/materiaal";
import { Subscription } from 'rxjs/Subscription';
import {NavbarService} from "../../services/navbar.service";


@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  subscription: Subscription;
  public cartje : Materiaal [] = [];
  test = "TEST";

  constructor(
    public nav: NavbarService,
    public dialogRef: MatDialogRef<CartComponent>) {
  }
  
  ngOnInit() {
    // this.getCart().subscribe(_ => {
    //   console.log('ngOnit after getCart() ' + this.cartje);
    // });
    this.cartje = this.nav.getCart();
  }
  getCart() {
    // return this.nav.getCart().map((data) => { 
    //   //hier gaat nog iets fout: UITZOEKEN!!!!!!!
    //   console.log('cartje ' + data);
    //   this.cartje = data;
    //   console.log('this.cartje ' + this.cartje);

    //   //hier dus!!!!!!!^^^^
    // });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  rand(){
    console.log(this.cartje);
  }
}