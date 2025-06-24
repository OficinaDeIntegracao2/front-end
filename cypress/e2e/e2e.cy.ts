describe('Full test', () => {
  it('Deve testar o fluxo completo do sistema', () => {
    cy.visit('http://localhost:3000')
    cy.contains('Login')
    cy.contains('Email')
    cy.contains('Senha')
    cy.get('input[name="email"]').type('admin@admin.com')
    cy.get('input[name="password"]').type('admin')

    cy.contains('button', 'Entrar').click()

    cy.contains('span', 'Professor').click()

    cy.contains('button', 'Adicionar').click()

    cy.get('input[name="name"]').type('Teste')
    cy.get('input[name="email"]').type('Teste@teste.com')
    cy.get('input[name="password"]').type('123')

    cy.get('button[type="submit"]').click()

    cy.contains('p', 'Admin').click()
    cy.contains('Sair').click()

    cy.get('input[name="email"]').type('Teste@teste.com')
    cy.get('input[name="password"]').type('123')
  })
})