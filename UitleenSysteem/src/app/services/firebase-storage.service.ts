import { Injectable } from '@angular/core';
import { FirebaseApp } from 'angularfire2';
import * as firebase from 'firebase/app';
import {Afbeelding} from "../models/afbeelding";
import UploadTask = firebase.storage.UploadTask;

@Injectable()
export class FirebaseStorageService {


  constructor(private firebaseApp: FirebaseApp) {}


  public uploadFile(afbeelding: Afbeelding): UploadTask{


    let storageRef = this.firebaseApp.storage().ref();


    return storageRef.child(`images/${afbeelding.file.name}`).put(afbeelding.file);

    //console.log(uploadTask);

  }

  public deleteFile(name:string) {
    let storageRef = this.firebaseApp.storage().ref();
    storageRef.child(`images/${name}`).delete();
  }

}
