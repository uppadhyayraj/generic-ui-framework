import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/inventoryPage';

export class PageFactory {
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
