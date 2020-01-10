import { SERV_CONFIG } from './services-constants';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt'

@Injectable()
export class AuthService {

    decodedToken: any;

    constructor(
        private http: HttpClient
    ) {}

    login(credentials) {
        let body = new URLSearchParams();
        body.set('client_id', SERV_CONFIG.client_id);
        body.set('client_secret', SERV_CONFIG.client_secret);
        body.set('grant_type', SERV_CONFIG.grant_type);
        body.set('scope', SERV_CONFIG.scope);
        body.set('username', credentials.email);
        body.set('password', credentials.password);

        var headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
        return this.http.post( SERV_CONFIG.authUrl + '/connect/token', body.toString(), { headers } );
    }

    getUsers(tenantId) {
        return this.http.get(SERV_CONFIG.authUrl + '/api/admin/' + tenantId);
    }

    createUser(user) {
        return this.http.post(SERV_CONFIG.authUrl + '/api/admin', user);
    }

    deleteUser(userId) {
        return this.http.delete(SERV_CONFIG.authUrl + '/api/admin/'+ userId);
    }

    // ---------------
    // Token Handlers
    // ---------------

    getUsername(token) {
        const helper = new JwtHelperService();
        this.decodedToken = helper.decodeToken(token);
        var firstName = this.decodedToken['given_name'];
        var lastName = this.decodedToken['family_name'];
        var username = firstName + ' ' + lastName;
        return username;
    }

    getUserId(token) {
        const helper = new JwtHelperService();
        this.decodedToken = helper.decodeToken(token);
        var userId = this.decodedToken['sub'];
        return userId;
    }

    getUserTenant() {
        const helper = new JwtHelperService();
        this.decodedToken = helper.decodeToken(sessionStorage.getItem('access_token'));
        var tenantId = this.decodedToken['companies'];
        return tenantId;
    }
}
