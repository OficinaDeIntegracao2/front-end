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

    cy.clearCookies();
    cy.clearLocalStorage();
    cy.reload();

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
    cy.get('[data-slot="select-item"]').contains("07:00").click();

    cy.contains("button", "Selecione um horário").click();
    cy.get('[data-slot="select-item"]').contains("08:00").click();

    cy.get('input[name="durationWeeks"]').type("1");

    cy.get('button[type="submit"]').click();

    cy.get('[data-testid="subject-actions-trigger"]').first().click();

    cy.get('[data-testid="subject-detail"]').first().click();

    cy.contains("button", "Vincular").click();

    cy.get('[data-testid="select-volunteer"]').click();

    Cypress.on("uncaught:exception", (err) => {
      if (
        err.message.includes(
          "ResizeObserver loop completed with undelivered notifications",
        )
      ) {
        return false;
      }
    });

    cy.contains('[data-slot="select-item"]', "Aluno Teste")
      .scrollIntoView()
      .click({ force: true });

    cy.get('button[type="submit"]').click();

    cy.get('[data-slot="dialog-overlay"]').click("topLeft", { force: true });

    cy.contains("button", "Vincular Estudante").click();
    cy.get('input[name="name"]').type("Estudante Teste");
    cy.get('input[name="email"]').type("EstudanteTeste@teste.com");

    cy.get('button[type="submit"]').click();

    cy.get('[data-slot="dialog-overlay"]').click("topLeft", { force: true });

    cy.get('[data-testid="student-actions-trigger"]').first().click();

    cy.get('[data-testid="student-lancar-presenca"]').first().click();

    cy.contains("Selecione...").click();
    cy.get("button").contains(/^2$/).click();
    cy.get('button[type="submit"]').click();

    cy.get('[data-slot="dialog-overlay"]').click("topLeft", { force: true });

    cy.get('[data-testid="student-actions-trigger"]').first().click();

    cy.get('[data-testid="student-gerar-certificado"]').first().click();
  });
});
