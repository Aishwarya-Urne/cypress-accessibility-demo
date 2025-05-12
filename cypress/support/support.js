export const logA11yViolations = (violations) => {
    cy.task(
      'log',
      `${violations.length} accessibility violation${violations.length === 1 ? '' : 's'} detected`
    );
    const violationData = violations.map(({ id, impact, description, nodes }) => ({
      id,
      impact,
      description,
      nodes: nodes.length,
    }));
    cy.task('table', violationData);
  }
  
   export const checkPageViolation = () => {
     it('Check the Page violation', () => {
      cy.checkA11y(null, {
        runOnly: {
          type: 'tag',
          values: ['wcag2a', 'wcag2aa']
        }
      },
      logA11yViolations,
      true)
     })
   }
  
   export const checkMainPageViolation = () => {
     it('Check the main page for violation', () => {
      cy.get('div[role="main"]').should('exist')
      cy.checkA11y('div[role="main"]', {
        runOnly: {
          type: 'tag',
          values: ['wcag2a', 'wcag2aa']
        }
      })
     })
   }
  
   export const checkKeyboardNavigation = () => {
     it ('check the keyboard navigation', () => {
      cy.get('button:not(:disabled)').each(($button) => {
        cy.wrap($button)
          .focus()
          .should('have.focus')
          .type('{enter}')
      })
     })
   }
  
   export const checkImgAttribute = () => {
     it('Check the image attribute', () => {
      cy.get('img').each(($img) => {
        cy.wrap($img)
          .should('have.attr', 'alt')
          .and('not.be.empty');
      })
     })
   }
  
   export const checkColourContrast = () => {
     it('Check the colour contrast', () => {
      cy.checkA11y(null, {
        runOnly: {
          type: 'rule',
          values: ['color-contrast']
        }
      })
     })
   }