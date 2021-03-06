import { Injectable } from '@angular/core';
import {AngularFireDatabase, QueryFn} from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import { User } from '../models/user';


@Injectable()
export class UserService {

  private rootPath = '/users';

    constructor(private db: AngularFireDatabase) { }

    public getUserById(id: string): Observable<User> {
      return this.db.object<User>(`${this.rootPath}/${id}`).valueChanges();
    }

}
