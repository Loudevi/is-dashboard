import { SERV_CONFIG } from './services-constants';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ProductTypeService {

    constructor(
        private http: HttpClient
    ) {}

    get(id) {
        let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + sessionStorage.getItem('access_token') });
        return this.http.get(SERV_CONFIG.baseUrl + '/product-types/' + id, { headers });
    }

    insert(productType) {
        let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + sessionStorage.getItem('access_token') });
        return this.http.post(SERV_CONFIG.baseUrl + '/product-types', productType, { headers });
    }

    remove(id) {
        let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + sessionStorage.getItem('access_token') });
        return this.http.delete(SERV_CONFIG.baseUrl + '/product-types/' + id, { headers });
    }
}
