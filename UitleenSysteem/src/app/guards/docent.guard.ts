import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {AuthService} from "../services/auth.service";
import * as _ from 'lodash';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

//Route guard alleen toeganglijk voor users met als rol docent
@Injectable()
export class DocentGuard implements CanActivate {

  constructor(private auth: AuthService,
              private router: Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot){

    return this.auth.user
      .take(1)
      .map(user => _.has(_.get(user, 'roles'), 'docent'))
      .do(authorized => {
        if(!authorized){
          console.log('route prevented!')
        }
      })

  }
}
