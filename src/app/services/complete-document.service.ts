import { SERV_CONFIG } from './services-constants';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class CompleteDocumentService {

    constructor(
        private http: HttpClient
    ) {}
    
    insertManual(completeDocument) {
        let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + sessionStorage.getItem('access_token') });
        return this.http.post(SERV_CONFIG.baseUrl + '/complete-documents/manual', completeDocument, { headers });
    }

    insertElectronic(completeDocument) {
        let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + sessionStorage.getItem('access_token') });
        return this.http.post(SERV_CONFIG.baseUrl + '/complete-documents/efact', completeDocument, { headers });
    }
}
