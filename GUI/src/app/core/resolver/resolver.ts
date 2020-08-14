import {Injectable} from '@angular/core';

import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import {ApiService} from "../services/api.service";

@Injectable()
export class Resolver implements Resolve<any> {
  constructor(
    private api: ApiService
  ) {
  }

  resolve(route:ActivatedRouteSnapshot) {
    return this.api.getToDoListsData();
  }
}
