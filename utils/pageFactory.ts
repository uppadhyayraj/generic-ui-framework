import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/inventoryPage';

/**
 * A factory class for creating instances of different pages.
 */
export class PageFactory {
  /**
   * Returns an instance of the requested page.
   *
   * @param pageName - The name of the page to retrieve.
   * @returns An instance of the requested page.
   * @throws Will throw an error if the page name is not found.
   */
  static getPage(pageName: string) {
    switch (pageName) {
      case 'LoginPage':
        return new LoginPage();
      case 'InventoryPage':
        return new InventoryPage();
      default:
        throw new Error(`Page ${pageName} not found`);
    }
  }
}
