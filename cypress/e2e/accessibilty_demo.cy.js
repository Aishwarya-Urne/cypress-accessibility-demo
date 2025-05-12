/// <reference types="cypress" />

 describe('Accessibility test', () => {
  it('should detect accessibility issues on the BAD demo site', () => {
    cy.visit('https://www.w3.org/WAI/demos/bad/before/home.html');
    cy.injectAxe();          // Inject axe-core into the page
    cy.checkA11y(null, {
      runOnly: {
        type: 'tag',
        values: ['wcag2a', 'wcag2aa']
      }
    }, (violations) => {
      // Custom handling of violations (no test failure)
      if (violations.length) {
        cy.task('log', `${violations.length} accessibility violation(s) found:`);
    
        violations.forEach((v) => {
          const nodes = v.nodes.map(n => n.html).join(', ');
          cy.task('log', `Violation: ${v.id} - ${v.description}`);
          cy.task('log', `  Impact: ${v.impact}`);
          cy.task('log', `  Affected Nodes: ${nodes}`);
        });
      }
    }); // Run the accessibility check
  }); 

 });