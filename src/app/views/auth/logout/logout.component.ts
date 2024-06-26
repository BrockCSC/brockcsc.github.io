import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';

@Component({
  selector: 'csc-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
  standalone: true,
})
export class LogoutComponent {
  public message: string;

  constructor(private _auth: AuthService, private _router: Router) {
    this.message = '';
    this._auth.logout().then(() => {
      this.message = 'You have been logged out. Redirecting home.';
      setTimeout(() => {
        this._router.navigate(['home']);
      }, 1000);
    });
  }
}
