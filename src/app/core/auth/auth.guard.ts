import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
} from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private _auth: AuthService, private _router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this._auth.getUser().pipe(
      map((user) => {
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
      })
    );
  }
}
