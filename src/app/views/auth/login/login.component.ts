import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/core/auth/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'csc-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    constructor(private _auth: AuthService, private _router: Router) {
        this._auth.getUser().subscribe(
            user => {
                if (user) {
                    // already authenticated
                    if (user.admin) {
                        this._router.navigate(['admin']);
                    } else {
                        this._router.navigate(['home']);
                    }
                }
            }
        );
    }

    ngOnInit() { }

    public login(): void {
        this._auth.googleLogin().then(() => {
            this._router.navigate(['admin']);
        });
    }
}
