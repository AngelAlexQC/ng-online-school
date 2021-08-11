describe("Login Test", () => {
  beforeEach(() => {
    cy.visit("/login");
  });
  it("Login to app", () => {
    cy.get('[type="email"]')
      .type("admin@admin.com")
      .should("have.value", "admin@admin.com");
    cy.get('[type="password"]').type("password");
    cy.contains("Iniciar Sesión").click();
    cy.url().should("include", "/");
  });
});
