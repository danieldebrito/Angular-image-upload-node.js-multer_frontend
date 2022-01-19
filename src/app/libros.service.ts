import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Libro } from './libro';

@Injectable({
  providedIn: 'root'
})
export class LibrosService {

  API_URI = 'http://localhost:3000';

  constructor(
    private http: HttpClient) { }

  gets(): Observable<any> {
    return this.http.get(`${this.API_URI}/libros/`);
  }

  getById(id: number): Observable<any> {
    return this.http.get(`${this.API_URI}/libros/${id}`);
  }

  delete(id: string) {
    return this.http.delete(`${this.API_URI}/libros/${id}`);
  }

  save(element: Libro) {
    return this.http.post(`${this.API_URI}/libros/`, element);
  }

  update(id: string|number, updated: File): Observable<any> {
    return this.http.put(`${this.API_URI}/libros/${id}`, updated);
  }

}
