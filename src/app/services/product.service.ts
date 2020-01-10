import { SERV_CONFIG } from './services-constants';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ProductService {

    constructor(
        private http: HttpClient
    ) {}

    get(id, movementType) {
        let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + sessionStorage.getItem('access_token') });
        return this.http.get(SERV_CONFIG.baseUrl + '/products/' + id + '/' + movementType, { headers });
    }

    insert(product) {
        let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + sessionStorage.getItem('access_token') });
        return this.http.post(SERV_CONFIG.baseUrl + '/products', product, { headers });
    }

    remove(id, movementType) {
        let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + sessionStorage.getItem('access_token') });
        return this.http.delete(SERV_CONFIG.baseUrl + '/products/' + id + '/' + movementType, { headers });
    }
}
