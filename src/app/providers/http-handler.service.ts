import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from './../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class HttpHandlerService {
    constructor(public http: HttpClient) {}
    public headers: {} = { headers: { 'Content-Type': 'application/json; charset=utf-8' } };

    public getUrl() {
        return environment.apiUrl;
    }

    public loginCall(reqParam: any) {
        return this.http.post(this.getUrl() + 'login', reqParam, this.headers);
    }

    public usersCall() {
        return this.http.get(this.getUrl() + 'user_list');
    }

    public addNewUserCall(reqParam) {
        return this.http.post(this.getUrl() + 'user_list', reqParam);
    }
}
