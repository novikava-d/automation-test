import { BasePage } from "./basePage";

export class LoginPage extends BasePage {
  public aerWorkspace: string = '[data-test-id="workspace-aertemp"]';
  public usernameInput: string = '[id="username"]';
  public passwordInput: string = '[id="password"]';
  public continueButton: string = '(//button[@type="submit"])[2]';
  public titleText: string = "._aer-dashboard-title_15sep_19";

  public submitLoginForm() {
    cy.visit("https://develop-app.aertemp.com");
    cy.get('[data-test-id="workspace-aertemp"]').click();

    cy.origin("https://dev-aer-temp.eu.auth0.com", () => {
      cy.get('[id="username"]').type("developer+clarity@claritylocums.com");
      cy.get('[id="password"]').type("mSad1da!sd2DW");
      cy.get(".cff0ff2c6 button.cf4ff3b5d").click();
    });
    cy.get("._aer-dashboard-title_15sep_19", { timeout: 30000 }).should(
      "be.visible"
    );
    this.goToUrl("develop-app.aertemp.com/app/candidates-dashboard");
  }
}
