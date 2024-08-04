import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlanService {
  private baseUrl = 'http://localhost:8080'; // Replace with your API base URL

  constructor(private http: HttpClient) { }

  getTrue5G(): Observable<any> {
    return this.http.get(`${this.baseUrl}/gettrue5g`);
  }

  getDataBooster(): Observable<any> {
    return this.http.get(`${this.baseUrl}/getdatabooster`);
  }

  getPopular(): Observable<any> {
    return this.http.get(`${this.baseUrl}/getpopular`);
  }

  getValue(): Observable<any> {
    return this.http.get(`${this.baseUrl}/getvalue`);
  }

  getAnnual(): Observable<any> {
    return this.http.get(`${this.baseUrl}/getannual`);
  }
}
