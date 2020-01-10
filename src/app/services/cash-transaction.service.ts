import { SERV_CONFIG } from './services-constants';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class CashTransactionService {

    constructor(
        private http: HttpClient
    ) {}

    get(id, cashRegisterId) {
        let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + sessionStorage.getItem('access_token') });
        return this.http.get(SERV_CONFIG.baseUrl + '/cash-transactions/' + id + '/' + cashRegisterId, { headers });
    }

    insert(cashTransaction) {
        let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + sessionStorage.getItem('access_token') });
        return this.http.post(SERV_CONFIG.baseUrl + '/cash-transactions', cashTransaction, { headers });
    }

    remove(id) {
        let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + sessionStorage.getItem('access_token') });
        return this.http.delete(SERV_CONFIG.baseUrl + '/cash-transactions/' + id, { headers });
    }
}
