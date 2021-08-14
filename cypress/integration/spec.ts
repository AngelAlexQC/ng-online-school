describe("App Tests", () => {
  beforeEach(() => {
    cy.visit("/login");
    cy.get('[type="email"]')
      .type("admin@admin.com")
      .should("have.value", "admin@admin.com");
    cy.get('[type="password"]').type("password");
    cy.contains("Iniciar Sesión").click();
    cy.url().should("include", "/");
    cy.contains("Matemática - 1A").click();
    cy.url().should("include", "/course/1");
  });
  describe("Login & Go to Courses && Score Student Task", () => {
    /* it("Score Student Task", () => {
      cy.contains("Calificaciones").click();
      // Get the first input that is equal to the text "0" and click the closest badge
      cy.get("input[type='number']").first().type("7");
      // Get the first class="enabled" and click it
      cy.get(".badge.enabled").first().click();
      cy.wait(2500);
      cy.contains("Matemática - 1A").click();
      cy.contains("Calificaciones").click();
      cy.url().should("include", "/course/1");
    }); */
    it("Create a new task", () => {
      cy.contains("Tareas").click();
      cy.get("input[name='score']").first().type("7");
      cy.get("input[name='description']").first().type("Test");
      cy.get("textarea[name='content']").first().type("Test Content");
      // Click save button
      cy.contains("Guardar Tarea").click();
      cy.url().should("include", "/course/1");
      cy.wait(2500);
      cy.contains("Tareas").click();
      cy.wait(1000);
    });
  });
});
