// src/app/validate.service.ts
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  private apiUrl = 'http://localhost:8080/api/sendMail';
  private validatePhoneNumberUrl = 'http://localhost:8080/validatePhoneNumber';
  private getEmailUrl = 'http://localhost:8080/getEmail';
  private postPaymentUrl = 'http://localhost:8080/api/plans/add';

  constructor(private http: HttpClient) { }

  // Validate phone number
  validatePhoneNumber(phoneNumber: string): Observable<string> {
    return this.http.get(`${this.validatePhoneNumberUrl}?phoneNumber=${phoneNumber}`, { responseType: 'text' });
  }

  // Get email by phone number
  getEmail(phoneNumber: string): Observable<{ email?: string }> {
    return this.http.get<{ email?: string }>(`${this.getEmailUrl}?phno=${phoneNumber}`);
  }

  // Post payment data
  postPayment(paymentData: { phonenumber: any; broughtFrom: any; }): Observable<any> {
    return this.http.post(this.postPaymentUrl, paymentData, { responseType: 'text' });
  }

  // Send email
  sendEmail(emailData: { toEmail: string }): Observable<any> {
    let params = new HttpParams().set('toEmail', emailData.toEmail);
    return this.http.post(this.apiUrl, null, { params, responseType: 'text' });
  }
}
