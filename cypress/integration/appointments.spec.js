describe("Appointments", () => {
  it("should book an interview", () => {
    // reset db before each time test runs
    cy.request("GET", "/api/debug/reset");

    cy.visit("/");

    cy.contains("[data-testid=day]", "Monday");

    // Clicks on the "Add" button in the second appointment
    cy.get("[alt=Add]").click();

    // Enters their name
    cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");

    // Chooses an interviewer
    cy.get("[alt='Sylvia Palmer']").click();

    // Clicks the save button
    cy.contains("Save").click();

    // Sees the booked appointment
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });
});
