//DELETE THIS FILE on starting dev efforts
describe('example to-do app', () => {
  it('Test page', () => {
    cy.visit('http://localhost:3000')
    cy.get('p').contains('Get started by editing src/app/page.tsx')
  })
})