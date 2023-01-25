describe('E2E Testing', () => {
  it('check working', () => {
    cy.visit('http://localhost:3000')
    cy.title().should('eq', 'Bookkart-login')
  })
  it('Login',()=>{
    cy.visit('http://localhost:3000')
    cy.get('#email').type('fake@mail.com')
    cy.get('#password').type('Fake@123')
    cy.get('#loginBtn').click()
    cy.wait(6000)
  })
  it('Work flow',()=>{
    cy.visit('http://localhost:3000/home')
    cy.wait(5000)
    cy.get('#card1').click()
    cy.wait(2000)
    cy.visit('http://localhost:3000/mybooks')
    cy.get('#myBooks').click()
    cy.wait(1000)
    cy.get('#myBooks').click()
  })
  it('logout',()=>{
    cy.visit('http://localhost:3000/home')
    cy.get('#openBtn').click()
    cy.get('#logoutBtn').click()
  })
})