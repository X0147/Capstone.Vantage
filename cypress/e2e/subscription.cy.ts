/**
 * E2E: Footer Newsletter Subscription Flow
 *
 * Covers:
 *  1. Invalid email → error state
 *  2. Empty submit → error state
 *  3. Valid email → success state (mocked Telegram API)
 *  4. Network failure → error state with retry
 *  5. Keyboard submit (Enter key)
 */

describe('Footer Newsletter Subscription', () => {
  beforeEach(() => {
    cy.visit('/');
    // Scroll to the footer so the newsletter section is visible
    cy.get('footer').scrollIntoView();
  });

  it('shows error state when submitting an invalid email', () => {
    cy.get('footer input[type="email"]').type('not-an-email');
    cy.get('footer').contains('button', /subscribe|retry/i).click();

    // Button should show error state (red background)
    cy.get('footer')
      .contains('button', /retry/i)
      .should('have.class', 'bg-red-500');
  });

  it('shows error state when submitting with empty input', () => {
    cy.get('footer input[type="email"]').should('have.value', '');
    cy.get('footer').contains('button', /subscribe/i).click();

    cy.get('footer')
      .contains('button', /retry/i)
      .should('exist');
  });

  it('shows success state when submitting a valid email (mocked API)', () => {
    // Intercept the Telegram API call and mock a success response
    cy.intercept('POST', '**/api.telegram.org/**', {
      statusCode: 200,
      body: { ok: true, result: {} },
    }).as('telegramSend');

    cy.get('footer input[type="email"]').type('test@vantage.aero');
    cy.get('footer').contains('button', /subscribe/i).click();

    // Should show sending state
    cy.get('footer')
      .contains('button', /securing/i)
      .should('exist');

    // Wait for mock API to resolve
    cy.wait('@telegramSend');

    // Should show success state
    cy.get('footer')
      .contains('button', /secured/i)
      .should('have.class', 'bg-emerald-500');

    // Input should be cleared
    cy.get('footer input[type="email"]').should('have.value', '');
  });

  it('shows error state when the API call fails', () => {
    // Intercept and mock a server error
    cy.intercept('POST', '**/api.telegram.org/**', {
      statusCode: 500,
      body: { ok: false, description: 'Internal Server Error' },
    }).as('telegramFail');

    cy.get('footer input[type="email"]').type('user@example.com');
    cy.get('footer').contains('button', /subscribe/i).click();

    cy.wait('@telegramFail');

    cy.get('footer')
      .contains('button', /retry/i)
      .should('have.class', 'bg-red-500');
  });

  it('supports submitting via Enter key', () => {
    cy.intercept('POST', '**/api.telegram.org/**', {
      statusCode: 200,
      body: { ok: true, result: {} },
    }).as('telegramSend');

    cy.get('footer input[type="email"]').type('enter@vantage.aero{enter}');

    cy.wait('@telegramSend');

    cy.get('footer')
      .contains('button', /secured/i)
      .should('exist');
  });

  it('has an ARIA live region for screen reader announcements', () => {
    cy.get('footer [aria-live="polite"]').should('exist');
  });
});
