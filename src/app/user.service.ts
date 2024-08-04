import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/addusers'; // Update with your API URL

  constructor(private http: HttpClient) { }

  createUser(userData: any): Observable<any> {
    return this.http.post(this.apiUrl, userData);
  }
}
