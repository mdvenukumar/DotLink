import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {
  email: string = '';
  phoneNumber: string = '';

  private apiUrl = 'http://localhost:8080/addusers'; // Your Spring Boot endpoint

  constructor(private http: HttpClient, private router: Router) {}

  generatePhoneNumber(): void {
    const phoneNumber = Math.floor(Math.random() * (9999999999 - 9000000000 + 1)) + 9000000000;
    this.phoneNumber = phoneNumber.toString();
  }

  copyToClipboard(): void {
    if (this.phoneNumber) {
      navigator.clipboard.writeText(this.phoneNumber).then(() => {
        alert('Phone number copied to clipboard!');
      });
    }
  }

  saveUser(): void {
    if (this.isValidEmail(this.email)) {
      const user = { email: this.email, phno: this.phoneNumber };
      this.http.post(this.apiUrl, user).subscribe({
        next: (response) => {
          console.log('User saved:', response);
          alert('User saved successfully!');
          this.email = '';
          this.phoneNumber = '';
        },
        error: (error) => {
          console.error('Error saving user:', error);
          alert('Failed to save user. Please try again.');
        }
      });
    } else {
      alert('Please enter a valid email.');
    }
  }

  isValidEmail(email: string): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  goBack(): void {
    this.router.navigate(['/']); // Redirect to home
  }
}
