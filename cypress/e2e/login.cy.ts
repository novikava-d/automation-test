import { ColumnNames } from "cypress/enums/columnNames.enum";
import { CandidatesPage } from "../pages/candidatesPage";
import { LoginPage } from "../pages/loginPage";
import { SidebarPage } from "cypress/pages/sidebarPage";
const candidatesPage: CandidatesPage = new CandidatesPage();
const sidebarPage: SidebarPage = new SidebarPage();
const loginPage: LoginPage = new LoginPage();

describe("Login Suit", () => {
  beforeEach(() => {
    loginPage.submitLoginForm();
  });

  afterEach(() => {
    candidatesPage.initFilters();
    sidebarPage.getElement(sidebarPage.arrowButton).click();
    sidebarPage.getElementByXpath(sidebarPage.signoutButton).click();
    cy.url().should("equal", "https://develop-app.aertemp.com/workspaces");
  });

  it("Search for Candidate by Keyword", () => {
    const searchValue = "Viola";
    candidatesPage.initFilters();
    candidatesPage
      .getElement(candidatesPage.keywordInput, { timeout: 30000 })
      .type(searchValue);
    candidatesPage.getElement(candidatesPage.searchButton).click();
    candidatesPage
      .getElementByXpath(candidatesPage.nameColumn)
      .contains(searchValue);
  });

  it("Search for Candidate by Profession", () => {
    const searchValue = "Pharmacist";
    candidatesPage.initFilters();
    candidatesPage
      .getElementByXpath(candidatesPage.professionDropdown, { timeout: 30000 })
      .click();
    candidatesPage.getElement(candidatesPage.pharmacistOption).click();
    candidatesPage.getElement(candidatesPage.searchButton).click();
    candidatesPage.checkTableColumnBySearchValue(
      ColumnNames.professionsColumn,
      searchValue
    );
  });

  it("Search for Candidate by Role", () => {
    const searchValue = "Pharma1";
    const searchProfession = "Pharmacist";
    candidatesPage.initFilters();
    candidatesPage
      .getElementByXpath(candidatesPage.professionDropdown, { timeout: 30000 })
      .click();
    candidatesPage.getElement(candidatesPage.pharmacistOption).click();
    candidatesPage
      .getElementByXpath(candidatesPage.roleDropdown, { timeout: 30000 })
      .click();
    candidatesPage.getElement(candidatesPage.pharmacistOption).click();
    candidatesPage.getElement(candidatesPage.searchButton).click();
    candidatesPage.checkTableColumnBySearchValue(
      ColumnNames.roleColumn,
      searchValue
    );
  });

  it("Search for Candidate by Sign Up Date", () => {
    candidatesPage.initFilters();
    candidatesPage
      .getElementByXpath(candidatesPage.alreadyWorkedHereDropwdown, {
        timeout: 30000,
      })
      .click();
    candidatesPage.getElement(candidatesPage.yesOption).click();
    candidatesPage.getElement(candidatesPage.searchButton).click();
    candidatesPage.checkTableColumnToIncludeSearchValue(
      ColumnNames.firstWorkedColumn,
      "-",
      false
    );
  });

  it("Search for Candidate that hasn't Worked yet", () => {
    candidatesPage.initFilters();
    candidatesPage
      .getElementByXpath(candidatesPage.alreadyWorkedHereDropwdown, {
        timeout: 30000,
      })
      .click();
    candidatesPage.getElement(candidatesPage.noOption).click();
    candidatesPage.getElement(candidatesPage.searchButton).click();
    candidatesPage.checkTableColumnToIncludeSearchValue(
      ColumnNames.firstWorkedColumn,
      "-"
    );
  });
});
