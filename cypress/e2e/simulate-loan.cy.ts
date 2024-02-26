describe('Simulate loan', () => {
  it('should simulate loan', () => {
    cy.visit('/');

    cy.get('#name').type('Mauricio Aires');
    cy.get('#loanAmount').clear().type('2000');
    cy.get('#numberOfInstallments').clear().type('12');

    cy.get('button').contains('Simular empréstimo').click();

    // should validate interest calculation
    cy.contains('R$ 2.000,00');
    cy.contains('Divididas em 12x parcelas de R$ 175,00');
    cy.contains('Total a pagar R$ 2.100,00');
    cy.get('button').contains('Contratar empréstimo').click();

    // should confirm loan
    cy.get('[data-cy="confirm-loan"]').within(() => {
      cy.contains('Valores detalhados');
      cy.contains('R$ 2.000,00');
      cy.contains('12x de R$ 175,00');
      cy.contains('R$ 2.100,00');

      cy.get('button').contains('Confirmar empréstimo').click();
    });

    // should validade success page
    cy.url().should('contain', '/sucesso');
    cy.contains('R$ 2.000,00');
    cy.contains('12x de R$ 175,00');
    cy.contains('R$ 2.100,00');
  });
});
