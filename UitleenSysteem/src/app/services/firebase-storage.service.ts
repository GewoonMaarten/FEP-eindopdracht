import { Injectable } from '@angular/core';
import { FirebaseApp } from 'angularfire2';
import * as firebase from 'firebase/app';
import {Afbeelding} from '../models/afbeelding';
import UploadTask = firebase.storage.UploadTask;

/**
 * Service om bestanden te uploaden of verwijderen.
 * */
@Injectable()
export class FirebaseStorageService {

  constructor(private firebaseApp: FirebaseApp) {}

  public uploadFile(afbeelding: Afbeelding): UploadTask{

    const storageRef = this.firebaseApp.storage().ref();

    return storageRef.child(`images/${afbeelding.file.name}`).put(afbeelding.file);
  }

  public deleteFile(name: string) {
    const storageRef = this.firebaseApp.storage().ref();
    storageRef.child(`images/${name}`).delete();
  }
}
