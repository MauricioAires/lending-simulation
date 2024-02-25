import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { ConfirmLoanPopupComponent } from './confirm-loan-popup/confirm-loan-popup.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ConfirmLoanPopupComponent, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  public showConfirmLoan = false;
  public submitted = false;
  public loanPayload = {
    loanAmount: 0,
    loanAmountFormatted: '',
    numberOfInstallments: 0,
  };

  public loanForm = this.formBuilder.group({
    name: ['', Validators.required],
    loanAmount: [0, Validators.required],
    numberOfInstallments: [0, Validators.required],
  });

  constructor(private formBuilder: FormBuilder, private location: Location) {}

  public handleShowConfirmLoan() {
    if (!this.submitted) {
      this.scrollToAnchor();

      return;
    }

    this.showConfirmLoan = true;
  }

  public handleCloseConfirmLoan() {
    this.showConfirmLoan = false;
  }

  private scrollToAnchor() {
    this.location.go('#calcular-emprestimo-pessoal');

    const elementRef = document.getElementById('calcular-emprestimo-pessoal');

    if (elementRef) {
      elementRef.scrollIntoView();
    }
  }

  public onSubmit() {
    this.submitted = true;

    const { loanAmount, numberOfInstallments } = this.loanForm.value;

    this.loanPayload = {
      loanAmountFormatted: new Intl.NumberFormat('pt-BR', {
        currency: 'BRL',
        style: 'currency',
      }).format(Number(loanAmount)),
      loanAmount: Number(loanAmount),
      numberOfInstallments: Number(numberOfInstallments),
    };
  }
}
