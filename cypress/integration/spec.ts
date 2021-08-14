describe("Probar Sistema", () => {
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

  describe("Login & Go to Course && Create New Task", () => {
    it("Create a new task", () => {
      cy.contains("Tareas").click();
      cy.get("input[name='score']").first().type("7");
      cy.get(".taskDescription").first().type("Test");
      cy.get(".taskContent").first().type("Test Content");
      // Click save button
      cy.contains("Guardar Tarea").click();
      cy.url().should("include", "/course/1");
      cy.wait(2500);
    });
  });

  describe("Login & Go to Course && Score Student Task", () => {
    it("Score Student Task", () => {
      cy.contains("Calificaciones").click();
      // Get the first input that is equal to the text "0" and click the closest badge
      cy.get("input[type='number']")
        .not(".score")
        .should("be.visible")
        .first()
        .type("7");
      // Get the first class="enabled" and click it
      cy.get(".badge.enabled").first().click();
      cy.wait(2500);
      cy.contains("Matemática - 1A").click();
      cy.contains("Calificaciones").click();
      cy.url().should("include", "/course/1");
    });
  });
  describe("Add CourseClass to Course", () => {
    it("Add Class to Course", () => {
      cy.contains("Agregar Clase").click();
      // Get the input named description and contains the placeholder "Tema de Clase X"
      cy.get("input[name='description']").first().type("Tema de Clase 1");
      cy.get("input[name='date_start']").type(
        new Date().toISOString().slice(0, 10)
      );
      // add two hours to new Date in human format to end_date field
      cy.get("input[name='date_end']").type(
        new Date().toISOString().slice(0, 10)
      );
      // type content of the input
      cy.get("textarea[name='content']").first().type("Test Content");
      cy.contains("Guardar").click();
      cy.url().should("include", "/course/1");
    });
  });
});
