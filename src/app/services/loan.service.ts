import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface ILoanGenerateSimulation {
  loanAmount: number;
  numberOfInstallments: number;
  valueOfInstallments: number;
  totalAmountWithInterest: number;
}

@Injectable({
  providedIn: 'root',
})
export class LoanService {
  private apiUrl = 'https://jsonplaceholder.typicode.com';
  constructor(private http: HttpClient) {}

  public generateSimulation({
    loanAmount,
    numberOfInstallments,
    valueOfInstallments,
    totalAmountWithInterest,
  }: ILoanGenerateSimulation) {
    return this.http.post<ILoanGenerateSimulation>(`${this.apiUrl}/posts`, {
      loanAmount,
      numberOfInstallments,
      valueOfInstallments,
      totalAmountWithInterest,
    });
  }
}
