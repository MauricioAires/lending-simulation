import { NgIf } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-confirm-loan-popup',
  standalone: true,
  imports: [NgIf],
  templateUrl: './confirm-loan-popup.component.html',
})
export class ConfirmLoanPopupComponent {
  @Input('show')
  public show = true;

  @Output('onClose')
  onClose = new EventEmitter();
}
