import { NgIf } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterLink } from '@angular/router';

interface ILoanPayload {
  loanAmount: number;
  loanAmountFormatted: string;
  numberOfInstallments: number;
  totalAmountWithInterestFormatted?: string;
  valueOfInstallmentsFormatted?: string;
}

@Component({
  selector: 'app-confirm-loan-popup',
  standalone: true,
  imports: [NgIf, RouterLink],
  templateUrl: './confirm-loan-popup.component.html',
})
export class ConfirmLoanPopupComponent {
  @Input('data')
  public loanPayload: ILoanPayload = {} as ILoanPayload;

  @Input('show')
  public show = true;

  @Output('onClose')
  onClose = new EventEmitter();
}
