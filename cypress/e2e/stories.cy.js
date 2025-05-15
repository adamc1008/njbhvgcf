describe('Hacker News App', () => {
  it('loads top stories on /top', () => {
    cy.visit('/top') 

    cy.get('[data-testid="post-card"]').should('have.length.at.least', 1)

    cy.get('[data-testid="post-card"]').first().should('contain.text', 'points')
  })

  it('navigates to Ask HN from navbar', () => {
    cy.visit('/top')

    cy.contains('Ask').click()
    cy.url().should('include', '/ask')
    cy.get('[data-testid="post-card"]').should('exist')
  })
  it('navigates to comments page and loads comments', () => {
    cy.visit('/top')

    cy.get('[data-testid="post-card"]').first().within(() => {
        cy.contains('View Comments').click()
    })

    cy.url().should('include', '/item/')
    cy.get('h3').should('exist') 
    cy.contains('Comments')
    cy.get('.card').should('have.length.at.least', 1) 
  })
})
