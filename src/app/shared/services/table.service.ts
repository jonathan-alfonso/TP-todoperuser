import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Users } from '../models/users';

@Injectable({
    providedIn: 'root'
})

export class TableService {
    private urlTableItemsAPI = environment.urlApi + '/users';
    private _users$ = new BehaviorSubject<Users[]>([]);

    constructor(
        private http: HttpClient,
    ) {}

    public findAll(): Observable<Users[]> {
        return this.http.get<Users[]>(this.urlTableItemsAPI);
    }
}