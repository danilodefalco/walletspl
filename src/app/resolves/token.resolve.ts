import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { TokenModel } from '../models/token.model';
import { TokenService } from '../services/token.service';

@Injectable()
export class TokenResolve implements Resolve<TokenModel> {

    constructor(
        private tokenService: TokenService
    ) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.tokenService.getById(route.params['id']);
    }
}