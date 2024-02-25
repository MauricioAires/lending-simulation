import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

interface ILoanPayload {
  loanAmount: number;
  loanAmountFormatted: string;
  numberOfInstallments: number;
  totalAmountWithInterestFormatted?: string;
  valueOfInstallmentsFormatted?: string;
}

@Component({
  selector: 'app-success-lean',
  standalone: true,
  imports: [],
  templateUrl: './success-lean.component.html',
})
export class SuccessLeanComponent {
  public loanPayload: ILoanPayload = {} as ILoanPayload;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.loanPayload.loanAmountFormatted = String(
      this.route.snapshot.paramMap.get('loanAmountFormatted')
    );
    this.loanPayload.numberOfInstallments = Number(
      this.route.snapshot.paramMap.get('numberOfInstallments')
    );
    this.loanPayload.valueOfInstallmentsFormatted = String(
      this.route.snapshot.paramMap.get('valueOfInstallmentsFormatted')
    );
    this.loanPayload.totalAmountWithInterestFormatted = String(
      this.route.snapshot.paramMap.get('totalAmountWithInterestFormatted')
    );

    const hasNullableValues = Object.values(this.loanPayload).includes('null');

    if (hasNullableValues) {
      this.router.navigate(['/']);
    }
  }
}
