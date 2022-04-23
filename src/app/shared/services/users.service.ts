import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Users } from '../models/users';

@Injectable({
    providedIn: 'root'
})

export class UsersService {
    private _baseUrl = environment.urlApi + '/users';
    private _users$ = new BehaviorSubject<Users[]>([]);

    constructor(
        private http: HttpClient,
    ) {}

    public getUsersService(): Observable<Users[]> {
        return this.http.get<Users[]>(this._baseUrl);
    }

    public deleteUserService(id: string): Observable<any> {
        return this.http.delete<string>(this._baseUrl + '/' + id);
    }

    public getById(id: string): Observable<Users> {
        return this.http.get<Users>(this._baseUrl + '/' + id);
    }
}