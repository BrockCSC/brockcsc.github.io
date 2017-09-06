import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/core/auth/auth.service';

@Component({
    selector: 'csc-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    constructor(private _auth: AuthService) { }

    ngOnInit() {
    }

    public login(): void {
        this._auth.googleLogin();
    }

    public logout(): void {
        this._auth.logout();
    }
}
