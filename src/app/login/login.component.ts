import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Services
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.template.html',
    styleUrls: [ './login.style.scss' ]
})

export class LoginComponent implements OnInit {

    stakeholders: any = [];

    login: any = {};
    token: any = {};
    stakeholder: any = {};

    infoCorrect: boolean = true;
    spinner: boolean = false;

    constructor(
        private _auth: AuthService,
        private _router: Router,
    ) {}

    ngOnInit() {
        sessionStorage.clear();
    }

    submit() {
        this.spinner = true;
        this._auth.login(this.login)
            .subscribe(res => {
                this.token = res;
                sessionStorage.setItem('access_token', this.token.access_token);
                this._router.navigateByUrl('app/dashboard');
            },
            error => {
                this.spinner = false;
                this.infoCorrect = false;
            });
    }
}
