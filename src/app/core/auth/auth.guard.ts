
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'app/core/auth/auth.service';
import { Router } from '@angular/router';


@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private _auth: AuthService, private _router: Router) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this._auth.getUser().pipe(map(user => {
            if (user) {
                // authenticated
                if (user.admin) {
                    return true;
                }
                this._router.navigate(['home']);
            } else {
                // not authenticated
                this._router.navigate(['auth', 'login']);
            }
            return false;
        }));
    }
}
