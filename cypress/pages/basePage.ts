export class BasePage {
    public getElement(locator: string, options?: object) {
        return cy.get(locator, options)
    }

    public getElementByXpath(locator: string, options?: object) {
        return cy.xpath(locator, options)
    }

    public goToUrl(url: string) {
        cy.visit(url)
    }
}