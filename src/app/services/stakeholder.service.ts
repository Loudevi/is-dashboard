import { SERV_CONFIG } from './services-constants';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class StakeholderService {

    constructor(
        private http: HttpClient
    ) {}

    get(id, idDocument, stakeholderType) {
        let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + sessionStorage.getItem('access_token') });
        return this.http.get(SERV_CONFIG.baseUrl + '/stakeholders/' + id + '/' + idDocument + '/' + stakeholderType, { headers });
    }

    insert(stakeholder) {
        let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + sessionStorage.getItem('access_token') });
        return this.http.post(SERV_CONFIG.baseUrl + '/stakeholders', stakeholder, { headers });
    }

    remove(id, stakeholderType) {
        let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + sessionStorage.getItem('access_token') });
        return this.http.delete(SERV_CONFIG.baseUrl + '/stakeholders/' + id + '/' + stakeholderType, { headers });
    }
}
