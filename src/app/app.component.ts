import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { NgIf } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { ConfirmLoanPopupComponent } from './components/confirm-loan-popup/confirm-loan-popup.component';
import { LoanService } from './services/loan.service';
import { HttpClientModule } from '@angular/common/http';

interface ILoanPayload {
  loanAmount: number;
  loanAmountFormatted: string;
  numberOfInstallments: number;
  valueOfInstallmentsFormatted?: string;
  totalAmountWithInterestFormatted?: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NgIf,
    ConfirmLoanPopupComponent,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [LoanService],
  templateUrl: './app.component.html',
})
export class AppComponent {
  public isLoadingGenerateSimulation = false;
  public showConfirmLoan = false;
  public submitted = false;
  public loanPayload: ILoanPayload = {
    loanAmount: 0,
    loanAmountFormatted: '',
    numberOfInstallments: 0,
  };

  public loanForm = this.formBuilder.group({
    name: ['', Validators.required],
    loanAmount: [0, Validators.required],
    numberOfInstallments: [0, Validators.required],
  });

  constructor(
    private loanService: LoanService,
    private formBuilder: FormBuilder
  ) {}

  public handleShowConfirmLoan() {
    if (!this.submitted) {
      this.scrollToAnchor('calcular-emprestimo-pessoal');

      return;
    }

    this.showConfirmLoan = true;
  }

  public handleCloseConfirmLoan() {
    this.showConfirmLoan = false;
  }

  private scrollToAnchor(anchorId: string) {
    const elementRef = document.getElementById(anchorId);

    if (elementRef) {
      elementRef.scrollIntoView();
    }
  }

  private currencyFormatter(value: number) {
    return new Intl.NumberFormat('pt-BR', {
      currency: 'BRL',
      style: 'currency',
    }).format(value);
  }

  public onSubmit() {
    this.isLoadingGenerateSimulation = true;
    const { loanAmount, numberOfInstallments } = this.loanForm.value;

    const totalAmountWithInterest =
      (Number(loanAmount) * 5) / 100 + Number(loanAmount);

    const payload = {
      loanAmount: Number(loanAmount),
      numberOfInstallments: Number(numberOfInstallments),
      valueOfInstallments:
        totalAmountWithInterest / Number(numberOfInstallments),
      totalAmountWithInterest: totalAmountWithInterest,
    };

    this.loanService.generateSimulation(payload).subscribe((response) => {
      this.submitted = true;
      this.isLoadingGenerateSimulation = false;

      this.loanPayload = {
        loanAmountFormatted: this.currencyFormatter(response.loanAmount),
        loanAmount: response.loanAmount,
        numberOfInstallments: response.numberOfInstallments,
        totalAmountWithInterestFormatted: this.currencyFormatter(
          totalAmountWithInterest
        ),
        valueOfInstallmentsFormatted: this.currencyFormatter(
          totalAmountWithInterest / response.numberOfInstallments
        ),
      };

      this.scrollToAnchor('contratar-emprestimo');
    });
  }
}
