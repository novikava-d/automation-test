import { BasePage } from "./basePage";

export class SidebarPage extends BasePage {
    public arrowButton: string = '[data-test-id="user-panel-button"]'
    public signoutButton: string = '//div[@class="aer-sidebar-desktop__user-panel"]//span[3]'
}