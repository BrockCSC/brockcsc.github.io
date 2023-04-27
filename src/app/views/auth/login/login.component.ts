import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';

@Component({
  selector: 'csc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private _auth: AuthService, private _router: Router) {
    this._auth.getUser().subscribe((user) => {
      if (user) {
        // already authenticated
        if (user.admin) {
          this._router.navigate(['admin']);
        } else {
          this._router.navigate(['home']);
        }
      }
    });
  }

  public login(): void {
    this._auth.googleLogin().then(() => {
      this._router.navigate(['admin']);
    });
  }
}
