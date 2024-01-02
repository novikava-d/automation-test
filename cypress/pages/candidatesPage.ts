import { BasePage } from "./basePage";

export class CandidatesPage extends BasePage {
    public alreadyWorkedHereDropwdown: string = '(//button[@data-test-id="dropdown-activator"])[5]'
    public professionDropdown: string = '(//button[@data-test-id="dropdown-activator"])[1]'
    public pharmacistOption: string = '[for="checkbox-1"]'
    public yesOption: string = '[for="checkbox-Yes"]'
    public anyOption: string = '[for="checkbox-Any"]'
    public keywordInput: string = '[data-test-id="input-filter-by-keyword"]'
    public searchButton: string = 'button.text-white.bg-brand-general span'
    public nameColumn: string = '//tr[@id="row-0-1"]//td[1]'
    public roleDropdown: string = '(//button[@data-test-id="dropdown-activator"])[2]'
    public noOption: string = '[for="checkbox-No"]'
    public rowInTable: string = 'tr.aer-table-row'

    public initFilters() {
        this.getElementByXpath(this.professionDropdown).click()
        this.getElement(this.anyOption).click()
        this.getElementByXpath(this.alreadyWorkedHereDropwdown).click()
        this.getElement(this.yesOption).click()
        this.getElement(this.keywordInput).clear()
    }

    public checkTableColumnBySearchValue(columnName: number, textValue: string) {
        const numberOfRows = this.getElement(this.rowInTable).then(($elements) => {
            return $elements.length
        })
        for(let i = 0; i < +numberOfRows; i++) {
            this.getElementByXpath(`//tr[@id="row-${i}-1"]//td[${columnName}]`).contains(textValue)
        }
    }

    public checkTableColumnToIncludeSearchValue(columnName: number, textValue: string, isInclude: boolean = true) {
        const numberOfRows = this.getElement(this.rowInTable).then(($elements) => {
            return $elements.length
        })
        for(let i = 0; i < +numberOfRows; i++) {
            isInclude
            ? this.getElementByXpath(`//tr[@id="row-${i}-1"]//td[${columnName}]`).should('include.text', textValue)
            : this.getElementByXpath(`//tr[@id="row-${i}-1"]//td[${columnName}]`).should('not.include.text', textValue)
        }
    }
}