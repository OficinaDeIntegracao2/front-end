describe("Full test", () => {
  it("Deve testar o fluxo completo do sistema", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Login");
    cy.contains("Email");
    cy.contains("Senha");
    cy.get('input[name="email"]').type("admin@admin.com");
    cy.get('input[name="password"]').type("admin");

    cy.contains("button", "Entrar").click();

    cy.contains("span", "Professor").click();

    cy.contains("button", "Adicionar").click();

    cy.get('input[name="name"]').type("Teste");
    cy.get('input[name="email"]').type("Teste@teste.com");
    cy.get('input[name="password"]').type("123");

    cy.get('button[type="submit"]').click();

    cy.contains("p", "Admin").click();
    cy.contains("Sair").click();

    Cypress.on("uncaught:exception", (err) => {
      if (err.message.includes("NEXT_REDIRECT")) {
        return false;
      }
    });

    cy.get('input[name="email"]').type("Teste@teste.com");
    cy.get('input[name="password"]').type("123");

    cy.contains("button", "Entrar").click();

    cy.contains("span", "Aluno Voluntário").click();

    cy.contains("button", "Adicionar Aluno Voluntário").click();

    cy.get('input[name="name"]').type("Aluno Teste");
    cy.get('input[name="email"]').type("AlunoTeste@teste.com");
    cy.get('input[name="password"]').type("123");

    cy.get('button[type="submit"]').click();

    cy.contains("span", "Matéria").click();

    cy.contains("button", "Matéria").click();

    cy.get('input[name="name"]').type("Matemática");
    cy.get('input[name="description"]').type("Aula avançada de matemática");
    cy.contains("Quarta-feira").click();
    cy.contains("button", "Selecione um horário").click();
    cy.get('[data-slot="select-item"]').contains('07:00').click()

    cy.contains("button", "Selecione um horário").click();
    cy.get('[data-slot="select-item"]').contains('08:00').click()

    cy.get('input[name="durationWeeks"]').type("10");

    cy.get('button[type="submit"]').click();

  });
});
