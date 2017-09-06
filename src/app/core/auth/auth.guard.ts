import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from 'app/core/auth/auth.service';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private _auth: AuthService, private _router: Router) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this._auth.getUser().map(user => {
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
        });
    }
}
