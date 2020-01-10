import { Component, OnInit } from '@angular/core';

// Services
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.template.html',
    styleUrls: [ './navbar.style.scss' ]
})

export class NavbarComponent implements OnInit {

    token: any = null;
    user: any;

    constructor(
        private _auth: AuthService
    ) {}

    ngOnInit() {
        this.getUserInfo();
    }

    getUserInfo () {
        this.token = sessionStorage.getItem('access_token');
        if (this.token != null) {
            this.user = this._auth.getUsername(this.token);
        }
    }
}
