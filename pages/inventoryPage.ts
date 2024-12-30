import { BasePage } from './basePage';
import { logger } from '../utils/logging';

export class InventoryPage extends BasePage {
  constructor() {
    super();
  }

  async addItemToCart(itemName: string) {
    await this.click(`//*[text()="${itemName}"]`);
    await this.click(`//button[contains(text(), "Add to cart")]`);
    logger.info(`Added item to cart: ${itemName}`);
  }

  async removeItemFromCart(itemName: string) {
    await this.click(`//*[text()="${itemName}"]`);
    await this.click(`//button[contains(text(), "Remove")]`);
    logger.info(`Removed item from cart: ${itemName}`);
  }

  async getCartItemCount(): Promise<number> {
    const countText = await this.getText('.shopping_cart_badge');
    return parseInt(countText ?? '0', 10);
  }
}
