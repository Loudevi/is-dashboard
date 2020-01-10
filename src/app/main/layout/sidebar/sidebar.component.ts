import { Component, OnInit } from '@angular/core';

// Services
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.template.html',
    styleUrls: [ './sidebar.style.scss' ]
})

export class SidebarComponent implements OnInit {

    token: any = null;
    user: any;
    activeName: string = 'dashboard';
    activeSubName: string;

    constructor(
        private _auth: AuthService
    ) {}

    ngOnInit() {
        this.getUserInfo();
    }

    setActiveClass(name: string, subName: string) {
        this.activeName = name;
        this.activeSubName = subName;
    }

    getUserInfo () {
        this.token = sessionStorage.getItem('access_token');
        if (this.token != null) {
            this.user = this._auth.getUsername(this.token);
        }
    }
}
