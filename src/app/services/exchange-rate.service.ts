import { SERV_CONFIG } from './services-constants';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ExchangeRateService {

    constructor(
        private http: HttpClient
    ) {}

    get(id, rateDate) {
        let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + sessionStorage.getItem('access_token') });
        return this.http.get(SERV_CONFIG.baseUrl + '/exchange-rates/' + id + '/' + rateDate, { headers });
    }

    insert(exchangeRate) {
        let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + sessionStorage.getItem('access_token') });
        return this.http.post(SERV_CONFIG.baseUrl + '/exchange-rates', exchangeRate, { headers });
    }

    remove(id) {
        let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + sessionStorage.getItem('access_token') });
        return this.http.delete(SERV_CONFIG.baseUrl + '/exchange-rates/' + id, { headers });
    }
}
