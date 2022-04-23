import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Todos } from '../models/todos';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  private _baseUrl = environment.urlApi + '/todos';
  private _todos$ = new BehaviorSubject<Todos[]>([]);

    constructor(
        private http: HttpClient,
    ) {}

    public getTodosServices(): Observable<Todos[]> {
        return this.http.get<Todos[]>(this._baseUrl);
    }

    public getTodosByUser(userId: string): Observable<Todos[]> {
      return this.http.get<Todos[]>(this._baseUrl + '?userId=' + userId);
    }

    public getTodosByCategory(category: string): Observable<Todos[]> {
      return this.http.get<Todos[]>(this._baseUrl + '?category=' + category);
    }

    public getTodoServices(id: string): Observable<Todos> {
        return this.http.get<Todos>(this._baseUrl + '/' + id);
    }

    public deleteTodosService(id: string): Observable<Todos> {
        return this.http.delete<Todos>(this._baseUrl + '/' + id);
    }

    public updateTodosService(todos: Todos): Observable<Todos> {
      return this.http.put<Todos>(this._baseUrl + '/' + todos.id, todos);
    }

    public addTodosService(todos: Todos): Observable<Todos> {
      return this.http.post<Todos>(this._baseUrl, todos);
    }
}
