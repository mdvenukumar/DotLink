// src/app/validate/validate.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidateService } from '../validate.service'; // Adjust path if needed
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-validate',
  templateUrl: './validate.component.html',
  styleUrls: ['./validate.component.css']
})
export class ValidateComponent {
  phoneNumberForm: FormGroup;
  paymentForm: FormGroup;
  validationResult: string = '';
  isPhoneNumberValid: boolean = false;
  paymentSuccess: boolean = false;
  isProcessingPayment: boolean = false; // For showing the loading spinner
  selectedPack: any = {
    cost: 0,
    validity: '0days' // Default value as a string
  };
  cost: any;

  constructor(private fb: FormBuilder, private validateService: ValidateService, private router: Router) {
    this.phoneNumberForm = this.fb.group({
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]]
    });

    this.paymentForm = this.fb.group({
      paymentMethod: ['', Validators.required],
      upiOption: [''],
      upiId: [''],
      cardNumber: [''],
      expiryDate: [''],
      cvv: ['']
    });
  }

  validatePhoneNumber() {
    this.validationResult = ''; // Clear previous error message
    if (this.phoneNumberForm.valid) {
      const phoneNumber = this.phoneNumberForm.value.phoneNumber;
      this.validateService.validatePhoneNumber(phoneNumber).subscribe(
        result => {
          if (result.includes('redirect:/dashboard')) {
            this.isPhoneNumberValid = true;
            this.selectedPack = JSON.parse(localStorage.getItem('selectedPack') || '{}');
            this.cost = this.selectedPack.cost; // Ensure cost is correctly assigned
          } else {
            this.validationResult = 'User not found or inactive';
            this.isPhoneNumberValid = false;
          }
        },
        error => {
          this.validationResult = 'Not a user of .Link';
          this.isPhoneNumberValid = false;
        }
      );
    }
  }

  async processPayment() {
    if (this.paymentForm.valid) {
      this.isProcessingPayment = true; // Show loading spinner
      const phoneNumber = this.phoneNumberForm.value.phoneNumber;

      const paymentData = {
        phonenumber: phoneNumber,
        broughtFrom: this.paymentForm.value.paymentMethod,
      };

      try {
        await this.validateService.postPayment(paymentData);

        // Get email ID
        const emailResponse = await this.validateService.getEmail(phoneNumber).toPromise();
        if (emailResponse && emailResponse.email) {
          // Prepare email data with just the email
          const emailData = {
            toEmail: String(emailResponse.email)
          };

          console.log('Sending email data:', emailData); // Add logging here

          // Send email
          await this.validateService.sendEmail(emailData).toPromise();
          this.paymentSuccess = true;
          this.validationResult = ''; // Clear error message on success
        } else {
          this.validationResult = 'Failed to retrieve email address.';
        }
      } catch (error) {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 400) {
            // Log detailed error message from the response
            console.error('Bad Request Error:', error.error);
            this.validationResult = `Bad Request Error: ${error.error.error || 'Invalid request'}.`;
          } else {
            console.error('HTTP Error:', error.message);
            this.validationResult = 'An error occurred. Please try again later.';
          }
        } else {
          console.error('Unexpected Error:', error);
          this.validationResult = 'An unexpected error occurred. Please try again later.';
        }
      } finally {
        this.isProcessingPayment = false; // Hide loading spinner
      }
    }
  }

  onPaymentMethodChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const paymentMethod = selectElement.value;
    const paymentMethodControl = this.paymentForm.get('paymentMethod');
    if (paymentMethodControl) {
      paymentMethodControl.setValue(paymentMethod);
      this.validationResult = ''; // Clear error message when payment method changes
    }
  }

  goToHome() {
    this.router.navigate(['/']);
  }
}
